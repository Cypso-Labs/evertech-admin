"use client";
import React from "react";
import Link from "next/link";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useGetAllOrdersQuery } from "@/app/redux/features/orderApiSlice";
import { useGetAllRolesQuery } from "@/app/redux/features/roleApiSlice";
import { useGetAllEmployeesQuery } from "@/app/redux/features/employeeApiSlice";
import { Order, Employee, Role } from "@/types";
import { selectAuth, checkAuth } from "@/app/redux/features/authSlice";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const TablePage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { isAuthenticated, token } = useSelector(selectAuth);

  useEffect(() => {
    dispatch(checkAuth());
    if (!isAuthenticated) {
      router.push("/");
      return;
    }
  }, [isAuthenticated, dispatch, router]);

  const {
    data: ordersData,
    isLoading: isOrdersLoading,
    isError: isOrdersError,
  } = useGetAllOrdersQuery(undefined, {
    skip: !isAuthenticated,
  });

  const {
    data: rolesData,
    isLoading: isRolesLoading,
    isError: isRolesError,
  } = useGetAllRolesQuery(undefined, {
    skip: !isAuthenticated,
  });

  const {
    data: employeesData,
    isLoading: isEmployeesLoading,
    isError: isEmployeesError,
  } = useGetAllEmployeesQuery(undefined, {
    skip: !isAuthenticated,
  });

  const getStatusColor = (status: string) => {
    const statusStyles: { [key: string]: string } = {
      Pending:
        "w-24 border-2 border-amber-500 bg-amber-50 text-amber-700 font-medium px-3 py-1 rounded-full text-center text-sm md:text-base",
      Complete:
        "w-24 border-2 border-green-500 bg-green-50 text-green-700 font-medium px-3 py-1 rounded-full text-center text-sm md:text-base",
    };

    return (
      statusStyles[status] ||
      "w-24 border-2 border-gray-500 bg-gray-50 text-gray-700 font-medium px-3 py-1 rounded-full text-center text-sm md:text-base"
    );
  };

  if (!isAuthenticated) {
    return null;
  }

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
            There was an issue loading the data. Please try again later.
          </p>
        </div>
      </div>
    );
  }

  const displayedOrders = ordersData?.slice(0, 5).reverse() || [];
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
                  Product ID
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 dark:text-gray-300">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {displayedOrders.map((order, index) => (
                <tr
                  key={order._id}
                  className="transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/50"
                >
                  <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                    {index + 1}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                    {order.product_id}
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
              {displayedEmployees.map((employee) => (
                <tr
                  key={employee._id}
                  className="transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/50"
                >
                  <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                    #{employee.employee_id}
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
