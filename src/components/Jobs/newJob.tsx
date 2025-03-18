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
    key_Responsibility: [] as string[],
    qualifications: [] as string[],
  });

  const [newResponsibility, setNewResponsibility] = useState("");
  const [newQualification, setNewQualification] = useState("");

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

  const addItem = (field: "key_Responsibility" | "qualifications", value: string) => {
    if (!value.trim()) return;
    setFormData((prevState) => ({
      ...prevState,
      [field]: [...prevState[field], value],
    }));
    if (field === "key_Responsibility") setNewResponsibility("");
    if (field === "qualifications") setNewQualification("");
  };

  const removeItem = (field: "key_Responsibility" | "qualifications", index: number) => {
    setFormData((prevState) => ({
      ...prevState,
      [field]: prevState[field].filter((_, i) => i !== index),
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

          {/* Key Responsibilities */}
          <div>
            <h2 className="mb-2 text-lg font-medium text-slate-600 dark:text-white">Key Responsibilities</h2>
            <div className="flex">
              <input
                value={newResponsibility}
                onChange={(e) => setNewResponsibility(e.target.value)}
                placeholder="Add responsibility"
                className="w-full rounded-lg border p-3 focus:ring-2 focus:ring-blue-500 dark:bg-[#122031] text-black dark:text-white dark:border-gray-600"
              />
              <button
                type="button"
                onClick={() => addItem("key_Responsibility", newResponsibility)}
                className="ml-2 rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
              >
                Add
              </button>
            </div>
            <ul className="mt-2 list-disc pl-6 text-white">
              {formData.key_Responsibility.map((item, index) => (
                <li key={index} className="flex justify-between text-black dark:text-white">
                  {item}
                  <button
                    type="button"
                    onClick={() => removeItem("key_Responsibility", index)}
                    className="ml-2 text-red-500 hover:text-red-700"
                  >
                    ✕
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Qualifications */}
          <div>
            <h2 className="mb-2 text-lg font-medium text-slate-600 dark:text-white">Qualifications</h2>
            <div className="flex">
              <input
                value={newQualification}
                onChange={(e) => setNewQualification(e.target.value)}
                placeholder="Add qualification"
                className="w-full rounded-lg border p-3 focus:ring-2 focus:ring-blue-500 dark:bg-[#122031] dark:text-white dark:border-gray-600"
              />
              <button
                type="button"
                onClick={() => addItem("qualifications", newQualification)}
                className="ml-2 rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
              >
                Add
              </button>
            </div>
            <ul className="mt-2 list-disc pl-6 text-black dark:text-white">
              {formData.qualifications.map((item, index) => (
                <li key={index} className="flex justify-between">
                  {item}
                  <button
                    type="button"
                    onClick={() => removeItem("qualifications", index)}
                    className="ml-2 text-red-500 hover:text-red-700"
                  >
                    ✕
                  </button>
                </li>
              ))}
            </ul>
          </div>
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
