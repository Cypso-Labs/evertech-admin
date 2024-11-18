"use client";
import React, { useEffect } from "react";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmployees } from "../../app/redux/features/employeeApi";
import { fetchRoles } from "../../app/redux/slices/roleSlice";
import { AppDispatch, RootState } from "../../app/redux/store/store";
import { fetchOrders, OrderStatus } from "@/app/redux/slices/orderSlice";

const Table = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { entities: employees, loading: employeeLoading } = useSelector(
    (state: RootState) => state.employees,
  );
  const { roles, loading: roleLoading } = useSelector(
    (state: RootState) => state.roles,
  );
  const {
    orders,
    loading: orderLoading,
    error,
  } = useSelector((state: RootState) => state.orders);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all([
          dispatch(fetchEmployees()).unwrap(),
          dispatch(fetchRoles()).unwrap(),
          dispatch(fetchOrders()).unwrap(),
        ]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [dispatch]);

  const getStatusColor = (status: OrderStatus): string => {
    switch (status) {
      case "placed":
        return "border border-[#B48701] text-[#B48701] px-3 py-1";
      case "cancelled":
        return "border border-[#FF0404] text-[#FF0404] px-2 py-1";
      case "processing":
        return "border border-[#FF6A00] text-[#FF6A00] px-2 py-1";
      case "processed":
        return "border border-[#3F9C50] text-[#3F9C50] px-2 py-1";
      case "delivered":
        return "border border-[#002BFF] text-[#002BFF] px-3 py-1";
    }
  };

  const getRoleName = (roleId: string) => {
    const role = roles.find((role) => role._id === roleId);
    return role ? role.name : "Unknown Role";
  };

  const displayedEmployees = employees.slice(0, 5);
  const displayedOrders = [...orders].reverse().slice(0, 5);

  if (
    orderLoading === "pending" ||
    employeeLoading === "pending" ||
    roleLoading === "pending"
  ) {
    return (
      <div className="flex h-96 items-center justify-center">
        <p className="text-lg text-gray-600 dark:text-gray-300">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-96 items-center justify-center">
        <p className="text-lg text-red-500">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {/* Orders Table */}
      <div className="rounded-lg bg-white p-6 shadow-lg dark:bg-[#122031]">
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-medium text-gray-700 dark:text-white">
              Latest Orders
            </h2>
            <a
              href="/orders"
              className="flex items-center gap-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              View all
              <MdKeyboardDoubleArrowRight className="h-5 w-5" />
            </a>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="border-b border-t border-gray-200 dark:border-gray-700">
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 dark:text-gray-300">
                  NO
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 dark:text-gray-300">
                  Price
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 dark:text-gray-300">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {displayedOrders.map((order) => (
                <tr
                  key={order._id}
                  className="group hover:bg-gray-50 dark:hover:bg-gray-800/50"
                >
                  <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                    {order.order_id}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                    {order.unit_price}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-sm">
                    <span
                      className={`inline-flex rounded-md ${getStatusColor(order.status)}`}
                    >
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Employees Table */}
      <div className="rounded-lg bg-white p-6 shadow-lg dark:bg-[#122031]">
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-medium text-gray-700 dark:text-white">
              Employees
            </h2>
            <a
              href="/employees"
              className="flex items-center gap-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              View all
              <MdKeyboardDoubleArrowRight className="h-5 w-5" />
            </a>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="border-b border-t border-gray-200 dark:border-gray-700">
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 dark:text-gray-300">
                  ID
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 dark:text-gray-300">
                  Name
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 dark:text-gray-300">
                  Role
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {displayedEmployees.map((employee) => (
                <tr
                  key={employee._id}
                  className="group hover:bg-gray-50 dark:hover:bg-gray-800/50"
                >
                  <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                    {employee._id.slice(-5)}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                    {employee.name}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                    {getRoleName(employee.role)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Table;
