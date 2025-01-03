"use client";

import React, { useState, useEffect, ChangeEvent, FormEvent, Suspense } from "react";
import { IoIosArrowDropleft } from "react-icons/io";
import Link from "next/link";
import Swal from "sweetalert2";
import { useSearchParams, useRouter } from "next/navigation";
import {
  useGetRoleByIdQuery,
  useUpdateRoleMutation,
} from "@/app/redux/features/roleApiSlice";

interface RolePrivileges {
  [key: string]: boolean;
}

const EditRole = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const roleId = searchParams.get("id") || "";

  const {
    data: role,
    isLoading,
    isError,
  } = useGetRoleByIdQuery(roleId, {
    skip: !roleId, // Skip query if no roleId
  });

  const [updateRole] = useUpdateRoleMutation();

  const [formData, setFormData] = useState({
    id: "",
    name: "",
  });

  const [privileges, setPrivileges] = useState<RolePrivileges>({});

 useEffect(() => {
   if (role) {
     setFormData({ id: role._id, name: role.name });
     setPrivileges(role.privileges.reduce((acc, privilege) => ({ ...acc, [privilege.id]: true }), {}));
   }
 }, [role]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleToggle = (privilege: string) => {
    setPrivileges((prev) => ({ ...prev, [privilege]: !prev[privilege] }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const privilegesArray = Object.keys(privileges).map((privilege) => ({
        id: privilege,
        value: privileges[privilege],
      }));

      await updateRole({
        id: formData.id,
        name: formData.name,
        privileges: privilegesArray,
      }).unwrap();

      Swal.fire({
        title: "Success!",
        text: "Role has been updated successfully.",
        icon: "success",
        confirmButtonText: "OK",
        confirmButtonColor: "#08762D",
      });

      router.push("/employees/role");
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Something went wrong while updating the role.",
        icon: "error",
        confirmButtonText: "OK",
        confirmButtonColor: "#FF2323",
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
    }).then((result) => {
      if (result.isConfirmed) {
        router.push("/employees/role");
      }
    });
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading role details.</p>;

  return (
    <div>
      <div className="mb-15 flex items-center gap-4 space-x-12">
        <h1 className="font-inter flex text-4xl font-medium text-slate-600 dark:text-white">
          <Link href="/employees/role">
            <IoIosArrowDropleft className="mr-2 h-10 w-10 cursor-pointer hover:text-[#3584FA]" />
          </Link>
          Edit Role #{formData.id.slice(-5)}
        </h1>
      </div>

      <form className="w-1/2 space-y-6" onSubmit={handleSubmit}>
        {/* Role ID */}
        <div className="grid grid-cols-2 items-center space-y-4">
          <label className="block text-[24px] font-medium text-gray-500 dark:text-white">
            Role ID
          </label>
          <input
            type="text"
            name="id"
            value={formData.id}
            disabled
            className="h-[36px] rounded-md border border-gray-300 bg-white p-2 dark:bg-[#122031] dark:text-white"
          />
        </div>

        {/* Role Name */}
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

        {/* Access Privileges */}
        <div className="space-y-14">
          <h1 className="mt-20 text-[26px] font-medium text-[#475569] dark:text-white">
            Access Privileges
          </h1>
          <div className="grid grid-cols-2 gap-6">
            {Object.entries(privileges).map(([key, value]) => (
              <div key={key} className="flex gap-20">
                <label className="block text-[18px] font-medium text-gray-500 dark:text-white">
                  {key.replace(/([A-Z])/g, " $1")}
                </label>
                <button
                  type="button"
                  className={`flex h-8 w-14 items-center rounded-full p-1 duration-300 ease-in-out ${
                    value ? "bg-green-400" : "bg-gray-300"
                  }`}
                  onClick={() => handleToggle(key)}
                >
                  <div
                    className={`h-6 w-6 transform rounded-full bg-white shadow-md duration-300 ease-in-out ${
                      value ? "translate-x-6" : ""
                    }`}
                  ></div>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="ml-20 flex justify-end space-x-4">
          <button
            type="button"
            onClick={handleCancel}
            className="h-[40px] w-[150px] rounded-md border border-red-400 bg-[#FFCDCD] text-[#FF2323] hover:bg-[#FF2323] hover:text-[#FFCDCD]"
          >
            Discard
          </button>
          <button
            type="submit"
            className="h-[40px] w-[150px] rounded-md border border-green-400 bg-[#BCFFC8] text-[#08762D] hover:bg-[#08762D] hover:text-[#BCFFC8]"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

const EditRolePage = () => {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <EditRole />
    </Suspense>
  );
};

export default EditRolePage;
