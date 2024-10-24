"use client";
import React, { useState, useEffect } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { MdOutlineAddCircle } from "react-icons/md";
import { IoIosArrowDropleft } from "react-icons/io";
import { useRouter, useSearchParams } from "next/navigation";

const Orderedit = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [formData, setFormData] = useState({
    id: "",
    service: "",
    status: "",
    name: "",
    price: "",
  });

  useEffect(() => {
    if (searchParams) {
      setFormData({
        id: searchParams.get("id") || "0001",
        service: searchParams.get("service") || "",
        status: searchParams.get("status") || "",
        name: searchParams.get("name") || "",
        price: searchParams.get("price") || "",
      });
    }
  }, [searchParams]);

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
      <div className="mb-12 flex items-center text-[40px] font-medium text-gray-700 dark:text-white">
        <button
          className="mr-4 h-[51px] w-[51px] rounded-full text-center dark:bg-dark-2"
          onClick={() => router.back()}
        >
          <IoIosArrowDropleft className="h-10 w-10 cursor-pointer hover:text-[#3584FA]" />
        </button>
        Edit Order {formData.id || "0001"}
      </div>

      <div className="grid grid-cols-4 gap-x-4 ">
        <div className="space-y-2 text-2xl font-semibold dark:text-white">
          <div>Order Id</div>
          <div>Customer Id</div>
          <div>Product Id</div>

          <div className="mb-2 w-full text-2xl font-bold">
            <div className="flex w-[900px] items-center justify-between pt-4">
              <div>Services</div>
              <MdOutlineAddCircle className="w-[57px]  h-[57px] text-[#5E91FF] dark:text-dark-5" />
            </div>
          </div>
        </div>

        <div className="col-span-3 space-y-2">
          <div className="h-[36px] w-[520px] border border-gray-300 bg-white dark:border-slate-500 dark:bg-slate-600"></div>
          <div className="h-[36px] w-[520px] border border-gray-300 bg-white dark:border-slate-500 dark:bg-slate-600"></div>
          <div className="h-[36px] w-[520px] border border-gray-300 bg-white dark:border-slate-500 dark:bg-slate-600"></div>
        </div>
      </div>

      <div className="relative col-span-4 mt-4">
        <div className="w-[900px] rounded-md border bg-white shadow-md dark:bg-dark-2 ">
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
                  <td className="border-b border-l border-t border-gray-300 p-2">
                    {order.id}
                  </td>
                  <td className="border-b border-t border-gray-300 p-2">
                    {order.name}
                  </td>
                  <td className="border-b border-t border-gray-300 p-2">
                    {order.qty}
                  </td>
                  <td className="border-b border-t border-gray-300 p-2">
                    {order.each}
                  </td>
                  <td className="border-b border-t border-gray-300 p-2">
                    {order.subtotal}
                  </td>
                  <td className="border-b border-r border-t border-gray-300 p-2 text-center">
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

        <div className="mt-4 flex justify-center space-x-8">
          <button className="h-[49px] w-[181px] rounded-lg border-[1px] border-[#FF2323] bg-[#FFCDCD] font-medium text-[#FF2323]">
            Discard
          </button>
          <button className="h-[49px] w-[181px] rounded-lg border-[1px] border-[#08762D] bg-[#BCFFC8] font-medium text-[#08762D]">
            Save Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default Orderedit;
