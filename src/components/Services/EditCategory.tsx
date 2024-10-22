"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { IoIosArrowDropleft } from "react-icons/io";
import Link from "next/link";

const EditCategory = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [formData, setFormData] = useState({
    id: "",
    service: "",
    category: "",
    description: ""
  });

  useEffect(() => {
    if (searchParams) {
      setFormData({
        id: searchParams.get("id") || "",
        service: searchParams.get("service") || "",
        category: searchParams.get("category") || "",
        description: searchParams.get("description") || ""
      });
    }
  }, [searchParams]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle the update logic here
    console.log("Updated category:", formData);
    // Navigate back to categories page after update
    router.push("/services/category");
  };

  return (
    <div>
      <div className="flex items-center gap-4 mb-15 relative space-x-[400px]">
      <h1 className="font-inter flex items-center space-x-2 text-4xl font-medium text-slate-600 dark:text-white" style={{ font: "Inter" }}>
          <Link href="/services/category" className="inline-block">
            <IoIosArrowDropleft className="w-10 h-10 cursor-pointer" />
          </Link>
          <span >Edit Category {formData.id}</span>
        </h1>

      </div>

<form onSubmit={handleSubmit} className="w-1/2 space-y-6">
  <div className=" grid grid-cols-2 items-center  space-y-2 ">
    <label className="block text-[24px] font-medium text-gray-500 dark:text-white  " style={{ font: "Inter" }}>
      Category ID
    </label>
    <input
      type="text"
      name="id"
      value={formData.id}
      onChange={handleChange}
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
      value={formData.category}
      onChange={handleChange}
      className="w-[520] h-[36px] rounded-md border bg-white border-gray-300 p-2 dark:bg-[#122031] dark:text-white "
    />
  </div>

  <div className=" grid grid-cols-2 items-center space-y-2">
  <label className="block text-[24px] font-medium text-gray-500 dark:text-white  " style={{ font: "Inter" }}>
      Category Description
    </label>
    <textarea
      name="categoryDescription"
      value={formData.description}
      onChange={handleChange}
      rows={4}
      className="w-[520] h-[183px] rounded-md border bg-white border-gray-300 p-2 dark:bg-[#122031] dark:text-white "
    />
  </div>

  <div className="flex justify-end space-x-4">
    <button
      type="button"
      
      className="rounded-md w-[100px] h-[40px] bg-red-100 px-4 py-2 text-red-dark dark:text-white hover:bg-red-200 border border-red-400  dark:bg-red-600 dark:hover:bg-red-700"
    >
      Discard
    </button>
    <button
      type="submit"
      className="rounded-md w-[100px] h-[40px] bg-green-100 px-4 py-2 text-green-dark  dark:text-white hover:bg-green-200 border border-green-400 dark:bg-green-600 dark:hover:bg-green-700"
    >
      Save
    </button>
  </div>
</form>

    </div>
  );
};

export default EditCategory;
