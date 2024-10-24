"use client";
import React, { useState, useEffect } from "react";
import { IoIosArrowDropleft } from "react-icons/io";
import Link from "next/link";
import { FaTrashAlt } from "react-icons/fa";
import { useSearchParams } from "next/navigation";

interface Leave {
  id: string;
  date: string;
  Type: string;
  Reason: string;
}

interface FormData {
  id: string;
  date: string;
  Type: string;
  Reason: string;
}


const Leaves = () => {
  const searchParams = useSearchParams();
  
  const [formData, setFormData] = useState<FormData>({
    id: "",
    date: "",
    Type: "",
    Reason: "",
  });

  const initialLeaveData: Leave[] = [
    {id: "1", date: "01", Type: "Leaves", Reason: "Sit Amet Consectetur Sit"},
    {id: "2", date: "01", Type: "Leaves", Reason: "Sit Amet Consectetur Sit"},
    {id: "3", date: "01", Type: "Leaves", Reason: "Sit Amet Consectetur Sit"},
    {id: "4", date: "01", Type: "Leaves", Reason: "Sit Amet Consectetur Sit"},
    {id: "5", date: "01", Type: "Leaves", Reason: "Sit Amet Consectetur Sit"},
  ];

  const [leaves, setLeaves] = useState<Leave[]>(initialLeaveData);

  useEffect(() => {
    // Check if searchParams exists and then get values
    const id = searchParams?.get("id");
    const service = searchParams?.get("service");
    
    if (id || service) {
      setFormData(prev => ({
        ...prev,
        id: id || "",
        date: service || "",
      }));
    }
  }, [searchParams]);

  // Rest of the component remains the same...
  const handleDelete = (leaveId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLeaves((prevLeaves) => prevLeaves.filter((leave) => leave.id !== leaveId));
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Add form submission logic here
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleClear = () => {
    setFormData({
      id: formData.id, 
      date: "",
      Type: "",
      Reason: "",
    });
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-20 flex items-center">
        <Link href="/employees/editeEmployee" className="mr-4">
          <IoIosArrowDropleft className="h-10 w-10 cursor-pointer text-slate-600 hover:text-[#3584FA] dark:text-white" />
        </Link>
        <h1 className="text-4xl font-medium text-slate-600 dark:text-white" style={{ fontFamily: "Inter" }}>
          Leave Employee {formData.id}
        </h1>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-2 gap-6">
        {/* Left Panel - Apply For Leaves */}
        <div className="rounded-xl bg-white dark:bg-[#122031] p-6 shadow-sm">
          <h2 className="mb-8 text-[20px] font-medium text-slate-500 dark:text-white" style={{ fontFamily: "Inter" }}>
            Apply For Leaves
          </h2>
          
          <form className="w-full" onSubmit={handleFormSubmit}>
            <div className="ml-10 mb-6 flex space-x-[200px] items-center">
              <label className="text-[15px] font-medium text-slate-500 block mb-2 dark:text-white" style={{ fontFamily: "Inter" }}>
                Date
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                className="w-full rounded-md border border-gray-200 px-3 py-2 text-base focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-[#122031] dark:text-white"
              />
            </div>

            <div className="ml-10 mb-6 flex items-center space-x-[110px]"> 
              <label className="text-[15px] w-[200px] font-medium text-slate-500 mb-2 dark:text-white" style={{ fontFamily: "Inter" }}>
                Leave Type
              </label>
              <select
                name="Type"
                value={formData.Type}
                onChange={handleInputChange}
                className="w-full rounded-md border border-gray-200 px-3 py-2 text-base focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-[#122031] dark:text-white"
              >
                <option value="">Select leave type</option>
                <option value="vacation">Vacation</option>
                <option value="sick">Sick Leave</option>
                <option value="personal">Personal Leave</option>
              </select>
            </div>

            <div className="ml-10 mb-8 flex items-center space-x-[180px]">
              <label className="text-[15px] font-medium text-slate-500 block mb-2 dark:text-white" style={{ fontFamily: "Inter" }}>
                Reason
              </label>
              <textarea
                name="Reason"
                value={formData.Reason}
                onChange={handleInputChange}
                rows={4}
                className="w-full rounded-md border border-gray-200 px-3 py-2 text-base focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-[#122031] dark:text-white"
              />
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={handleClear}
                className="rounded-md bg-gray-300 px-6 py-2 text-base font-medium text-[#000000] border border-dark hover:bg-[#000000] hover:text-white"
              >
                Clear
              </button>
              <button
                type="submit"
                className="rounded-md bg-[#BCFFC8] px-6 py-2 text-base font-medium text-[#08762D] border border-[#08762D] hover:bg-[#08762D] hover:text-[#BCFFC8]"
              >
                Apply
              </button>
            </div>
          </form>
        </div>

        {/* Right Panel - Leave History */}
        <div className="rounded-xl bg-white p-6 shadow-sm dark:bg-[#122031] dark:text-white">
          <h2 className="mb-8 text-[20px] font-medium text-slate-500 dark:text-white" style={{ fontFamily: "Inter" }}>
            Leave History
          </h2>
          
          <div className="overflow-x-auto">
            <table className="w-full dark:text-white">
              <thead>
                <tr className="border-b border-t text-center">
                  <th className="pb-4 text-sm font-medium text-slate-500 dark:text-white">Date</th>
                  <th className="pb-4 text-sm font-medium text-slate-500 dark:text-white">Type</th>
                  <th className="pb-4 text-sm font-medium text-slate-500 dark:text-white">Reason</th>
                  <th className="pb-4 text-sm font-medium text-slate-500 dark:text-white">Action</th>
                </tr>
              </thead>
              <tbody>
                {leaves.map((leave) => (
                  <tr key={leave.id} className="text-center hover:bg-slate-200">
                    <td className="py-4 text-sm text-slate-500 dark:text-white">{leave.date}</td>
                    <td className="py-4 text-sm text-slate-500 dark:text-white">{leave.Type}</td>
                    <td className="py-4 text-sm text-slate-500 dark:text-white">{leave.Reason}</td>
                    <td className="py-4">
                      <button
                        className="text-red-500 hover:text-[#3584FA]"
                        onClick={(e) => handleDelete(leave.id, e)}
                      >
                        <FaTrashAlt />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaves;