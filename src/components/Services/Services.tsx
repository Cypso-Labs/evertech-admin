"use client";
import React, { useState } from "react";
import { BiSolidCategory } from "react-icons/bi";
import { FiSearch, FiChevronDown } from "react-icons/fi";
import { Switch } from '@headlessui/react';
import { FiTrash2 } from 'react-icons/fi';

const Services = () => {
  const services = [
    { id: 'Service #00142', service: 'Lorem ipsum dolor sit amet', category: 'Lorem ipsum', price: "$ 99.98" },
    { id: 'Service #00143', service: 'Consectetur adipiscing elit', category: 'Dolor sit', price: "$ 129.99" },
    { id: 'Service #00144', service: 'Sed do eiusmod tempor', category: 'Adipiscing elit', price: "$ 89.50" },
    { id: 'Service #00144', service: 'Sed do eiusmod tempor', category: 'Adipiscing elit', price: "$ 89.50" },
    { id: 'Service #00144', service: 'Sed do eiusmod tempor', category: 'Adipiscing elit', price: "$ 89.50" },
    { id: 'Service #00144', service: 'Sed do eiusmod tempor', category: 'Adipiscing elit', price: "$ 89.50" },
    { id: 'Service #00144', service: 'Sed do eiusmod tempor', category: 'Adipiscing elit', price: "$ 89.50" },
    { id: 'Service #00144', service: 'Sed do eiusmod tempor', category: 'Adipiscing elit', price: "$ 89.50" },
    { id: 'Service #00144', service: 'Sed do eiusmod tempor', category: 'Adipiscing elit', price: "$ 89.50" },
    { id: 'Service #00144', service: 'Sed do eiusmod tempor', category: 'Adipiscing elit', price: "$ 89.50" },
    { id: 'Service #00144', service: 'Sed do eiusmod tempor', category: 'Adipiscing elit', price: "$ 89.50" },
    { id: 'Service #00144', service: 'Sed do eiusmod tempor', category: 'Adipiscing elit', price: "$ 89.50" },
    { id: 'Service #00144', service: 'Sed do eiusmod tempor', category: 'Adipiscing elit', price: "$ 89.50" },
    { id: 'Service #00144', service: 'Sed do eiusmod tempor', category: 'Adipiscing elit', price: "$ 89.50" },
    { id: 'Service #00144', service: 'Sed do eiusmod tempor', category: 'Adipiscing elit', price: "$ 89.50" },
    { id: 'Service #00144', service: 'Sed do eiusmod tempor', category: 'Adipiscing elit', price: "$ 89.50" },
    { id: 'Service #00144', service: 'Sed do eiusmod tempor', category: 'Adipiscing elit', price: "$ 89.50" },
    { id: 'Service #00144', service: 'Sed do eiusmod tempor', category: 'Adipiscing elit', price: "$ 89.50" },
    { id: 'Service #00144', service: 'Sed do eiusmod tempor', category: 'Adipiscing elit', price: "$ 89.50" },
    { id: 'Service #00144', service: 'Sed do eiusmod tempor', category: 'Adipiscing elit', price: "$ 89.50" },
    { id: 'Service #00144', service: 'Sed do eiusmod tempor', category: 'Adipiscing elit', price: "$ 89.50" },
    { id: 'Service #00144', service: 'Sed do eiusmod tempor', category: 'Adipiscing elit', price: "$ 89.50" },
    
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Filtered services based on search input
  const filteredServices = services.filter(
    (service) =>
      service.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate the current services to display
  const indexOfLastService = currentPage * itemsPerPage;
  const indexOfFirstService = indexOfLastService - itemsPerPage;
  const currentServices = filteredServices.slice(indexOfFirstService, indexOfLastService);

  // Calculate total pages
  const totalPages = Math.ceil(filteredServices.length / itemsPerPage);

  // Pagination functions
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

  return (
    <div >
      <div className="flex items-center justify-between mb-6">
        <h1
          className="text-[40px] font-medium text-slate-600 dark:text-white"
          style={{ font: "Inter" }}
        >
          Services
        </h1>
        <div className="flex space-x-4  ">
          <button className="flex h-[58px] w-[181px] items-center justify-center rounded-md border border-gray-500 bg-gray-100 dark:text-white dark:bg-[#122031]  px-4 py-2 text-[20px] font-medium text-gray-700 transition-colors duration-300 hover:bg-gray-200 ">
            Categories
            <BiSolidCategory className="ml-2 text-gray-500" size={24} />
          </button>
          <button className="h-[58px] w-[181px] rounded-md border border-blue-600 dark:bg-blue-400 dark:text-white   bg-blue-100 px-4 py-2 text-[20px] font-medium text-blue-500 transition-colors duration-300 hover:bg-blue-200  ">
            New Service +
          </button>
        </div>
      </div>

      <div className="flex space-x-4 mb-10">
        <div className="relative">
          <input
            type="text"
            placeholder="Search Service"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="h-10 w-64 rounded-md border border-gray-300 pl-10 pr-4 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500  dark:text-white dark:bg-[#122031]"
          />
          <FiSearch className="absolute left-3 top-1 translate-y-1/2 transform text-gray-400" />
        </div>

        <button className="flex h-10 w-32 items-center justify-between rounded-md border border-gray-300 bg-white px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white dark:bg-[#122031] ">
          <span className="text-gray-700 dark:text-white dark:bg-[#122031]">Sort By ID</span>
          <FiChevronDown className="text-gray-400" />
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-separate border-spacing-y-3 ">
          <thead>
            <tr className="text-center dark:text-white border-slate-400 py-2 text-[16px] font-extrabold text-slate-600" style={{ font: "Inter" }}>
              <th>ID</th>
              <th>SERVICE</th>
              <th>CATEGORY</th>
              <th>PRICE</th>
              <th>EXP</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {currentServices.map((service, index) => (
                
              <tr key={index} className="text-center    py-2 text-[16px] font-medium text-slate-700 bg-white rounded-lg shadow-md dark:text-white dark:bg-[#122031]   " style={{ font: "Inter" }}>
                <td className="py-6 px-4 rounded-l-xl">{service.id}</td>
                <td className="py-2 px-4">{service.service}</td>
                <td className="py-2 px-4">{service.category}</td>
                <td className="py-2 px-4">{service.price}</td>
                <td className="">
                  <div className="flex justify-center">
                    <Switch
                      checked={true}
                      onChange={() => {}}
                      className={`${
                        true ? "bg-green-600" : "bg-gray-200"
                      } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
                    >
                      <span
                        className={`${
                          true ? "translate-x-6" : "translate-x-1"
                        } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                      />
                    </Switch>
                  </div>
                </td>
                <td className="py-2 px-4  rounded-r-xl">
                  <button className="text-red-500 hover:text-red-700">
                    <FiTrash2 size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
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
