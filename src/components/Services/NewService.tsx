"use client";
import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { IoIosArrowDropleft } from "react-icons/io";
import Link from "next/link";
import Swal from 'sweetalert2';
import { useRouter } from "next/navigation"
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import { getcategory } from "@/app/redux/getCategorySlice"

interface FormData {
  serviceName: string;
  category: string;
  expireDate: string;
}

const EditService = () => {

  const router = useRouter();
  const dispatch = useAppDispatch();
  const { data: categories, loading, error } = useAppSelector((state) => state.category);

  const [formData, setFormData] = useState({
    serviceName: "",
    category: "",
    expireDate: ""
  });

  useEffect(() => {
    dispatch(getcategory());
  }, [dispatch]);


   const router = useRouter()

  const [formData, setFormData] = useState<FormData>({
    serviceName: '',
    category: '',
    expireDate: '',
    price: ''
  }); 
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };


  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {

      const payload = {
        name: formData.serviceName,
        category_id: formData.category,
        opt_expire_date: formData.expireDate
      };
      const response = await fetch("http://localhost:5000/api/services", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error("Failed to create the service");
      }

      await Swal.fire({
        title: "Success!",
        text: "Service has been created successfully",
        icon: "success",
        confirmButtonText: "OK",
        confirmButtonColor: "#08762D",
        customClass: {
          popup: "dark:bg-[#122031] dark:text-white",
          confirmButton: "bg-[#BCFFC8] text-[#BCFFC8] hover:bg-[#08762D] hover:text-[#BCFFC8]"
        }
      });

      setFormData({
        serviceName: "",
        category: "",
        expireDate: ""
      });
      router.push("/services");
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Something went wrong while creating the service",
        icon: "error",
        confirmButtonText: "OK",
        confirmButtonColor: "#FF2323",
        customClass: {
          popup: "dark:bg-[#122031] dark:text-white"
        }
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
        popup: "dark:bg-[#122031] dark:text-white"
      }
    }).then((result) => {
      if (result.isConfirmed) {
        router.push("/services");
      }
    });
  };

  return (
    <div>
      <div className="flex items-center gap-4 mb-15 space-x-12">
        <h1 className="font-inter flex text-4xl font-medium text-slate-600 dark:text-white">
          <Link href="/services" className="inline-block">
            <IoIosArrowDropleft className="w-10 h-10 cursor-pointer mr-2 hover:text-[#3584FA]" />
          </Link>
          New Service
        </h1>
      </div>

      <form className="w-1/2 space-y-6" onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 items-center space-y-2">
          <label className="block text-[24px] font-medium text-gray-500 dark:text-white">
            Service Name
          </label>
          <input
            type="text"
            name="serviceName"
            value={formData.serviceName}
            onChange={handleChange}
            className="h-[36px] rounded-md border bg-white border-gray-300 p-2 dark:bg-[#122031] dark:text-white"
          />
        </div>

        <div className="grid grid-cols-2 items-center space-y-2">
          <label className="block text-[24px] font-medium text-gray-500 dark:text-white">
            Category
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="h-[36px] rounded-md border bg-white border-gray-300 p-2 dark:bg-[#122031] dark:text-white"
          >
            <option value="">Select Category</option>

            {categories.map((category: any) => (
              <option key={category.id} value={category.id}>
                {category.name}
              {console.log(category.id)}
              </option>
           
            ))}

          </select>
        </div>

        <div className="grid grid-cols-2 items-center space-y-2">
          <label className="block text-[24px] font-medium text-gray-500 dark:text-white">
            Expire Date
          </label>
          <input
            type="date"
            name="expireDate"
            value={formData.expireDate}
            onChange={handleChange}
            className="h-[36px] rounded-md border bg-white border-gray-300 p-2 dark:bg-[#122031] dark:text-white"
          />
        </div>

        <div className="flex justify-end ml-20 space-x-4">
          <button
            type="button"
            onClick={handleCancel}
            className="rounded-md w-[150px] h-[40px] px-4 py-2 text-[#FF2323] bg-[#FFCDCD]"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md w-[150px] h-[40px] px-4 py-2 text-[#08762D] bg-[#BCFFC8]"
          >
            Create Category
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditService;