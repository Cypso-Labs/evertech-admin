"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { MdKeyboardArrowLeft } from "react-icons/md";
import Swal from "sweetalert2";
import { useParams } from "next/navigation"; 

const Editcustomer = () => {
  const router = useRouter();
  const { id } = useParams(); 

  const [formData, setFormData] = useState({
    id: "",
    name: "",
    contact: "",
    address: "",
    mail: "",
    date: "",
  });

  const [isLoading, setIsLoading] = useState(true);

 
  useEffect(() => {
    if (id) {
    
      fetch(`/api/customers/${id}`)
        .then((response) => response.json())
        .then((data) => {
          setFormData({
            id: data.id,
            name: data.name,
            contact: data.contact,
            address: data.address,
            mail: data.mail,
            date: data.date,
          });
          setIsLoading(false);
        });
    }
  }, [id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    await Swal.fire({
      title: "Success!",
      text: "Customer has been updated",
      icon: "success",
      confirmButtonText: "OK!",
      confirmButtonColor: "#2ED36D",
      customClass: {
        title: "font- text-[27px]",
        popup: "dark:bg-[#122031] dark:text-white",
        confirmButton:
          "bg-[#FFD1D1] text-[#FFFFFF] hover:bg-[#FF5733] w-[147.5px] h-[47px]",
      },
    });
    console.log("Customer Updated!");
  };

  const handleCancel = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will lose all newly entered data!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Cancel",
      cancelButtonText: "No, keep editing",
      confirmButtonColor: "#D93132",
      cancelButtonColor: "#2ED36D",
      customClass: {
        popup: "dark:bg-[#122031] dark:text-white",
        confirmButton:
          "text-white bg-[#D93132] w-[133px] h-[47px] text-[15px] rounded-md",
        cancelButton:
          "text-white bg-[#2ED36D]  w-[140px] h-[47px] text-[15px]   rounded-md",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        router.push("/customers");
      }
    });
  };

  if (isLoading) {
    return <div>Loading customer details...</div>;
  }
  return (
    <div>
      <div className="mb-12 flex items-center text-[40px] font-medium text-[#475569] dark:text-white">
        <button
          className="mr-4 h-[51px] w-[51px] rounded-full text-center"
          onClick={() => router.back()}
        >
          <MdKeyboardArrowLeft className="h-[51px] w-[51px] cursor-pointer rounded-full border-2 border-gray-4 bg-white text-[#475569] hover:bg-[#E0EDFF] hover:text-[#3584FA]" />
        </button>
        <span className="text-[40px font-medium]">Edit Customer</span>{" "}
        <span className="ml-2">#{formData.id || "0001"}</span>
      </div>

      <div className="grid grid-cols-4">
        <div className="space-y-6 text-[24px] font-medium text-[#64748B] dark:text-white">
          <div className="h-[36px]">Customer ID</div>
          <div className="h-[36px]">Customer Name</div>
          <div className="h-[36px]">Contact</div>
          <div className="h-[108px]">Address</div>
          <div className="mt-10 h-[36px]">Mail</div>
          <div className="mt-8 h-[36px]">Registered Date</div>
        </div>

        <div>
          <div className="col-span-3 space-y-6">
            <input
              type="text"
              name="id"
              value={formData.id}
              onChange={handleInputChange}
              className="h-[36px] w-[520px] rounded-md border border-gray-300 bg-white dark:border-slate-500 dark:bg-slate-600"
            />
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="h-[36px] w-[520px] rounded-md border border-gray-300 bg-white dark:border-slate-500 dark:bg-slate-600"
            />
            <input
              type="text"
              name="contact"
              value={formData.contact}
              onChange={handleInputChange}
              className="h-[36px] w-[520px] rounded-md border border-gray-300 bg-white dark:border-slate-500 dark:bg-slate-600"
            />
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              className="h-[108px] w-[520px] rounded-md border border-gray-300 bg-white dark:border-slate-500 dark:bg-slate-600"
            />
            <input
              type="text"
              name="mail"
              value={formData.mail}
              onChange={handleInputChange}
              className="h-[36px] w-[520px] rounded-md border border-gray-300 bg-white dark:border-slate-500 dark:bg-slate-600"
            />
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              className="h-[36px] w-[520px] rounded-md border border-gray-300 bg-[#E8E8E8] dark:border-slate-500 dark:bg-slate-600"
            />
          </div>

          <div className="mt-10 flex w-[520px] justify-end space-x-6">
            <button
              className="h-[49px] w-[181px] rounded-lg border-[1px] border-[#FF2323] bg-[#FFCDCD] font-medium text-[#FF2323] hover:border-[#FFCDCD] hover:bg-[#FF2323] hover:text-[#FFCDCD]"
              onClick={(e) => {
                e.stopPropagation();
                handleCancel();
              }}
            >
              Discard
            </button>
            <button
              className="h-[49px] w-[181px] rounded-lg border-[1px] border-[#08762D] bg-[#BCFFC8] font-medium text-[#08762D] hover:border-[#BCFFC8] hover:bg-[#08762D] hover:text-[#BCFFC8]"
              onClick={(e) => {
                e.stopPropagation();
                handleSave();
              }}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Editcustomer;
