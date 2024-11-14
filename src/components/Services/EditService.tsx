"use client";
import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { IoIosArrowDropleft } from "react-icons/io";
import Link from "next/link";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import axios from "axios";

interface FormData {
  serviceName: string;
  category: string;
  expireDate: string;
  price: string | number;
}

const EditService = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    serviceName: "",
    category: "",
    expireDate: "",
    price: "",
  });

  // Handle input changes
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // Make API call to create service
      await axios.post("/api/services", formData);

      // Show success alert
      await Swal.fire({
        title: "Success!",
        text: "Service has been created successfully",
        icon: "success",
        confirmButtonText: "OK",
        confirmButtonColor: "#08762D",
        customClass: {
          popup: "dark:bg-[#122031] dark:text-white",
          confirmButton:
            "bg-[#BCFFC8] text-[#BCFFC8] hover:bg-[#08762D] hover:text-[#BCFFC8]",
        },
      });

      // Reset form or redirect
      setFormData({
        serviceName: "",
        category: "",
        expireDate: "",
        price: "",
      });
      router.push("/services");
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Something went wrong while creating the service",
        icon: "error",
        confirmButtonText: "OK",
        confirmButtonColor: "#FF2323",
        customClass: {
          popup: "dark:bg-[#122031] dark:text-white",
        },
      });
    }
  };

  // Handle cancel
  const handleCancel = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You'll lose all entered data!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, cancel",
      cancelButtonText: "No, keep editing",
      confirmButtonColor: "#FF2323",
      cancelButtonColor: "#08762D",
      customClass: {
        popup: "dark:bg-[#122031] dark:text-white",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        router.push("/services");
      }
    });
  };

  return (
    <div>
      <div className="mb-15 flex items-center gap-4 space-x-12">
        <h1 className="font-inter flex text-4xl font-medium text-slate-600 dark:text-white">
          <Link href="/services" className="inline-block">
            <IoIosArrowDropleft className="mr-2 h-10 w-10 cursor-pointer hover:text-[#3584FA]" />
          </Link>
          New Service
        </h1>
      </div>

      <form className="w-1/2 space-y-6" onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 items-center space-y-2">
          <label className="block text-[24px] font-medium text-gray-500 dark:text-white">
            Service Name
          </label>
          <input
            type="text"
            name="serviceName"
            value={formData.serviceName}
            onChange={handleChange}
            className="h-[36px] rounded-md border border-gray-300 bg-white p-2 dark:bg-[#122031] dark:text-white"
          />
        </div>

        <div className="grid grid-cols-2 items-center space-y-2">
          <label className="block text-[24px] font-medium text-gray-500 dark:text-white">
            Category
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="h-[36px] rounded-md border border-gray-300 bg-white p-2 dark:bg-[#122031] dark:text-white"
          >
            <option value="">Select Category</option>
            {/* Add category options here */}
          </select>
        </div>

        <div className="grid grid-cols-2 items-center space-y-2">
          <label className="block text-[24px] font-medium text-gray-500 dark:text-white">
            Expire Date
          </label>
          <input
            type="date"
            name="expireDate"
            value={formData.expireDate}
            onChange={handleChange}
            className="h-[36px] rounded-md border border-gray-300 bg-white p-2 dark:bg-[#122031] dark:text-white"
          />
        </div>

        <div className="grid grid-cols-2 items-center space-y-2">
          <label className="block text-[24px] font-medium text-gray-500 dark:text-white">
            Price
          </label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="h-[36px] rounded-md border border-gray-300 bg-white p-2 dark:bg-[#122031] dark:text-white"
          />
        </div>

        <div className="ml-20 flex justify-end space-x-4">
          <button
            type="button"
            onClick={handleCancel}
            className="h-[40px] w-[150px] rounded-md border border-red-400 bg-[#FFCDCD] px-4 py-2 text-[#FF2323] hover:bg-[#FF2323] hover:text-[#FFCDCD] dark:bg-red-600 dark:text-white dark:hover:bg-red-700"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="h-[40px] w-[150px] rounded-md bg-[#BCFFC8] px-4 py-2 text-[#08762D] hover:bg-[#08762D] hover:text-[#ffffff] dark:bg-[#08762D] dark:text-white dark:hover:bg-[#08762D]"
          >
            Create Service
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditService;
