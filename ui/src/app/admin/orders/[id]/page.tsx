"use client";
import { ChevronLeft } from "lucide-react";
import React from "react";
import { useParams, useRouter } from "next/navigation";
import { useAdminOrderDetail, useOrderAction } from "@/api/admin-orders";
import toast from "react-hot-toast";

const AdminOrderDetail = () => {
  const router = useRouter();
  const params = useParams();
  const orderId = params?.id as string;

  const { data: order, isLoading, isError } = useAdminOrderDetail(orderId);

  const { mutate: orderAction, isPending } = useOrderAction();

  console.log(order);

  const handleMarkDelivered = () => {
    if (window.confirm("Are you sure your order has been delivered?")) {
      orderAction(
        { orderId, action: "delivered" },
        {
          onSuccess: () => {
            toast.success("Order status marked as delivered!");
          },
          onError: (err: any) => {
            console.error("Order update error:", err.response?.data || err);
            toast.error("Failed to update order status!");
          },
        }
      );
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <p className="text-gray-600">Loading order details...</p>
      </div>
    );
  }

  if (isError || !order) {
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <p className="text-red-600">Failed to load order. Please try again.</p>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-800 cursor-pointer text-sm mb-6"
      >
        <ChevronLeft className="w-4 h-4" />
        Back to Orders
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-white rounded-2xl shadow p-4 flex flex-col gap-2">
          <h2 className="font-semibold mb-3 text-gray-800">
            Order #{order.order_id}
          </h2>

          <p className="flex items-center gap-2">
            Status:{" "}
            <span
              className={`px-2 py-1 rounded text-xs font-medium ${order.status === "canceled"
                ? "bg-red-100 text-red-600"
                : order.status === "shipped"
                  ? "bg-blue-100 text-blue-600"
                  : order.status === "delivered"
                    ? "bg-green-100 text-green-600"
                    : "bg-gray-100 text-gray-600"
                }`}
            >
              {order.status}
            </span>

            {order.status === "shipped" && (
              <button
                disabled={isPending}
                onClick={handleMarkDelivered}
                className="ml-3 px-3 py-1 rounded bg-green-600 text-white text-xs hover:bg-green-700 cursor-pointer disabled:opacity-50"
              >
                Mark as Delivered
              </button>
            )}
          </p>

          <p className="text-sm">
            Order Date:{" "}
            <span className="font-medium">
              {new Date(order.order_date).toLocaleDateString()}
            </span>
          </p>
          <p className="text-sm">
            Total Qty: <span className="font-medium">{order.total_qty}</span>
          </p>
          <p className="text-sm">
            Total Amount:{" "}
            <span className="font-medium">Rs.{order.total_amount}</span>
          </p>

          {order.status === "canceled" && (
            <p className="mt-2 text-sm text-red-600">
              <span className="font-semibold">Cancel Reason:</span>{" "}
              {order.cancel_reason || "Not specified"}
            </p>
          )}
        </div>

        <div className="bg-white rounded-2xl shadow p-4 flex gap-4 items-center">
          <img
            src={order.customer.profile_picture}
            alt={order.customer.full_name}
            className="w-16 h-16 rounded-full border border-gray-200 bg-gray-50 object-cover"
          />
          <div>
            <h3 className="font-semibold">{order.customer.full_name}</h3>
            <p className="text-sm text-gray-600">{order.customer.email}</p>
            <p className="text-sm text-gray-600">
              {order.customer.phone_number || "No phone"}
            </p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 mb-6 bg-white rounded-2xl shadow p-4">
        <h2 className="font-semibold mb-3 text-gray-800">Shipping Address</h2>

        {order.delivery_address_snapshot ? (
          <>
            <p className="text-sm font-medium">
              {order.delivery_address_snapshot?.title}
            </p>
            <p className="text-sm">
              {order.delivery_address_snapshot?.address_line_1}
            </p>
            <p className="text-sm">
              {order.delivery_address_snapshot?.address_line_2}
            </p>
            <p className="text-sm">
              {order.delivery_address_snapshot?.city},{" "}
              {order.delivery_address_snapshot?.state},{" "}
              {order.delivery_address_snapshot?.country} -{" "}
              {order.delivery_address_snapshot?.postal_code}
            </p>
            <p className="text-sm">
              📧 {order.delivery_address_snapshot?.email}
            </p>
            <p className="text-sm">
              📞 {order.delivery_address_snapshot?.phone_number}
            </p>
          </>
        ) : (
          <>
            <p className="text-sm font-medium">{order.delivery_address?.title}</p>
            <p className="text-sm">{order.delivery_address?.address_line_1}</p>
            <p className="text-sm">{order.delivery_address?.address_line_2}</p>
            <p className="text-sm">
              {order.delivery_address?.city}, {order.delivery_address?.state},{" "}
              {order.delivery_address?.country} - {order.delivery_address?.postal_code}
            </p>
            <p className="text-sm">📧 {order.delivery_address?.email}</p>
            <p className="text-sm">📞 {order.delivery_address?.phone_number}</p>
          </>
        )}
      </div>
      <div className="bg-white rounded-2xl shadow p-4 overflow-x-auto">
        <h2 className="font-semibold mb-3">Ordered Items</h2>
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="text-left border-b border-gray-300">
              <th className="py-2 px-2">Product</th>
              <th className="py-2 px-2">Category</th>
              <th className="py-2 px-2">Brand</th>
              <th className="py-2 px-2">Qty</th>
              <th className="py-2 px-2">Unit Price</th>
              <th className="py-2 px-2">Subtotal</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {order.items.map((item: any) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-2 py-4 flex items-center gap-3 max-w-[250px]">
                  <img
                    src={item.product?.cover_image}
                    alt={item.product?.product_name}
                    className="w-16 h-16 rounded-md object-cover flex-shrink-0"
                  />
                  <span className="font-medium text-gray-800 truncate">
                    {item.product?.product_name}
                  </span>
                </td>
                <td className="px-2 py-4">{item.product?.category?.name}</td>
                <td className="px-2 py-4">{item.product?.brand?.name}</td>
                <td className="px-2 py-4">{item.quantity}</td>
                <td className="px-2 py-4">Rs.{Number(item.price).toLocaleString()}</td>
                <td className="px-2 py-4">Rs.{Number(item.subtotal).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="border-t border-gray-300">
              <td colSpan={5} className="text-right font-medium py-4 pr-4">
                Total
              </td>
              <td className="font-bold text-gray-900">
                Rs.{order.total_amount.toLocaleString()}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default AdminOrderDetail;
