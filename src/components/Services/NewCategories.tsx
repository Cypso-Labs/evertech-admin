"use client";

import React, { useState, ChangeEvent, FormEvent, useCallback } from "react";
import { IoIosArrowDropleft } from "react-icons/io";
import Link from "next/link";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { useCreateCategoryMutation } from "../../app/redux/features/categoryApiSlice"; 

interface FormData {
  categoryName: string;
  categoryDescription: string;
}

const NewCategories = () => {
  const router = useRouter();
  const [createCategory, { isLoading }] = useCreateCategoryMutation(); 

  const [formData, setFormData] = useState<FormData>({
    categoryName: "",
    categoryDescription: "",
  });

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    },
    [],
  );

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {

      const result = await createCategory({
        name: formData.categoryName.trim(),
        description: formData.categoryDescription.trim(),
      }).unwrap();

      await Swal.fire({
        title: "Success!",
        text: `Category "${result.name}" created successfully`,
        icon: "success",
        confirmButtonColor: "#08762D",
        customClass: {
          popup: "dark:bg-slate-800 dark:text-white",
        },
      });
  
      setFormData({
        categoryName: "",
        categoryDescription: "",
      });
      router.replace("/services/category");
    } catch (error: any) {

      Swal.fire({
        title: "Error",
        text: error?.message || "An error occurred during category creation",
        icon: "error",
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
      text: "You will lose any unsaved data!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#FF2323",
      cancelButtonColor: "#08762D",
      confirmButtonText: "Yes, Cancel",
      customClass: {
        popup: "dark:bg-slate-800 dark:text-white",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        router.replace("/services/category");
      }
    });
  };

  return (
    <div className="min-h-screen p-8">
      <div className="mb-12 flex items-center">
        <Link href="/services/category">
          <IoIosArrowDropleft className="h-10 w-10 transform cursor-pointer transition-all duration-200 hover:scale-110 hover:text-blue-500" />
        </Link>
        <h1 className="text-4xl font-medium text-slate-700 dark:text-white">
          New Category
        </h1>
      </div>

      <div className="rounded-lg bg-white p-8 shadow-lg transition-all duration-300 dark:bg-slate-800">
        <form className="max-w-2xl space-y-8" onSubmit={handleSubmit}>
          <div className="space-y-3">
            <label className="block text-2xl font-medium text-slate-700 dark:text-white">
              Category Name
            </label>
            <input
              type="text"
              name="categoryName"
              value={formData.categoryName}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-lg shadow-sm transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 disabled:cursor-not-allowed disabled:opacity-60 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:focus:ring-blue-900"
              required
              disabled={isLoading}
              aria-disabled={isLoading}
              placeholder="Enter category name"
            />
          </div>

          <div className="space-y-3">
            <label className="block text-2xl font-medium text-slate-700 dark:text-white">
              Category Description
            </label>
            <textarea
              name="categoryDescription"
              value={formData.categoryDescription}
              onChange={handleChange}
              rows={4}
              className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-lg shadow-sm transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 disabled:cursor-not-allowed disabled:opacity-60 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:focus:ring-blue-900"
              required
              disabled={isLoading}
              aria-disabled={isLoading}
              placeholder="Enter category description"
            />
          </div>

          <div className="flex justify-end space-x-4 pt-4">
            <button
              type="button"
              onClick={handleCancel}
              className="group relative flex h-12 w-32 items-center justify-center rounded-lg bg-red-100 text-lg font-medium text-red-600 shadow-sm transition-all duration-200 hover:scale-105 hover:bg-red-600 hover:text-white dark:bg-red-900/30 dark:text-red-400 dark:hover:bg-red-600 dark:hover:text-white"
            >
              <span className="absolute inset-0 transform transition-transform duration-200 group-hover:scale-105"></span>
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative flex h-12 w-48 items-center justify-center rounded-lg bg-green-100 text-lg font-medium text-green-600 shadow-sm transition-all duration-200 hover:scale-105 hover:bg-green-600 hover:text-white disabled:cursor-not-allowed disabled:opacity-60 dark:bg-green-900/30 dark:text-green-400 dark:hover:bg-green-600 dark:hover:text-white"
            >
              <span className="absolute inset-0 transform transition-transform duration-200 group-hover:scale-105"></span>
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                  <span>Creating...</span>
                </div>
              ) : (
                "Create Category"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewCategories;
