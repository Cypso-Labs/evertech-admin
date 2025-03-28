"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import { IoIosArrowDropleft } from "react-icons/io";
import Link from "next/link";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { useCreateRoleMutation } from "@/app/redux/features/roleApiSlice";
import type { Role } from "@/types";

interface FormData {
  name: string;
  privileges: number[];
}

const accessOptions = [
  { id: 1, label: "Access Dashboard" },
  { id: 2, label: "Access Orders" },
  { id: 3, label: "Access Payments" },
  { id: 4, label: "Access Services" },
  { id: 5, label: "Access Customers" },
  { id: 6, label: "Access Employees" },
  { id: 7, label: "Access Products" },
  { id: 8, label: "Access Jobs" },
  { id: 9, label: "Access Reports" },
  { id: 10, label: "Access Technicians" },
];

const NewRole = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    privileges: [],
  });
  const [createRole, { isLoading }] = useCreateRoleMutation();
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleTogglePrivilege = (privilegeId: number) => {
    setFormData((prevState) => {
      const updatedPrivileges = prevState.privileges.includes(privilegeId)
        ? prevState.privileges.filter((id) => id !== privilegeId)
        : [...prevState.privileges, privilegeId];

      return { ...prevState, privileges: updatedPrivileges };
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      Swal.fire({
        title: "Error",
        text: "Role name is required!",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    try {
      const roleData = {
        name: formData.name,
        privileges: formData.privileges,
      } as unknown as Omit<Role, "_id" | "createdAt" | "updatedAt">;

      await createRole(roleData).unwrap();

      Swal.fire({
        title: "Success!",
        text: "Role has been created successfully.",
        icon: "success",
        confirmButtonText: "OK",
      });

      router.push("/employees/role");
    } catch (error: any) {
      Swal.fire({
        title: "Error",
        text: error?.data?.message || "Failed to create the role.",
        icon: "error",
        confirmButtonText: "OK",
      });
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
        router.push("/employees/role");
      }
    });
  };

  return (
    <div>
      <div className="mb-8 flex items-center gap-4">
        <h1 className="text-4xl font-medium text-slate-600 dark:text-white">
          <Link href="/employees/role">
            <IoIosArrowDropleft className="mr-2 h-10 w-10 cursor-pointer hover:text-[#3584FA]" />
          </Link>
          New Role
        </h1>
      </div>

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 items-center space-y-4">
          <label className="block text-[24px] font-medium text-gray-500 dark:text-white">
            Role Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="h-[36px] rounded-md border border-gray-300 bg-white p-2 dark:bg-[#122031] dark:text-white"
          />
        </div>

        <div className="space-y-6">
          <h1 className="text-[26px] font-medium text-[#475569] dark:text-white">
            Access Privileges
          </h1>
          <div className="grid grid-cols-2 gap-4">
            {accessOptions.map((option) => (
              <div key={option.id} className="flex items-center gap-4">
                <label className="text-[18px] font-medium text-gray-500 dark:text-white">
                  {option.label}
                </label>
                <button
                  type="button"
                  onClick={() => handleTogglePrivilege(option.id)}
                  className={`flex h-8 w-14 items-center rounded-full p-1 ${
                    formData.privileges.includes(option.id)
                      ? "bg-green-400"
                      : "bg-gray-300"
                  }`}
                >
                  <div
                    className={`h-6 w-6 transform rounded-full bg-white shadow-md ${
                      formData.privileges.includes(option.id)
                        ? "translate-x-6"
                        : ""
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={handleCancel}
            className="h-[40px] w-[150px] rounded-md border border-red-400 bg-[#FFCDCD] text-[#FF2323] hover:bg-[#FF2323] hover:text-white"
          >
            Discard
          </button>

          <button
            type="submit"
            className="h-[40px] w-[150px] rounded-md border border-green-400 bg-[#BCFFC8] text-[#08762D] hover:bg-[#08762D] hover:text-white"
            disabled={isLoading}
          >
            {isLoading ? "Creating..." : "Create Role"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewRole;
