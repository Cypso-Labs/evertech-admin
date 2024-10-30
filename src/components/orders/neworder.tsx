"use client";
import React, { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { MdOutlineAddCircle } from "react-icons/md";
import { IoIosArrowDropleft } from "react-icons/io";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

const Neworder = () => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const handleSave = async () => {
    const result = await Swal.fire({
      title: "Success!",
      text: "Order has been made",
      icon: "success",
      showCancelButton: true,
      confirmButtonText: "Payment Page",
      confirmButtonColor: "#2E84D3",
      cancelButtonText: "OK!",
      cancelButtonColor: "#2ED36D",
      customClass: {
        title: "font-medium",
        popup: "dark:bg-[#122031] dark:text-white",
        confirmButton: "bg-[#BCFFC8] text-[#00000] hover:bg-[#08762D] w-[147.5px] h-[47px]",
        cancelButton: "bg-[#FFD1D1] text-[#00000] hover:bg-[#FF5733] w-[147.5px] h-[47px]",
      },
    });
  
  
    
  };
  
  const handleCancel = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will lose all newly entered data!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes,Cancel",
      cancelButtonText: "No,keep editing",
      confirmButtonColor: "#D93132",
      cancelButtonColor: "#2ED36D",
      customClass: {
        popup: "dark:bg-[#122031] dark:text-white",
        confirmButton: "text-white bg-[#D93132] w-[133px] h-[47px] text-[15px] rounded-md",
        cancelButton: "text-white bg-[#2ED36D]  w-[140px] h-[47px] text-[15px]   rounded-md",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        router.push("/orders");
      }
    });
  };
  

  return (
    <div>
      <div className="mb-12 flex items-center text-[40px] font-medium text-gray-700 dark:text-white">
        <button
          className="mr-4 h-[51px] w-[51px] rounded-full text-center dark:bg-dark-2"
          onClick={() => router.back()}
        >
             <MdKeyboardArrowLeft className=" cursor-pointer hover:text-[#3584FA] bg-white rounded-full h-[51px] w-[51px] border-2 border-gray-4" />
        </button>
        New Order
      </div>

      <div className="grid grid-cols-4 gap-x-4 ">
        <div className="space-y-2 text-2xl font-semibold dark:text-white">
          <div className="h-[36px]">Order Id</div>
          <div className="h-[36px]">Customer Id</div>
          <div className="h-[36px]">Product Id</div>

          <div className="mb-2 w-full text-2xl font-bold">
            <div className="relative flex w-[900px] items-center justify-between pt-4">
              <div>Services</div>
              <MdOutlineAddCircle
                className="size-14 text-[#5E91FF] dark:text-dark-5 cursor-pointer"
                onClick={() => setIsModalOpen(true)}
              />
            </div>
          </div>
        </div>

        <div className="col-span-2 space-y-2">
          <input
            type="text"
            className="h-[36px] w-[520px] border border-gray-300 bg-white p-2 text-gray-900 dark:border-slate-500 dark:bg-slate-600 dark:text-white"
          />
          <input
            type="text"
            className="h-[36px] w-[520px] border border-gray-300 bg-white p-2 text-gray-900 dark:border-slate-500 dark:bg-slate-600 dark:text-white"
          />
          <input
            type="text"
            className="h-[36px] w-[520px] border border-gray-300 bg-white p-2 text-gray-900 dark:border-slate-500 dark:bg-slate-600 dark:text-white"
          />
        </div>
      </div>

      <div className="relative col-span-4 mt-4">
        <div className="w-[900px] rounded-md border bg-white shadow-md dark:bg-dark-2">
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
                  <td className="border-b border-l border-t border-gray-300 p-2">{order.id}</td>
                  <td className="border-b border-t border-gray-300 p-2">{order.name}</td>
                  <td className="border-b border-t border-gray-300 p-2">{order.qty}</td>
                  <td className="border-b border-t border-gray-300 p-2">{order.each}</td>
                  <td className="border-b border-t border-gray-300 p-2">{order.subtotal}</td>
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

        <div className="flex justify-center space-x-8">
          <button
            className="h-[49px] w-[181px] rounded-lg border-[1px] border-[#FF2323] bg-[#FFCDCD] hover:bg-[#FF2323] hover:border-[#FFCDCD] hover:text-[#FFCDCD] font-medium text-[#FF2323]"
            onClick={(e) => {
              e.stopPropagation();
              handleCancel();
            }}
          >
            Cancel Order
          </button>
          <button
            className="h-[49px] w-[181px] rounded-lg border-[1px] border-[#08762D] bg-[#BCFFC8] hover:bg-[#08762D] hover:border-[#BCFFC8] hover:text-[#BCFFC8] font-medium text-[#08762D]"
            onClick={(e) => {
              e.stopPropagation();
              handleSave();
            }}
          >
            Save Order
          </button>
        </div>
      </div>
      

      {/* Add Service Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-10 rounded-lg w-[672px] h-[439px]">
            <div className="flex items-center gap-4 mb-10">
              <h1 className="font-extrabold text-[24px] text-black">Add Service</h1>
            </div>

            <form className="space-y-10">
              <div className="flex justify-between items-center">
                <label className="text-[20px] font-bold text-gray-600">SERVICE</label>
                <select
                  name="category"
                  className="h-[36px] w-[347px] rounded-md border bg-white border-gray-300"
                >
                  <option value="">Select Service</option>
                  <option value="service1">Service 1</option>
                  <option value="service2">Service 2</option>
                  <option value="service3">Service 3</option>
                </select>
              </div>

              <div className="flex justify-between items-center">
                <label className="text-[20px] font-bold text-gray-600">QUANTITY</label>
                <input
                  type="number"
                  name="quantity"
                  className="h-[36px] w-[347px] rounded-md border bg-white border-gray-300"
                />
              </div>

              <div className="flex justify-between items-center">
                <label className="text-[20px] font-bold text-gray-600">SUB Total</label>
                <input
                  type="number"
                  name="subtotal"
                  className="h-[36px] w-[347px] rounded-md border bg-[#E8E8E8] border-gray-300"
                />
              </div>

              <div className="flex justify-end mt-10">
                <button
                  type="button"
                  className="rounded-md w-[154px] h-10 bg-[#BCFFC8] text-[20px] font-bold px-4 py-2 border border-[#08762D] text-[#08762D] hover:bg-[#08762D] hover:text-[#BCFFC8] transition-colors duration-200"
                  onClick={() => setIsModalOpen(false)} 
                >
                  ADD
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Neworder;
