"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Package,
  Calendar,
  MapPin,
  Clock,
  Truck,
  CheckCircle2,
  Eye,
  CreditCard,
  Banknote,
  User,
  Phone,
  Loader2,
} from "lucide-react";
import { OrdersAPI } from "@/API/Orders/Orders";
import { Order } from "@/interface/orders/orders.type";
import Image from "next/image";
import showMessage from "@/app/_Components/Toast/Toast";

// ✅ helpers outside the component (better perf)
const getOrderStatus = (order: Order) => {
  if (order.isDelivered) return "delivered";
  if (order.isPaid) return "shipped";
  if (!order.isPaid && order.paymentMethodType === "cash") return "processing";
  return "cancelled";
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case "delivered":
      return <CheckCircle2 className="h-4 w-4" />;

    case "shipped":
      return <Truck className="h-4 w-4" />;

    case "processing":
      return <Clock className="h-4 w-4" />;

    default:
      return <Package className="h-4 w-4" />;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "delivered":
      return "success";
    case "shipped":
      return "default";
    case "processing":
      return "warning";
    default:
      return "secondary";
  }
};

const AllOrders = () => {
  const [selectedTab, setSelectedTab] = useState("all");
  const [orders, setOrders] = useState<Order[] | null>(null);
  const [loading, setLoading] = useState(true);

  const getUserOrders = useCallback(async () => {
    try {
      setLoading(true);
      const data = await OrdersAPI();
      setOrders(data);
    } catch (error) {
      console.log(error);
      showMessage("Failed to fetch orders", false);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getUserOrders();
  }, [getUserOrders]);

  const ordersWithStatus = useMemo(
    () => orders?.map((o) => ({ ...o, status: getOrderStatus(o) })) ?? [],
    [orders]
  );

  const filteredOrders = useMemo(
    () =>
      ordersWithStatus.filter((o) =>
        selectedTab === "all" ? true : o.status === selectedTab
      ),
    [ordersWithStatus, selectedTab]
  );

  const orderCounts = useMemo(
    () => ({
      all: ordersWithStatus.length,
      processing: ordersWithStatus.filter((o) => o.status === "processing")
        .length,
      shipped: ordersWithStatus.filter((o) => o.status === "shipped").length,
      delivered: ordersWithStatus.filter((o) => o.status === "delivered")
        .length,
    }),
    [ordersWithStatus]
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <Loader2 className="h-12 w-12 sm:h-16 sm:w-16 animate-spin text-indigo-600" />
      </div>
    );
  }

  if (!orders) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <div className="text-center p-6 sm:p-12 bg-white/70 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-xl border border-white/20">
          <div className="inline-flex items-center justify-center w-14 h-14 sm:w-20 sm:h-20 rounded-full bg-gray-100 mb-4 sm:mb-6">
            <Package className="h-6 w-6 sm:h-10 sm:w-10 text-gray-400" />
          </div>
          <h3 className="text-lg sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-4">
            No orders found
          </h3>
          <p className="text-gray-600 text-sm sm:text-lg">
            You don&apos;t have any {selectedTab === "all" ? "" : selectedTab}{" "}
            orders yet.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-12">
        {/* Header */}
        <div className="mb-6 sm:mb-12 text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 sm:w-20 sm:h-20 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 mb-3 sm:mb-6">
            <Package className="h-7 w-7 sm:h-10 sm:w-10 text-white" />
          </div>
          <h1 className="text-2xl sm:text-4xl lg:text-6xl font-bold mb-1 sm:mb-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
            My Orders
          </h1>
          <p className="text-gray-600 text-xs sm:text-lg max-w-xl mx-auto">
            Track your purchases, manage deliveries, and stay updated
          </p>
        </div>

        {/* Tabs */}
        <div className="mb-6 sm:mb-12">
          <div className="flex overflow-x-auto sm:flex-wrap justify-center  gap-2 sm:gap-4 p-1.5 sm:p-2 bg-white/70 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-md border border-white/20">
            {[
              { key: "all", label: "All", count: orderCounts.all },
              {
                key: "processing",
                label: "Processing",
                count: orderCounts.processing,
              },
              {
                key: "delivered",
                label: "Delivered",
                count: orderCounts.delivered,
              },
              {
                key: "shipped",
                label: "Shipped",
                count: orderCounts.shipped,
              },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setSelectedTab(tab.key)}
                className={`px-3 sm:px-5 py-1.5 sm:py-2.5 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium flex items-center space-x-1.5 sm:space-x-2 transition-all duration-300 ${
                  selectedTab === tab.key
                    ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md"
                    : "text-gray-600 hover:text-indigo-600 hover:bg-white/50"
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`px-1.5 sm:px-2 py-0.5 text-[10px] sm:text-xs rounded-full ${
                    selectedTab === tab.key
                      ? "bg-white/20 text-white"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Orders */}
        <div className="space-y-5 sm:space-y-8">
          {filteredOrders.map((order) => (
            <div
              key={order._id}
              className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-md border border-white/20 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              {/* Order Header */}
              <div className="p-3 sm:p-6 border-b border-gray-100">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 sm:gap-6">
                  <div className="space-y-1.5 sm:space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-base sm:text-xl font-bold text-gray-900 truncate max-w-[200px]">
                        Order #{order.id}
                      </h3>
                      <span
                        className={`px-2 sm:px-4 py-0.5 sm:py-1.5 rounded-full text-[10px] sm:text-sm font-medium border ${getStatusColor(
                          order.status
                        )}`}
                      >
                        <span className="flex items-center gap-1 sm:gap-2">
                          {getStatusIcon(order.status)}
                          <span className="capitalize">{order.status}</span>
                        </span>
                      </span>
                    </div>

                    <div className="flex flex-col sm:flex-row flex-wrap gap-1 sm:gap-4 text-[11px] sm:text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
                        <span>
                          {new Date(order.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        {order.paymentMethodType === "card" ? (
                          <CreditCard className="h-3 w-3 sm:h-4 sm:w-4" />
                        ) : (
                          <Banknote className="h-3 w-3 sm:h-4 sm:w-4" />
                        )}
                        <span className="capitalize">
                          {order.paymentMethodType}
                        </span>
                      </div>
                      <div className="hidden sm:flex items-center gap-1">
                        <User className="h-3 w-3 sm:h-4 sm:w-4" />
                        <span>{order.user.name}</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-lg sm:text-2xl font-bold text-indigo-600">
                      ${order.totalOrderPrice.toFixed(2)}
                    </div>
                    <div className="hidden sm:block text-xs text-gray-500">
                      Tax: ${order.taxPrice.toFixed(2)} | Ship: $
                      {order.shippingPrice.toFixed(2)}
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="p-3 sm:p-6 border-b border-gray-100">
                <h4 className="text-sm sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-5">
                  Items
                </h4>
                <div className="space-y-2 sm:space-y-4">
                  {order.cartItems.map((item) => (
                    <div
                      key={item._id}
                      className="flex gap-3 sm:gap-6 items-start sm:items-center p-2 sm:p-4 bg-gray-50 rounded-lg sm:rounded-xl"
                    >
                      <Image
                        src={item.product.imageCover}
                        alt={item.product.title}
                        width={100}
                        height={100}
                        className="w-20 h-20 sm:w-25 sm:h-25 object-cover rounded-lg"
                        loading="lazy"
                      />
                      <div className="flex-1">
                        <h5 className="font-semibold text-sm sm:text-base text-gray-900 truncate max-w-[160px]">
                          {item.product.title}
                        </h5>
                        <p className="text-xs sm:text-sm text-gray-600">
                          Quantity: {item.count}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-sm sm:text-lg font-bold text-indigo-600">
                          ${item.price}
                        </div>
                        <div className="hidden sm:block text-xs text-gray-500">
                          each
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Shipping & Actions */}
              <div className="p-3 sm:p-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 sm:gap-6">
                  <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-gray-600">
                    <h4 className="text-sm sm:text-lg font-semibold text-gray-900">
                      Shipping Info
                    </h4>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3 sm:h-4 sm:w-4" />
                      <span>
                        {order.shippingAddress.details},{" "}
                        {order.shippingAddress.city}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Phone className="h-3 w-3 sm:h-4 sm:w-4" />
                      <span>{order.shippingAddress.phone}</span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                    {order.status !== "cancelled" && (
                      <button className="w-full sm:w-auto px-3 sm:px-6 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg text-sm sm:text-base font-medium flex items-center justify-center gap-2">
                        <Eye className="h-4 w-4" />
                        Track
                      </button>
                    )}
                    <button className="w-full sm:w-auto px-3 sm:px-6 py-2 border border-gray-200 text-gray-700 rounded-lg text-sm sm:text-base hover:bg-gray-50">
                      Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllOrders;
