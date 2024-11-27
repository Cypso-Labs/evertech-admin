"use client";

import React, { useState, useEffect, FormEvent } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { IoIosArrowDropleft } from "react-icons/io";
import Link from "next/link";
import Swal from "sweetalert2";
import { useGetAllCategoriesQuery } from "@/app/redux/features/categoryApiSlice";
import {
  useGetServiceByIdQuery,
  useUpdateServiceMutation,
} from "@/app/redux/features/serviceApiSlice";

export default function EditService() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const serviceId = searchParams.get("id") || "";

  const { data: categories, isLoading: categoriesLoading } =
    useGetAllCategoriesQuery();
  const { data: service, isLoading: serviceLoading } =
    useGetServiceByIdQuery(serviceId);
  const [updateService, { isLoading: isUpdating }] = useUpdateServiceMutation();

  const [formData, setFormData] = useState({
    id: "",
    service: "",
    category: "",
    opt_expire_date: "",
  });

  const formatDate = (date: string | Date): string => {
    if (!date) return "";
    const parsedDate = typeof date === "string" ? new Date(date) : date;
    if (isNaN(parsedDate.getTime())) return "";
    return parsedDate.toISOString().split("T")[0];
  };

  useEffect(() => {
    if (service) {
      setFormData({
        id: service._id,
        service: service.name,
        category: service.category_id,
        opt_expire_date: formatDate(service.opt_expire_date),
      });
    }
  }, [service]);

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
      const payload = {
        id: formData.id,
        name: formData.service,
        opt_expire_date: formData.opt_expire_date
          ? new Date(formData.opt_expire_date)
          : undefined,
        category_id: formData.category,
      };

      await updateService(payload).unwrap();

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
      router.push(`/services`);
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

  if (categoriesLoading || serviceLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6">
      <div className="mb-8 flex items-center gap-4">
        <Link href="/services" className="inline-block">
          <IoIosArrowDropleft className="mr-2 h-10 w-10 cursor-pointer text-slate-600 hover:text-[#3584FA] dark:text-white" />
        </Link>
        <h1 className="font-inter text-4xl font-medium text-slate-600 dark:text-white">
          Edit Service #{formData.id.slice(-5)}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
        <div className="grid grid-cols-2 items-center gap-4">
          <label className="text-2xl font-medium text-gray-500 dark:text-white">
            Service ID
          </label>
          <input
            type="text"
            name="id"
            value={formData.id.slice(-5)}
            onChange={handleChange}
            disabled
            className="h-10 rounded-md border border-gray-300 bg-gray-100 p-2 dark:bg-[#1E293B] dark:text-white"
          />
        </div>

        <div className="grid grid-cols-2 items-center gap-4">
          <label className="text-2xl font-medium text-gray-500 dark:text-white">
            Service Name
          </label>
          <input
            type="text"
            name="service"
            value={formData.service}
            onChange={handleChange}
            className="h-10 rounded-md border border-gray-300 bg-white p-2 dark:bg-[#1E293B] dark:text-white"
          />
        </div>

        <div className="grid grid-cols-2 items-center gap-4">
          <label className="text-2xl font-medium text-gray-500 dark:text-white">
            Category
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="h-[36px] rounded-md border border-gray-300 bg-white p-2 dark:bg-[#122031] dark:text-white"
          >
            <option value="">Select Category</option>
            {categories?.map((category: any) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 items-center gap-4">
          <label className="text-2xl font-medium text-gray-500 dark:text-white">
            Expire Date
          </label>
          <input
            type="date"
            name="opt_expire_date"
            value={formData.opt_expire_date}
            onChange={handleChange}
            className="h-10 rounded-md border border-gray-300 bg-white p-2 dark:bg-[#1E293B] dark:text-white"
          />
        </div>

        <div className="mt-8 flex justify-end space-x-4">
          <button
            type="button"
            onClick={handleCancel}
            className="h-10 w-36 rounded-md bg-[#FFCDCD] px-4 py-2 text-[#FF2323] transition-colors duration-200 hover:bg-[#FF2323] hover:text-[#FFCDCD] dark:bg-red-600 dark:text-white dark:hover:bg-red-700"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isUpdating}
            className="h-10 w-36 rounded-md bg-[#BCFFC8] px-4 py-2 text-[#08762D] transition-colors duration-200 hover:bg-[#08762D] hover:text-[#BCFFC8] disabled:opacity-50 dark:bg-green-600 dark:text-white dark:hover:bg-green-700"
          >
            {isUpdating ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
