"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { IoIosArrowDropleft } from "react-icons/io";
import Link from "next/link";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

interface FormData {
  roleID: string;
  roleName: string;
}

const NewRole = () => {
  const router = useRouter();
  const [isOn, setIsOn] = useState(false);
  const [isOn2, setIsOn2] = useState(false);
  const [isOn3, setIsOn3] = useState(false);
  const [isOn4, setIsOn4] = useState(false);
  const [isOn5, setIsOn5] = useState(false);
  const [isOn6, setIsOn6] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    roleID: "",
    roleName: "",
  });

  // Handle input changes
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  
  // Handle form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // Show success alert
      await Swal.fire({
        title: "Success!",
        text: "Role has been created successfully",
        icon: "success",
        confirmButtonText: "OK",
        confirmButtonColor: "#08762D",
        customClass: {
          popup: "dark:bg-[#122031] dark:text-white",
          confirmButton:
            "bg-[#BCFFC8] text-[#BCFFC8] hover:bg-[#08762D] hover:text-[#BCFFC8]",
        },
      });

      // Reset form or redirect
      setFormData({
        roleID: "",
        roleName: "",
      });
      router.push("/employees/role");
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Something went wrong while creating the Role",
        icon: "error",
        confirmButtonText: "OK",
        confirmButtonColor: "#FF2323",
        customClass: {
          popup: "dark:bg-[#122031] dark:text-white",
        },
      });
    }
  };

  // Handle cancel
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
          New Role
        </h1>
      </div>

      <form className="w-1/2 space-y-6" onSubmit={handleSubmit}>
        {/* Role ID */}
        <div className="grid grid-cols-2 items-center space-y-4 ">
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

        {/* Role Name */}
        <div className="grid grid-cols-2 items-center space-y-4 ">
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
            


        {/* Access Privileges */}

        <div className="space-y-14 ">  <h1 className="text-[#475569] dark:text-white text-[26px] font-medium mt-20" style={{ font: "Inter" }}>Access Privileges</h1>
        
        
        <div className="grid grid-cols-2 gap-22  ">
           <div className="grid space-y-6">
            {/* Privilege 1 */}
          <div className=" flex gap-20  ">
            <label className="block text-[18px] font-medium text-gray-500 dark:text-white">
              Lorem Ipsum Dolor Sit
            </label>
            <button
              type="button"
              className={`flex h-8 w-14 items-center rounded-full p-1 duration-300 ease-in-out ${
                isOn ? "bg-green-400" : "bg-gray-300"
              }`}
              onClick={(e) => {
                e.preventDefault(); 
                setIsOn(!isOn);
              }}
            >
              <div
                className={`h-6 w-6 transform rounded-full bg-white shadow-md duration-300 ease-in-out ${
                  isOn ? "translate-x-6" : ""
                }`}
              ></div>
            </button>
          </div>

            {/* Privilege 2 */}
            <div className=" flex gap-20 ">
            <label className="block text-[18px] font-medium text-gray-500 dark:text-white">
              Lorem Ipsum Dolor Sit
            </label>
            <button
              type="button"
              className={`flex h-8 w-14 items-center rounded-full p-1 duration-300 ease-in-out ${
                isOn2 ? "bg-green-400" : "bg-gray-300"
              }`}
              onClick={(e) => {
                e.preventDefault(); 
                setIsOn2(!isOn2);
              }}
            >
              <div
                className={`h-6 w-6 transform rounded-full bg-white shadow-md duration-300 ease-in-out ${
                  isOn2 ? "translate-x-6" : ""
                }`}
              ></div>
            </button>
          </div>

            {/* Privilege 3 */}
            <div className=" flex gap-20 ">
            <label className="block text-[18px] font-medium text-gray-500 dark:text-white">
              Lorem Ipsum Dolor Sit
            </label>
            <button
              type="button"
              className={`flex h-8 w-14 items-center rounded-full p-1 duration-300 ease-in-out ${
                isOn3 ? "bg-green-400" : "bg-gray-300"
              }`}
              onClick={(e) => {
                e.preventDefault(); 
                setIsOn3(!isOn3);
              }}
            >
              <div
                className={`h-6 w-6 transform rounded-full bg-white shadow-md duration-300 ease-in-out ${
                  isOn3 ? "translate-x-6" : ""
                }`}
              ></div>
            </button>
          </div>
          </div>
          


          <div className="grid space-y-6">
            {/* Privilege 4 */}
            <div className="flex gap-20 ">
            <label className=" flex text-[18px] font-medium text-gray-500 dark:text-white">
              Lorem Ipsum Dolor Sit
            </label>
            <button
              type="button" 
              className={`flex h-8 w-14 items-center rounded-full p-1 duration-300 ease-in-out ${
                isOn4 ? "bg-green-400" : "bg-gray-300"
              }`}
              onClick={(e) => {
                e.preventDefault(); 
                setIsOn4(!isOn4);
              }}
            >
              <div
                className={`h-6 w-6 transform rounded-full bg-white shadow-md duration-300 ease-in-out ${
                  isOn4 ? "translate-x-6" : ""
                }`}
              ></div>
            </button>
            </div>

            {/* Privilege 5 */}
            <div className="flex gap-20 ">
            <label className=" flex text-[18px] font-medium text-gray-500 dark:text-white">
              Lorem Ipsum Dolor Sit
            </label>
            <button
              type="button" 
              className={`flex h-8 w-14 items-center rounded-full p-1 duration-300 ease-in-out ${
                isOn5 ? "bg-green-400" : "bg-gray-300"
              }`}
              onClick={(e) => {
                e.preventDefault(); 
                setIsOn5(!isOn5);
              }}
            >
              <div
                className={`h-6 w-6 transform rounded-full bg-white shadow-md duration-300 ease-in-out ${
                  isOn5 ? "translate-x-6" : ""
                }`}
              ></div>
            </button>
            </div>

            {/* Privilege 6 */}
            <div className="flex gap-20 ">
            <label className=" flex text-[18px] font-medium text-gray-500 dark:text-white">
              Lorem Ipsum Dolor Sit
            </label>
            <button
              type="button" 
              className={`flex h-8 w-14 items-center rounded-full p-1 duration-300 ease-in-out ${
                isOn6 ? "bg-green-400" : "bg-gray-300"
              }`}
              onClick={(e) => {
                e.preventDefault(); 
                setIsOn6(!isOn6);
              }}
            >
              <div
                className={`h-6 w-6 transform rounded-full bg-white shadow-md duration-300 ease-in-out ${
                  isOn6 ? "translate-x-6" : ""
                }`}
              ></div>
            </button>
            </div>
            </div>
          
        </div>
        </div>



        
        <div className="ml-20 flex justify-end space-x-4">
          {/* Discard Button */}
          <button
            type="button"
            onClick={handleCancel}
            className="h-[40px] w-[150px] rounded-md border border-red-400 bg-[#FFCDCD] px-4 py-2 text-[#FF2323] hover:bg-[#FF2323] hover:text-[#FFCDCD] dark:bg-red-600 dark:text-white dark:hover:bg-red-700"
          >
            Discard
          </button>
          {/* Create Role Button */}
          <button
            type="submit"
            className="h-[40px] w-[150px] rounded-md border border-green-400 bg-[#BCFFC8] px-4 py-2 text-[#08762D] hover:bg-[#08762D] hover:text-[#BCFFC8] dark:bg-green-600 dark:text-white dark:hover:bg-green-700"
          >
            Create Role
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewRole;
