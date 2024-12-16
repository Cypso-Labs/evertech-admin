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
      color: "#3FD97F",
      title: "Pending Orders",
      value: unpaidOrdersCount.toLocaleString(),
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
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
      {dataStatsList.map((item, index) => (
        <div
          key={index}
          className="rounded-[10px] bg-white p-6 shadow-lg dark:bg-gray-dark"
        >
          <div
            className="flex h-14.5 w-14.5 items-center justify-center rounded-full"
            style={{ backgroundColor: item.color }}
          >
            {item.icon}
          </div>

          <div className="mt-6 flex items-end justify-between">
            <div>
              <h4 className="mb-1.5 text-heading-6 font-bold text-dark dark:text-white">
                <CountUp
                  end={Number(item.value.replace(/[^0-9.-]+/g, ""))}
                  duration={1.5}
                  separator=","
                  prefix={item.title === "Total Payment" ? "Rs." : ""}
                />
              </h4>
              <span className="text-body-sm font-medium">{item.title}</span>
            </div>

            <span
              className={`flex items-center gap-1.5 text-body-sm font-medium ${
                item.growthRate > 0 ? "text-green" : "text-red"
              }`}
            >
              {item.growthRate}%
              {item.growthRate > 0 ? (
                <svg
                  className="fill-current"
                  width="10"
                  height="10"
                  viewBox="0 0 10 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4.35716 2.3925L0.908974 5.745L5.0443e-07 4.86125L5 -5.1656e-07L10 4.86125L9.09103 5.745L5.64284 2.3925L5.64284 10L4.35716 10L4.35716 2.3925Z"
                    fill=""
                  />
                </svg>
              ) : (
                <svg
                  className="fill-current"
                  width="10"
                  height="10"
                  viewBox="0 0 10 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5.64284 7.6075L9.09102 4.255L10 5.13875L5 10L-8.98488e-07 5.13875L0.908973 4.255L4.35716 7.6075L4.35716 7.6183e-07L5.64284 9.86625e-07L5.64284 7.6075Z"
                    fill=""
                  />
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
