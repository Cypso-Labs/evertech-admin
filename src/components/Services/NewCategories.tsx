"use client";
import React, { useState, useEffect } from "react";

import { IoIosArrowDropleft } from "react-icons/io";
import Link from "next/link";

const NewCategories = () => {


 


  return (
    <div>
    <div className="flex items-center gap-4 mb-15 space-x-12">
  <h1 className="font-inter flex text-4xl font-medium text-slate-600 dark:text-white" style={{ font: "Inter" }}>
    <Link href="/services/category" className="inline-block">
      <IoIosArrowDropleft className="w-10 h-10 cursor-pointer mr-2" /> 
    </Link>
    New Category
  </h1>
</div>


<form className="w-1/2 space-y-6">
  <div className=" grid grid-cols-2 items-center  space-y-2 ">
    <label className="block text-[24px] font-medium text-gray-500 dark:text-white  " style={{ font: "Inter" }}>
      Category ID
    </label>
    <input
      type="text"
      name="id"
     
      disabled
      className="w-[520] h-[36px] rounded-md border bg-white border-gray-300 p-2 dark:bg-[#122031] dark:text-white "
    />
  </div>

  <div className="grid grid-cols-2 items-center space-y-2 ">
  <label className="block text-[24px] font-medium text-gray-500 dark:text-white  " style={{ font: "Inter" }}>
      Category Name
    </label>
    <input
      type="text"
      name="categoryName"
      
      className="w-[520] h-[36px] rounded-md border bg-white border-gray-300 p-2 dark:bg-[#122031] dark:text-white "
    />
  </div>

  <div className=" grid grid-cols-2 items-center space-y-2">
  <label className="block text-[24px] font-medium text-gray-500 dark:text-white  " style={{ font: "Inter" }}>
      Category Description
    </label>
    <textarea
      name="categoryDescription"
      
      rows={4}
      className="w-[520] h-[183px] rounded-md border bg-white border-gray-300 p-2 dark:bg-[#122031] dark:text-white "
    />
  </div>

  <div className="flex justify-end space-x-4">
    <button
      type="button"
      
      className="rounded-md w-[150px] h-[40px] bg-red-100 px-4 py-2 text-red-dark dark:text-white hover:bg-red-200 border border-red-400  dark:bg-red-600 dark:hover:bg-red-700"
    >
      Cancel
    </button>
    <button
      type="submit"
      className="rounded-md w-[150px] h-[40px] bg-green-100 px-4 py-2 text-green-dark  dark:text-white hover:bg-green-200 border border-green-400 dark:bg-green-600 dark:hover:bg-green-700"
    >
      Create Category
    </button>
  </div>
</form>

    </div>
  );
};

export default NewCategories;
