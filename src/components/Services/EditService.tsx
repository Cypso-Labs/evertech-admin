'use client'

import React, { useState, useEffect, FormEvent } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { IoIosArrowDropleft } from "react-icons/io"
import Link from "next/link"
import Swal from 'sweetalert2'

export default function EditService() {
  const router = useRouter()
  const searchParams = useSearchParams()
 
  const [formData, setFormData] = useState({
    id: "",
    service: "",
    category: "",
    expireDate: ""
  })
    
  useEffect(() => {
    if (searchParams) {
      setFormData({
        id: searchParams.get("id") || "",
        service: searchParams.get("service") || "",
        category: searchParams.get("category") || "",
        expireDate: searchParams.get("expireDate") || ""
      })
    }
  }, [searchParams])
   
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    try {

      const payload = {
        _id:formData.id,
        name: formData.service, 
        opt_expire_date: formData.expireDate, 
        category_id: formData.category,
        
      };
      const response = await fetch('http://localhost:5000/api/services/${formData.id}', {
        method: 'PUT', 
        headers: {
          'Content-Type': 'application/json', 
        },
        body: JSON.stringify(payload), 
      });
  
      if (!response.ok) {
        throw new Error('Failed to create the service');
      }
      // Reset form or redirect
      setFormData({
        id:"",
        service: '',
        category: '',
        expireDate: '',
      });
      
      await Swal.fire({
        title: 'Success!',
        text: 'Service has been edited successfully',
        icon: 'success',
        confirmButtonText: 'OK',
        confirmButtonColor: '#08762D',
        customClass: {
          popup: 'dark:bg-[#122031] dark:text-white',
          confirmButton: 'bg-[#BCFFC8] text-[#BCFFC8] hover:bg-[#08762D] hover:text-[#BCFFC8]'
        }
      })

      router.push('/services')
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: 'Something went wrong while editing the service',
        icon: 'error',
        confirmButtonText: 'OK',
        confirmButtonColor: '#FF2323',
        customClass: {
          popup: 'dark:bg-[#122031] dark:text-white'
        }
      })
    }
  }

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
        router.push('/services')
      }
    })
  }
    
  return (
    <div className="p-6">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/services" className="inline-block">
          <IoIosArrowDropleft className="w-10 h-10 cursor-pointer mr-2 text-slate-600 hover:text-[#3584FA] dark:text-white" />
        </Link>
        <h1 className="font-inter text-4xl font-medium text-slate-600 dark:text-white">
          Edit Service {formData.id}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
        <div className="grid grid-cols-2 items-center gap-4">
          <label className="text-2xl font-medium text-gray-500 dark:text-white">
            Service ID
          </label>
          <input
            type="text"
            name="id"
            value={formData.id}
            onChange={handleChange}
            disabled
            className="h-10 rounded-md border bg-gray-100 border-gray-300 p-2 dark:bg-[#1E293B] dark:text-white"
          />
        </div>

        <div className="grid grid-cols-2 items-center gap-4">
          <label className="text-2xl font-medium text-gray-500 dark:text-white">
            Service Name
          </label>
          <input
            type="text"
            name="service"
            value={formData.service}
            onChange={handleChange}
            className="h-10 rounded-md border bg-white border-gray-300 p-2 dark:bg-[#1E293B] dark:text-white"
          />
        </div>
        
        <div className="grid grid-cols-2 items-center gap-4">
          <label className="text-2xl font-medium text-gray-500 dark:text-white">
            Category
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="h-10 rounded-md border bg-white border-gray-300 p-2 dark:bg-[#1E293B] dark:text-white"
          >
            <option value="">Select Category</option>
            <option value="category1">Category 1</option>
            <option value="category2">Category 2</option>
            <option value="category3">Category 3</option>
          </select>
        </div>

        <div className="grid grid-cols-2 items-center gap-4">
          <label className="text-2xl font-medium text-gray-500 dark:text-white">
            Expire Date
          </label>
          <input
            type="date"
            name="expireDate"
            value={formData.expireDate}
            onChange={handleChange}
            className="h-10 rounded-md border bg-white border-gray-300 p-2 dark:bg-[#1E293B] dark:text-white"
          />
        </div>

        <div className="flex justify-end space-x-4 mt-8">
          <button
            type="button"
            onClick={handleCancel}
            className="rounded-md w-36 h-10 bg-[#FFCDCD] px-4 py-2 text-[#FF2323] hover:bg-[#FF2323] hover:text-[#FFCDCD] dark:bg-red-600 dark:text-white dark:hover:bg-red-700 transition-colors duration-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md w-36 h-10 px-4 py-2 text-[#08762D] bg-[#BCFFC8] hover:text-[#BCFFC8] hover:bg-[#08762D] dark:bg-green-600 dark:text-white dark:hover:bg-green-700 transition-colors duration-200"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  )
}