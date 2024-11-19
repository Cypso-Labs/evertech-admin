"use client";

import React, { useState, useEffect, FormEvent } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { IoIosArrowDropleft } from "react-icons/io";
import Link from "next/link";
import Swal from "sweetalert2";
import { useUpdateCategoryMutation } from "../../app/redux/features/categoryApiSlice";

const EditCategory = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [updateCategory, { isLoading }] = useUpdateCategoryMutation();

  const [formData, setFormData] = useState({
    id: "",
    service: "",
    category: "",
    description: "",
  });

  useEffect(() => {
    const categoryId = searchParams.get("id");
    if (categoryId) {
      setFormData({
        id: categoryId,
        service: searchParams.get("service") || "",
        category: searchParams.get("category") || "",
        description: searchParams.get("description") || "",
      });
    } else {
      router.push("/services/category"); 
    }
  }, [searchParams, router]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.category || !formData.description) {
      return Swal.fire({
        title: "Error!",
        text: "Please fill out all fields.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }

    try {
      const result = await updateCategory({
        id: formData.id,
        name: formData.category,
        description: formData.description,
      }).unwrap();

      await Swal.fire({
        title: "Success!",
        text: "Category has been edited successfully",
        icon: "success",
        confirmButtonText: "OK",
        confirmButtonColor: "#08762D",
        customClass: {
          popup: "dark:bg-slate-800 dark:text-white",
        },
      });

      router.push("/services/category");
    } catch (error: any) {
      Swal.fire({
        title: "Error!",
        text:
          error?.data?.message ||
          "Something went wrong while editing the category",
        icon: "error",
        confirmButtonText: "OK",
        confirmButtonColor: "#FF2323",
        customClass: {
          popup: "dark:bg-slate-800 dark:text-white",
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
        popup: "dark:bg-slate-800 dark:text-white",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        router.push("/services/category");
      }
    });
  };

  return (
    <div className="min-h-screen p-8">
      <div className="mb-12 flex items-center justify-between">
        <h1 className="flex items-center text-4xl font-medium text-slate-700 dark:text-white">
          <Link href="/services/category">
            <span className="inline-block">
              <IoIosArrowDropleft className="h-10 w-10 transform cursor-pointer transition-all duration-200 hover:scale-110 hover:text-blue-500" />
            </span>
          </Link>
          <span className="ml-2">Edit Category #{formData.id.slice(-5)}</span>
        </h1>
      </div>

      <div className="rounded-lg bg-white p-8 shadow-lg transition-all duration-300 dark:bg-slate-800">
        <form onSubmit={handleSubmit} className="max-w-2xl space-y-8">
          <div className="space-y-3">
            <label className="block text-2xl font-medium text-slate-700 dark:text-white">
              Category Name
            </label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              disabled={isLoading}
              className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-lg shadow-sm transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:focus:ring-blue-900"
            />
          </div>

          <div className="space-y-3">
            <label className="block text-2xl font-medium text-slate-700 dark:text-white">
              Category Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              disabled={isLoading}
              className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-lg shadow-sm transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:focus:ring-blue-900"
            />
          </div>

          <div className="flex justify-end space-x-4 pt-4">
            <button
              type="button"
              onClick={handleCancel}
              className="group relative flex h-12 w-32 items-center justify-center rounded-lg bg-red-100 text-lg font-medium text-red-600 shadow-sm transition-all duration-200 hover:scale-105 hover:bg-red-600 hover:text-white dark:bg-red-900/30 dark:text-red-400 dark:hover:bg-red-600 dark:hover:text-white"
            >
              Discard
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative flex h-12 w-32 items-center justify-center rounded-lg bg-green-100 text-lg font-medium text-green-600 shadow-sm transition-all duration-200 hover:scale-105 hover:bg-green-600 hover:text-white dark:bg-green-900/30 dark:text-green-400 dark:hover:bg-green-600 dark:hover:text-white"
            >
              {isLoading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCategory;
