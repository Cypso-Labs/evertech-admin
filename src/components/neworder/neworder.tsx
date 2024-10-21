"use client";
import React, { useState } from 'react';
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
    <div className="flex items-center text-3xl font-bold text-gray-700 dark:text-white mb-8">
      <button className="rounded-full bg-white px-2 text-center mr-4">&lt;</button>
      New Order
    </div>
    <div className="grid grid-cols-4 gap-x-4 py-5">
      
      
      <div className="space-y-6 text-2xl font-semibold">
        <div>Order Id</div>
        <div>Customer Id</div>
        <div>Product Id</div>
        <div>Services</div>
       
      </div>

      
      <div className="col-span-3 space-y-6">

        <div className="h-[36px] w-[520px] bg-white border border-gray-300"></div>
        <div className="h-[36px] w-[520px] bg-white border border-gray-300"></div>
        <div className="h-[36px] w-[520px] bg-white border border-gray-300"></div>
        
      </div>

      
      <div className="col-span-4 relative">
      <MdOutlineAddCircle className='size-10 text-[#5E91FF]'/>
        <div className="bg-white h-[291px] w-[900px] p-4 shadow-md rounded-md border border-gray-300 ">
        <table className="w-full table-auto  border-spacing-y-3 border-separate">
        <thead className="uppercase text-gray-700">
          <tr>
            <th className="p-4 text-left ">ID</th>
            <th className="p-4 text-left">Service</th>
            <th className="p-4 text-left">QTY</th>
            <th className="p-4 text-left">Each</th>
            <th className="p-4 text-left">Sub Total</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {orderData.map((order, index) => (
            <tr key={index} className="rounded-lg border-2 border-gray-5">
              <td className="p-2  ">{order.id}</td>
              <td className="p-2">{order.name}</td>
              <td className="p-2">{order.qty}</td>
              <td className="p-2">{order.each}</td>
              <td className="p-2">{order.subtotal}</td>
              <td className="p-2">
                <button className="text-red-500 hover:text-red-700">
                  <FaTrashAlt />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
        </div>
      </div>

    </div></div>
  );
}

export default Neworder;
