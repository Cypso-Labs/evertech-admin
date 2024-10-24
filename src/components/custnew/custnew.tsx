"use client"
import React from "react";
import Link from "next/link";
import { IoIosArrowDropleft } from "react-icons/io";
import { useRouter } from "next/navigation"; 

const Custnew = () => {
  const router = useRouter(); 

  return (
    <div>
      <div className="mb-12 flex items-center text-[40px] font-medium text-[#475569] dark:text-white">
        <button
          className="mr-4 h-[51px] w-[51px] rounded-full text-center dark:bg-dark-2"
          onClick={() => router.back()} 
        >
          <IoIosArrowDropleft className="h-10 w-10 cursor-pointer hover:text-[#3584FA]" />
        </button>
        New Customer
      </div>

      <div className="grid grid-cols-4">
        <div className="space-y-8 text-2xl font-semibold dark:text-white">
          <div className="space-y-8">Customer ID</div>
          <div className="space-y-8">Customer Name</div>
          <div className="space-y-8">Contact</div>
          <div className="space-y-8">Address</div>

          <div className="mb-2 w-full text-2xl font-bold">
            <div className="flex w-[900px] items-center justify-between pt-4"></div>
            <div className="mt-14">Mail</div>
          </div>
        </div>
        <div>
          <div className="col-span-3 justify-center space-y-6">
            <div className="h-[36px] w-[520px] border border-gray-300 bg-white dark:border-slate-500 dark:bg-slate-600"></div>
            <div className="h-[36px] w-[520px] border border-gray-300 bg-white dark:border-slate-500 dark:bg-slate-600"></div>
            <div className="h-[36px] w-[520px] border border-gray-300 bg-white dark:border-slate-500 dark:bg-slate-600"></div>
            <div className="h-[108px] w-[520px] border border-gray-300 bg-white dark:border-slate-500 dark:bg-slate-600"></div>
          </div>

          <div className="mt-8 h-[36px] w-[520px] border border-gray-300 bg-white dark:border-slate-500 dark:bg-slate-600"></div>
          <div className="mt-10 flex justify-end space-x-6 w-[520px]">
            <button className="h-[49px] w-[181px] rounded-lg border-[1px] border-[#FF2323] bg-[#FFCDCD] font-medium text-[#FF2323]">
              Discard
            </button>
            <button className="h-[49px] w-[181px] rounded-lg border-[1px] border-[#08762D] bg-[#BCFFC8] font-medium text-[#08762D]">
              Create Customer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Custnew;
