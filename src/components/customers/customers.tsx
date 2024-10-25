"use client";
import React, { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { RiExpandUpDownFill } from "react-icons/ri";
import { MdOutlineSearch } from "react-icons/md";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Customers = () => {
  const router = useRouter();

  const [orderData] = useState([
    {
      id: "0001",
      name: "Lorem Ipsum",
      order: "Active",
      contact: "+94 1230 9323",
    },
    {
      id: "0002",
      name: "Lorem Ipsum",
      order: "Inactive",
      contact: "+94 1230 9323",
    },
    {
      id: "0003",
      name: "Lorem Ipsum",
      order: "Active",
      contact: "+94 1230 9323",
    },
    {
      id: "0004",
      name: "Lorem Ipsum",
      order: "Inactive",
      contact: "+94 1230 9323",
    },
    {
      id: "0005",
      name: "Lorem Ipsum",
      order: "Active",
      contact: "+94 1230 9323",
    },
    {
      id: "0006",
      name: "Lorem Ipsum",
      order: "Inactive",
      contact: "+94 1230 9323",
    },
    {
      id: "0007",
      name: "Lorem Ipsum",
      order: "Active",
      contact: "+94 1230 9323",
    },
    {
      id: "0008",
      name: "Lorem Ipsum",
      order: "Inactive",
      contact: "+94 1230 9323",
    },
    {
      id: "0009",
      name: "Lorem Ipsum",
      order: "Active",
      contact: "+94 1230 9323",
    },
    {
      id: "0010",
      name: "Lorem Ipsum",
      order: "Inactive",
      contact: "+94 1230 9323",
    },
    {
      id: "0011",
      name: "Lorem Ipsum",
      order: "Active",
      contact: "+94 1230 9323",
    },
    {
      id: "0012",
      name: "Lorem Ipsum",
      order: "Inactive",
      contact: "+94 1230 9323",
    },
    {
      id: "0013",
      name: "Lorem Ipsum",
      order: "Active",
      contact: "+94 1230 9323",
    },
    {
      id: "0014",
      name: "Lorem Ipsum",
      order: "Inactive",
      contact: "+94 1230 9323",
    },
    {
      id: "0015",
      name: "Lorem Ipsum",
      order: "Active",
      contact: "+94 1230 9323",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const filteredOrders = orderData.filter((order) =>
    order.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const indexOfLastOrder = currentPage * itemsPerPage;
  const indexOfFirstOrder = indexOfLastOrder - itemsPerPage;
  const currentOrders = filteredOrders.slice(
    indexOfFirstOrder,
    indexOfLastOrder,
  );

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

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

  interface Customer {
    id: string;
    name: string;
    order: string;
    contact: string;
  }
  
  const handleRowClick = (customer: Customer) => {
    const queryParams = new URLSearchParams({
      id: customer.id.toString(), 
      service: customer.name,
      status: customer.order,
      name: customer.contact,
    }).toString();
  
    router.push(`customers/editcustomer?${queryParams}`);
  };
  
  

  return (
    <div>
      <div className="flex items-center justify-between text-3xl font-bold text-gray-700 dark:text-white">
        <span className="text-[40px] text-[#475569] font-medium">Customers</span>
        <Link href="/customers/newcustomer">
          <button className="rounded-md border-2 border-[#3584FA] bg-[#E0EDFF] hover:bg-[#3584FA] hover:text-[#E0EDFF] p-2 text-xl text-[20px] text-[#3584FA] dark:border-dark-3 dark:bg-dark-2 dark:text-white">
            New Customer +
          </button>
        </Link>
      </div>

      <div className="mt-4 flex items-center p-4">
        <div className="text-md flex h-[30px] w-[227px] items-center rounded-lg border-2 border-gray-300 bg-white px-3 py-2 text-center text-gray-600 shadow-2xl dark:border-dark-3 dark:bg-dark-2 dark:text-white">
          <MdOutlineSearch className="mr-4 justify-start" />
          <input
            type="text"
            placeholder="Search Customers"
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

      <table className="w-full table-auto border-separate border-spacing-y-3 font-bold">
        <thead className="uppercase text-center dark:text-white text-[#475569] text-[16px]">
          <tr>
            <th className="p-4 ">ID</th>
            <th className="p-4 ">Customer Name</th>
            <th className="p-4 ">Order</th>
            <th className="p-4 ">Contact</th>
            <th className="p-4"></th>
            <th className="p-4"></th>
          </tr>
        </thead>
        <tbody>
          {currentOrders.map((customers) => (
            <tr
              key={customers.id}
              className="rounded-md bg-white hover:bg-[#E0EDFF] cursor-pointer shadow-md dark:bg-dark-2 dark:text-gray-300"
              onClick={() => handleRowClick(customers)}
            >
              <td className="p-2 text-center">
                Customers #{customers.id}
              </td>
              <td className="p-4 text-center">{customers.name}</td>
              <td className="p-4 text-center">
                <span
                  className={`rounded-md font-semibold ${
                    customers.order === "Active"
                      ? "border-2 border-[#025826] bg-[#C3FFDA] px-6 py-1 text-[#025826] w-[78px] h-[30px]"
                      : "border-2 border-[#000000] bg-[#CBD5E1] px-5 py-1 text-[#000000] w-[78px] h-[30px]"
                  }`}
                >
                  {customers.order}
                </span>
              </td>
              <td className="p-4 text-center">{customers.contact}</td>
              <td className="p-4 text-center">
                <button className="text-center text-[#FF0000] hover:text-[#3584FA]">
                  <FaTrashAlt />
                </button>
              </td>
              <td className="p-4 "></td>
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
  );
};

export default Customers;
