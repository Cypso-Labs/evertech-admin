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

const MonthlyComparisonCharts = () => {
  interface ChartCardProps {
    title: string;
    data: any;
  }

  const { data: customers } = useGetAllCustomersQuery();
  const { data: payments } = useGetAllPaymentsQuery();
  const { data: orders } = useGetAllOrdersQuery();

  const processedData = useMemo(() => {
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

    return {
      customersData: [
        {
          name: "Customers",
          "Last Month": lastMonthCustomers,
          "This Month": currentMonthCustomers,
        },
      ],
      ordersData: [
        {
          name: "Orders",
          "Last Month": lastMonthOrders,
          "This Month": currentMonthOrders,
        },
      ],
      paymentsData: [
        {
          name: "Payments",
          "Last Month": lastMonthPayments,
          "This Month": currentMonthPayments,
        },
      ],
    };
  }, [customers, orders, payments]);

  const ChartCard = ({ title, data }: ChartCardProps) => (
    <div className="transform rounded-xl bg-white p-6 shadow-lg transition-all duration-300 hover:shadow-xl dark:bg-[#122031] dark:shadow-2xl dark:hover:shadow-blue-900/20">
      <h3 className="mb-4 text-xl font-bold text-gray-800 dark:text-gray-100">
        {title}
      </h3>
      <div className="h-[250px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#3f3f3f"
              opacity={0.1}
            />
            <XAxis
              dataKey="name"
              stroke="#6b7280"
              fontSize={12}
              tickLine={false}
            />
            <YAxis
              stroke="#6b7280"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(255, 255, 255, 0.95)",
                border: "none",
                borderRadius: "8px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              }}
            />
            <Legend
              wrapperStyle={{
                paddingTop: "20px",
              }}
            />
            <Bar dataKey="Last Month" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
            <Bar dataKey="This Month" fill="#10b981" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  return (
    <div className="mx-auto max-w-[1920px] p-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        <ChartCard
          title="Monthly Customer Comparison"
          data={processedData.customersData}
        />
        <ChartCard
          title="Monthly Orders Comparison"
          data={processedData.ordersData}
        />
        <ChartCard
          title="Monthly Payments Comparison (Rs.)"
          data={processedData.paymentsData}
        />
      </div>
    </div>
  );
};

export default MonthlyComparisonCharts;
