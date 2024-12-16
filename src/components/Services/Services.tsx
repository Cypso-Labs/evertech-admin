"use client";

import React, { useState, useEffect } from "react";
import { FiSearch, FiChevronDown, FiTrash2 } from "react-icons/fi";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  useGetAllServicesQuery,
  useDeleteServiceMutation,
  useUpdateServiceMutation,
} from "@/app/redux/features/serviceApiSlice";
import { useGetAllCategoriesQuery } from "@/app/redux/features/categoryApiSlice";
import { Service } from "@/types";

const Services = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;


  const { data, isLoading, isError, error, refetch: refetchServices } = useGetAllServicesQuery();
  const services = data|| [];
  const { data: categories = [], isLoading: loading } =
    useGetAllCategoriesQuery();

  


  const [deleteService] = useDeleteServiceMutation();
  const [updateService] = useUpdateServiceMutation();

  const handleRowClick = (service: Service) => {
    const queryParams = new URLSearchParams({
      id: service._id,
      service: service.name,
      description: service.description,
    }).toString();
    router.push(`/services/editServices?${queryParams}`);
  };



  const handleDelete = (serviceId: string) => {
    deleteService(serviceId);
  };

  const filteredServices = Array.isArray(services)
    ? services.filter(
        (service) =>
          service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          service.description
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          service._id.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    : [];

  const indexOfLastService = currentPage * itemsPerPage;
  const indexOfFirstService = indexOfLastService - itemsPerPage;
  const currentServices = filteredServices.slice(
    indexOfFirstService,
    indexOfLastService,
  );

  const totalPages = Math.ceil(filteredServices.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };
   useEffect(() => {
     const intervalId = setInterval(() => {
       refetchServices();
     }, 300);

     return () => {
       clearInterval(intervalId);
     };
   }, [refetchServices]);

  if (isLoading) {
    return <div>Loading...</div>; 
  }
  if (isError) {
    return (
      <div>
        Error:{" "}
        {error instanceof Error ? error.message : "Failed to load services"}
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-[40px] font-medium text-slate-600 dark:text-white">
          Services
        </h1>
        <div className="flex space-x-4">
          <Link href="/services/newService">
            <button className="h-[58px] w-[181px] rounded-md border border-blue-600 bg-blue-100 px-4 py-2 text-[20px] font-medium text-blue-500 hover:bg-[#3584FA] hover:text-[#E0EDFF] dark:bg-blue-400 dark:text-white">
              New Service +
            </button>
          </Link>
        </div>
      </div>

      <div className="mb-10 flex space-x-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search Service"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="h-10 w-64 rounded-md border border-gray-300 pl-10 pr-4 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-[#122031] dark:text-white"
          />
          <FiSearch className="absolute left-3 top-1 translate-y-1/2 transform text-gray-400" />
        </div>

        <button className="flex h-10 w-32 items-center justify-between rounded-md border border-gray-300 bg-white px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-[#122031] dark:text-white">
          <span className="text-gray-700 dark:text-white">Sort By ID</span>
          <FiChevronDown className="text-gray-400" />
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-separate border-spacing-y-3">
          <thead>
            <tr className="border-slate-400 py-2 text-center text-[16px] font-extrabold text-slate-600 dark:text-white">
              <th>ID</th>
              <th>SERVICE</th>
              <th>CATEGORY</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {currentServices.map((service) => (
              <tr
                key={service._id}
                onClick={() => handleRowClick(service)}
                className="cursor-pointer rounded-lg bg-white py-2 text-center text-[16px] font-medium text-slate-700 shadow-md hover:bg-[#E0EDFF] dark:bg-[#122031] dark:text-white"
              >
                <td className="rounded-l-xl px-4 py-6">
                  {service.service_id}
                </td>
                <td className="px-4 py-2">{service.name}</td>
                <td className="px-4 py-2">{service.description}</td>
                <td className="rounded-r-xl px-4 py-2">
                  <button
                    className="text-red-500 hover:text-[#3584FA]"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(service._id);
                    }}
                  >
                    <FiTrash2 size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-4 flex items-center justify-between">
          <nav className="inline-flex items-center font-semibold">
            <button
              className="mx-1 rounded-md border border-gray-300 px-3 py-1 text-black dark:text-white"
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
            >
              <span>&lt;</span>
            </button>
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                className={`mx-1 rounded-md border border-gray-300 px-3 py-1 ${
                  currentPage === index + 1
                    ? "bg-blue-500 text-white"
                    : "text-black dark:text-white"
                }`}
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </button>
            ))}
            <button
              className="mx-1 rounded-md border border-gray-300 px-3 py-1 text-black dark:text-white"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              <span>&gt;</span>
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Services;
