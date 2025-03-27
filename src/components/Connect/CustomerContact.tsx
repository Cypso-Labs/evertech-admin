"use client";
import React, { useState } from "react";
import { FaArrowLeft, FaTrashAlt } from "react-icons/fa";
import { MdOutlineSearch } from "react-icons/md";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

import type { CustomerContact} from "@/types";
import { useDeleteConnectMutation, useGetAllConnectsQuery } from "@/app/redux/features/ConnectApiSlice";
const CustomerContact: React.FC = () => {
  const router = useRouter();
  const { data: connects = [], isLoading } = useGetAllConnectsQuery();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const [deleteConnect] = useDeleteConnectMutation();

  const filteredConnects = connects.filter((connect) =>
    connect.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentConnects = filteredConnects.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredConnects.length / itemsPerPage);

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

  const handleDelete = (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteConnect(id);
        router.push("/contact");
      }
    });
  };

  return (
    <div>
      <div className="flex items-center text-3xl font-bold text-gray-700 dark:text-white gap-5 ">
        <Link href="/customers">
          <button className="rounded-md border-2 border-[#3584FA] bg-[#E0EDFF] p-2 text-[20px] text-xl text-[#3584FA] hover:bg-[#3584FA] hover:text-[#E0EDFF] dark:bg-dark-2 dark:text-gray-300">
            <FaArrowLeft />
          </button>
        </Link>
        <span className="text-[40px] font-medium text-[#475569]">Customer Connect</span>
      </div>
      
      <div className="mt-4 flex items-center p-4">
        <div className="text-md flex h-[30px] w-[227px] items-center rounded-lg border-2 border-gray-300 bg-white px-3 py-2 text-gray-600 shadow-2xl dark:bg-dark-2 dark:text-gray-300">
          <MdOutlineSearch className="mr-4" />
          <input
            type="email"
            placeholder="Search by Email"
            className="w-full border-none outline-none dark:bg-dark-2 dark:text-gray-300"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <table className="w-full table-auto border-separate border-spacing-y-3 font-bold">
        <thead className="text-center text-[16px] uppercase text-[#475569]">
          <tr>
            <th className="p-4">Name</th>
            <th className="p-4">Email</th>
            <th className="p-4">Contact Number</th>
            <th className="p-4">Message</th>
            <th className="p-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentConnects.map((connect) => (
            <tr key={connect._id} className="cursor-pointer bg-white shadow-md hover:bg-[#E0EDFF] dark:bg-dark-2 dark:text-gray-300">
              <td className="p-2 px-4 py-6 text-center">{connect.name}</td>
              <td className="text-center">{connect.email}</td>
              <td className="p-4 text-center">{connect.number}</td>
              <td className="p-4 text-center">{connect.message}</td>
              <td className="p-4 text-center space-x-4">
                <button className="text-[#FF0000] hover:text-[#3584FA]" onClick={() => handleDelete(connect._id)}>
                  <FaTrashAlt />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="mt-4 flex items-center justify-between">
        <nav className="inline-flex items-center font-semibold">
          <button className="mx-1 rounded-md border border-gray-300 px-3 py-1" onClick={handlePreviousPage} disabled={currentPage === 1}>
            &lt;
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              className={`mx-1 rounded-md border border-gray-300 px-3 py-1 ${currentPage === index + 1 ? "bg-[#3584FA] text-white" : "text-black"}`}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}
          <button className="mx-1 rounded-md border border-gray-300 px-3 py-1" onClick={handleNextPage} disabled={currentPage === totalPages}>
            &gt;
          </button>
        </nav>
      </div>
    </div>
  );
};

export default CustomerContact;
