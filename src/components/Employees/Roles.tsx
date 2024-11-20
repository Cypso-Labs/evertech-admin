"use client";
import React, { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { RiExpandUpDownFill } from "react-icons/ri";
import { MdOutlineSearch } from "react-icons/md";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { IoIosArrowDropleft } from "react-icons/io";
const Roles = () => {
  const router = useRouter();

  interface Role {
    id: string;
    name: string;
    employees: string;
  }

  const initialRoles: Role[] = [
    { id: "1", name: "Lorem Ipsum Dolor Sit", employees: "5" },
    { id: "2", name: "Lorem Ipsum Dolor Sit", employees: "12" },
    { id: "3", name: "Lorem Ipsum Dolor Sit", employees: "2" },
    { id: "4", name: "Lorem Ipsum Dolor Sit", employees: "3" },
    { id: "5", name: "Lorem Ipsum Dolor Sit", employees: "4" },
    { id: "6", name: "Lorem Ipsum Dolor Sit", employees: "5" },
    { id: "7", name: "Lorem Ipsum Dolor Sit", employees: "5" },
  ];

  
  const [roles, setRoles] = useState(initialRoles);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const handleRowClick = (role: Role) => {
    const queryParams = new URLSearchParams({
      id: role.id,
      name: role.name,
      employees: role.employees,
      
    }).toString();
    router.push(`/employees/role/editRole?${queryParams}`);
  };

  const handleDelete = (roleId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setRoles((prevRoles) => prevRoles.filter((role) => role.id !== roleId));
  };


  const filteredRoles = roles.filter((role) =>
    role.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastRole = currentPage * itemsPerPage;
  const indexOfFirstRole = indexOfLastRole - itemsPerPage;
  const currentRoles = filteredRoles.slice(indexOfFirstRole, indexOfLastRole);

  const totalPages = Math.ceil(filteredRoles.length / itemsPerPage);
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
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1
          className="font-inter flex items-center space-x-2 text-4xl font-medium text-slate-600 dark:text-white "
          style={{ font: "Inter" }}
        >
          <Link href="/employees" className="inline-block">
            <IoIosArrowDropleft className="mr-2 h-10 w-10 cursor-pointer hover:text-[#3584FA]" />
          </Link>
          Roles
        </h1>
        <div className="flex space-x-3">
          <Link href="/employees/role/newRole" className="inline-block">
            <button className="h-[58px] w-[181px] rounded-md border border-blue-600 dark:bg-blue-400 dark:text-white hover:text-[#E0EDFF] bg-blue-100 px-4 py-2 text-[18px] font-medium text-blue-500 transition-colors duration-300 hover:bg-[#3584FA]">
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

        <div className="text-md ml-8 flex h-[30px] w-[141px] items-center rounded-lg border-2 border-gray-300 bg-white px-3 py-2 text-center text-gray-600 shadow-2xl dark:border-dark-3 dark:bg-dark-2 dark:text-white">
          <RiExpandUpDownFill className="cursor-pointer justify-start" />
          <span> Sort by order </span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full table-auto border-separate border-spacing-y-3">
          <thead>
            <tr
              className="text-center dark:text-white border-slate-400 py-2 text-[16px] font-extrabold text-slate-600"
              style={{ font: "Inter" }}
            >
              <th>ID</th>
              <th>NAME</th>
              <th>EMPLOYEES</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {currentRoles.map((role) => (
              <tr
                key={role.id}
                onClick={() => handleRowClick(role)}
                className="text-center py-2 text-[16px] hover:bg-[#E0EDFF] font-medium text-slate-700 bg-white rounded-lg shadow-md dark:text-white dark:bg-[#122031] cursor-pointer"
                style={{ font: "Inter" }}
              >
                <td className="py-6 px-4 rounded-l-xl">
                {role.id}
                </td>
                <td className="py-2 px-4">{role.name}</td>
                <td className="py-2 px-4">{role.employees}</td>
                <td className="py-2 px-4 rounded-r-xl">
                  <button
                    className="text-red-500 hover:text-[#3584FA]"
                    onClick={(e) => handleDelete(role.id, e)}
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
