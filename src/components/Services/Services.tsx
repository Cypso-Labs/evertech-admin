"use client";

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import {
  setSearchTerm,
  toggleServiceEnabled,
  deleteService,
  setCurrentPage,
  setServices,
} from "@/redux/slices/servicesSlice";
import { BiSolidCategory } from "react-icons/bi";
import { FiSearch, FiChevronDown, FiTrash2 } from "react-icons/fi";
import { Switch } from "@headlessui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Service = {
  id: string;
  service: string;
  category: string;
  price: string;
  isEnabled: boolean;
};

const Services = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const services = useSelector((state: RootState) => state.services.services);
  const searchTerm = useSelector(
    (state: RootState) => state.services.searchTerm,
  );
  const currentPage = useSelector(
    (state: RootState) => state.services.currentPage,
  );
  const itemsPerPage = 6;

  const filteredServices = services.filter(
    (service) =>
      service.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.id.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const indexOfLastService = currentPage * itemsPerPage;
  const indexOfFirstService = indexOfLastService - itemsPerPage;
  const currentServices = filteredServices.slice(
    indexOfFirstService,
    indexOfLastService,
  );

  const totalPages = Math.ceil(filteredServices.length / itemsPerPage);

  const handleRowClick = (service: Service) => {
    router.push(
      `/services/editServices?id=${service.id}&service=${service.service}&category=${service.category}&price=${service.price}`,
    );
  };

  const handleSwitchChange = (serviceId: string) => {
    dispatch(toggleServiceEnabled(serviceId));
  };

  const handleDelete = (serviceId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(deleteService(serviceId));
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchTerm(e.target.value));
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      dispatch(setCurrentPage(currentPage + 1));
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      dispatch(setCurrentPage(currentPage - 1));
    }
  };

  // Simulating fetching data without Axios
  React.useEffect(() => {
    const mockServices = [
      // Mock data, replace this with your actual logic
      {
        id: "1",
        service: "Photography",
        category: "Event",
        price: "1000",
        isEnabled: true,
      },
      {
        id: "2",
        service: "Wedding Photography",
        category: "Wedding",
        price: "5000",
        isEnabled: false,
      },
    ];

    dispatch(setServices(mockServices)); // Set the data in the store
  }, [dispatch]);

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-[40px] font-medium text-slate-600 dark:text-white">
          Services
        </h1>
        <div className="flex space-x-4">
          <Link href="/services/category">
            <button className="flex h-[58px] w-[181px] items-center justify-center rounded-md bg-[#CBD5E1] text-xl font-medium text-gray-700 hover:bg-[#000000] hover:text-slate-300 dark:bg-[#122031] dark:text-white">
              Categories <BiSolidCategory className="ml-2" size={24} />
            </button>
          </Link>
          <Link href="/services/newService">
            <button className="h-[58px] w-[181px] rounded-md bg-blue-100 text-[20px] font-medium text-blue-500 hover:bg-[#3584FA] hover:text-[#E0EDFF] dark:bg-blue-400 dark:text-white">
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
            onChange={handleSearchChange}
            className="h-10 w-64 rounded-md border pl-10 pr-4 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-[#122031] dark:text-white"
          />
          <FiSearch className="absolute left-3 top-1 translate-y-1/2 transform text-gray-400" />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-separate border-spacing-y-3">
          <thead>
            <tr className="border-slate-400 py-2 text-center text-[16px] font-extrabold text-slate-600 dark:text-white">
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
              <tr
                key={index}
                onClick={() => handleRowClick(service)}
                className="cursor-pointer text-center hover:bg-gray-100 dark:hover:bg-[#333D4C]"
              >
                <td>{service.id}</td>
                <td>{service.service}</td>
                <td>{service.category}</td>
                <td>{service.price}</td>
                <td>
                  <Switch
                    checked={service.isEnabled}
                    onChange={() => handleSwitchChange(service.id)}
                    className={`${
                      service.isEnabled ? "bg-[#4CAF50]" : "bg-[#ccc]"
                    } relative inline-flex h-6 w-11 items-center rounded-full`}
                  >
                    <span className="sr-only">Enable service</span>
                    <span
                      className={`${
                        service.isEnabled ? "translate-x-6" : "translate-x-1"
                      } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                    />
                  </Switch>
                </td>
                <td>
                  <button
                    onClick={(e) => handleDelete(service.id, e)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FiTrash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex justify-between">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="rounded-md bg-blue-500 px-4 py-2 text-white disabled:bg-gray-300"
        >
          Previous
        </button>
        <span className="text-sm">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="rounded-md bg-blue-500 px-4 py-2 text-white disabled:bg-gray-300"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Services;
