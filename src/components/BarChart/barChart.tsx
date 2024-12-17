import React, { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useGetAllCustomersQuery } from "@/app/redux/features/customerApiSlice";
import { useGetAllPaymentsQuery } from "@/app/redux/features/paymentApiSlice";
import { useGetAllOrdersQuery } from "@/app/redux/features/orderApiSlice";

const MonthlyComparisonChart = () => {
  // Fetch data from RTK Query hooks
  const { data: customers } = useGetAllCustomersQuery();
  const { data: payments } = useGetAllPaymentsQuery();
  const { data: orders } = useGetAllOrdersQuery();

  const chartData = useMemo(() => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;

    const currentMonthCustomers =
      customers?.filter(
        (customer) =>
          customer.createdAt &&
          new Date(customer.createdAt).getMonth() === currentMonth,
      ).length || 0;

    const lastMonthCustomers =
      customers?.filter(
        (customer) =>
          customer.createdAt &&
          new Date(customer.createdAt).getMonth() === lastMonth,
      ).length || 0;

    const currentMonthOrders =
      orders?.filter(
        (order) =>
          order.createdAt &&
          new Date(order.createdAt).getMonth() === currentMonth,
      ).length || 0;

    const lastMonthOrders =
      orders?.filter(
        (order) =>
          order.createdAt && new Date(order.createdAt).getMonth() === lastMonth,
      ).length || 0;

    const currentMonthPayments =
      payments?.reduce(
        (total: number, payment) =>
          new Date(payment.payment_date).getMonth() === currentMonth
            ? total + parseFloat(payment.amount)
            : total,
        0,
      ) || 0;

    const lastMonthPayments =
      payments?.reduce(
        (total: number, payment) =>
          new Date(payment.payment_date).getMonth() === lastMonth
            ? total + parseFloat(payment.amount)
            : total,
        0,
      ) || 0;

    return [
      {
        name: "Customers",
        "Last Month": lastMonthCustomers,
        "This Month": currentMonthCustomers,
      },
      {
        name: "Orders",
        "Last Month": lastMonthOrders,
        "This Month": currentMonthOrders,
      },
      {
        name: "Payments (Rs.)",
        "Last Month": lastMonthPayments,
        "This Month": currentMonthPayments,
      },
    ];
  }, [customers, orders, payments]);

  return (
    <div className="h-[400px] w-full rounded-lg bg-white p-4 shadow-md dark:bg-[#122031]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#3f3f3f" />
          <XAxis dataKey="name" stroke="#6b7280" />
          <YAxis stroke="#6b7280" />
          <Tooltip />
          <Legend />
          <Bar dataKey="Last Month" fill="#8884d8" />
          <Bar dataKey="This Month" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MonthlyComparisonChart;
