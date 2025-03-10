"use client";
import React, { useState, useEffect, ChangeEvent, FormEvent, Suspense } from "react";
import { IoIosArrowDropleft } from "react-icons/io";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useGetJobByIdQuery, useUpdateJobMutation } from "@/app/redux/features/jobApiSlice";
import Swal from "sweetalert2";

const EditJobPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const jobId = searchParams.get("id");

  const { data: job, isLoading, isError } = useGetJobByIdQuery(jobId || "");
  const [updateJob, { isLoading: isUpdating }] = useUpdateJobMutation();

  const [formData, setFormData] = useState({
    jobId: jobId || "",
    title: "",
    location: "",
    type: "" as "Full-time" | "Part-time" | "Contract" | "Internship", // Correct typing
    description: "",
    key_Responsibility: "",
    qualifications: "",
  });

  useEffect(() => {
    if (job) {
      setFormData({
        jobId: job._id,
        title: job.title,
        location: job.location,
        type: job.type,
        description: job.description || "",
        key_Responsibility: job.key_Responsibility || "",
        qualifications: job.qualifications || "",
      });
    }
  }, [job]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    if (!jobId) {
      Swal.fire("Error", "Invalid job ID", "error");
      return;
    }
  
    try {
      // Remove jobId from formData spread and pass it separately
      await updateJob({ ...formData, jobId }).unwrap();
      Swal.fire("Success", "Job updated successfully", "success");
      router.push("/jobs");
    } catch (error) {
      Swal.fire("Error", "Failed to update job", "error");
    }
  };
  

  const handleCancel = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Unsaved changes will be lost.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, cancel",
      cancelButtonText: "No, keep editing",
    }).then((result) => {
      if (result.isConfirmed) {
        router.push("/jobs");
      }
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-12 flex items-center space-x-4">
        <Link href="/jobs" className="group">
          <IoIosArrowDropleft className="h-10 w-10 text-gray-500 transition-colors group-hover:text-blue-500 dark:text-white" />
        </Link>
        <h1 className="text-3xl font-semibold text-gray-700 dark:text-white">Edit Job</h1>
      </div>

      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto bg-white dark:bg-[#122031] p-8 rounded-lg shadow-md">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label htmlFor="title" className="block mb-2 text-gray-700 font-medium dark:text-white">Job Title</label>
            <input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Job Title"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-[#122031] dark:text-white dark:border-gray-600"
            />
          </div>

          <div>
            <label htmlFor="location" className="block mb-2 text-gray-700 font-medium dark:text-white">Location</label>
            <input
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Location"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-[#122031] dark:text-white dark:border-gray-600"
            />
          </div>

          <div>
            <label htmlFor="type" className="block mb-2 text-gray-700 font-medium dark:text-white">Job Type</label>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-[#122031] dark:text-white dark:border-gray-600"
            >
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
              <option value="Internship">Internship</option>
            </select>
          </div>
        </div>

        <div className="mt-4">
          <label htmlFor="description" className="block mb-2 text-gray-700 font-medium dark:text-white">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-[#122031] dark:text-white dark:border-gray-600"
          />
        </div>

        <div className="mt-4">
          <label htmlFor="key_responsibility" className="block mb-2 text-gray-700 font-medium dark:text-white">Key Responsibilities</label>
          <textarea
            id="key_responsibility"
            name="key_Responsibility" // Fixed typo
            value={formData.key_Responsibility}
            onChange={handleChange}
            placeholder="Key Responsibilities"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-[#122031] dark:text-white dark:border-gray-600"
          />
        </div>

        <div className="mt-4">
          <label htmlFor="qualifications" className="block mb-2 text-gray-700 font-medium dark:text-white">Qualifications</label>
          <textarea
            id="qualifications"
            name="qualifications"
            value={formData.qualifications}
            onChange={handleChange}
            placeholder="Qualifications"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-[#122031] dark:text-white dark:border-gray-600"
          />
        </div>

        <div className="mt-8 flex space-x-4">
          <button
            type="button"
            onClick={handleCancel}
            className="w-full sm:w-auto px-6 py-3 bg-red-500 text-white font-medium rounded-lg hover:bg-red-600 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isUpdating}
            className="w-full sm:w-auto px-6 py-3 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 transition"
          >
            {isUpdating ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
};

const EditJob = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EditJobPage />
    </Suspense>
  );
};

export default EditJob;
