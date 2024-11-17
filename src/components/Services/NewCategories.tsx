"use client";
import React, { useState, ChangeEvent, FormEvent, useCallback } from "react";
import { IoIosArrowDropleft } from "react-icons/io";
import Link from "next/link";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "../../app/redux/hooks";
import { createCategory } from "../../app/redux/slices/catogarySlice";
import { RootState } from "../../app/redux/store/store";

// Type definition for form data
interface FormData {
  categoryName: string;
  categoryDescription: string;
}

const NewCategories = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state: RootState) => state.categories);

  // Form data state
  const [formData, setFormData] = useState<FormData>({
    categoryName: "",
    categoryDescription: "",
  });

  // Handle input changes
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

  // Handle form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // Dispatch the create category action
      const result = await dispatch(
        createCategory({
          name: formData.categoryName.trim(),
          description: formData.categoryDescription.trim(),
        }),
      ).unwrap();

      // Show success alert
      await Swal.fire({
        title: "Success!",
        text: `Category "${result.name}" created successfully`,
        icon: "success",
        confirmButtonColor: "#08762D",
      });

      // Reset the form and navigate back
      setFormData({
        categoryName: "",
        categoryDescription: "",
      });
      router.replace("/services/category");
    } catch (error: any) {
      Swal.fire({
        title: "Error",
        text: error || "An error occurred during category creation",
        icon: "error",
        confirmButtonColor: "#FF2323",
      });
    }
  };

  // Cancel action handler
  const handleCancel = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will lose any unsaved data!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#FF2323",
      cancelButtonColor: "#08762D",
      confirmButtonText: "Yes, Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        router.replace("/services/category");
      }
    });
  };

  return (
    <div>
      <div className="mb-15 flex items-center gap-4">
        <Link href="/services/category">
          <IoIosArrowDropleft className="mr-2 h-10 w-10 cursor-pointer hover:text-[#3584FA]" />
        </Link>
        <h1 className="text-4xl font-medium text-slate-600 dark:text-white">
          New Category
        </h1>
      </div>

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4">
          <label className="text-lg text-gray-700 dark:text-white">
            Category Name
          </label>
          <input
            type="text"
            name="categoryName"
            value={formData.categoryName}
            onChange={handleChange}
            className="rounded-md border bg-white p-2 dark:bg-[#122031]"
            required
            disabled={loading === "pending"}
            aria-disabled={loading === "pending"}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <label className="text-lg text-gray-700 dark:text-white">
            Category Description
          </label>
          <textarea
            name="categoryDescription"
            value={formData.categoryDescription}
            onChange={handleChange}
            rows={4}
            className="rounded-md border bg-white p-2 dark:bg-[#122031]"
            required
            disabled={loading === "pending"}
            aria-disabled={loading === "pending"}
          />
        </div>

        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={handleCancel}
            className="rounded-md bg-red-600 px-4 py-2 text-white hover:bg-red-700"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading === "pending"}
            className="rounded-md bg-green-600 px-4 py-2 text-white hover:bg-green-700"
          >
            {loading === "pending" ? "Creating..." : "Create Category"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewCategories;
