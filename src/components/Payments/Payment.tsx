"use client";
import React, { useState } from "react";
import Link from "next/link";
import { FaTrashAlt } from "react-icons/fa";
import { RiExpandUpDownFill } from "react-icons/ri";
import { MdOutlineSearch } from "react-icons/md";
import { useRouter } from "next/navigation";
import { useGetAllPaymentsQuery } from "@/app/redux/features/paymentApiSlice";

import { Payment } from "@/types";

const Payments: React.FC = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const { data: payments = [], isLoading, isError } = useGetAllPaymentsQuery();

  const handleRowClick = (payment: Payment) => {
    const queryParams = new URLSearchParams({
      id: payment._id.toString(),
    }).toString();
    router.push(`/payments/PaymentOrder?${queryParams}`);
  };

  const filteredPayments = Array.isArray(payments)
    ? payments.filter((payment) =>
        payment.payment_details
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase()),
      )
    : [];

  const indexOfLastPayment = currentPage * itemsPerPage;
  const indexOfFirstPayment = indexOfLastPayment - itemsPerPage;
  const currentPayments = filteredPayments.slice(
    indexOfFirstPayment,
    indexOfLastPayment,
  );
  const totalPages = Math.ceil(filteredPayments.length / itemsPerPage);

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

  const getStatusStyle = (status: string) => {
    if (status === "pending") {
      return "border-2 border-[#FF0000] bg-[#FFC3C3] text-[#FF0000] w-24 inline-block px-2 py-1"; 
    } else {
   
      return "border-2 border-[#025826] bg-[#C3FFDA] text-[#025826] w-24 inline-block px-2 py-1"; 
    }
  };
  

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-[40px] font-medium text-slate-600 dark:text-white ">
          Payments
        </h1>
      </div>

      <div className="mt-4 flex items-center p-4">
        <div className="text-md flex h-[30px] w-[227px] items-center rounded-lg border-2 border-gray-300 bg-white px-3 py-2 text-center text-gray-600 shadow-2xl dark:border-dark-3 dark:bg-dark-2 dark:text-white">
          <MdOutlineSearch className="mr-4 justify-start" />
          <input
            type="text"
            placeholder="Search Payments"
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

      <div className="overflow-x-auto">
        <table className="w-full table-auto border-separate border-spacing-y-3">
          <thead>
            <tr className="border-slate-400 py-2 text-center text-[16px] font-extrabold text-slate-600 dark:text-white">
              <th>ID</th>
              <th>ORDER ID</th>
              <th>PAYMENT DETAILS</th>
              <th>PAYMENT METHOD</th>
              <th>STATUS</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={5} className="py-4 text-center">
                  Loading...
                </td>
              </tr>
            ) : isError ? (
              <tr>
                <td colSpan={5} className="py-4 text-center text-red-500">
                  Error fetching payments
                </td>
              </tr>
            ) : currentPayments.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-4 text-center text-gray-500">
                  No payments found
                </td>
              </tr>
            ) : (
              currentPayments.map((payment) => (
                <tr
                  key={payment.payment_id}
                  onClick={() => handleRowClick(payment)}
                  className="cursor-pointer rounded-lg bg-white py-2 text-center text-[16px] font-medium text-slate-700 shadow-md hover:bg-[#E0EDFF] dark:bg-[#122031] dark:text-white"
                >
                  <td className="rounded-l-xl px-4 py-6">
                    {payment.payment_id}
                  </td>
                  <td className="px-4 py-2">{payment.order_id}</td>
                  <td className="px-4 py-2">{payment.payment_details}</td>
                  <td className="px-4 py-2">{payment.payment_method}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`rounded-md px-4 py-1 font-semibold ${getStatusStyle(
                        payment.status,
                      )}`}
                    >
                      {payment.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        <div className="mt-4 flex items-center justify-between">
          <div>
            <nav className="inline-flex items-center font-semibold">
              <button
                className="mx-1 rounded-md border border-gray-300 px-3 py-1 text-black disabled:opacity-50 dark:text-white"
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
              >
                &lt;
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
                className="mx-1 rounded-md border border-gray-300 px-3 py-1 text-black disabled:opacity-50 dark:text-white"
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
              >
                &gt;
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payments;
