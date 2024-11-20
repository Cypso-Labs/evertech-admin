"use client";
import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { IoIosArrowDropleft } from "react-icons/io";
import Link from "next/link";
import Swal from "sweetalert2";
import { useSearchParams, useRouter } from "next/navigation";
import { LuArrowRightToLine } from "react-icons/lu";
import {
  updateEmployee,
  fetchEmployees,
  EmployeeInterface,
} from "../../redux/slices/employeeSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";

const EditEmployee = () => {
  const router = useRouter();
  const { roles } = useSelector((state: RootState) => state.roles);
  const searchParams = useSearchParams();
  const dispatch = useDispatch<AppDispatch>();
  const { entities: employees } = useSelector(
    (state: RootState) => state.employees,
  );
  const [employee, setEmployee] = useState<EmployeeInterface | null>(null);
  const [formData, setFormData] = useState({
    id: "",
    email: "",
    name: "",
    role: "",
    contact: "",
    address: "",
    gender: "",
    username: "",
  });

  const employeeId = searchParams.get("id");

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  useEffect(() => {
    if (employees.length && employeeId) {
      const foundEmployee = employees.find((emp) => emp._id === employeeId);
      if (foundEmployee) {
        setEmployee(foundEmployee);
        setFormData({
          id: foundEmployee._id || "",
          email: foundEmployee.email || "",
          name: foundEmployee.name || "",
          role: foundEmployee.role || "",
          contact: foundEmployee.contact || "",
          address: foundEmployee.address || "",
          gender: foundEmployee.gender || "",
          username: foundEmployee.username || "",
        });
      }
    }
  }, [employees, employeeId]);

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
      await dispatch(
        updateEmployee({ id: formData.id, employeeData: formData }),
      );

      Swal.fire({
        title: "Success!",
        text: "Employee has been edited successfully",
        icon: "success",
        confirmButtonText: "OK",
        confirmButtonColor: "#08762D",
        customClass: {
          popup: "dark:bg-[#122031] dark:text-white",
        },
      });

      router.push("/employees");
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Something went wrong while editing the employee",
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

  const handleLeaveClick = () => {
    const queryParams = new URLSearchParams({
      id: formData.id,
      name: formData.name,
      role: formData.role,
    }).toString();
    router.push(`/employees/editeEmployee/leaves?${queryParams}`);
  };

  return (
    <div className="p-6">
      <div className="mb-20 flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/employees">
            <IoIosArrowDropleft className="h-10 w-10 cursor-pointer text-slate-600 hover:text-[#3584FA] dark:text-white" />
          </Link>
          <h1 className="ml-4 text-[40px] font-medium text-slate-600 dark:text-white">
            Edit Employee # {formData.id.toString().slice(-5)}
          </h1>
        </div>

        <button
          onClick={handleLeaveClick}
          className="flex h-[58px] w-[181px] items-center justify-center rounded-md border border-gray-500 bg-[#CBD5E1] px-4 py-2 text-xl font-medium text-gray-700 transition-colors duration-300 hover:bg-black hover:text-slate-300 dark:bg-[#122031] dark:text-white"
        >
          Leaves
          <LuArrowRightToLine
            className="ml-2 text-gray-500 hover:text-slate-300"
            size={24}
          />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="w-full max-w-6xl">
        <div className="grid grid-cols-2 gap-x-8 gap-y-6">
          <div className="space-y-6">
            <div className="flex items-center">
              <label className="w-32  text-[20px] font-medium text-gray-500 dark:text-white">
                Employee ID
              </label>
              <input
                type="text"
                name="id"
                disabled
                value={formData.id.toString().slice(-5)}
                onChange={handleChange}
                className="flex-1 rounded-md border border-gray-200 px-3 py-2 text-base font-normal focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-[#122031] dark:text-white"
              />
            </div>

            <div className="flex items-center">
              <label className="w-32  text-[20px] font-medium text-gray-500 dark:text-white">
                Employee Name
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
              <label className="w-32  text-[20px] font-medium text-gray-500 dark:text-white">
                Role
              </label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="flex-1 rounded-md border border-gray-200 px-3 py-2 text-base font-normal focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-[#122031] dark:text-white"
              >
                <option value="">Select Role</option>
                {roles.map((role) => (
                  <option key={role._id} value={role._id}>
                    {role.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center">
              <label className="w-32  text-[20px] font-medium text-gray-500 dark:text-white">
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
              <label className="w-32  text-[20px] font-medium text-gray-500 dark:text-white">
                Contact
              </label>
              <input
                type="tel"
                name="contact"
                disabled
                value={formData.contact}
                onChange={handleChange}
                className="flex-1 rounded-md border border-gray-200 px-3 py-2 text-base font-normal focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-[#122031] dark:text-white"
              />
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-start">
              <label className="w-32  text-[20px] font-medium text-gray-500 dark:text-white">
                E-mail
              </label>
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                type="email"
                className="flex-1 rounded-md border border-gray-200 px-3 py-2 text-base font-normal focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-[#122031] dark:text-white"
              />
            </div>

            <div className="flex items-start">
              <label className="w-32  text-[20px] font-medium text-gray-500 dark:text-white">
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
              <label className="w-32  text-[20px] font-medium text-gray-500 dark:text-white">
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
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditEmployee;
