"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
    Minus,
    Plus,
    Trash2,
    ArrowLeft,
    Heart,
    ShoppingBag,
    Shield,
    Truck,
    RotateCcw,
    Tag,
    AlertCircle,
    CheckCircle
} from 'lucide-react';

type CartItem = {
    id: number;
    name: string;
    brand: string;
    image: string;
    price: number;
    originalPrice?: number;
    quantity: number;
    color?: string;
    size?: string;
    inStock: boolean;
    maxQuantity: number;
    category: string;
    slug: string;
};

const initialCartItems: CartItem[] = [
    {
        id: 1,
        name: "iPhone 16 Pro Max",
        brand: "Apple",
        image: "/images/product1-4.jpg",
        price: 1199,
        originalPrice: 1299,
        quantity: 1,
        color: "Natural Titanium",
        size: "256GB",
        inStock: true,
        maxQuantity: 5,
        category: "electronics",
        slug: "iphone-16-pro-max"
    },
    {
        id: 2,
        name: "AirPods Pro (2nd Gen)",
        brand: "Apple",
        image: "/images/product1-3.jpg",
        price: 199,
        originalPrice: 249,
        quantity: 2,
        inStock: true,
        maxQuantity: 10,
        category: "electronics",
        slug: "airpods-pro-2nd-gen"
    },
    {
        id: 3,
        name: "MacBook Pro 16-inch",
        brand: "Apple",
        image: "/images/product1-2.jpg",
        price: 2699,
        originalPrice: 2999,
        quantity: 1,
        color: "Space Gray",
        size: "1TB",
        inStock: false,
        maxQuantity: 3,
        category: "electronics",
        slug: "macbook-pro-16-inch"
    }
];

const Index = () => {
    const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);
    const [promoCode, setPromoCode] = useState('');
    const [promoApplied, setPromoApplied] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const savings = cartItems.reduce((sum, item) => {
        if (item.originalPrice) {
            return sum + ((item.originalPrice - item.price) * item.quantity);
        }
        return sum;
    }, 0);
    const promoDiscount = promoApplied ? 50 : 0;
    const shipping = subtotal > 50 ? 0 : 9.99;
    const tax = (subtotal - promoDiscount) * 0.08;
    const total = subtotal - promoDiscount + shipping + tax;

    const updateQuantity = (id: number, newQuantity: number) => {
        setCartItems(items =>
            items.map(item =>
                item.id === id
                    ? { ...item, quantity: Math.max(1, Math.min(newQuantity, item.maxQuantity)) }
                    : item
            )
        );
    };

    const removeItem = (id: number) => {
        setCartItems(items => items.filter(item => item.id !== id));
    };

    const moveToWishlist = (id: number) => {
        removeItem(id);
    };

    // const applyPromoCode = () => {
    //     setIsLoading(true);
    //     setTimeout(() => {
    //         if (promoCode.toLowerCase() === 'save50') {
    //             setPromoApplied(true);
    //         }
    //         setIsLoading(false);
    //     }, 1000);
    // };

    // const removePromoCode = () => {
    //     setPromoApplied(false);
    //     setPromoCode('');
    // };

    if (cartItems.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50 py-8">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center py-16">
                        <ShoppingBag className="h-24 w-24 text-gray-300 mx-auto mb-6" />
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
                        <p className="text-gray-500 mb-8">Start adding some products to your cart</p>
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
        <div className="min-h-screen bg-gray-50 py-4 sm:py-8">
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
                            {cartItems.map((item, index) => (
                                <div key={item.id}>
                                    <div className="p-2 md:p-4">
                                        <div className="flex flex-col sm:flex-row gap-4">
                                            <Link
                                                href={`/product/${item.category}/${item.slug}`}
                                                className="flex-shrink-0"
                                            >
                                                <div className="w-full sm:w-24 h-48 sm:h-24 bg-gray-50 rounded-lg overflow-hidden">
                                                    <Image
                                                        src={item.image}
                                                        alt={item.name}
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
                                                            href={`/product/${item.category}/${item.slug}`}
                                                            className="font-semibold text-gray-900 hover:text-blue-600 transition-colors"
                                                        >
                                                            {item.name}
                                                        </Link>
                                                        <p className="text-sm text-gray-500">{item.brand}</p>

                                                        {(item.color || item.size) && (
                                                            <div className="flex flex-wrap gap-2 mt-2">
                                                                {item.color && (
                                                                    <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                                                                        {item.color}
                                                                    </span>
                                                                )}
                                                                {item.size && (
                                                                    <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                                                                        {item.size}
                                                                    </span>
                                                                )}
                                                            </div>
                                                        )}

                                                        <div className="flex items-center gap-2 mt-2">
                                                            {item.inStock ? (
                                                                <div className="flex items-center gap-1 text-xs text-green-600">
                                                                    <CheckCircle className="h-3 w-3" />
                                                                    In Stock
                                                                </div>
                                                            ) : (
                                                                <div className="flex items-center gap-1 text-xs text-red-600">
                                                                    <AlertCircle className="h-3 w-3" />
                                                                    Out of Stock
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>

                                                    <div className="text-right">
                                                        <div className="flex items-center gap-2 justify-end">
                                                            <span className="text-lg font-bold text-gray-900">
                                                                ${item.price}
                                                            </span>
                                                            {item.originalPrice && (
                                                                <span className="text-sm text-gray-500 line-through">
                                                                    ${item.originalPrice}
                                                                </span>
                                                            )}
                                                        </div>
                                                        <p className="text-xs text-gray-500 mt-1">
                                                            ${(item.price * item.quantity).toFixed(2)} total
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-sm text-gray-600">Qty:</span>
                                                        <div className="flex items-center border border-gray-300 rounded-lg">
                                                            <button
                                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                                disabled={item.quantity <= 1}
                                                                className="p-1 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                                                            >
                                                                <Minus className="h-3 w-3" />
                                                            </button>
                                                            <span className="px-3 py-1 text-sm font-medium min-w-[2rem] text-center">
                                                                {item.quantity}
                                                            </span>
                                                            <button
                                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                                disabled={item.quantity >= item.maxQuantity}
                                                                className="p-1 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                                                            >
                                                                <Plus className="h-3 w-3" />
                                                            </button>
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center gap-2">
                                                        <button
                                                            onClick={() => moveToWishlist(item.id)}
                                                            className="text-xs text-gray-500 hover:text-red-500 flex items-center gap-1 transition-colors"
                                                        >
                                                            <Heart className="h-3 w-3" />
                                                            Save
                                                        </button>
                                                        <button
                                                            onClick={() => removeItem(item.id)}
                                                            className="text-xs text-gray-500 hover:text-red-500 flex items-center gap-1 transition-colors"
                                                        >
                                                            <Trash2 className="h-3 w-3" />
                                                            Remove
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {index < cartItems.length - 1 && <hr className="border-gray-200" />}
                                </div>
                            ))}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div className="flex items-center gap-3 p-4 bg-white rounded-lg border border-gray-200">
                                <div className="p-2 bg-green-100 rounded-lg">
                                    <Truck className="h-5 w-5 text-green-600" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-900">Free Shipping</p>
                                    <p className="text-xs text-gray-500">On orders your first order</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 p-4 bg-white rounded-lg border border-gray-200">
                                <div className="p-2 bg-blue-100 rounded-lg">
                                    <RotateCcw className="h-5 w-5 text-blue-600" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-900">Easy Returns</p>
                                    <p className="text-xs text-gray-500">30-day return policy</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 p-4 bg-white rounded-lg border border-gray-200">
                                <div className="p-2 bg-purple-100 rounded-lg">
                                    <Shield className="h-5 w-5 text-purple-600" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-900">Secure Payment</p>
                                    <p className="text-xs text-gray-500">SSL encrypted</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-4">
                            <h2 className="text-lg font-semibold text-gray-900 mb-6">Order Summary</h2>

                            {/*<div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Promo Code
                                </label>
                                {!promoApplied ? (
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            value={promoCode}
                                            onChange={(e) => setPromoCode(e.target.value)}
                                            placeholder="Enter code"
                                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                        <button
                                            onClick={applyPromoCode}
                                            disabled={!promoCode || isLoading}
                                            className="px-4 py-2 bg-gray-900 hover:bg-gray-800 text-white text-sm rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {isLoading ? '...' : 'Apply'}
                                        </button>
                                    </div>
                                ) : (
                                    <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                                        <div className="flex items-center gap-2">
                                            <Tag className="h-4 w-4 text-green-600" />
                                            <span className="text-sm font-medium text-green-800">SAVE50 applied</span>
                                        </div>
                                        <button
                                            onClick={removePromoCode}
                                            className="text-xs text-green-700 hover:text-green-800"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                )}
                            </div> */}

                            <div className="space-y-3 mb-6">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Subtotal</span>
                                    <span className="font-medium">${subtotal.toFixed(2)}</span>
                                </div>

                                {savings > 0 && (
                                    <div className="flex justify-between text-sm text-green-600">
                                        <span>Savings</span>
                                        <span>-${savings.toFixed(2)}</span>
                                    </div>
                                )}

                                {promoApplied && (
                                    <div className="flex justify-between text-sm text-green-600">
                                        <span>Promo Discount</span>
                                        <span>-${promoDiscount.toFixed(2)}</span>
                                    </div>
                                )}

                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Shipping</span>
                                    <span className="font-medium">
                                        {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                                    </span>
                                </div>

                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Tax</span>
                                    <span className="font-medium">${tax.toFixed(2)}</span>
                                </div>

                                <hr className="border-gray-200" />

                                <div className="flex justify-between text-lg font-bold">
                                    <span>Total</span>
                                    <span>${total.toFixed(2)}</span>
                                </div>
                            </div>

                            <button className="w-full bg-primary hover:bg-primary/85 text-white py-3 px-4 rounded-lg font-medium transition-colors mb-4">
                                Proceed to Checkout
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
            </div>
        </div>
    );
};

export default Index;