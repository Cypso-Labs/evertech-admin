"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { IoIosArrowDropleft } from "react-icons/io";
import Link from "next/link";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { useRegisterMutation } from "../../app/redux/features/authApi";

interface EmployeeFormData {
  _id: string;
  name: string;
  role: string;
  contact: string;
  address: string;
  gender: string;
  join_date: string;
}

const initialFormData: EmployeeFormData = {
  _id: "",
  name: "",
  role: "",
  contact: "",
  address: "",
  gender: "",
  join_date: "",
};

const NewEmployee = () => {
  const router = useRouter();
  const [registerEmployee] = useRegisterMutation();
  const [formData, setFormData] = useState<EmployeeFormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;

    // Basic form validation
    const requiredFields = [
      "name",
      "role",
      "contact",
      "address",
      "gender",
      "join_date",
    ];
    const missingFields = requiredFields.filter(
      (field) => !formData[field as keyof EmployeeFormData],
    );

    if (missingFields.length > 0) {
      await Swal.fire({
        title: "Missing Information",
        text: `Please fill in all required fields: ${missingFields.join(", ")}`,
        icon: "warning",
        confirmButtonColor: "#08762D",
        customClass: {
          popup: "dark:bg-[#122031] dark:text-white",
        },
      });
      return;
    }

    setIsSubmitting(true);

    try {
      await registerEmployee(formData).unwrap();

      await Swal.fire({
        title: "Success!",
        text: "Employee has been created successfully",
        icon: "success",
        confirmButtonText: "OK",
        confirmButtonColor: "#08762D",
        customClass: {
          popup: "dark:bg-[#122031] dark:text-white",
          confirmButton:
            "bg-[#BCFFC8] text-[#08762D] hover:bg-[#08762D] hover:text-[#BCFFC8]",
        },
      });

      setFormData(initialFormData);
      router.push("/employees");
    } catch (error: any) {
      await Swal.fire({
        title: "Error!",
        text:
          error.data?.message ||
          "Something went wrong while creating the employee",
        icon: "error",
        confirmButtonText: "OK",
        confirmButtonColor: "#FF2323",
        customClass: {
          popup: "dark:bg-[#122031] dark:text-white",
        },
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = async () => {
    if (Object.values(formData).some((value) => value !== "")) {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You'll lose all entered data!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, discard",
        cancelButtonText: "No, keep editing",
        confirmButtonColor: "#FF2323",
        cancelButtonColor: "#08762D",
        customClass: {
          popup: "dark:bg-[#122031] dark:text-white",
        },
      });

      if (result.isConfirmed) {
        router.push("/employees");
      }
    } else {
      router.push("/employees");
    }
  };

  const FormField = ({
    label,
    name,
    type = "text",
    value,
    options = [],
    disabled = false,
    rows = 1,
  }: {
    label: string;
    name: string;
    type?: string;
    value: string;
    options?: Array<{ value: string; label: string }>;
    disabled?: boolean;
    rows?: number;
  }) => (
    <div className="flex items-start">
      <label className="w-32 text-[20px] font-medium text-gray-500 dark:text-white">
        {label}
      </label>
      {type === "select" ? (
        <select
          name={name}
          value={value}
          onChange={handleChange}
          disabled={disabled || isSubmitting}
          className="flex-1 rounded-md border px-3 py-2 disabled:opacity-50 dark:bg-[#122031] dark:text-white"
        >
          <option value="">Select {label}</option>
          {options.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      ) : type === "textarea" ? (
        <textarea
          name={name}
          value={value}
          onChange={handleChange}
          rows={rows}
          disabled={disabled || isSubmitting}
          className="flex-1 rounded-md border px-3 py-2 disabled:opacity-50 dark:bg-[#122031] dark:text-white"
        />
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={handleChange}
          disabled={disabled || isSubmitting}
          className="flex-1 rounded-md border px-3 py-2 disabled:opacity-50 dark:bg-[#122031] dark:text-white"
        />
      )}
    </div>
  );
  const ROLES = [
    { value: "admin", label: "Admin" },
    { value: "employee", label: "Employee" },
    { value: "manager", label: "Manager" },
  ];
  const GENDERS = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "other", label: "Other" },
  ];

  return (
    <div className="p-6">
      <div className="mb-20 flex items-center">
        <Link href="/employees" className="mr-4">
          <IoIosArrowDropleft className="h-10 w-10 cursor-pointer text-slate-600 hover:text-[#3584FA] dark:text-white" />
        </Link>
        <h1 className="text-4xl font-medium text-slate-600 dark:text-white">
          New Employee
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="w-full max-w-6xl">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="space-y-6">
            <FormField
              label="Employee ID"
              name="_id"
              value={formData._id}
              disabled
            />
            <FormField
              label="Employee Name"
              name="name"
              value={formData.name}
            />
            <FormField
              label="Role"
              name="role"
              type="select"
              value={formData.role}
              options={ROLES}
            />
            <FormField
              label="Contact"
              name="contact"
              type="tel"
              value={formData.contact}
            />
          </div>

          <div className="space-y-6">
            <FormField
              label="Address"
              name="address"
              type="textarea"
              value={formData.address}
              rows={4}
            />
            <FormField
              label="Gender"
              name="gender"
              type="select"
              value={formData.gender}
              options={GENDERS}
            />
            <FormField
              label="Join Date"
              name="join_date"
              type="date"
              value={formData.join_date}
            />

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={handleCancel}
                disabled={isSubmitting}
                className="rounded-md bg-gray-200 px-4 py-2 font-medium text-gray-700 hover:bg-gray-300 disabled:opacity-50 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
              >
                Discard
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="rounded-md bg-[#3584FA] px-4 py-2 font-medium text-white hover:bg-blue-600 disabled:opacity-50"
              >
                {isSubmitting ? "Creating..." : "Create Employee"}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default NewEmployee;
