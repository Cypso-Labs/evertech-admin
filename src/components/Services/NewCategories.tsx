"use client";
import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";

import { IoIosArrowDropleft } from "react-icons/io";
import Link from "next/link";
import Swal from 'sweetalert2';
import { useRouter } from "next/navigation"

interface FormData {
  id: string;
  categoryName: string;
  categoryDescription: string;
  
}

const NewCategories = () => {

  const router = useRouter()
  // State for form data
  const [formData, setFormData] = useState<FormData>({
    id: '',
    categoryName: '',
    categoryDescription: '',
    
  });

  // Handle input changes
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  // Handle form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    try {
      // Here you would typically make your API call to create the service
      // await createService(formData);
      
      // Show success alert
      await Swal.fire({
        title: 'Success!',
        text: 'Category has been created successfully',
        icon: 'success',
        confirmButtonText: 'OK',
        confirmButtonColor: '#08762D',
        customClass: {
          popup: 'dark:bg-[#122031] dark:text-white',
          confirmButton: 'bg-[#BCFFC8] text-[#BCFFC8] hover:bg-[#08762D] hover:text-[#BCFFC8]'
        }
      });

      // Reset form or redirect
      setFormData({
        id:'',
        categoryName: '',
        categoryDescription: ''
       
      });
      router.push('/services/category')
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: 'Something went wrong while creating the category',
        icon: 'error',
        confirmButtonText: 'OK',
        confirmButtonColor: '#FF2323',
        customClass: {
          popup: 'dark:bg-[#122031] dark:text-white'
        }
      });
    }
  };

  // Handle cancel
  const handleCancel = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You'll lose all entered data!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, cancel',
      cancelButtonText: 'No, keep editing',
      confirmButtonColor: '#FF2323',
      cancelButtonColor: '#08762D',
      customClass: {
        popup: 'dark:bg-[#122031] dark:text-white'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        router.push('/services/category')
      }
    })
  }

 


  return (
    <div>
    <div className="flex items-center gap-4 mb-15 space-x-12">
  <h1 className="font-inter flex text-4xl font-medium text-slate-600 dark:text-white   " style={{ font: "Inter" }}>
    <Link href="/services/category" className="inline-block">
      <IoIosArrowDropleft className="w-10 h-10 cursor-pointer mr-2 hover:text-[#3584FA]" /> 
    </Link>
    New Category
  </h1>
</div>


<form className="w-1/2 space-y-6" onSubmit={handleSubmit}>
  <div className=" grid grid-cols-2 items-center  space-y-2 ">
    <label className="block text-[24px] font-medium text-gray-500 dark:text-white  " style={{ font: "Inter" }}>
      Category ID
    </label>
    <input
      type="text"
      name="id"
      value={formData.id}
      onChange={handleChange}
      disabled
      className="w-[520] h-[36px] rounded-md border bg-white border-gray-300 p-2 dark:bg-[#122031] dark:text-white "
    />
  </div>

  <div className="grid grid-cols-2 items-center space-y-2 ">
  <label className="block text-[24px] font-medium text-gray-500 dark:text-white  " style={{ font: "Inter" }}>
      Category Name
    </label>
    <input
      type="text"
      name="categoryName"
      value={formData.categoryName}
      onChange={handleChange}
      className="w-[520] h-[36px] rounded-md border bg-white border-gray-300 p-2 dark:bg-[#122031] dark:text-white "
    />
  </div>

  <div className=" grid grid-cols-2 items-center space-y-2">
  <label className="block text-[24px] font-medium text-gray-500 dark:text-white  " style={{ font: "Inter" }}>
      Category Description
    </label>
    <textarea
      name="categoryDescription"
      value={formData.categoryDescription}
      onChange={handleChange}
      rows={4}
      className="w-[520] h-[183px] rounded-md border bg-white border-gray-300 p-2 dark:bg-[#122031] dark:text-white "
    />
  </div>

  <div className="flex justify-end space-x-4">
    <button
      type="button"
      onClick={handleCancel}
      className="rounded-md w-[150px] h-[40px] bg-[#FFCDCD] px-4 py-2 text-[#FF2323] hover:bg-[#FF2323] hover:text-[#FFCDCD] dark:text-white  border border-red-400  dark:bg-red-600 dark:hover:bg-red-700"
    >
      Cancel
    </button>
    <button
      type="submit"
      className="rounded-md w-[150px] h-[40px]  px-4 py-2 text-[#08762D] bg-[#BCFFC8] hover:text-[#BCFFC8] hover:bg-[#08762D] dark:text-white  border border-green-400 dark:bg-green-600 dark:hover:bg-green-700"
    >
      Create Category
    </button>
  </div>
</form>

    </div>
  );
};

export default NewCategories;
