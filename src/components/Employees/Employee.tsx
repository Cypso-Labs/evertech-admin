"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FiSearch, FiTrash2 } from "react-icons/fi";
import { IoIosArrowDropleft } from "react-icons/io";
import Swal from "sweetalert2";
import {
  useGetAllEmployeesQuery,
  useDeleteEmployeeMutation,
} from "@/app/redux/features/employeeApiSlice";
import { useGetAllRolesQuery } from "@/app/redux/features/roleApiSlice";

const Employees = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const {
    data: employees,
    isLoading: employeesLoading,
    error: employeesError,
    refetch: refetchEmployees,
  } = useGetAllEmployeesQuery();

  const {
    data: roles,
    isLoading: rolesLoading,
    error: rolesError,
  } = useGetAllRolesQuery();

  const [deleteEmployee, { isLoading: isDeleting }] =
    useDeleteEmployeeMutation();

  const getRoleName = (roleId: string | undefined) => {
    const role = roles?.find((role) => role._id === roleId);
    return role ? role.name : "Unknown";
  };

  const filteredEmployees = Array.isArray(employees)
    ? employees.filter((employee) => {
        if (!searchTerm) return true;

        const searchTermLower = searchTerm.toLowerCase();
        return (
          employee.name?.toLowerCase().includes(searchTermLower) ||
          employee.email?.toLowerCase().includes(searchTermLower) ||
          getRoleName(employee.role).toLowerCase().includes(searchTermLower)
        );
      })
    : [];

  const indexOfLastEmployee = currentPage * itemsPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - itemsPerPage;
  const currentEmployees = filteredEmployees?.slice(
    indexOfFirstEmployee,
    indexOfLastEmployee,
  );
  const totalPages = Math.ceil((filteredEmployees?.length ?? 0) / itemsPerPage);

  const handleDelete = async (employeeId: string, e: React.MouseEvent) => {
    e.stopPropagation();

    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        await deleteEmployee(employeeId).unwrap();
        await Swal.fire({
          title: "Deleted!",
          text: "Employee has been deleted successfully.",
          icon: "success",
          timer: 1500,
        });
        refetchEmployees(); 
      } catch (error) {
        await Swal.fire({
          title: "Error!",
          text:
            error instanceof Error
              ? error.message
              : "Failed to delete the employee.",
          icon: "error",
        });
        console.error("Failed to delete employee:", error);
      }
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      refetchEmployees();
    }, 300); 

    return () => {
      clearInterval(intervalId); 
    };
  }, [refetchEmployees]);

  if (employeesLoading || rolesLoading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  if (employeesError || rolesError) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <div className="rounded-lg bg-red-50 p-6 text-center dark:bg-red-900/30">
          <h2 className="text-xl font-semibold text-red-700 dark:text-red-400">
            Error Loading Data
          </h2>
          <p className="mt-2 text-red-600 dark:text-red-300">
            {employeesError
              ? `Error: ${"message" in employeesError ? employeesError.message : "Unknown error"}`
              : "Failed to load data"}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/dashboard"
            className="transform transition-transform duration-200 hover:scale-110"
          >
            <IoIosArrowDropleft className="h-10 w-10 cursor-pointer hover:text-blue-500" />
          </Link>
          <h1 className="text-4xl font-medium text-slate-700 dark:text-white">
            Employees
          </h1>
        </div>
        <div className="flex gap-4">
          <Link href="/employees/role">
            <button className="rounded-lg bg-gradient-to-r from-gray-100 to-gray-200 px-6 py-2.5 text-slate-700 shadow-lg transition-all duration-200 hover:scale-105 hover:from-gray-200 hover:to-gray-300 hover:shadow-gray-200 dark:from-slate-700 dark:to-slate-800 dark:text-white dark:hover:shadow-slate-900">
              Roles
            </button>
          </Link>
          <Link href="/employees/newEmployee">
            <button className="rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-2.5 text-white shadow-lg transition-all duration-200 hover:scale-105 hover:from-blue-600 hover:to-blue-700 hover:shadow-blue-200 dark:hover:shadow-blue-900">
              New Employee +
            </button>
          </Link>
        </div>
      </div>

      <div className="mb-10 flex space-x-4">
        <div className="relative w-full max-w-md">
          <input
            type="text"
            placeholder="Search Employees"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="h-12 w-full rounded-lg border border-gray-200 bg-white pl-12 pr-4 shadow-sm transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:ring-blue-900"
          />
          <FiSearch className="absolute left-4 top-4 text-gray-400" />
        </div>
      </div>

      {employees !== null &&
      employees !== undefined &&
      employees.length === 0 ? (
        <div className="flex h-40 items-center justify-center">
          <p className="text-lg text-gray-500 dark:text-gray-400">
            No employees found. Add some employees to get started.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow-md">
          <table className="w-full border-separate border-spacing-y-2">
            <thead>
              <tr className="bg-gray-50 text-left text-lg font-semibold text-slate-700 dark:bg-slate-800 dark:text-white">
                <th className="px-6 py-4">ID</th>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentEmployees?.map((employee) => (
                <tr
                  key={employee._id}
                  className="cursor-pointer bg-white transition-all duration-200 hover:scale-[1.01] hover:transform hover:bg-blue-50 dark:bg-slate-800 dark:hover:bg-slate-700"
                >
                  <td className="px-6 py-4">
                    #{employee.employee_id ?? "N/A"}
                  </td>
                  <td className="px-6 py-4">{employee.name ?? "N/A"}</td>
                  <td className="px-6 py-4">{employee.email ?? "N/A"}</td>
                  <td className="px-6 py-4">{getRoleName(employee.role)}</td>
                  <td className="px-6 py-4 text-center">
                    <button
                      className={`group relative rounded-full p-2 transition-all duration-200 hover:bg-red-50 dark:hover:bg-red-900/30 ${
                        isDeleting ? "cursor-not-allowed opacity-50" : ""
                      }`}
                      onClick={(e) => handleDelete(employee._id, e)}
                      disabled={isDeleting}
                    >
                      {isDeleting ? (
                        <div className="h-5 w-5 animate-spin rounded-full border-2 border-red-500 border-t-transparent" />
                      ) : (
                        <FiTrash2 className="h-5 w-5 text-red-500 transition-colors group-hover:text-red-600 dark:text-red-400 dark:group-hover:text-red-300" />
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="mt-4 flex items-center justify-between">
        <button
          className="px-4 py-2 text-lg font-semibold text-blue-500 disabled:opacity-50"
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="text-lg">
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="px-4 py-2 text-lg font-semibold text-blue-500 disabled:opacity-50"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Employees;


