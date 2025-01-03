"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { IoIosArrowDropleft } from "react-icons/io";
import Link from "next/link";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { useRegisterMutation } from "@/app/redux/features/authApiSlice";
import { useGetAllRolesQuery } from "@/app/redux/features/roleApiSlice";
import type { RootState } from "@/app/redux/store/store";
import { Employee } from "@/types";
import { Role } from "@/types";

interface FormData {
  _id: string;
  name: string;
  employee_id: string;
  age: string;
  role: string;
  contact: string;
  address: string;
  gender: string;
  password: string;
  email: string;
  username: string;
}

const NewEmployee = () => {
  const [register, { isLoading }] = useRegisterMutation();

  const dispatch = useDispatch();
  const router = useRouter();

  const { data: roles } = useGetAllRolesQuery();
  
  const [formData, setFormData] = useState<FormData>({
    _id: "",
    employee_id: "",
    name: "",
    age: "",
    role: "",
    contact: "",
    address: "",
    gender: "",
    password: "",
    email: "",
    username: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  try {
    const result = await register({
      email: formData.email,
      employee_id: formData.employee_id,
      name: formData.name,
      username: formData.username,
      role: formData.role, 
      contact: formData.contact,
      address: formData.address,
      gender: formData.gender,
      age: formData.age,
      password: formData.password,
      join_date: new Date(),
    }).unwrap();
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

    setFormData({
      _id: "",
      employee_id: "",
      name: "",
      age: "",
      role: "",
      contact: "",
      address: "",
      gender: "",
      password: "",
      email: "",
      username: "",
    });

    router.push("/employees");
  } catch (error: any) {
    Swal.fire({
      title: "Error!",
      text: error.message || "Something went wrong while creating the employee",
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
        router.push("/employees");
      }
    });
  };

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
        <div className="grid grid-cols-2 gap-x-8 gap-y-6">
          <div className="space-y-6">
            <div className="flex items-center">
              <label className="w-32 text-[20px] font-medium text-gray-500 dark:text-white">
                User Name
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="flex-1 rounded-md border border-gray-200 px-3 py-2 text-base font-normal focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-[#122031] dark:text-white"
              />
            </div>

            <div className="flex items-center">
              <label className="w-32 text-[20px] font-medium text-gray-500 dark:text-white">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="flex-1 rounded-md border border-gray-200 px-3 py-2 text-base font-normal focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-[#122031] dark:text-white"
              />
            </div>
            <div className="flex items-center">
              <label className="w-32 text-[20px] font-medium text-gray-500 dark:text-white">
                Role
              </label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="flex-1 rounded-md border border-gray-200 px-3 py-2 text-base font-normal focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-[#122031] dark:text-white"
              >
                <option value="">Select Role</option>
                {roles?.map((role: Role) => (
                  <option key={role._id} value={role._id}>
                    {role.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center">
              <label className="w-32 text-[20px] font-medium text-gray-500 dark:text-white">
                Contact
              </label>
              <input
                type="text"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                className="flex-1 rounded-md border border-gray-200 px-3 py-2 text-base font-normal focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-[#122031] dark:text-white"
              />
            </div>
            <div className="flex items-center">
              <label className="w-32 text-[20px] font-medium text-gray-500 dark:text-white">
                Age
              </label>
              <input
                type="text"
                name="age"
                value={formData.age}
                onChange={handleChange}
                className="flex-1 rounded-md border border-gray-200 px-3 py-2 text-base font-normal focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-[#122031] dark:text-white"
              />
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-start">
              <label className="w-32 text-[20px] font-medium text-gray-500 dark:text-white">
                Address
              </label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                rows={4}
                className="flex-1 rounded-md border border-gray-200 px-3 py-2 text-base font-normal focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-[#122031] dark:text-white"
              />
            </div>

            <div className="flex items-center">
              <label className="w-32 text-[20px] font-medium text-gray-500 dark:text-white">
                Gender
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="flex-1 rounded-md border border-gray-200 px-3 py-2 text-base font-normal focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-[#122031] dark:text-white"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="flex items-center">
              <label className="w-32 text-[20px] font-medium text-gray-500 dark:text-white">
                Email
              </label>
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="flex-1 rounded-md border border-gray-200 px-3 py-2 text-base font-normal focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-[#122031] dark:text-white"
              />
            </div>

            <div className="flex items-center">
              <label className="w-32 text-[20px] font-medium text-gray-500 dark:text-white">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="flex-1 rounded-md border border-gray-200 px-3 py-2 text-base font-normal focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-[#122031] dark:text-white"
              />
            </div>

            <div className="mt-8 flex justify-end space-x-4">
              <button
                type="button"
                onClick={handleCancel}
                className="rounded-md border border-red-400 bg-[#FFCDCD] px-4 py-2 text-sm font-medium text-[#FF2323] hover:bg-[#FF2323] hover:text-[#FFCDCD] dark:bg-red-600 dark:text-white dark:hover:bg-red-700"
              >
                Discard
              </button>
              <button
                type="submit"
                className="rounded-md border border-green-400 bg-[#BCFFC8] px-4 py-2 text-[#08762D] hover:bg-[#08762D] hover:text-[#BCFFC8] dark:bg-green-600 dark:text-white dark:hover:bg-green-700"
              >
                Create Employee
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default NewEmployee;
