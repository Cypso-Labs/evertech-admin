"use client";
import React, { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { RiExpandUpDownFill } from "react-icons/ri";
import { MdOutlineSearch } from "react-icons/md";
import { BiSolidCategory } from "react-icons/bi";
import Link from "next/link";
import { useRouter } from "next/navigation";
const Employee = () => {
  const router = useRouter();

  interface employee {
    id: string;
    name: string;
    role: string;
    status: string;
  }


  const initialEmployeeData :employee[]= [
    { id: "1", name: "Lorem Ipsum Dolor Sit", role: "Amet Consectetur", status: "Active" },
    { id: "2", name: "Lorem Ipsum Dolor Sit", role: "Amet Consectetur", status: "Leave" },
    { id: "3", name: "Lorem Ipsum Dolor Sit", role: "Amet Consectetur", status: "Active" },
    { id: "4", name: "Lorem Ipsum Dolor Sit", role: "Amet Consectetur", status: "Leave" },
    { id: "5", name: "Lorem Ipsum Dolor Sit", role: "Amet Consectetur", status: "Active" },
    { id: "6", name: "Lorem Ipsum Dolor Sit", role: "Amet Consectetur", status: "Active" },
  ];

  const [employee, setEmployee] = useState(initialEmployeeData); 
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;


 // Handle row click and route to another page
 const handleRowClick = (employee: employee) => {
  const queryParams = new URLSearchParams({
    id: employee.id,
    employeeName: employee.name,
    role: employee.role,
    status: employee.status,
    
  }).toString();
  router.push(`/employees/editeEmployee?${queryParams}`);
};





const handleDelete = (employeeId: string, e: React.MouseEvent) => {
  e.stopPropagation();
  setEmployee((prevEmployee) => prevEmployee.filter((employee) => employee.id !== employeeId));
};


 

  // Filtered employees based on search input
  const filteredEmployees = employee.filter((employee) =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate the current employees to display
  const indexOfLastEmployee = currentPage * itemsPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - itemsPerPage;
  const currentEmployees = filteredEmployees.slice(indexOfFirstEmployee, indexOfLastEmployee);

  // Calculate total pages
  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);

  // Pagination handlers
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
          className="text-[40px] font-medium text-slate-600 dark:text-white"
          style={{ font: "Inter" }}
        >
          Employees
        </h1>
        <div className="flex space-x-3">
          <Link href="/employees/role" className="inline-block">
            <button className="flex h-[58px] w-[181px] items-center justify-center rounded-md border border-gray-500 bg-[#CBD5E1] px-4 py-2 text-xl font-medium text-gray-700 transition-colors duration-300 hover:bg-[#000000] hover:text-slate-300 dark:bg-[#122031] dark:text-white ">
            Roles
              <BiSolidCategory className="ml-2 text-gray-500 hover:text-slate-300" size={24} />
            </button>
          </Link>
          <Link href="/employees/newEmployee" className="inline-block">
            <button className="h-[58px] w-[181px] rounded-md border border-blue-600 dark:bg-blue-400 dark:text-white hover:text-[#E0EDFF] bg-blue-100 px-4 py-2 text-[18px] font-medium text-blue-500 transition-colors duration-300 hover:bg-[#3584FA]">
              New Employees +
            </button>
          </Link>
        </div>
      </div>

      <div className="mt-4 flex items-center p-4">
        {/* Search bar */}
        <div className="text-md flex h-[30px] w-[227px] items-center rounded-lg border-2 border-gray-300 bg-white px-3 py-2 text-center text-gray-600 shadow-2xl dark:border-dark-3 dark:bg-dark-2 dark:text-white">
          <MdOutlineSearch className="mr-4 justify-start" />
          <input
            type="text"
            placeholder="Search Employees"
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

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full table-auto border-separate border-spacing-y-3">
          <thead>
            <tr
              className="text-center dark:text-white border-slate-400 py-2 text-[16px] font-extrabold text-slate-600"
              style={{ font: "Inter" }}
            >
              <th>ID</th>
              <th>NAME</th>
              <th>ROLE</th>
              <th>STATUS</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {currentEmployees.map((employee) => (
              <tr
                key={employee.id}
                onClick={() => handleRowClick(employee)}
                className="text-center py-2 text-[16px] hover:bg-[#E0EDFF] font-medium text-slate-700 bg-white rounded-lg shadow-md dark:text-white dark:bg-[#122031] cursor-pointer"
                style={{ font: "Inter" }}
              >
                <td className="py-6 px-4 rounded-l-xl">
                  Employee #{employee.id.toString().padStart(5, "0")}
                </td>
                <td className="py-2 px-4">{employee.name}</td>
                <td className="py-2 px-4">{employee.role}</td>
                <td className="py-2 px-4">
                  <span
                    className={`rounded-md px-4 py-1 font-semibold ${
                      employee.status === "Active"
                        ? "border-2 border-[#025826] bg-[#C3FFDA] text-[#025826]"
                        : "border-2 border-[#FF0000] bg-[#FFC3C3] text-[#FF0000]"
                    }`}
                  >
                    {employee.status}
                  </span>
                </td>
                <td className="py-2 px-4 rounded-r-xl">
                  <button
                    className="text-red-500 hover:text-[#3584FA]"
                    onClick={(e) => handleDelete(employee.id, e)}
                  >
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
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

export default Employee;
