"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import { IoIosArrowDropleft } from "react-icons/io";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Swal from "sweetalert2";
import { useCreateJobMutation } from "@/app/redux/features/jobApiSlice";

const NewJob = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: "",
    location: "",
    type: "",
    description: "",
    key_Responsibility: "",
    qualifications: "",
  });

  const [createJob, { isLoading }] = useCreateJobMutation();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.location || !formData.type) {
      Swal.fire("Error", "Please fill in all required fields", "error");
      return;
    }

    try {
      await createJob(formData as any).unwrap();
      Swal.fire("Success", "Job created successfully", "success");
      router.push("/jobs");
    } catch (error) {
      Swal.fire("Error", "Failed to create job", "error");
    }
  };

  return (
    <div className="p-6">
      <div className="mb-20 flex items-center">
        <Link href="/jobs">
          <IoIosArrowDropleft className="h-10 w-10 cursor-pointer text-slate-600 hover:text-[#3584FA] dark:text-white" />
        </Link>
        <h1 className="ml-4 text-4xl font-medium text-slate-600 dark:text-white">New Job</h1>
      </div>

      <form className="w-full max-w-4xl" onSubmit={handleSubmit}>
        <div className="space-y-6">
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Job Title"
            className="w-full rounded-lg border p-3 focus:ring-2 focus:ring-blue-500 dark:bg-[#122031] dark:text-white dark:border-gray-600"
          />
          <input
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Location"
            className="w-full rounded-lg border p-3 focus:ring-2 focus:ring-blue-500 dark:bg-[#122031] dark:text-white dark:border-gray-600"
          />
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full rounded-lg border p-3 focus:ring-2 focus:ring-blue-500 dark:bg-[#122031] dark:text-white dark:border-gray-600"
          >
            <option value="">Select Job Type</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Remote">Remote</option>
          </select>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            className="w-full rounded-lg border p-3 focus:ring-2 focus:ring-blue-500 dark:bg-[#122031] dark:text-white dark:border-gray-600"
          />
          <textarea
            name="key_Responsibility" // Fix typo in name
            value={formData.key_Responsibility} // Update state variable to match name
            onChange={handleChange} // This remains the same
            placeholder="Key Responsibilities"
            className="w-full rounded-lg border p-3 focus:ring-2 focus:ring-blue-500 dark:bg-[#122031] dark:text-white dark:border-gray-600"
          />
          <textarea
            name="qualifications"
            value={formData.qualifications}
            onChange={handleChange}
            placeholder="Qualifications"
            className="w-full rounded-lg border p-3 focus:ring-2 focus:ring-blue-500 dark:bg-[#122031] dark:text-white dark:border-gray-600"
          />
        </div>

        <div className="mt-8 flex space-x-4">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-lg bg-green-500 px-6 py-3 font-medium text-white transition hover:bg-green-600 sm:w-auto dark:bg-green-600 dark:hover:bg-green-700"
          >
            {isLoading ? "Creating..." : "Create Job"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewJob;
