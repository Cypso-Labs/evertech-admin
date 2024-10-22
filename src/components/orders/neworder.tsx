"use client";
import React, { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { MdOutlineAddCircle } from "react-icons/md";

const Neworder = () => {
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
      <div className="mb-12 flex items-center text-[40px] font-medium  text-gray-700 dark:text-white">
        <button className="mr-4 h-[51px] w-[51px] rounded-full bg-white dark:bg-dark-2 text-center">
          &lt;
        </button>
        New Order
      </div>

      <div className="grid grid-cols-4 gap-x-4 ">
        <div className="space-y-2 text-2xl font-semibold dark:text-white">
          <div>Order Id</div>
          <div>Customer Id</div>
          <div>Product Id</div>

          <div className="mb-2 w-full text-2xl font-bold">
            <div className="flex w-[900px] items-center justify-between pt-4">
              <div>Services</div>
              <MdOutlineAddCircle className="size-14 text-[#5E91FF] dark:text-dark-5" />
            </div>
          </div>
        </div>

        <div className="col-span-3 space-y-2">
          <div className="h-[36px] w-[520px] border border-gray-300 bg-white dark:bg-slate-600 dark:border-slate-500"></div>
          <div className="h-[36px] w-[520px] border border-gray-300 bg-white  dark:bg-slate-600 dark:border-slate-500"></div>
          <div className="h-[36px] w-[520px] border border-gray-300 bg-white  dark:bg-slate-600 dark:border-slate-500"></div>
        </div>
      </div>

      <div className="relative col-span-4 mt-4">
        <div className=" w-[900px] rounded-md border  bg-white dark:bg-dark-2 shadow-md ">
          <table className="w-full table-auto border-separate border-spacing-y-3 p-4 ">
            <thead>
              <tr className="text-sm uppercase text-gray-700 dark:text-white ">
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
                  <td className="p-2 border-l border-t border-b border-gray-300 ">{order.id}</td>
                  <td className="p-2 border-t border-gray-300 border-b ">{order.name}</td>
                  <td className=" p-2 border-t border-gray-300 border-b">{order.qty}</td>
                  <td className=" p-2 border-t border-gray-300 border-b">{order.each}</td>
                  <td className="p-2 border-t border-gray-300 border-b">{order.subtotal}</td>
                  <td className=" p-2 text-center border-t border-b border-gray-300 border-r">
                    <button className="text-red-500 hover:text-red-700">
                      <FaTrashAlt size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 w-full text-2xl font-bold text-black dark:text-white">
          <div className="flex w-[900px] items-center justify-between pt-4">
            <div>Grand Total</div>
            <div>$12.32</div>
          </div>
        </div>

        <div className="flex justify-center space-x-8">
          <button className="h-[49px] w-[181px] rounded-lg border-[1px] border-[#FF2323] bg-[#FFCDCD] font-medium text-[#FF2323]">
            Cancel Order
          </button>
          <button className="h-[49px] w-[181px] rounded-lg border-[1px] border-[#08762D] bg-[#BCFFC8] font-medium text-[#08762D]">
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default Neworder;
