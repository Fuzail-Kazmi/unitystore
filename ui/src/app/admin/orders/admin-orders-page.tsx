"use client";
import React, { useState, useEffect } from "react";
import {
  Package,
  Truck,
  Calendar,
  ChevronDown,
  ChevronRight,
  Clock,
  CheckCircle,
  XCircle,
  Boxes,
} from "lucide-react";
import { useAdminOrders, useOrderAction } from "@/api/admin-orders";
import { useRouter } from "next/navigation";

interface OrderItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

interface Order {
  id: string;
  orderNumber: string;
  date: string;
  status: string;
  total: number;
  items: OrderItem[];
  itemCount: number;
}

export const AdminOrdersPage: React.FC = () => {
  const router = useRouter();
  const [expandedOrders, setExpandedOrders] = useState<string[]>([]);
  const [statusFilter, setStatusFilter] = useState("all");

  const { data: rawOrders = [], isError, isLoading } = useAdminOrders();
  const { mutate: orderAction, isPending } = useOrderAction();

  console.log("Raw Orders:", rawOrders);

  const orders: Order[] = rawOrders.map((o: any) => ({
    id: o.id,
    orderNumber: o.order_id,
    date: o.order_date,
    status: o.status,
    total: parseFloat(o.total_amount),
    itemCount: parseInt(o.total_qty),
    items:
      o.items?.map((i: any) => ({
        id: i.id,
        productId: i.product?.id,
        name: i.product?.product_name,
        price: parseFloat(i.price),
        quantity: parseInt(i.quantity),
        image: i.product?.cover_image || undefined,
      })) || [],
  }));

  useEffect(() => {
    if (orders.length > 0 && expandedOrders.length === 0) {
      setExpandedOrders(orders.map((o) => o.id));
    }
  }, [orders, expandedOrders]);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return "bg-green-100 text-green-800 border-green-200";
      case "shipped":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "canceled":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return <CheckCircle className="w-4 h-4" />;
      case "shipped":
        return <Truck className="w-4 h-4" />;
      case "pending":
        return <Clock className="w-4 h-4" />;
      case "canceled":
        return <XCircle className="w-4 h-4" />;
      default:
        return <Package className="w-4 h-4" />;
    }
  };

  const toggleOrderExpansion = (orderId: string) => {
    setExpandedOrders((prev) =>
      prev.includes(orderId)
        ? prev.filter((id) => id !== orderId)
        : [...prev, orderId]
    );
  };

  if (isLoading) {
    return (
      <main className="flex items-center justify-center">
        <p className="text-gray-600">Loading orders...</p>
      </main>
    );
  }

  if (isError) {
    return (
      <main className="flex items-center justify-center">
        <p className="text-red-600">Failed to load orders. Please try again.</p>
      </main>
    );
  }

  return (
    <main className="bg-gray-50 max-h-[89.5vh] h-[89.5vh]">
      <div className="max-w-6xl mx-auto p-4 sm:p-6">
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900">Admin Orders</h2>
          <p className="text-gray-600 text-sm">
            Manage and update customer orders
          </p>
        </div>

        <div className="space-y-6">
          {orders.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Boxes className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No orders found
              </h3>
            </div>
          ) : (
            orders.map((order: Order) => (
              <div
                key={order.id}
                className="bg-white rounded-xl md:rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
              >
                <div className="p-4 sm:p-6 border-b border-gray-100">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-2 sm:gap-4">
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
                        <h3 className="text-sm sm:text-base font-semibold text-gray-900">
                          Order #{order.orderNumber || order.id}
                        </h3>
                        <div
                          className={`inline-flex items-center px-2 py-1 rounded-full border text-xs sm:text-sm font-medium w-min ${getStatusColor(
                            order.status
                          )}`}
                        >
                          {getStatusIcon(order.status)}
                          <span className="ml-1 capitalize">{order.status}</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {new Date(order.date).toLocaleDateString("en-PK", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </div>

                        <div className="flex items-center">
                          <Package className="w-4 h-4 mr-1" />
                          {order.itemCount} item
                          {order.itemCount !== 1 ? "s" : ""}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="text-right">
                        <div className="text-base sm:text-lg font-bold text-gray-900">
                          Rs.{order.total.toFixed(2)}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => toggleOrderExpansion(order.id)}
                          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          {expandedOrders.includes(order.id) ? (
                            <ChevronDown className="w-5 h-5 text-gray-600 cursor-pointer" />
                          ) : (
                            <ChevronRight className="w-5 h-5 text-gray-600 cursor-pointer" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {expandedOrders.includes(order.id) && (
                  <div className="p-4 bg-gray-50">
                    <div className="mb-6">
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">
                        Order Items
                      </h4>
                      <div className="space-y-4">
                        {order.items.map((item: OrderItem) => (
                          <div
                            key={item.id}
                            className="flex flex-col sm:flex-row items-center py-2 sm:py-4 sm:px-4 bg-white rounded-xl"
                          >
                            <div className="w-45 h-45 sm:w-16 sm:h-16 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                              {item.image ? (
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <Package className="w-8 h-8 text-gray-400 m-auto" />
                              )}
                            </div>

                            <div className="flex-1 w-full mt-4 sm:mt-0 sm:ml-4 flex flex-col sm:flex-row sm:items-center sm:justify-between">
                              <div className="flex-1 ml-4 sm:bg-transparent">
                                <h5 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">
                                  {item.name}
                                </h5>
                                <div className="flex items-center text-sm text-gray-600 space-x-4">
                                  <span>Qty: {item.quantity}</span>
                                </div>
                              </div>

                              <div className="text-right">
                                <div className="font-bold text-gray-900">
                                  Rs.{(item.price * item.quantity).toFixed(2)}
                                </div>
                                <div className="text-sm text-gray-600">
                                  Rs.{item.price.toFixed(2)} each
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* <div className="mt-4 flex flex-col sm:flex-row justify-end gap-2">
                        <button
                          className="bg-black text-white cursor-pointer px-4 py-2 text-xs rounded-lg text-center hover:bg-gray-800"
                          onClick={() => router.push(`orders/${order.id}`)}
                        >
                          View
                        </button>
                        <button
                          disabled={isPending || order.status.toLowerCase() !== "pending"}
                          onClick={() => orderAction({ orderId: order.id, action: "accept" })}
                          className="bg-green-600 text-white cursor-pointer px-4 py-2 text-xs rounded-lg hover:bg-green-700 disabled:opacity-50"
                        >
                          Accept
                        </button>
                        <button
                          disabled={isPending || order.status.toLowerCase() !== "pending"}
                          onClick={() => orderAction({ orderId: order.id, action: "reject" })}
                          className="border border-red-600 text-red-600 cursor-pointer px-4 py-2 text-xs rounded-lg hover:bg-red-100 disabled:opacity-50"
                        >
                          Reject
                        </button>
                      </div> */}
                      <div className="mt-4 flex flex-col sm:flex-row justify-end gap-2">
                        <button
                          className="bg-black text-white cursor-pointer px-4 py-2 text-xs rounded-lg text-center hover:bg-gray-800"
                          onClick={() => router.push(`orders/${order.id}`)}
                        >
                          View
                        </button>

                        <button
                          disabled={isPending || order.status.toLowerCase() !== "pending"}
                          onClick={() => {
                            if (window.confirm("Are you sure you want to accept this order?")) {
                              orderAction({ orderId: order.id, action: "accept" });
                            }
                          }}
                          className="bg-green-600 text-white cursor-pointer px-4 py-2 text-xs rounded-lg hover:bg-green-700 disabled:opacity-50"
                        >
                          Accept
                        </button>

                        <button
                          disabled={isPending || order.status.toLowerCase() !== "pending"}
                          onClick={() => {
                            if (window.confirm("Are you sure you want to cancel this order?")) {
                              orderAction({ orderId: order.id, action: "reject" });
                            }
                          }}
                          className="border border-red-600 text-red-600 cursor-pointer px-4 py-2 text-xs rounded-lg hover:bg-red-100 disabled:opacity-50"
                        >
                          Reject
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
};
