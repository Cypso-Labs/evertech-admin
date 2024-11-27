"use client";

import React, { useState, useEffect } from "react";
import { BiSolidCategory } from "react-icons/bi";
import { FiSearch, FiTrash2 } from "react-icons/fi";
import { Switch } from "@headlessui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  useGetAllServicesQuery,
  useUpdateServiceMutation,
  useDeleteServiceMutation,
} from "@/app/redux/features/serviceApiSlice";
import { useGetAllCategoriesQuery } from "@/app/redux/features/categoryApiSlice";
import { Service } from "@/types";

const Services = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;


  const [updateService] = useUpdateServiceMutation();
  const [deleteService] = useDeleteServiceMutation();


  const {
    data: servicesResponse = { data: [] } as { data: Service[] },
    isLoading: servicesLoading,
    isError: servicesError,
  } = useGetAllServicesQuery();

  const {
    data: categories = [],
    isLoading: categoriesLoading,
    isError: categoriesError,
  } = useGetAllCategoriesQuery();


  if (servicesLoading || categoriesLoading) return <div>Loading...</div>;

  if (servicesError || categoriesError) return <div>Error loading data.</div>;

  const services =
    servicesResponse && "data" in servicesResponse
      ? servicesResponse.data
      : servicesResponse;

 
  const filteredServices = services.filter((service) =>
    service.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const totalPages = Math.ceil(filteredServices.length / itemsPerPage);
  const paginatedServices = filteredServices.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const isExpired = (optExpireDate: Date) =>
    new Date(optExpireDate) < new Date();

  const handleRowClick = (service: Service) => {
    router.push(`/services/editServices?id=${service._id}`);
  };

  const handleSwitchChange = async (service: Service, e: React.MouseEvent) => {
    e.stopPropagation();

    if (isExpired(service.opt_expire_date)) {
      alert("This service is expired and cannot be enabled.");
      return;
    }
    try {
      await updateService({
        id: service._id,
        isEnabled: !service.isEnabled,
      }).unwrap();
    } catch (error) {
      console.error("Failed to update service:", error);
    }
  };

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await deleteService(id).unwrap();
    } catch (error) {
      console.error("Failed to delete service:", error);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Function to get category name by id
  const getCategoryName = (categoryId: string) => {
    const category = categories.find((cat) => cat._id === categoryId);
    return category ? category.name : "Unknown Category";
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-[40px] font-medium text-slate-600 dark:text-white">
          Services
        </h1>
        <div className="flex space-x-4">
          <Link href="/services/category" className="inline-block">
            <button className="flex h-[58px] w-[181px] items-center justify-center rounded-md border border-gray-500 bg-[#CBD5E1] px-4 py-2 text-xl font-medium text-gray-700 hover:bg-[#000000] hover:text-slate-300 dark:bg-[#122031] dark:text-white">
              Categories
              <BiSolidCategory
                className="ml-2 text-gray-500 hover:text-slate-300"
                size={24}
              />
            </button>
          </Link>
          <Link href="/services/newService" className="inline-block">
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
            className="h-10 w-64 rounded-md border border-gray-300 pl-10 pr-4 focus:border-transparent focus:ring-2 focus:ring-blue-500 dark:bg-[#122031] dark:text-white"
          />
          <FiSearch className="absolute left-3 top-1 translate-y-1/2 transform text-gray-400" />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-separate border-spacing-y-3">
          <thead>
            <tr className="py-2 text-center text-[16px] font-extrabold text-slate-600 dark:text-white">
              <th>ID</th>
              <th>NAME</th>
              <th>PRICE</th>
              <th>CATEGORY</th>
              <th>EXPIRE DATE</th>
              <th>STATUS</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {paginatedServices.map((service) => (
              <tr
                key={service._id}
                onClick={() => handleRowClick(service)}
                className="cursor-pointer rounded-lg bg-white py-2 text-center text-[16px] font-medium text-slate-700 shadow-md hover:bg-[#E0EDFF] dark:bg-[#122031] dark:text-white"
              >
                <td className="rounded-l-xl px-4 py-6">{service._id}</td>
                <td className="px-4 py-2">{service.name}</td>
                <td className="px-4 py-2">Rs.{service.price}</td>
                <td className="px-4 py-2">
                  {getCategoryName(service.category_id)}
                </td>
                <td className="px-4 py-2">
                  {new Date(service.opt_expire_date).toLocaleDateString()}
                </td>
                <td>
                  <div className="flex justify-center">
                    <Switch
                      checked={
                        service.isEnabled && !isExpired(service.opt_expire_date)
                      }
                      onChange={() => {}}
                      onClick={(e) => handleSwitchChange(service, e)}
                      className={`${
                        service.isEnabled && !isExpired(service.opt_expire_date)
                          ? "bg-green-600"
                          : "bg-gray-200"
                      } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:ring-2 focus:ring-indigo-500`}
                    >
                      <span
                        className={`${
                          service.isEnabled &&
                          !isExpired(service.opt_expire_date)
                            ? "translate-x-6"
                            : "translate-x-1"
                        } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                      />
                    </Switch>
                  </div>
                </td>
                <td className="rounded-r-xl px-4 py-2">
                  <button
                    className="text-red-500 hover:text-[#3584FA]"
                    onClick={(e) => handleDelete(service._id, e)}
                  >
                    <FiTrash2 size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-4 flex items-center justify-between">
          <nav className="inline-flex items-center">
            <button
              className="mx-1 rounded-md border border-gray-300 px-3 py-1 text-black dark:text-white"
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
            >
              <span>&lt;</span>
            </button>
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index + 1}
                className={`mx-1 rounded-md border border-gray-300 px-3 py-1 ${
                  currentPage === index + 1
                    ? "bg-blue text-white"
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
