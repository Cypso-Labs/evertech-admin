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
    <div className="min-h-screen p-8">
      <div className="mb-12 flex items-center justify-between">
        <h1 className="flex items-center text-4xl font-medium text-slate-700 dark:text-white">
          <Link href="/services/category">
            <IoIosArrowDropleft className="h-10 w-10 cursor-pointer" />
          </Link>
          <span className="ml-2">Edit Category #{formData.id.slice(-5)}</span>
        </h1>
      </div>

      <div className="rounded-lg bg-white p-8 shadow-lg dark:bg-slate-800">
        <form onSubmit={handleSubmit} className="max-w-2xl space-y-8">
          <div>
            <label className="block text-2xl font-medium">Category Name</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              disabled={isLoading}
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-2xl font-medium">
              Category Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              disabled={isLoading}
            />
          </div>

          <div className="flex justify-end">
            <button type="button" onClick={handleCancel}>
              Discard
            </button>
            <button type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCategory;
