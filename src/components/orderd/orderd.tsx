"use client";
import { useState } from "react";
import React from "react";
import Link from "next/link";
import { FaRegEdit } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";

const Orderd = () => {
  const [orderData] = useState([
    {
      id: 1,
      name: "Lorem Ipsum",
      qty: "5",
      each: "$0.99",
      subtotal: "$4.95",
    },
    {
      id: 2,
      name: "Lorem Ipsum",
      qty: "5",
      each: "$0.99",
      subtotal: "$4.95",
    },
    {
      id: 3,
      name: "Lorem Ipsum",
      qty: "5",
      each: "$0.99",
      subtotal: "$4.95",
    },
  ]);

  return (
    <div>
      {/* Header with Order Number and New Order button */}
      <div className="mb-12 flex items-center justify-between text-[40px] font-medium text-gray-700 dark:text-white">
        <div className="flex items-center">
          <button className="mr-4 h-[51px] w-[51px] rounded-full bg-white text-center dark:bg-dark-2">
            &lt;
          </button>
          Order #0001
        </div>
        <Link href="orders/neworder">
          <button className="flex rounded-md border-2 border-[#000000] bg-[#CBD5E1] p-2 text-xl text-[#000000] dark:border-dark-3 dark:bg-dark-2 dark:text-white">
            Edit Order <FaRegEdit className="ml-3" />
          </button>
        </Link>
      </div>

      {/* Grid layout for Order Details and Order Tracking */}
      <div className="grid grid-cols-2 gap-4">
        <div className="h-[310px] w-[520px] space-y-3 rounded-lg bg-white dark:bg-dark-3 p-4 font-semibold shadow-xl dark:text-white">
          <div className="text-2xl">Order Details</div>
          <div className="mt-5">Order ID:</div>
          <div>Customer Name:</div>
          <div>Contact Number:</div>
          <div>Order Date:</div>
          <div>Grand Total:</div>
          <div>Status:</div>
        </div>
        <div className="h-[310px] w-[516px] bg-white dark:bg-dark-3 p-4 text-2xl font-semibold shadow-xl dark:text-white">
          Order Tracking
        </div>
      </div>

      {/* Container for Table and "cdc" section */}
      <div className="flex gap-4 mt-8">
        <div className="w-[900px] rounded-md border bg-white dark:bg-dark-2 shadow-md">
          <table className="w-full table-auto border-separate border-spacing-y-3 p-4">
            <thead>
              <tr className="text-sm uppercase text-gray-700 dark:text-white">
                <th className="pb-2 text-left font-semibold">ID</th>
                <th className="pb-2 text-left font-semibold">Service</th>
                <th className="pb-2 text-left font-semibold">QTY</th>
                <th className="pb-2 text-left font-semibold">Each</th>
                <th className="pb-2 text-left font-semibold">Sub Total</th>
                <th className="pb-2"></th>
              </tr>
            </thead>
            <tbody>
              {orderData.map((order, index) => (
                <tr key={index} className="dark:text-white">
                  <td className="p-2 border-l border-t border-b border-gray-300">{order.id}</td>
                  <td className="p-2 border-t border-gray-300 border-b">{order.name}</td>
                  <td className="p-2 border-t border-gray-300 border-b">{order.qty}</td>
                  <td className="p-2 border-t border-gray-300 border-b">{order.each}</td>
                  <td className="p-2 border-t border-gray-300 border-b">{order.subtotal}</td>
                  <td className="p-2 text-center border-t border-b border-gray-300 border-r">
                    <button className="text-red-500 hover:text-red-700">
                      <FaTrashAlt size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className=" p-4 w-[250px] h-[310px] bg-white dark:bg-dark-3 rounded-lg shadow-xl dark:text-white">
          <div className="text-2xl font-semibold">Order Status</div>
          <div>Payment Status</div>
          <button className="p-4 bg-red text-white">Unpaid</button>
        </div>
      </div>
    </div>
  );
};

export default Orderd;
