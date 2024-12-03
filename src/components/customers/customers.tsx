"use client";
import React, { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { RiExpandUpDownFill } from "react-icons/ri";
import { MdOutlineSearch } from "react-icons/md";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  useGetAllCustomersQuery,
  useDeleteCustomerMutation,
} from "@/app/redux/features/customerApiSlice";
import { useGetAllOrdersQuery } from "@/app/redux/features/orderApiSlice";
import { Customer } from "@/types";

const Customers = () => {
  const router = useRouter();

  const {
    data: orderData = [],
    isLoading,
    isError,
    refetch: refetchCustomers,
  } = useGetAllCustomersQuery();

  const {
    data: orderData2 = [],
    isLoading: isLoading2,
    isError: isError2,
    refetch: refetchOrders,
  } = useGetAllOrdersQuery();

  const [deleteCustomer] = useDeleteCustomerMutation();

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Handle row click with type safety  use Customer type
  const handleRowClick = (customer: Customer) => {
    const queryParams = new URLSearchParams({
      id: customer._id.toString(),
    }).toString();

    router.push(`customers/editcustomer?${queryParams}`);
  };

  // Handle customer deletion
  const handleDeleteCustomer = async (customerId: string) => {
    try {
      await deleteCustomer(customerId).unwrap();
      refetchCustomers();
    } catch (error) {
      console.error("Failed to delete customer", error);
    }
  };
 



  // Filter and paginate customers
  const filteredOrders = orderData.filter((order) =>
    order.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const indexOfLastOrder = currentPage * itemsPerPage;
  const indexOfFirstOrder = indexOfLastOrder - itemsPerPage;
  const currentOrders = filteredOrders.slice(
    indexOfFirstOrder,
    indexOfLastOrder,
  );

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

  // Pagination handlers
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  // Loading and error states
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading customers</div>;

  return (
    <div>
      <div className="flex items-center justify-between text-3xl font-bold text-gray-700 dark:text-white">
        <span className="text-[40px] font-medium text-[#475569]">
          Customers
        </span>
        <Link href="/customers/newcustomer">
          <button className="rounded-md border-2 border-[#3584FA] bg-[#E0EDFF] p-2 text-[20px] text-xl text-[#3584FA] hover:bg-[#3584FA] hover:text-[#E0EDFF] dark:border-dark-3 dark:bg-dark-2 dark:text-white">
            New Customer +
          </button>
        </Link>
      </div>

      <div className="mt-4 flex items-center p-4">
        <div className="text-md flex h-[30px] w-[227px] items-center rounded-lg border-2 border-gray-300 bg-white px-3 py-2 text-center text-gray-600 shadow-2xl dark:border-dark-3 dark:bg-dark-2 dark:text-white">
          <MdOutlineSearch className="mr-4 justify-start" />
          <input
            type="text"
            placeholder="Search Customers"
            className="w-full border-none outline-none dark:border-dark-3 dark:bg-dark-2"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="text-md ml-8 flex h-[30px] w-[141px] items-center rounded-lg border-2 border-gray-300 bg-white px-3 py-2 text-center text-gray-600 shadow-2xl dark:border-dark-3 dark:bg-dark-2 dark:text-white">
          <RiExpandUpDownFill className="cursor-pointer justify-start" />
          <span> Sort by order </span>
        </div>
      </div>

      <table className="w-full table-auto border-separate border-spacing-y-3 font-bold">
        <thead className="text-center text-[16px] uppercase text-[#475569] dark:text-white">
          <tr>
            <th className="p-4">ID</th>
            <th className="p-4">Customer Name</th>
            <th className="p-4">Mail</th>
            <th className="p-4">Contact</th>
            <th className="p-4"></th>
            <th className="p-4"></th>
          </tr>
        </thead>
        <tbody>
          {currentOrders.map((customers) => (
            <tr
              key={customers._id}
              className="cursor-pointer rounded-md bg-white shadow-md hover:bg-[#E0EDFF] dark:bg-dark-2 dark:text-gray-300"
              onClick={() => handleRowClick(customers)}
            >
              <td className="rounded-lg p-2 px-4 py-6 text-center">
                #{customers.customer_id}
              </td>
              <td className="text-center">{customers.name}</td>
              <td className="p-4 text-center">
                {customers.mail}
              </td>
              <td className="p-4 text-center">{customers.contact}</td>
              <td className="p-4 text-center">
                <button
                  className="text-center text-[#FF0000] hover:text-[#3584FA]"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent row click when deleting
                    handleDeleteCustomer(customers._id);
                  }}
                >
                  <FaTrashAlt />
                </button>
              </td>
              <td className="rounded-lg p-4"></td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="mt-4 flex items-center justify-between">
        <div>
          <nav className="inline-flex items-center font-semibold">
            <button
              className="mx-1 rounded-md border border-gray-300 px-3 py-1 text-black dark:text-white"
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
            >
              <span>&lt;</span>
            </button>
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                className={`mx-1 rounded-md border border-gray-300 px-3 py-1 ${
                  currentPage === index + 1
                    ? "bg-[#3584FA] text-white"
                    : "text-black dark:text-white"
                }`}
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </button>
            ))}
            <button
              className="mx-1 rounded-md border border-gray-300 px-3 py-1 text-black dark:text-white"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              <span>&gt;</span>
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Customers;
