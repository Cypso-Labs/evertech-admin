"use client";
import React, { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { RiExpandUpDownFill } from "react-icons/ri";
import { MdOutlineSearch } from "react-icons/md";
import Link from "next/link";

const Orders = () => {
  const [orderData] = useState([
    {
      id: 1,
      name: "Lorem Ipsum",
      status: "UnPaid",
      service: "Lorem Ipsum Dolor Sit Amet",
      price: "$99.98",
    },
    {
      id: 2,
      name: "Lorem Ipsum",
      status: "Paid",
      service: "Lorem Ipsum Dolor Sit Amet",
      price: "$99.98",
    },
    {
      id: 3,
      name: "Lorem Ipsum",
      status: "UnPaid",
      service: "Lorem Ipsum Dolor Sit Amet",
      price: "$99.98",
    },
    {
      id: 4,
      name: "Lorem Ipsum",
      status: "UnPaid",
      service: "Lorem Ipsum Dolor Sit Amet",
      price: "$99.98",
    },
    {
      id: 5,
      name: "Lorem Ipsum",
      status: "Paid",
      service: "Lorem Ipsum Dolor Sit Amet",
      price: "$99.98",
    },
    {
      id: 6,
      name: "Lorem Ipsum",
      status: "Paid",
      service: "Lorem Ipsum Dolor Sit Amet",
      price: "$99.98",
    },
    {
      id: 7,
      name: "Lorem Ipsum",
      status: "UnPaid",
      service: "Lorem Ipsum Dolor Sit Amet",
      price: "$99.98",
    },
    {
      id: 8,
      name: "Lorem Ipsum",
      status: "Paid",
      service: "Lorem Ipsum Dolor Sit Amet",
      price: "$99.98",
    },
    {
      id: 9,
      name: "Lorem Ipsum",
      status: "UnPaid",
      service: "Lorem Ipsum Dolor Sit Amet",
      price: "$99.98",
    },
    {
      id: 10,
      name: "Lorem Ipsum",
      status: "UnPaid",
      service: "Lorem Ipsum Dolor Sit Amet",
      price: "$99.98",
    },
    {
      id: 11,
      name: "Lorem Ipsum",
      status: "Paid",
      service: "Lorem Ipsum Dolor Sit Amet",
      price: "$99.98",
    },
    {
      id: 12,
      name: "Lorem Ipsum",
      status: "UnPaid",
      service: "Lorem Ipsum Dolor Sit Amet",
      price: "$99.98",
    },
    {
      id: 13,
      name: "Lorem Ipsum",
      status: "Paid",
      service: "Lorem Ipsum Dolor Sit Amet",
      price: "$99.98",
    },
    {
      id: 14,
      name: "Lorem Ipsum",
      status: "UnPaid",
      service: "Lorem Ipsum Dolor Sit Amet",
      price: "$99.98",
    },
    {
      id: 15,
      name: "Lorem Ipsum",
      status: "UnPaid",
      service: "Lorem Ipsum Dolor Sit Amet",
      price: "$99.98",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Filtered orders based on search input
  const filteredOrders = orderData.filter((order) =>
    order.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Calculate the current orders to display
  const indexOfLastOrder = currentPage * itemsPerPage;
  const indexOfFirstOrder = indexOfLastOrder - itemsPerPage;
  const currentOrders = filteredOrders.slice(
    indexOfFirstOrder,
    indexOfLastOrder,
  );

  // Calculate total pages
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

  // Pagination functions
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

  return (
    <div>
      <div className="flex items-center justify-between text-3xl font-bold text-gray-700 dark:text-white">
        <span>Orders</span>
        <Link href="/neworder">
          <button className="rounded-md border-2 border-[#3584FA] bg-[#E0EDFF] p-2 text-xl text-[#3584FA] dark:border-dark-3 dark:bg-dark-2 dark:text-white">
            New Order +
          </button>{" "}
        </Link>
      </div>
      <div className="mt-4 flex items-center p-4">
        {/* Search bar */}
        <div className="text-md flex h-[30px] w-[227px] items-center rounded-lg border-2 border-gray-300 bg-white px-3 py-2 text-center text-gray-600 shadow-2xl dark:border-dark-3 dark:bg-dark-2 dark:text-white">
          <MdOutlineSearch className="mr-4 justify-start" />
          <input
            type="text"
            placeholder="Search Orders"
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
        <thead className=" uppercase dark:text-white">
          <tr>
            <th className="p-4 text-left">ID</th>
            <th className="p-4 text-left">Customer Name</th>
            <th className="p-4 text-left">Status</th>
            <th className="p-4 text-left">Service</th>
            <th className="p-4 text-left">Price</th>
            <th className="p-4"></th>
            <th className="p-4"></th>
          </tr>
        </thead>
        <tbody>
          {currentOrders.map((order) => (
            <tr
              key={order.id}
              className="rounded-md bg-white shadow-md dark:bg-dark-2 dark:text-gray-3"
            >
              <td className="p-4">
                Order #{order.id.toString().padStart(5, "0")}
              </td>
              <td className="p-4">{order.name}</td>
              <td className="p-4">
                <span
                  className={`rounded-md font-semibold text-white ${
                    order.status === "Paid"
                      ? "border-2 border-[#025826] bg-[#C3FFDA] px-6 py-1 text-[#025826]"
                      : "border-2 border-[#F70D1A] bg-[#FFCED1] px-3 py-1 text-[#F70D1A]"
                  }`}
                >
                  {order.status}
                </span>
              </td>
              <td className="p-4">{order.service}</td>
              <td className="p-4">{order.price}</td>
              <td className="p-4 text-right">
                <button className="text-center text-red-500 hover:text-red-700">
                  <FaTrashAlt />
                </button>
              </td>
              <td className="p-4"></td>
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
                    ? "bg-blue text-white"
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

export default Orders;
