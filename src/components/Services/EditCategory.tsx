"use client";
import React, { useState, useEffect, FormEvent } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { IoIosArrowDropleft } from "react-icons/io";
import Link from "next/link";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { updateCategory } from "../../app/redux/slices/catogarySlice";
import { RootState, AppDispatch } from "../../app/redux/store/store";

const EditCategory = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useDispatch<AppDispatch>(); // Using AppDispatch for correct type
  const { loading, error } = useSelector(
    (state: RootState) => state.categories,
  );

  const [formData, setFormData] = useState({
    id: "",
    service: "",
    category: "",
    description: "",
  });

  useEffect(() => {
    if (searchParams) {
      setFormData({
        id: searchParams.get("id") || "",
        service: searchParams.get("service") || "",
        category: searchParams.get("category") || "",
        description: searchParams.get("description") || "",
      });
    }
  }, [searchParams]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const result = await dispatch(
        updateCategory({
          id: formData.id,
          data: {
            name: formData.category,
            description: formData.description,
          },
        }),
      ).unwrap();

      await Swal.fire({
        title: "Success!",
        text: "Category has been edited successfully",
        icon: "success",
        confirmButtonText: "OK",
        confirmButtonColor: "#08762D",
        customClass: {
          popup: "dark:bg-[#122031] dark:text-white",
        },
      });

      router.push("/services/category");
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text:
          error?.toString() ||
          "Something went wrong while editing the category",
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
        router.push("/services/category");
      }
    });
  };

  return (
    <div>
      <div className="relative mb-15 flex items-center gap-4 space-x-[400px]">
        <h1 className="flex items-center text-4xl font-medium text-slate-600 dark:text-white">
          <Link href="/services/category">
            <span className="inline-block">
              <IoIosArrowDropleft className="h-10 w-10 cursor-pointer hover:text-[#3584FA]" />
            </span>
          </Link>
          <span>Edit Category #{formData.id.slice(-5)}</span>
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="w-1/2 space-y-6">
        <div className="space-y-2">
          <label className="block text-[24px] text-gray-500 dark:text-white">
            Category Name
          </label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="h-[36px] w-[520px] rounded-md border border-gray-300 dark:bg-[#122031] dark:text-white"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-[24px] text-gray-500 dark:text-white">
            Category Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="w-[520px] rounded-md border border-gray-300 dark:bg-[#122031] dark:text-white"
          />
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={handleCancel}
            className="h-[40px] w-[100px] rounded-md bg-[#FFCDCD] text-[#FF2323] hover:bg-[#FF2323] dark:bg-red-600"
          >
            Discard
          </button>
          <button
            type="submit"
            disabled={loading === "pending"}
            className="h-[40px] w-[100px] rounded-md bg-[#BCFFC8] text-[#08762D] hover:bg-[#08762D]"
          >
            {loading === "pending" ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditCategory;
