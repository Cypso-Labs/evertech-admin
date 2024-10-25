"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { MdKeyboardArrowLeft } from "react-icons/md";
import Swal from "sweetalert2";

const Newcustomer = () => {
  const router = useRouter();

  const handleSave = async () => {
    await Swal.fire({
      title: "Success!",
      text: "Customer has been created",
      icon: "success",
      confirmButtonText: "OK!",
      confirmButtonColor: "#2ED36D",
      customClass: {
        title: "font- text-[27px]",
        popup: "dark:bg-[#122031] dark:text-white",
        confirmButton: "bg-[#FFD1D1] text-[#FFFFFF] hover:bg-[#FF5733] w-[147.5px] h-[47px]",
      },
    });
    console.log("Customer Created!");
  };

  const handleCancel = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will lose all newly entered data!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes,Cancel",
      cancelButtonText: "No,keep editing",
      confirmButtonColor: "#D93132",
      cancelButtonColor: "#2ED36D",
      customClass: {
        popup: "dark:bg-[#122031] dark:text-white",
        confirmButton: "text-white bg-[#D93132] w-[133px] h-[47px] text-[15px] rounded-md",
        cancelButton: "text-white bg-[#2ED36D]  w-[140px] h-[47px] text-[15px]   rounded-md",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        router.push("/customers");
      }
    });
  };
  


  return (
    <div>
      <div className="mb-12 flex items-center text-[40px] font-medium text-[#475569] dark:text-white">
        <button
          className="mr-4 h-[51px] w-[51px] rounded-full text-center dark:bg-dark-2"
          onClick={() => router.back()}
        >
          <MdKeyboardArrowLeft className="cursor-pointer hover:text-[#3584FA] text-[#475569] hover:bg-[#E0EDFF] bg-white rounded-full h-[51px] w-[51px] border-2 border-gray-4" />
        </button>
        <span className="text-[40px] font-medium text-[#475569]"> New Customer </span>
      </div>

      <div className="grid grid-cols-4">
        <div className="space-y-6 text-[24px] font-medium dark:text-white text-[#64748B]">
          <div className="h-[36px]">Customer ID</div>
          <div className="h-[36px]">Customer Name</div>
          <div className="h-[36px]">Contact</div>
          <div className="h-[108px]">Address</div>
          <div className="mt-10 h-[36px]">Mail</div>
        </div>

        <div>
          <div className="col-span-3 space-y-6">
            <input
              type="text"
              name="id"
              className="h-[36px] w-[520px] border border-gray-300 bg-white dark:border-slate-500 dark:bg-slate-600 rounded-md"
            />
            <input
              type="text"
              name="name"
              className="h-[36px] w-[520px] border  border-gray-300 bg-white dark:border-slate-500 dark:bg-slate-600 rounded-md"
            />
            <input
              type="text"
              name="contact"
              className="h-[36px] w-[520px] border border-gray-300 bg-white dark:border-slate-500 dark:bg-slate-600 rounded-md"
            />
            <input
              type="text"
              name="address"
              className="h-[108px] w-[520px] border border-gray-300 bg-white dark:border-slate-500 dark:bg-slate-600 rounded-md"
            />
            <input
              type="text"
              name="mail"
              className="h-[36px] w-[520px] border border-gray-300 bg-white dark:border-slate-500 dark:bg-slate-600 rounded-md"
            />
          </div>
          <div className="mt-10 flex justify-end space-x-6 w-[520px]">
            <button className="h-[49px] w-[181px] rounded-lg border-[1px] border-[#FF2323] bg-[#FFCDCD] font-medium text-[#FF2323]"
            onClick={(e) => {
              e.stopPropagation();
              handleCancel();
            }}
            >
              
              
              Discard
            </button>
            <button
              className="h-[49px] w-[181px] rounded-lg border-[1px] border-[#08762D] bg-[#BCFFC8] font-medium text-[#08762D]"
              onClick={(e) => {
                e.stopPropagation();
                handleSave();
              }}
            >
              Create Customer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Newcustomer;
