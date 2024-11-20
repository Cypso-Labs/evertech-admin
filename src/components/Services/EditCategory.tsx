"use client";
import React, { useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { IoIosArrowDropleft } from "react-icons/io";
import Link from "next/link";
import Swal from "sweetalert2";
import { useUpdateCategoryMutation } from "../../app/redux/features/categoryApiSlice";

const EditCategory: React.FC = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    id: "",
    service: "",
    category: "",
    description: "",
  });

  const [updateCategory, { isLoading }] = useUpdateCategoryMutation();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const searchParams = new URLSearchParams(window.location.search);
      const id = searchParams.get("id") || "";
      const service = searchParams.get("service") || "";
      const category = searchParams.get("category") || "";
      const description = searchParams.get("description") || "";

      if (!id) {
        router.push("/services/category");
      } else {
        setFormData({ id, service, category, description });
      }
    }
  }, [router]);

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
      await updateCategory({
        id: formData.id,
        name: formData.category,
        description: formData.description,
      }).unwrap();

      Swal.fire({
        title: "Success!",
        text: "Category has been edited successfully",
        icon: "success",
        confirmButtonText: "OK",
        confirmButtonColor: "#08762D",
      });

      router.push("/services/category");
    } catch (error: any) {
      Swal.fire({
        title: "Error!",
        text: error?.data?.message || "Something went wrong.",
        icon: "error",
        confirmButtonText: "OK",
        confirmButtonColor: "#FF2323",
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
    }).then((result) => {
      if (result.isConfirmed) {
        router.push("/services/category");
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8 dark:bg-slate-900">
      <div className="mb-12 flex items-center justify-between">
        <h1 className="flex items-center text-4xl font-medium text-slate-700 dark:text-white">
          <Link
            href="/services/category"
            className="transition-transform duration-200 hover:scale-110"
          >
            <IoIosArrowDropleft className="h-10 w-10 cursor-pointer text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300" />
          </Link>
          <span className="ml-2">Edit Category #{formData.id.slice(-5)}</span>
        </h1>
      </div>

      <div className="rounded-lg bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-xl dark:bg-slate-800">
        <form onSubmit={handleSubmit} className="max-w-2xl space-y-8">
          <div className="space-y-2">
            <label className="block text-2xl font-medium text-gray-700 dark:text-gray-200">
              Category Name
            </label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              disabled={isLoading}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-700 
                       shadow-sm transition-all duration-200 focus:border-indigo-500 
                       focus:outline-none focus:ring-2 focus:ring-indigo-500/50 
                       disabled:cursor-not-allowed disabled:bg-gray-100 disabled:opacity-75
                       dark:border-gray-600 dark:bg-slate-700 dark:text-white 
                       dark:focus:border-indigo-400 dark:focus:ring-indigo-400/50"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-2xl font-medium text-gray-700 dark:text-gray-200">
              Category Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              disabled={isLoading}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 
                       text-gray-700 shadow-sm transition-all duration-200 
                       focus:border-indigo-500 focus:outline-none focus:ring-2 
                       focus:ring-indigo-500/50 disabled:cursor-not-allowed 
                       disabled:bg-gray-100 disabled:opacity-75 dark:border-gray-600 
                       dark:bg-slate-700 dark:text-white dark:focus:border-indigo-400 
                       dark:focus:ring-indigo-400/50"
            />
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={handleCancel}
              className="rounded-lg bg-red-500 px-6 py-3 text-base font-semibold 
                       text-white shadow-sm transition-all duration-200 
                       hover:bg-red-600 hover:shadow-md focus:outline-none 
                       focus:ring-2 focus:ring-red-500/50 active:bg-red-700 
                       disabled:cursor-not-allowed disabled:opacity-75 
                       dark:bg-red-600 dark:hover:bg-red-700"
            >
              Discard
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="rounded-lg bg-indigo-600 px-6 py-3 text-base font-semibold 
                       text-white shadow-sm transition-all duration-200 
                       hover:bg-indigo-700 hover:shadow-md focus:outline-none 
                       focus:ring-2 focus:ring-indigo-500/50 active:bg-indigo-800 
                       disabled:cursor-not-allowed disabled:opacity-75 
                       dark:bg-indigo-500 dark:hover:bg-indigo-600"
            >
              {isLoading ? (
                <span className="flex items-center">
                  <svg
                    className="mr-2 h-4 w-4 animate-spin"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Saving...
                </span>
              ) : (
                "Save"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCategory;
