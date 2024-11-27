"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import { IoIosArrowDropleft } from "react-icons/io";
import Link from "next/link";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { useCreateServiceMutation } from "@/app/redux/features/serviceApiSlice";
import { useGetAllCategoriesQuery } from "@/app/redux/features/categoryApiSlice";
import type { Service, Category } from "@/types";

interface ServiceFormData {
  name: string;
  category_id: string;
  price: string;
  opt_expire_date: string;
}

const CreateService: React.FC = () => {
  const router = useRouter();
  const [createService, { isLoading, error }] = useCreateServiceMutation();
  const { data: categories = [] } = useGetAllCategoriesQuery();

  const [formData, setFormData] = useState<ServiceFormData>({
    name: "",
    category_id: "",
    price: "",
    opt_expire_date: new Date().toISOString().split("T")[0],
  });

  const [errors, setErrors] = useState<Partial<ServiceFormData>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<ServiceFormData> = {};
    if (!formData.name) newErrors.name = "Service name is required.";
    if (!formData.price) newErrors.price = "Price is required.";
    if (!formData.category_id) newErrors.category_id = "Category is required.";
    if (!formData.opt_expire_date)
      newErrors.opt_expire_date = "Expire date is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    // Clear specific error when user starts typing/selecting
    if (errors[name as keyof ServiceFormData]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: undefined,
      }));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const response = await createService({
        ...formData,
        opt_expire_date: new Date(formData.opt_expire_date),
      }).unwrap();

      await Swal.fire({
        title: "Success!",
        text: "Service has been created successfully",
        icon: "success",
        confirmButtonText: "OK",
        confirmButtonColor: "#16a34a", // Tailwind green-600
        customClass: {
          popup: "dark:bg-[#122031] dark:text-white",
          confirmButton: "bg-green-600 text-white hover:bg-green-700",
        },
      });

      router.push("/services");
    } catch (error: any) {
      console.error("Service creation error:", error);
    
      Swal.fire({
        title: "Error!",
        text: error.message || "Failed to create service. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
        confirmButtonColor: "#EF4444", // Tailwind red-600
        customClass: {
          popup: "dark:bg-[#122031] dark:text-white",
        },
      });
    }
  };

  const handleCancel = () => {
    if (
      formData.name ||
      formData.category_id ||
      formData.price ||
      formData.opt_expire_date !== new Date().toISOString().split("T")[0]
    ) {
      Swal.fire({
        title: "Are you sure?",
        text: "You'll lose all entered data!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, cancel",
        cancelButtonText: "No, keep editing",
        confirmButtonColor: "#EF4444", // Tailwind red-600
        cancelButtonColor: "#16a34a", // Tailwind green-600
        customClass: {
          popup: "dark:bg-[#122031] dark:text-white",
        },
      }).then((result) => {
        if (result.isConfirmed) {
          router.push("/services");
        }
      });
    } else {
      router.push("/services");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex items-center gap-4">
        <Link href="/services" className="inline-block">
          <IoIosArrowDropleft
            className="h-10 w-10 text-slate-600 transition-colors hover:text-blue-500 dark:text-white"
            aria-label="Back to Services"
          />
        </Link>
        <h1 className="text-3xl font-medium text-slate-600 dark:text-white">
          New Service
        </h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mx-auto max-w-2xl space-y-6 rounded-lg bg-white p-8 shadow-md dark:bg-[#1e293b]"
      >
        <div className="form-group">
          <label
            htmlFor="name"
            className="mb-2 block text-lg font-medium text-gray-700 dark:text-white"
          >
            Service Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter service name"
            className={`w-full rounded-md border px-3 py-2 
              ${errors.name ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"}
              dark:bg-[#122031] dark:text-white`}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-500">{errors.name}</p>
          )}
        </div>

        <div className="form-group">
          <label
            htmlFor="price"
            className="mb-2 block text-lg font-medium text-gray-700 dark:text-white"
          >
            Price
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Enter price"
            className={`w-full rounded-md border px-3 py-2 
              ${errors.price ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"}
              dark:bg-[#122031] dark:text-white`}
          />
          {errors.price && (
            <p className="mt-1 text-sm text-red-500">{errors.price}</p>
          )}
        </div>

        <div className="form-group">
          <label
            htmlFor="category_id"
            className="mb-2 block text-lg font-medium text-gray-700 dark:text-white"
          >
            Category
          </label>
          <select
            id="category_id"
            name="category_id"
            value={formData.category_id}
            onChange={handleChange}
            className={`w-full rounded-md border px-3 py-2 
              ${errors.category_id ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"}
              dark:bg-[#122031] dark:text-white`}
          >
            <option value="">Select Category</option>
            {categories.map((category: Category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
          {errors.category_id && (
            <p className="mt-1 text-sm text-red-500">{errors.category_id}</p>
          )}
        </div>

        <div className="form-group">
          <label
            htmlFor="opt_expire_date"
            className="mb-2 block text-lg font-medium text-gray-700 dark:text-white"
          >
            Expire Date
          </label>
          <input
            type="date"
            id="opt_expire_date"
            name="opt_expire_date"
            value={formData.opt_expire_date}
            onChange={handleChange}
            min={new Date().toISOString().split("T")[0]}
            className={`w-full rounded-md border px-3 py-2
              ${errors.opt_expire_date ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"}
              dark:bg-[#122031] dark:text-white`}
          />
          {errors.opt_expire_date && (
            <p className="mt-1 text-sm text-red-500">
              {errors.opt_expire_date}
            </p>
          )}
        </div>

        <div className="flex justify-end space-x-4 pt-4">
          <button
            type="button"
            onClick={handleCancel}
            className="rounded-md bg-red-500 px-6 py-2 text-white transition hover:bg-red-600"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="rounded-md bg-green-600 px-6 py-2 text-white transition hover:bg-green-700"
          >
            {isLoading ? "Creating..." : "Create Service"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateService;
