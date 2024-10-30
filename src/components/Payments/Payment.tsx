"use client";
import React, { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { RiExpandUpDownFill } from "react-icons/ri";
import { MdOutlineSearch } from "react-icons/md";
import { BiSolidCategory } from "react-icons/bi";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Payment = () => {
  const router = useRouter();

  interface Payment {
    id: string;
    orderId: string;
    customerName: string;
    status: string;
    amount: string;
  }

  const initialPaymentData: Payment[] = [
    {
      id: "0001",
      orderId: "0001",
      customerName: "Lorem Ipsum Dolor Sit",
      status: "Paid",
      amount: "$ 99.99",
    },
    {
      id: "00012",
      orderId: "00012",
      customerName: "Lorem Ipsum Dolor Sit",
      status: "Paid",
      amount: "$ 99.99",
    },
    {
      id: "00013",
      orderId: "00013",
      customerName: "Lorem Ipsum Dolor Sit",
      status: "UnPaid",
      amount: "$ 99.99",
    },
    {
      id: "00014",
      orderId: "00014",
      customerName: "Lorem Ipsum Dolor Sit",
      status: "Paid",
      amount: "$ 99.99",
    },
    {
      id: "00015",
      orderId: "00016",
      customerName: "Lorem Ipsum Dolor Sit",
      status: "UnPaid",
      amount: "$ 99.99",
    },
    {
      id: "00016",
      orderId: "00061",
      customerName: "Lorem Ipsum Dolor Sit",
      status: "Paid",
      amount: "$ 99.99",
    },
  ];

  const [payments, setPayments] = useState(initialPaymentData);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const handleRowClick = (payment: Payment) => {
    const queryParams = new URLSearchParams({
      id: payment.id,
      orderId: payment.orderId,
      customerName: payment.customerName,
      status: payment.status,
      amount: payment.amount,
    }).toString();
    router.push(`/payments/PaymentOrder?${queryParams}`);
  };

  const handleDelete = (paymentId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setPayments((prevPayments) =>
      prevPayments.filter((payment) => payment.id !== paymentId),
    );
  };

  const filteredPayments = payments.filter((payment) =>
    payment.customerName.toLowerCase().includes(searchTerm.toLowerCase()),
  );

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
    if (status === "Paid") {
      return "border-2 border-[#025826] bg-[#C3FFDA] text-[#025826] w-24 inline-block px-2 py-1";
    } else if (status === "UnPaid") {
      return "border-2 border-[#FF0000] bg-[#FFC3C3] text-[#FF0000] w-24 inline-block px-2 py-1";
    }
    return ""; 
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1
          className="text-[40px] font-medium text-slate-600 dark:text-white"
          style={{ font: "Inter" }}
        >
          Payments
        </h1>
      </div>

      <div className="mt-4 flex items-center p-4">
        {/* Search bar */}
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

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full table-auto border-separate border-spacing-y-3">
          <thead>
            <tr
              className="border-slate-400 py-2 text-center text-[16px] font-extrabold text-slate-600 dark:text-white"
              style={{ font: "Inter" }}
            >
              <th>ID</th>
              <th>ORDER ID</th>
              <th>CUSTOMER NAME</th>
              <th>STATUS</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {currentPayments.map((payment, index) => (
              <tr
                key={payment.id}
                onClick={() => handleRowClick(payment)}
                className="cursor-pointer rounded-lg bg-white py-2 text-center text-[16px] font-medium text-slate-700 shadow-md hover:bg-[#E0EDFF] dark:bg-[#122031] dark:text-white"
                style={{ font: "Inter" }}
              >
                <td className="rounded-l-xl px-4 py-6">{payment.id}</td>
                <td className="px-4 py-2">{payment.orderId}</td>
                <td className="px-4 py-2">{payment.customerName}</td>
                <td className="px-4 py-2">
                  <span
                    className={`rounded-md px-4 py-1 font-semibold ${getStatusStyle(
                      payment.status
                    )}`}
                  >
                    {payment.status}
                  </span>
                </td>
                <td className="rounded-r-xl px-4 py-2">
                  <button
                    className="text-red-500 hover:text-[#3584FA]"
                    onClick={(e) => handleDelete(payment.id, e)}
                  >
                    <FaTrashAlt />
                  </button>
                </td>
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
    </div>
  );
};

export default Payment;