"use client";
/* eslint-disable react-hooks/rules-of-hooks */
import React, {
  useState,
  ChangeEvent,
  FormEvent,
  useEffect,
  Suspense,
} from "react";
import { IoIosArrowDropleft } from "react-icons/io";
import Link from "next/link";
import Swal from "sweetalert2";
import { useSearchParams, useRouter } from "next/navigation";
import { LuArrowRightToLine } from "react-icons/lu";
import {
  useUpdateEmployeeMutation,
  useGetEmployeeByIdQuery,
} from "@/app/redux/features/employeeApiSlice";
import {
  useGetAllRolesQuery,
  useGetRoleByIdQuery,
} from "@/app/redux/features/roleApiSlice";
import { Employee, Role } from "@/types";

const EditEmployee = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const employeeId = searchParams.get("id");

  const {
    data: employee,
    isLoading,
    isError,
  } = useGetEmployeeByIdQuery(employeeId || "");

  // Move the role query to the component level
  const { data: roleData } = useGetRoleByIdQuery(employee?.role || "", {
    skip: !employee?.role, // Skip the query if there's no role ID
  });

  const [updateEmployee, { isLoading: isUpdating }] =
    useUpdateEmployeeMutation();
  const { data: roles = [] } = useGetAllRolesQuery();

  const [formData, setFormData] = useState({
    employeeId: employeeId || "",
    email: "",
    name: "",
    role: "",
    contact: "",
    address: "",
    gender: "",
    username: "",
  });

  const [privileges, setPrivileges] = useState<Record<string, boolean>>({});

  // Update form data when employee data is loaded
  useEffect(() => {
    if (employee) {
      setFormData({
        employeeId: employee.employee_id || "",
        email: employee.email || "",
        name: employee.name || "",
        role: employee.role || "",
        contact: employee.contact || "",
        address: employee.address || "",
        gender: employee.gender || "",
        username: employee.username || "",
      });
    }
  }, [employee]);

  // Update privileges when role data changes
  useEffect(() => {
    if (roleData?.privileges) {
      const privilegesObject = roleData.privileges.reduce(
        (acc: Record<string, boolean>, priv: any) => {
          acc[priv.id] = true;
          return acc;
        },
        {},
      );
      setPrivileges(privilegesObject);
    }
  }, [roleData]);

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

    if (!employeeId) {
      Swal.fire("Error", "Invalid employee ID", "error");
      return;
    }

    try {
      await updateEmployee({ id: employeeId, ...formData }).unwrap();
      Swal.fire("Success", "Employee updated successfully", "success");
      router.push("/employees");
    } catch (error) {
      Swal.fire("Error", "Failed to update employee", "error");
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
    }).then((result) => {
      if (result.isConfirmed) {
        router.push("/employees");
      }
    });
  };

  const handleLeaveClick = () => {
    router.push(`/employees/editEmployee/leaves?id=${employeeId}`);
  };

  if (isLoading)
    return (
      <p className="p-6 text-lg text-gray-600">Loading employee data...</p>
    );
  if (isError || !employee)
    return (
      <p className="p-6 text-lg text-red-600">Failed to load employee data.</p>
    );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-12 flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
        <div className="flex items-center space-x-4">
          <Link href="/employees" className="group">
            <IoIosArrowDropleft className="h-10 w-10 text-gray-500 transition-colors group-hover:text-blue-500" />
          </Link>
          <h1 className="text-3xl font-semibold text-gray-700 md:text-4xl">
            Edit Employee #{formData.employeeId}
          </h1>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mx-auto max-w-4xl rounded-lg bg-white p-8 shadow-md"
      >
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {Object.entries(formData).map(([key, value]) => {
            if (key === "role") {
              return (
                <div key={key} className="flex flex-col space-y-2">
                  <label
                    htmlFor={key}
                    className="text-base font-medium capitalize text-gray-600"
                  >
                    Role
                  </label>
                  <select
                    id={key}
                    name={key}
                    value={value}
                    onChange={handleChange}
                    className="w-full rounded-md border 
                    border-gray-300 px-4 py-2 
                    transition-colors duration-300 focus:outline-none 
                    focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Role</option>
                    {roles.map((role: Role) => (
                      <option key={role._id} value={role._id}>
                        {role.name}
                      </option>
                    ))}
                  </select>
                </div>
              );
            } else if (key === "gender") {
              return (
                <div key={key} className="flex flex-col space-y-2">
                  <label
                    htmlFor={key}
                    className="text-base font-medium capitalize text-gray-600"
                  >
                    Gender
                  </label>
                  <select
                    id={key}
                    name={key}
                    value={value}
                    onChange={handleChange}
                    className="w-full rounded-md border 
                    border-gray-300 px-4 py-2 
                    transition-colors duration-300 focus:outline-none 
                    focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Gender</option>
                    {["Male", "Female", "Other"].map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              );
            }

            return (
              <div key={key} className="flex flex-col space-y-2">
                <label
                  htmlFor={key}
                  className="text-base font-medium capitalize text-gray-600"
                >
                  {key
                    .replace(/([A-Z])/g, " $1")
                    .replace(/^./, (str) => str.toUpperCase())}
                </label>
                <input
                  id={key}
                  name={key}
                  value={value}
                  onChange={handleChange}
                  type="text"
                  className="w-full rounded-md border 
                  border-gray-300 px-4 py-2 
                  transition-colors duration-300 focus:outline-none 
                  focus:ring-2 focus:ring-blue-500"
                  readOnly={key === "employeeId"}
                />
              </div>
            );
          })}
        </div>

        <div className="mt-8 flex flex-col justify-end space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
          <button
            type="button"
            onClick={handleCancel}
            className="w-full rounded-lg border border-transparent 
            bg-red-500 px-6 py-3 
            font-medium 
            text-white transition-colors 
            duration-300 hover:bg-red-600 
            sm:w-auto"
          >
            Discard
          </button>
          <button
            type="submit"
            disabled={isUpdating}
            className="w-full rounded-lg border border-transparent 
            bg-green-500 px-6 py-3 
            font-medium 
            text-white transition-colors 
            duration-300 hover:bg-green-600 
            disabled:cursor-not-allowed
            disabled:opacity-50 sm:w-auto"
          >
            {isUpdating ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
};

const EditEmployeePage = () => (
  <Suspense fallback={<p>Loading...</p>}>
    <EditEmployee />
  </Suspense>
);

export default EditEmployeePage;
