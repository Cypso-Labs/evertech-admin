"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import { IoIosArrowDropleft } from "react-icons/io";
import Link from "next/link";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { useCreateServiceMutation } from "@/app/redux/features/serviceApiSlice";

// Dedicated type for form data
interface FormData {
  name: string;
  service_id: string;
  description: string;
  code: string;
}

const CreateService: React.FC = () => {
  const router = useRouter();
  const [createService, { isLoading }] = useCreateServiceMutation();

  const [formData, setFormData] = useState<FormData>({
    name: "",
    service_id: "",
    description: "",
    code: "",
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});

  // Validate form input
  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};
    if (!formData.name) newErrors.name = "Service name is required.";
    if (!formData.description)
      newErrors.description = "Description is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle input changes
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    // Clear errors dynamically
    if (errors[name as keyof FormData]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: undefined,
      }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      await createService(formData).unwrap();

      await Swal.fire({
        title: "Success!",
        text: "Service has been created successfully.",
        icon: "success",
        confirmButtonText: "OK",
        confirmButtonColor: "#16a34a",
        customClass: {
          popup: "dark:bg-[#122031] dark:text-white",
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
        confirmButtonColor: "#EF4444",
        customClass: {
          popup: "dark:bg-[#122031] dark:text-white",
        },
      });
    }
  };

  // Handle cancel action
  const handleCancel = () => {
    if (formData.name || formData.description) {
      Swal.fire({
        title: "Are you sure?",
        text: "You'll lose all entered data!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, cancel",
        cancelButtonText: "No, keep editing",
        confirmButtonColor: "#EF4444",
        cancelButtonColor: "#16a34a",
        customClass: {
          popup: "dark:bg-[#122031] dark:text-white",
        },
      }).then((result) => {
        if (result.isConfirmed) router.push("/services");
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
            htmlFor="code"
            className="mb-2 block text-lg font-medium text-gray-700 dark:text-white"
          >
            Code
          </label>
          <input
            type="text"
            id="code"
            name="code"
            value={formData.code}
            onChange={handleChange}
            placeholder="Enter service code"
            className={`w-full rounded-md border px-3 py-2 
              ${errors.code ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"}
              dark:bg-[#122031] dark:text-white`}
          />
          {errors.code && (
            <p className="mt-1 text-sm text-red-500">{errors.code}</p>
          )}
        </div>

        <div className="form-group">
          <label
            htmlFor="description"
            className="mb-2 block text-lg font-medium text-gray-700 dark:text-white"
          >
            Description
          </label>
          <input
            type="text"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter service description"
            className={`w-full rounded-md border px-3 py-2 
              ${errors.description ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"}
              dark:bg-[#122031] dark:text-white`}
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-500">{errors.description}</p>
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
