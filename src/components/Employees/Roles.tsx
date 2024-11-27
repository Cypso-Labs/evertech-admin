"use client";
import React, { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { MdOutlineSearch } from "react-icons/md";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { IoIosArrowDropleft } from "react-icons/io";
import {
  useGetAllRolesQuery,
  useDeleteRoleMutation,
} from "@/app/redux/features/roleApiSlice";
import type { Role } from "@/types";

const Roles = () => {
  const router = useRouter();
  const { data: roles = [], isLoading, isError } = useGetAllRolesQuery();
  const [deleteRole] = useDeleteRoleMutation();

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;


  const roleCounts = roles.reduce((acc: Record<string, number>, role) => {
    acc[role._id] = 0; 
    return acc;
  }, {});

  const filteredRoles = roles.filter((role) =>
    role.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const indexOfLastRole = currentPage * itemsPerPage;
  const indexOfFirstRole = indexOfLastRole - itemsPerPage;
  const currentRoles = filteredRoles.slice(indexOfFirstRole, indexOfLastRole);
  const totalPages = Math.ceil(filteredRoles.length / itemsPerPage);

  const handleRowClick = (role: Role) => {
    const queryParams = new URLSearchParams({
      id: role._id,
      name: role.name,
      employees: roleCounts[role._id].toString(),
    }).toString();
    router.push(`/employees/role/editRole?${queryParams}`);
  };

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this role?")) {
      try {
        await deleteRole(id).unwrap();
      } catch (error) {
        console.error("Failed to delete role", error);
      }
    }
  };

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

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading roles</div>;

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-inter flex items-center space-x-2 text-4xl font-medium text-slate-600 dark:text-white">
          <Link href="/employees" className="inline-block">
            <IoIosArrowDropleft className="mr-2 h-10 w-10 cursor-pointer hover:text-[#3584FA]" />
          </Link>
          Roles
        </h1>
        <div className="flex space-x-3">
          <Link href="/employees/role/newRole" className="inline-block">
            <button className="h-[58px] w-[181px] rounded-md border border-blue-600 bg-blue-100 px-4 py-2 text-[18px] font-medium text-blue-500 transition-colors duration-300 hover:bg-[#3584FA] hover:text-[#E0EDFF] dark:bg-blue-400 dark:text-white">
              New Role +
            </button>
          </Link>
        </div>
      </div>

      <div className="mt-4 flex items-center p-4">
        <div className="text-md flex h-[30px] w-[227px] items-center rounded-lg border-2 border-gray-300 bg-white px-3 py-2 text-center text-gray-600 shadow-2xl dark:border-dark-3 dark:bg-dark-2 dark:text-white">
          <MdOutlineSearch className="mr-4 justify-start" />
          <input
            type="text"
            placeholder="Search Role"
            className="w-full border-none outline-none dark:border-dark-3 dark:bg-dark-2"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full table-auto border-separate border-spacing-y-3">
          <thead>
            <tr className="border-slate-400 py-2 text-center text-[16px] font-extrabold text-slate-600 dark:text-white">
              <th>ID</th>
              <th>NAME</th>
              <th>EMPLOYEES</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {currentRoles.map((role) => (
              <tr
                key={role._id}
                onClick={() => handleRowClick(role)}
                className="cursor-pointer rounded-lg bg-white py-2 text-center text-[16px] font-medium text-slate-700 shadow-md hover:bg-[#E0EDFF] dark:bg-[#122031] dark:text-white"
              >
                <td className="rounded-l-xl px-4 py-6">
                  Role #{role._id.slice(-5)}
                </td>
                <td className="px-4 py-2">{role.name}</td>
                <td className="px-4 py-2">{roleCounts[role._id] || 0}</td>
                <td className="rounded-r-xl px-4 py-2">
                  <button
                    className="text-red-500 hover:text-[#3584FA]"
                    onClick={(e) => handleDelete(role._id, e)}
                  >
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-4 flex items-center justify-between">
          <div>
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
                      ? "bg-[#3584FA] text-white"
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
    </div>
  );
};

export default Roles;
