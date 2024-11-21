"use client";
import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { IoIosArrowDropleft } from "react-icons/io";
import Link from "next/link";
import Swal from "sweetalert2";
import { useParams, useRouter } from "next/navigation";
import {
  useGetRoleByIdQuery,
  useUpdateRoleMutation,
} from "@/app/redux/features/roleApiSlice";

interface FormData {
  roleID: string;
  roleName: string;
  privileges: {
    viewDashboard: boolean;
    manageEmployees: boolean;
    manageRoles: boolean;
    viewReports: boolean;
    manageSettings: boolean;
    accessAuditLogs: boolean;
  };
}

const EditRole = () => {
  const router = useRouter();
  const { id } = useParams();
  const idString = typeof id === "string" ? id : "";

  const { data: roleData, isLoading } = useGetRoleByIdQuery(idString);
  const [updateRole] = useUpdateRoleMutation();

  const [formData, setFormData] = useState<FormData>({
    roleID: "",
    roleName: "",
    privileges: {
      viewDashboard: false,
      manageEmployees: false,
      manageRoles: false,
      viewReports: false,
      manageSettings: false,
      accessAuditLogs: false,
    },
  });

  useEffect(() => {
    if (roleData) {
      setFormData({
        roleID: roleData._id || "",
        roleName: roleData.name || "",
        privileges: roleData.privileges || {
          viewDashboard: false,
          manageEmployees: false,
          manageRoles: false,
          viewReports: false,
          manageSettings: false,
          accessAuditLogs: false,
        },
      });
    }
  }, [roleData]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handlePrivilegeToggle = (
    privilegeName: keyof FormData["privileges"],
  ) => {
    setFormData((prevState) => ({
      ...prevState,
      privileges: {
        ...prevState.privileges,
        [privilegeName]: !prevState.privileges[privilegeName],
      },
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await updateRole({
        id: formData.roleID,
        name: formData.roleName,
        privileges: formData.privileges,
      }).unwrap();

      await Swal.fire({
        title: "Success!",
        text: "Role has been edited successfully",
        icon: "success",
        confirmButtonText: "OK",
        confirmButtonColor: "#08762D",
        customClass: {
          popup: "dark:bg-[#122031] dark:text-white",
          confirmButton:
            "bg-[#BCFFC8] text-[#BCFFC8] hover:bg-[#08762D] hover:text-[#BCFFC8]",
        },
      });

      router.push("/employees/role");
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Something went wrong while editing the Role",
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
        router.push("/employees/role");
      }
    });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="mb-15 flex items-center gap-4 space-x-12">
        <h1
          className="font-inter flex text-4xl font-medium text-slate-600 dark:text-white"
          style={{ font: "Inter" }}
        >
          <Link href="/employees/role" className="inline-block">
            <IoIosArrowDropleft className="mr-2 h-10 w-10 cursor-pointer hover:text-[#3584FA]" />
          </Link>
          Edit Role {formData.roleID}
        </h1>
      </div>

      <form className="w-1/2 space-y-6" onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 items-center space-y-4">
          <label
            className="block text-[24px] font-medium text-gray-500 dark:text-white"
            style={{ font: "Inter" }}
          >
            Role ID
          </label>
          <input
            type="text"
            name="roleID"
            disabled
            className="h-[36px] rounded-md border border-gray-300 bg-white p-2 dark:bg-[#122031] dark:text-white"
            value={formData.roleID}
            onChange={handleChange}
          />
        </div>

        <div className="grid grid-cols-2 items-center space-y-4">
          <label
            className="block text-[24px] font-medium text-gray-500 dark:text-white"
            style={{ font: "Inter" }}
          >
            Role Name
          </label>
          <input
            type="text"
            name="roleName"
            value={formData.roleName}
            onChange={handleChange}
            className="h-[36px] rounded-md border border-gray-300 bg-white p-2 dark:bg-[#122031] dark:text-white"
          />
        </div>

        <div className="space-y-14">
          <h1
            className="mt-20 text-[26px] font-medium text-[#475569] dark:text-white"
            style={{ font: "Inter" }}
          >
            Access Privileges
          </h1>

          <div className="grid grid-cols-2 gap-22">
            <div className="grid space-y-6">

              <PrivilegeToggle
                label="View Dashboard"
                isOn={formData.privileges.viewDashboard}
                onToggle={() => handlePrivilegeToggle("viewDashboard")}
              />

              <PrivilegeToggle
                label="Manage Employees"
                isOn={formData.privileges.manageEmployees}
                onToggle={() => handlePrivilegeToggle("manageEmployees")}
              />

              <PrivilegeToggle
                label="Manage Roles"
                isOn={formData.privileges.manageRoles}
                onToggle={() => handlePrivilegeToggle("manageRoles")}
              />
            </div>

            <div className="grid space-y-6">
           
              <PrivilegeToggle
                label="View Reports"
                isOn={formData.privileges.viewReports}
                onToggle={() => handlePrivilegeToggle("viewReports")}
              />

              <PrivilegeToggle
                label="Manage Settings"
                isOn={formData.privileges.manageSettings}
                onToggle={() => handlePrivilegeToggle("manageSettings")}
              />

        
              <PrivilegeToggle
                label="Access Audit Logs"
                isOn={formData.privileges.accessAuditLogs}
                onToggle={() => handlePrivilegeToggle("accessAuditLogs")}
              />
            </div>
          </div>
        </div>

        <div className="ml-20 flex justify-end space-x-4">
          <button
            type="button"
            onClick={handleCancel}
            className="h-[40px] w-[150px] rounded-md border border-red-400 bg-[#FFCDCD] px-4 py-2 text-[#FF2323] hover:bg-[#FF2323] hover:text-[#FFCDCD] dark:bg-red-600 dark:text-white dark:hover:bg-red-700"
          >
            Discard
          </button>

          <button
            type="submit"
            className="h-[40px] w-[150px] rounded-md border border-green-400 bg-[#BCFFC8] px-4 py-2 text-[#08762D] hover:bg-[#08762D] hover:text-[#BCFFC8] dark:bg-green-600 dark:text-white dark:hover:bg-green-700"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

interface PrivilegeToggleProps {
  label: string;
  isOn: boolean;
  onToggle: () => void;
}

const PrivilegeToggle = ({ label, isOn, onToggle }: PrivilegeToggleProps) => (
  <div className="flex gap-20">
    <label className="block text-[18px] font-medium text-gray-500 dark:text-white">
      {label}
    </label>
    <button
      type="button"
      className={`flex h-8 w-14 items-center rounded-full p-1 duration-300 ease-in-out ${
        isOn ? "bg-green-400" : "bg-gray-300"
      }`}
      onClick={(e) => {
        e.preventDefault();
        onToggle();
      }}
    >
      <div
        className={`h-6 w-6 transform rounded-full bg-white shadow-md duration-300 ease-in-out ${
          isOn ? "translate-x-6" : ""
        }`}
      />
    </button>
  </div>
);

export default EditRole;
