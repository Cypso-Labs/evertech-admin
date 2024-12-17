"use client";
import React from "react";
import { useGetAllOrdersQuery } from "@/app/redux/features/orderApiSlice";
import { useGetAllServicesQuery } from "@/app/redux/features/serviceApiSlice";
import { useGetAllCustomersQuery } from "@/app/redux/features/customerApiSlice";
import { useGetAllPaymentsQuery } from "@/app/redux/features/paymentApiSlice";
import orders from "@/assets/images/icon/order.svg";
import payments from "@/assets/images/icon/payment.svg";
import services from "@/assets/images/icon/service.svg";
import customers from "@/assets/images/icon/customer.svg";
import Image from "next/image";
import CountUp from "react-countup";

import { Payment } from "@/types";

const DataStatsOne: React.FC = () => {
  const { data: allOrders, isLoading: isLoadingOrders } =
    useGetAllOrdersQuery();
  const { data: allServices, isLoading: isLoadingServices } =
    useGetAllServicesQuery();
  const { data: allCustomers, isLoading: isLoadingCustomers } =
    useGetAllCustomersQuery();
  const { data: allPayments, isLoading: isLoadingPayments } =
    useGetAllPaymentsQuery();

  // Calculations
  const unpaidOrdersCount = isLoadingOrders
    ? 0
    : allOrders?.filter((order) => order.status === "Pending").length || 0;

  const completedOrdersCount = isLoadingOrders
    ? 0
    : allOrders?.filter((order) => order.status === "Complete").length || 0;
  const customersCount = isLoadingCustomers ? 0 : allCustomers?.length || 0;

  const allServicesCount = isLoadingServices ? 0 : allServices?.length || 0;

  const paidPayments = isLoadingPayments
    ? []
    : allPayments?.filter((payment) => payment.status === "Paid") || [];

  const paidPaymentsCount = paidPayments.length;
  const paidPaymentsTotal = paidPayments.reduce(
    (total: number, payment: Payment) => total + parseFloat(payment.amount),
    0,
  );

  const dataStatsList = [
    {
      icon: (
        <div style={{ filter: "brightness(0) saturate(100%) invert(0%)" }}>
          <Image src={orders} alt="Orders Icon" width={26} height={26} />
        </div>
      ),
      color: "#D93132",
      title: "Pending Orders",
      value: unpaidOrdersCount.toLocaleString(),
      growthRate: 0.43,
    },
    {
      icon: (
        <div style={{ filter: "brightness(0) saturate(100%) invert(0%)" }}>
          <Image src={orders} alt="Orders Icon" width={26} height={26} />
        </div>
      ),
      color: "#3FD97F",
      title: "Completed Orders",
      value: completedOrdersCount.toLocaleString(),
      growthRate: 0.43,

    },
    {
      icon: (
        <div style={{ filter: "brightness(0) saturate(100%) invert(0%)" }}>
          <Image src={payments} alt="Payments Icon" width={26} height={26} />
        </div>
      ),
      color: "#FF9C55",
      title: "Total Payment",
      value: paidPaymentsTotal.toLocaleString(),
      growthRate: 4.35,
    },
    {
      icon: (
        <div style={{ filter: "brightness(0) saturate(100%) invert(0%)" }}>
          <Image src={services} alt="Services Icon" width={26} height={26} />
        </div>
      ),
      color: "#8155FF",
      title: "Total Services",
      value: allServicesCount.toLocaleString(),
      growthRate: 2.59,
    },
    {
      icon: (
        <div style={{ filter: "brightness(0) saturate(100%) invert(0%)" }}>
          <Image src={customers} alt="Customers Icon" width={26} height={26} />
        </div>
      ),
      color: "#18BFFF",
      title: "Total Customers",
      value: customersCount.toLocaleString(),
      growthRate: -0.95,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:gap-8">
      {dataStatsList.map((item, index) => (
        <div
          key={index}
          className="relative rounded-xl bg-white p-6 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl dark:bg-gray-800"
        >
          {/* Icon Section */}
          <div
            className="flex h-16 w-16 items-center justify-center rounded-full"
            style={{ backgroundColor: item.color }}
          >
            {item.icon}
          </div>

          {/* Content Section */}
          <div className="mt-6 flex items-end justify-between">
            <div>
              <h4 className="mb-2 text-2xl font-bold text-gray-900 dark:text-gray-100">
                <CountUp
                  end={Number(item.value.replace(/[^0-9.-]+/g, ""))}
                  duration={1.5}
                  separator=","
                  prefix={item.title === "Total Payment" ? "Rs." : ""}
                />
              </h4>
              <span className="text-gray-600 dark:text-gray-400">
                {item.title}
              </span>
            </div>

            {/* Growth Rate */}
            <span
              className={`flex items-center gap-2 text-sm font-semibold ${
                item.growthRate > 0 ? "text-green-500" : "text-red-500"
              }`}
            >
              {item.growthRate}%
              {item.growthRate > 0 ? (
                <svg
                  className="fill-current"
                  width="12"
                  height="12"
                  viewBox="0 0 10 10"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M4.35716 2.3925L0.908974 5.745L0 4.86125L5 0L10 4.86125L9.09103 5.745L5.64284 2.3925V10H4.35716V2.3925Z" />
                </svg>
              ) : (
                <svg
                  className="fill-current"
                  width="12"
                  height="12"
                  viewBox="0 0 10 10"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M5.64284 7.6075L9.09102 4.255L10 5.13875L5 10L0 5.13875L0.908973 4.255L4.35716 7.6075V0H5.64284V7.6075Z" />
                </svg>
              )}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DataStatsOne;
