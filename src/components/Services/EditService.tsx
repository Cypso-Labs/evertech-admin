"use client";

import React, { useState, useEffect, FormEvent } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { IoIosArrowDropleft } from "react-icons/io";
import Link from "next/link";
import Swal from "sweetalert2";

export default function EditService() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [formData, setFormData] = useState({
    id: "",
    service: "",
    category: "",
    price: "",
    expireDate: "",
  });

  useEffect(() => {
    if (searchParams) {
      setFormData({
        id: searchParams.get("id") || "",
        service: searchParams.get("service") || "",
        category: searchParams.get("category") || "",
        price: searchParams.get("price") || "",
        expireDate: searchParams.get("expireDate") || "",
      });
    }
  }, [searchParams]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // Here you would typically make your API call to update the service
      // await updateService(formData);

      await Swal.fire({
        title: "Success!",
        text: "Service has been edited successfully",
        icon: "success",
        confirmButtonText: "OK",
        confirmButtonColor: "#08762D",
        customClass: {
          popup: "dark:bg-[#122031] dark:text-white",
          confirmButton:
            "bg-[#BCFFC8] text-[#BCFFC8] hover:bg-[#08762D] hover:text-[#BCFFC8]",
        },
      });

      router.push("/services");
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Something went wrong while editing the service",
        icon: "error",
        confirmButtonText: "OK",
        confirmButtonColor: "#FF2323",
        customClass: {
          popup: "dark:bg-[#122031] dark:text-white",
        },
      });
    }
  };

  const handleCancel = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to save your changes!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, discard changes",
      cancelButtonText: "No, keep editing",
      confirmButtonColor: "#DD6B55",
      cancelButtonColor: "#9A9A9A",
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
    <div className="container mx-auto my-10">
      <div className="flex items-center justify-between">
        <Link href="/services">
          <IoIosArrowDropleft
            size={30}
            className="text-gray-600 dark:text-white"
          />
        </Link>
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
          Edit Service
        </h2>
      </div>
      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <div className="space-y-4">
          <label
            htmlFor="service"
            className="text-sm font-medium text-gray-700 dark:text-white"
          >
            Service Name
          </label>
          <input
            type="text"
            id="service"
            name="service"
            value={formData.service}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-[#122031] dark:text-white"
          />
        </div>

        <div className="space-y-4">
          <label
            htmlFor="category"
            className="text-sm font-medium text-gray-700 dark:text-white"
          >
            Category
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-[#122031] dark:text-white"
          >
            <option value="web-design">Web Design</option>
            <option value="seo">SEO</option>
            <option value="digital-marketing">Digital Marketing</option>
          </select>
        </div>

        <div className="space-y-4">
          <label
            htmlFor="price"
            className="text-sm font-medium text-gray-700 dark:text-white"
          >
            Price
          </label>
          <input
            type="text"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-[#122031] dark:text-white"
          />
        </div>

        <div className="space-y-4">
          <label
            htmlFor="expireDate"
            className="text-sm font-medium text-gray-700 dark:text-white"
          >
            Expiry Date
          </label>
          <input
            type="date"
            id="expireDate"
            name="expireDate"
            value={formData.expireDate}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-[#122031] dark:text-white"
          />
        </div>

        <div className="mt-6 flex justify-between">
          <button
            type="button"
            onClick={handleCancel}
            className="w-32 rounded-md bg-gray-500 px-4 py-2 text-white hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="w-32 rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
