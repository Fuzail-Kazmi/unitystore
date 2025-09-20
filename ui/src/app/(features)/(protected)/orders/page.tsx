"use client";
import React, { useState } from "react";
import {
  Package,
  Truck,
  Calendar,
  Search,
  Eye,
  Download,
  RotateCcw,
  Star,
  ChevronDown,
  ChevronRight,
  Clock,
  CheckCircle,
  XCircle,
  MoreHorizontal,
  ShoppingBag,
} from "lucide-react";
import Link from "next/link";
import { useOrders } from "@/api/orders";

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  size?: string;
  color?: string;
}

interface Order {
  id: string;
  orderNumber: string;
  date: string;
  status: string;
  total: number;
  items: OrderItem[];
  itemCount: number;
  trackingNumber?: string;
  estimatedDelivery?: string;
  deliveredDate?: string;
}

const OrdersPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [expandedOrders, setExpandedOrders] = useState<string[]>([]);
  // const [orderAction, setOrderAction] = useState(!true);
  const [sortBy, setSortBy] = useState("newest");

  const { data: rawOrders = [], isError, isLoading } = useOrders();

  const orders: Order[] = rawOrders.map((o: any) => ({
    id: o.id,
    orderNumber: o.order_id,
    date: o.order_date,
    status: o.status,
    total: parseFloat(o.total_amount),
    itemCount: parseInt(o.total_qty),
    trackingNumber: o.tracking_number || null,
    items: o.items?.map((i: any) => ({
      id: i.id,
      name: i.product?.product_name,
      price: parseFloat(i.price),
      quantity: parseInt(i.quantity),
      image: i.product?.cover_image
        ? `${process.env.NEXT_PUBLIC_DJANGO_API_URL}${i.product.cover_image}`
        : undefined,
      size: i.size || undefined,
      color: i.color || undefined,
    })) || [],
  }));


  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-800 border-green-200";
      case "shipped":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "processing":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200";
      case "returned":
        return "bg-gray-100 text-gray-800 border-gray-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "delivered":
        return <CheckCircle className="w-4 h-4" />;
      case "shipped":
        return <Truck className="w-4 h-4" />;
      case "processing":
        return <Clock className="w-4 h-4" />;
      case "cancelled":
        return <XCircle className="w-4 h-4" />;
      case "returned":
        return <RotateCcw className="w-4 h-4" />;
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




  const filteredOrders = orders
    .filter((order: Order) => {
      const matchesSearch =
        (order.orderNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ??
          false) ||
        order.items?.some((item) =>
          item.name?.toLowerCase().includes(searchTerm.toLowerCase())
        );

      const matchesStatus =
        statusFilter === "all" || order.status === statusFilter;

      let matchesDate = true;
      if (dateFilter !== "all") {
        const orderDate = new Date(order.date).getTime();
        const now = new Date().getTime();
        if (dateFilter === "30days") {
          matchesDate = orderDate >= now - 30 * 24 * 60 * 60 * 1000;
        } else if (dateFilter === "90days") {
          matchesDate = orderDate >= now - 90 * 24 * 60 * 60 * 1000;
        } else if (dateFilter === "year") {
          matchesDate =
            new Date(order.date).getFullYear() === new Date().getFullYear();
        }
      }

      return matchesSearch && matchesStatus && matchesDate;
    })
    .sort((a: Order, b: Order) => {
      if (sortBy === "newest") {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
      if (sortBy === "oldest") {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      }
      if (sortBy === "amount-high") {
        return b.total - a.total;
      }
      if (sortBy === "amount-low") {
        return a.total - b.total;
      }
      return 0;
    });

  if (isLoading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Loading orders...</p>
      </main>
    );
  }

  if (isError) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-red-600">Failed to load orders. Please try again.</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Order History
          </h1>
          <p className="text-gray-600">
            Track and manage all your orders in one place
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search orders, products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm"
              />
            </div>

            <div className="flex flex-wrap gap-3">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all min-w-[140px] text-sm"
              >
                <option value="all">All Status</option>
                <option value="delivered">Delivered</option>
                <option value="shipped">Shipped</option>
                <option value="processing">Processing</option>
                <option value="cancelled">Cancelled</option>
                <option value="returned">Returned</option>
              </select>

              <select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all min-w-[140px] text-sm"
              >
                <option value="all">All Time</option>
                <option value="30days">Last 30 Days</option>
                <option value="90days">Last 3 Months</option>
                <option value="year">This Year</option>
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all min-w-[140px] text-sm"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="amount-high">Highest Amount</option>
                <option value="amount-low">Lowest Amount</option>
              </select>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {filteredOrders.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Package className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No orders found
              </h3>
              <p className="text-gray-600 mb-6">
                {searchTerm || statusFilter !== "all"
                  ? "Try adjusting your search or filter criteria"
                  : "You haven't placed any orders yet"}
              </p>
              <Link
                href="/products"
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-semibold"
              >
                <ShoppingBag className="w-5 h-5 mr-2" />
                Start Shopping
              </Link>
            </div>
          ) : (
            filteredOrders.map((order: Order) => (
              <div
                key={order.id}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
              >
                <div className="p-6 border-b border-gray-100">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">
                          Order #{order.orderNumber || order.id}
                        </h3>
                        <div
                          className={`inline-flex items-center px-3 py-1 rounded-full border text-sm font-medium ${getStatusColor(
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
                          {new Date(order.date).toLocaleDateString("en-US", {
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

                        {order.trackingNumber && (
                          <div className="flex items-center">
                            <Truck className="w-4 h-4 mr-1" />
                            {order.trackingNumber}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                      <div className="text-right">
                        <div className="text-2xl font-bold text-gray-900">
                          ${order.total.toFixed(2)}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => toggleOrderExpansion(order.id)}
                          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          {expandedOrders.includes(order.id) ? (
                            <ChevronDown className="w-5 h-5 text-gray-600" />
                          ) : (
                            <ChevronRight className="w-5 h-5 text-gray-600" />
                          )}
                        </button>

                        <div className="relative">
                          <button
                              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                          >
                            <MoreHorizontal className="w-5 h-5 text-gray-600" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {expandedOrders.includes(order.id) && (
                  <div className="p-6 bg-gray-50">
                    <div className="mb-6">
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">
                        Order Items
                      </h4>
                      <div className="space-y-4">
                        {order.items.map((item: OrderItem) => (
                          <div
                            key={item.id}
                            className="flex items-center p-4 bg-white rounded-xl"
                          >
                            <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
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

                            <div className="flex-1 ml-4">
                              <h5 className="font-semibold text-gray-900 mb-1">
                                {item.name}
                              </h5>
                              <div className="flex items-center text-sm text-gray-600 space-x-4">
                                {item.color && <span>Color: {item.color}</span>}
                                {item.size && <span>Size: {item.size}</span>}
                                <span>Qty: {item.quantity}</span>
                              </div>
                            </div>

                            <div className="text-right">
                              <div className="font-bold text-gray-900">
                                ${(item.price * item.quantity).toFixed(2)}
                              </div>
                              <div className="text-sm text-gray-600">
                                ${item.price.toFixed(2)} each
                              </div>
                            </div>
                          </div>
                        ))}
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

export default OrdersPage;
