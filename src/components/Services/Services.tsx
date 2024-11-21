'use client'

import React, { useState } from "react"
import { BiSolidCategory } from "react-icons/bi"
import { FiSearch, FiChevronDown, FiTrash2 } from "react-icons/fi"
import { Switch } from '@headlessui/react'
import Link from "next/link"
import { useRouter } from 'next/navigation'
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import { AppDispatch, RootState } from "@/app/redux/store/store";
import { getService } from "@/app/redux/serviceSlice"
import { useEffect } from "react"
import Swal from 'sweetalert2';
const Services = () => {

  const dispatch: AppDispatch = useAppDispatch();
  const getAllServicers = useAppSelector((state: RootState) => state.servicers.data);

  useEffect(() => {
    dispatch(getService());
  }, [dispatch]);


  const router = useRouter();
  interface Service {
    id: string;
    service: string;
    category: string;
    opt_expire_date:string
    isEnabled?: boolean;
  }
  

  const [services, setServices] = useState<Service[]>([]); 

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    if (getAllServicers) {
      const currentDate = new Date().toISOString().split("T")[0]; // Current date in YYYY-MM-DD format
  
      const mappedServices = getAllServicers.map((item: any) => {
        const serviceExpireDate = item.opt_expire_date || "00-00-0000";
  
        // Determine if the switch should be enabled
        const isEnabled = new Date(serviceExpireDate) >= new Date(currentDate);
  
        return {
          id: item._id || "Service #",
          service: item.name || "Default Service Name",
          category: item.category_id || "Default Category",
          opt_expire_date: serviceExpireDate,
          isEnabled, // Set the initial state of the switch
        };
      });
      setServices(mappedServices);
    }
  }, [getAllServicers]);
  

   const handleRowClick = (service: Service) => {
    const queryParams = new URLSearchParams({
      id: service.id,
      service: service.service,
      category: service.category,
      opt_expire_date:service.opt_expire_date
    }).toString();
    
    router.push(`/services/editServices?${queryParams}`);
  };
  
  const handleDelete = async (serviceId: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering other click events
  
    try {
      // Confirm the delete action with the user
      const confirm = await Swal.fire({
        title: 'Are you sure?',
        text: 'Do you want to delete this service? This action cannot be undone.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'Cancel',
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
      });
  
      if (!confirm.isConfirmed) return;
  
      const response = await fetch(`http://localhost:5000/api/services/${serviceId}`, {
        method: 'DELETE',
      });
  
      if (!response.ok) {
        throw new Error('Failed to delete the service');
      }
  
      setServices(prevServices => prevServices.filter(service => service.id !== serviceId));
  
      await Swal.fire({
        title: 'Deleted!',
        text: 'The service has been deleted successfully.',
        icon: 'success',
        confirmButtonText: 'OK',
        confirmButtonColor: '#08762D',
      });
    } catch (error: any) {


      await Swal.fire({
        title: 'Error!',
        text: error.message || 'Failed to delete the service.',
        icon: 'error',
        confirmButtonText: 'OK',
        confirmButtonColor: '#d33',
      });
    }
  };
  

  const handleSwitchChange = (serviceId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setServices(prevServices =>
      prevServices.map(service =>
        service.id === serviceId
          ? { ...service, isEnabled: !service.isEnabled }
          : service
      )
    );
  };

  const handleDelete = (serviceId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setServices(prevServices =>
      prevServices.filter(service => service.id !== serviceId)
    );
  };

  const filteredServices = services.filter(
    (service) =>
      service.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastService = currentPage * itemsPerPage;
  const indexOfFirstService = indexOfLastService - itemsPerPage;
  const currentServices = filteredServices.slice(indexOfFirstService, indexOfLastService);


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

  return (
    <div >
      <div className="flex items-center justify-between mb-6">
        <h1
          className="text-[40px] font-medium text-slate-600 dark:text-white"
          style={{ font: "Inter" }}
        >
          Services
        </h1>
        <div className="flex space-x-4   ">
        <Link href="/services/category" className="inline-block">
      <button 
        className="flex h-[58px] w-[181px] items-center justify-center rounded-md border border-gray-500 bg-[#CBD5E1] px-4 py-2 text-xl font-medium text-gray-700 transition-colors duration-300 hover:bg-[#000000] hover:text-slate-300 dark:bg-[#122031] dark:text-white"
      >
        Categories
        <BiSolidCategory className="ml-2 text-gray-500 hover:text-slate-300" size={24} />
      </button>
    </Link>
    <Link href="/services/newService" className="inline-block">
          <button className="h-[58px] w-[181px] rounded-md border border-blue-600 dark:bg-blue-400 dark:text-white  hover:text-[#E0EDFF]  bg-blue-100 px-4 py-2 text-[20px] font-medium text-blue-500 transition-colors duration-300 hover:bg-[#3584FA]  ">
            New Service +
          </button>
      </Link>    
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

      <div className="overflow-x-auto">
      <table className="w-full border-separate border-spacing-y-3 ">
          <thead>
            <tr className="text-center dark:text-white border-slate-400 py-2 text-[16px] font-extrabold text-slate-600 " style={{ font: "Inter" }}>
              <th>ID</th>
              <th>SERVICE</th>
              <th>CATEGORY</th>
              <th>EXP</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {currentServices.map((service, index) => (
              <tr key={index} 
              onClick={() => handleRowClick(service)}
                  className="text-center py-2 text-[16px] hover:bg-[#E0EDFF] font-medium text-slate-700 bg-white rounded-lg shadow-md dark:text-white dark:bg-[#122031] cursor-pointer"
                  style={{ font: "Inter" }}>
               <td className="py-6 px-4 rounded-l-xl">Service #{service.id.slice(-5)}</td>
                <td className="py-2 px-4">{service.service}</td>
                <td className="py-2 px-4">{service.category}</td>
                <td className="">
                  <div className="flex justify-center">
                  <Switch
                      checked={service.isEnabled}
                      onChange={() => {}}
                      className={`${
                        service.isEnabled ? "bg-green-600" : "bg-gray-200"
                      } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
                    >
                      <span
                        className={`${
                          service.isEnabled ? "translate-x-6" : "translate-x-1"
                        } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                      />
                    </Switch>
                  </div>
                </td>
                <td className="py-2 px-4 rounded-r-xl">
                  <button 
                    className="text-red-500 hover:text-[#3584FA]"
                    onClick={(e) => handleDelete(service.id, e)}
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
