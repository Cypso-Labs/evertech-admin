"use client";
import React from "react";
import Link from "next/link";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { useDispatch } from "react-redux";
import { useGetAllOrdersQuery } from "@/app/redux/features/orderApiSlice";
import { useGetAllRolesQuery } from "@/app/redux/features/roleApiSlice";
import { useGetAllEmployeesQuery } from "@/app/redux/features/employeeApiSlice";
import { Order, Employee, Role } from "@/types";

const TablePage = () => {
  const dispatch = useDispatch();

  const {
    data: ordersData,
    isLoading: isOrdersLoading,
    isError: isOrdersError,
  } = useGetAllOrdersQuery();
  const {
    data: rolesData,
    isLoading: isRolesLoading,
    isError: isRolesError,
  } = useGetAllRolesQuery();
  const {
    data: employeesData,
    isLoading: isEmployeesLoading,
    isError: isEmployeesError,
  } = useGetAllEmployeesQuery();

  const getStatusColor = (status: string) => {
    const statusStyles: { [key: string]: string } = {
      placed: "border border-[#B48701] text-[#B48701]",
      cancelled: "border border-[#FF0404] text-[#FF0404]",
      processing: "border border-[#FF6A00] text-[#FF6A00]",
      processed: "border border-[#3F9C50] text-[#3F9C50]",
      delivered: "border border-[#002BFF] text-[#002BFF]",
    };
    return statusStyles[status] || "border border-gray-300 text-gray-500";
  };

  if (isOrdersLoading || isEmployeesLoading || isRolesLoading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  if (isOrdersError || isEmployeesError || isRolesError) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="rounded-lg bg-red-50 p-6 text-center dark:bg-red-900/30">
          <h2 className="text-xl font-semibold text-red-700 dark:text-red-400">
            Error Loading Data
          </h2>
          <p className="mt-2 text-red-600 dark:text-red-300">
            There was an issue loading the data.
          </p>
        </div>
      </div>
    );
  }

  const displayedOrders = ordersData?.slice(0, 5);
  const displayedEmployees = Array.isArray(employeesData)
    ? employeesData.slice(0, 5)
    : [];

  const getRoleName = (roleId: string) => {
    if (!rolesData) return "Unknown";
    const role = rolesData.find((role: Role) => role._id === roleId);
    return role ? role.name : "Unknown";
  };

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      <div className="rounded-lg bg-white p-6 shadow-lg dark:bg-[#122031]">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-medium text-gray-700 dark:text-white">
            Latest Orders
          </h2>
          <Link
            href="/orders"
            className="flex items-center gap-1 text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            View all
            <MdKeyboardDoubleArrowRight className="h-5 w-5" />
          </Link>
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
              {displayedOrders &&
                displayedOrders.map((order, index) => (
                  <tr
                    key={order._id}
                    className="transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/50"
                  >
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                      {index + 1}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                      ${order.unit_price}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <span
                        className={`rounded-md ${getStatusColor(order.status)}`}
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

      <div className="rounded-lg bg-white p-6 shadow-lg dark:bg-[#122031]">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-medium text-gray-700 dark:text-white">
            Employees
          </h2>
          <Link
            href="/employees"
            className="flex items-center gap-1 text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            View all
            <MdKeyboardDoubleArrowRight className="h-5 w-5" />
          </Link>
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
              {displayedEmployees &&
                displayedEmployees.map((employee) => (
                  <tr
                    key={employee._id}
                    className="transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/50"
                  >
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                      {employee._id.slice(-5)}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                      {employee.name}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
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

export default TablePage;
