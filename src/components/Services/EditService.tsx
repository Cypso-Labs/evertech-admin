"use client";

import React, { useState, useEffect, FormEvent, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { IoIosArrowDropleft } from "react-icons/io";
import Link from "next/link";
import Swal from "sweetalert2";
import {
  useGetServiceByIdQuery,
  useGetAllServicesQuery,
  useUpdateServiceMutation,
} from "@/app/redux/features/serviceApiSlice";
import { useGetAllCategoriesQuery } from "@/app/redux/features/categoryApiSlice";
import { Category } from "@/types"; // Assuming you have a Category type

const  EditService = () => {
  
  const router = useRouter();
  const searchParams = useSearchParams();
  const serviceId = searchParams.get("id");

  // Hooks must always be called unconditionally at the top level
  const {
    data: service,
    isLoading: isServiceLoading,
    error: serviceError,
  } = useGetServiceByIdQuery(serviceId || "");
  const {
    data: categories,
    isLoading: isCategoriesLoading,
    error: categoriesError,
  } = useGetAllCategoriesQuery();
  const { data, isLoading, isError, error } = useGetAllServicesQuery();
  const [updateService, { isLoading: isUpdating }] = useUpdateServiceMutation();

  const [formData, setFormData] = useState({
    id: "",
    service: "",
    category: "",
  });

  // Effect to initialize form data when service data changes
  useEffect(() => {
    if (data && serviceId) {
      const serviceData = data.find((s) => s._id === serviceId);
      if (serviceData) {
        setFormData({
          id: serviceData._id,
          service: serviceData.name,
          category: serviceData.category_id,
        });
      }
    }
  }, [data, serviceId]);

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
    const payload = {
      id: formData.id,
      name: formData.service,
      category_id: formData.category,
     
    };
    try {
      await updateService(payload);
      await Swal.fire({
        title: "Success!",
        text: "Service has been edited successfully",
        icon: "success",
        confirmButtonText: "OK",
        confirmButtonColor: "#08762D",
        customClass: {
          popup: "dark:bg-[#122031] dark:text-white",
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

  const handleCancel = async () => {
    const result = await Swal.fire({
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
    });
    if (result.isConfirmed) {
      router.push("/services");
    }
  };

  if (!serviceId) {
    router.push("/services");
    return null;
  }

  if (isServiceLoading || isCategoriesLoading) return <p>Loading...</p>;
  if (serviceError || categoriesError) return <p>Error loading data.</p>;

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
            className="h-10 rounded-md border border-gray-300 bg-white p-2 dark:bg-[#1E293B] dark:text-white"
          >
            <option value="">Select Category</option>
            {categories &&
              categories.map((category: Category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
          </select>
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
            className="h-10 w-36 rounded-md bg-[#BCFFC8] px-4 py-2 text-[#08762D] transition-colors duration-200 hover:bg-[#08762D] hover:text-[#BCFFC8] dark:bg-green-600 dark:text-white dark:hover:bg-green-700"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
const EditServicePage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EditService />
    </Suspense>
  );
}

export default EditServicePage;
