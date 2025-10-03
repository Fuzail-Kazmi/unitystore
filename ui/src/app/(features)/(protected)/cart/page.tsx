"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Minus,
  Plus,
  Trash2,
  ArrowLeft,
  Heart,
  ShoppingBag,
} from "lucide-react";
import { toast } from "react-hot-toast";
import {
  useCart,
  useUpdateCartItem,
  useRemoveCartItem,
  useClearCart,
} from "@/api/cart";
import { useAddresses } from "@/api/address";
import { useCreateOrder } from "@/api/orders";
import AddAddressForm from "../(setting)/addresses/address-form";

type CartItem = {
  id: string;
  product: {
    id: string;
    name?: string;
    product_name?: string;
    brand: string;
    image?: string;
    price: number | string;
    final_price?: number | string;
    slug: string;
    category: string;
  };
  quantity: number;
};

const Page = () => {
  const { data: cartData, isLoading, isError, error } = useCart();
  const { data: addresses, isLoading: addrLoading } = useAddresses();
  const createOrder = useCreateOrder();

  const updateCartItem = useUpdateCartItem();
  const removeCartItem = useRemoveCartItem();
  const clearCart = useClearCart();

  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);
  const [confirmAddress, setConfirmAddress] = useState(false);

  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<any>(null);

  const cartItems: CartItem[] = cartData?.items || [];

  const subtotal = cartItems.reduce((sum, item) => {
    const price = Number(item.product.final_price) || Number(item.product.price);
    return sum + price * item.quantity;
  }, 0);

  const shipping = subtotal > 50 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const updateQuantity = (itemId: string, newQuantity: number) => {
    const safeQuantity = Math.max(1, parseInt(String(newQuantity), 10));
    updateCartItem.mutate(
      { item_id: itemId, quantity: safeQuantity },
      {
        onError: (err: any) => {
          console.error("Update quantity error:", err.response?.data || err);
          toast.error(
            err?.response?.data?.message ||
            "Failed to update quantity. Try again!"
          );
        },
      }
    );
  };

  const removeItem = (itemId: string) => {
    removeCartItem.mutate(itemId, {
      onError: (err: any) => {
        console.error("Remove item error:", err);
        toast.error("Failed to remove item. Try again!");
      },
    });
  };

  const clearAll = () => {
    clearCart.mutate(undefined, {
      onError: (err: any) => {
        console.error("Clear cart error:", err);
        toast.error("Failed to clear cart. Try again!");
      },
    });
  };

  const handleCheckout = () => {
    if (!selectedAddress) {
      toast.error("⚠️ Please select an address.");
      return;
    }
    if (!confirmAddress) {
      toast.error("⚠️ Please confirm your address before checkout.");
      return;
    }

    createOrder.mutate(
      { address_id: selectedAddress },
      {
        onSuccess: () => {
          toast.success("🎉 Order placed successfully!");
        },
        onError: (err: any) => {
          console.error("Order create error:", err.response?.data || err);
          toast.error("Failed to create order. Try again!");
        },
      }
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Loading your cart...</p>
      </div>
    );
  }

  if (isError) {
    console.error("Cart fetch error:", error);
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-600">Failed to load cart.</p>
      </div>
    );
  }

  if (!cartItems.length) {
    return (
      <div className="min-h-screen w-full bg-gray-50 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            <ShoppingBag className="h-24 w-24 text-gray-300 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Your cart is empty
            </h2>
            <p className="text-gray-500 mb-8">
              Start adding some products to your cart
            </p>
            <Link
              href="/"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors inline-flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gray-50 py-4 sm:py-8">
      <div className="max-w-6xl mx-auto px-2 md:px-4">
        <div className="mb-6 sm:mb-8">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Continue Shopping
          </Link>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 sm:mb-0">
              Shopping Cart ({cartItems.length} items)
            </h1>
            <div className="text-sm text-gray-500">
              Free shipping on your first order
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              {cartItems.map((item, index) => {
                const price =
                  Number(item.product.final_price) ||
                  Number(item.product.price);
                return (
                  <div key={item.id}>
                    <div className="p-2 md:p-4">
                      <div className="flex flex-col sm:flex-row gap-4">
                        <Link
                          href={`/products/${item.product.id}`}
                          className="flex-shrink-0"
                        >
                          <div className="w-full sm:w-24 h-48 sm:h-24 bg-gray-50 rounded-lg overflow-hidden">
                            <Image
                              src={item.product.image || "/placeholder.png"}
                              alt={
                                item.product.name ||
                                item.product.product_name ||
                                "Product image"
                              }
                              width={96}
                              height={96}
                              className="w-full h-full object-contain p-2"
                            />
                          </div>
                        </Link>

                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                            <div className="flex-1">
                              <Link
                                href={`/products/${item.product.id}`}
                                className="font-semibold text-gray-900 hover:text-blue-600 transition-colors"
                              >
                                {item.product.name || item.product.product_name}
                              </Link>
                              <p className="text-sm text-gray-500">
                                {item.product.brand}
                              </p>
                            </div>

                            <div className="text-right">
                              <div className="flex items-center gap-2 justify-end">
                                <span className="text-lg font-bold text-gray-900">
                                  Rs.{price.toFixed(2)}
                                </span>
                              </div>
                              <p className="text-xs text-gray-500 mt-1">
                                Rs.{(price * item.quantity).toFixed(2)} total
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-gray-600">Qty:</span>
                              <div className="flex items-center border border-gray-300 rounded-lg">
                                <button
                                  onClick={() =>
                                    updateQuantity(
                                      item.id,
                                      Number(item.quantity) - 1
                                    )
                                  }
                                  disabled={Number(item.quantity) <= 1}
                                  className="p-1 hover:bg-gray-100 disabled:opacity-50"
                                >
                                  <Minus className="h-3 w-3" />
                                </button>
                                <span className="px-3 py-1 text-sm font-medium min-w-[2rem] text-center">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() =>
                                    updateQuantity(
                                      item.id,
                                      Number(item.quantity) + 1
                                    )
                                  }
                                  className="p-1 hover:bg-gray-100"
                                >
                                  <Plus className="h-3 w-3" />
                                </button>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <button className="text-xs text-gray-500 hover:text-red-500 flex items-center gap-1">
                                <Heart className="h-3 w-3" />
                                Save
                              </button>
                              <button
                                onClick={() => removeItem(item.id)}
                                className="text-xs text-gray-500 hover:text-red-500 flex items-center gap-1"
                              >
                                <Trash2 className="h-3 w-3" />
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {index < cartItems.length - 1 && (
                      <hr className="border-gray-200" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-1 space-y-4">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-4">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Address</h2>

              {addrLoading ? (
                <p className="text-gray-500">Loading addresses...</p>
              ) : addresses?.length ? (
                <div className="space-y-3 mb-6">
                  {addresses.map((addr: any) => (
                    <label
                      key={addr.id}
                      className={`flex items-start gap-3 p-3 border rounded-lg cursor-pointer transition ${selectedAddress === addr.id
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200"
                        }`}
                    >
                      <input
                        type="radio"
                        name="address"
                        value={addr.id}
                        checked={selectedAddress === addr.id}
                        onChange={() => setSelectedAddress(addr.id)}
                        className="mt-1"
                      />
                      <div>
                        <p className="font-medium text-gray-900">{addr.title}</p>
                        <p className="text-sm text-gray-600">
                          {addr.address_line_1}, {addr.city}, {addr.state}
                        </p>
                        <p className="text-xs text-gray-500">
                          {addr.phone_number || "No phone"}
                        </p>
                      </div>
                    </label>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center mb-6">
                  <p className="text-gray-600 mb-2">No address found</p>

                  <AddAddressForm
                    open={isPopoverOpen}
                    setOpen={setIsPopoverOpen}
                    editingAddress={editingAddress}
                    setEditingAddress={setEditingAddress}
                  />
                </div>
              )}

              {addresses?.length > 0 && (
                <label className="flex items-center gap-2 mt-4 text-sm">
                  <input
                    type="checkbox"
                    checked={confirmAddress}
                    onChange={(e) => setConfirmAddress(e.target.checked)}
                  />
                  I confirm this is my delivery address
                </label>
              )}
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-4">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">
                Order Summary
              </h2>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">Rs.{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">
                    {shipping === 0 ? "Free" : `Rs.${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium">Rs.{tax.toFixed(2)}</span>
                </div>
                <hr className="border-gray-200" />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>Rs.{total.toFixed(2)}</span>
                </div>
              </div>
              <button
                onClick={handleCheckout}
                disabled={createOrder.isPending}
                className="w-full bg-primary hover:bg-primary/85 text-white py-3 px-4 rounded-lg font-medium transition-colors mb-4"
              >
                {createOrder.isPending
                  ? "Placing Order..."
                  : "Proceed to Checkout"}
              </button>
              <div className="text-center">
                <Link
                  href="/products"
                  className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div >
    </div >
  );
};

export default Page;
