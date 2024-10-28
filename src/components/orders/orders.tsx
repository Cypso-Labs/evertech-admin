"use client";
import React, { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { RiExpandUpDownFill } from "react-icons/ri";
import { MdOutlineSearch } from "react-icons/md";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

const Orders = () => {
  const router = useRouter();

  const [orderData] = useState([
    {
      id: "#0001",
      name: "Lorem Ipsum",
      status: "Paid",
      service: "Lorem Ipsum Dolor Sit Amet",
      price: "$99.98",
    },
    {
      id: "#0002",
      name: "Lorem Ipsum",
      status: "Paid",
      service: "Lorem Ipsum Dolor Sit Amet",
      price: "$99.98",
    },
    {
      id: "#0003",
      name: "Lorem Ipsum",
      status: "Paid",
      service: "Lorem Ipsum Dolor Sit Amet",
      price: "$99.98",
    },

    {
      id: "#0004",
      name: "Lorem Ipsum",
      status: "UnPaid",
      service: "Lorem Ipsum Dolor Sit Amet",
      price: "$99.98",
    },
    {
      id: "#0005",
      name: "Lorem Ipsum",
      status: "Paid",
      service: "Lorem Ipsum Dolor Sit Amet",
      price: "$99.98",
    },
    {
      id: "#0006",
      name: "Lorem Ipsum",
      status: "Paid",
      service: "Lorem Ipsum Dolor Sit Amet",
      price: "$99.98",
    },
    {
      id: "#0007",
      name: "Lorem Ipsum",
      status: "Paid",
      service: "Lorem Ipsum Dolor Sit Amet",
      price: "$99.98",
    },
    {
      id: "#0008",
      name: "Lorem Ipsum",
      status: "UnPaid",
      service: "Lorem Ipsum Dolor Sit Amet",
      price: "$99.98",
    },
    {
      id: "#0009",
      name: "Lorem Ipsum",
      status: "Paid",
      service: "Lorem Ipsum Dolor Sit Amet",
      price: "$99.98",
    },
    {
      id: "#0010",
      name: "Lorem Ipsum",
      status: "Paid",
      service: "Lorem Ipsum Dolor Sit Amet",
      price: "$99.98",
    },
    {
      id: "#0011",
      name: "Lorem Ipsum",
      status: "Paid",
      service: "Lorem Ipsum Dolor Sit Amet",
      price: "$99.98",
    },
    {
      id: "#0012",
      name: "Lorem Ipsum",
      status: "Paid",
      service: "Lorem Ipsum Dolor Sit Amet",
      price: "$99.98",
    },
    {
      id: "#0013",
      name: "Lorem Ipsum",
      status: "UnPaid",
      service: "Lorem Ipsum Dolor Sit Amet",
      price: "$99.98",
    },
    {
      id: "#0014",
      name: "Lorem Ipsum",
      status: "Paid",
      service: "Lorem Ipsum Dolor Sit Amet",
      price: "$99.98",
    },
    {
      id: "#0015",
      name: "Lorem Ipsum",
      status: "Paid",
      service: "Lorem Ipsum Dolor Sit Amet",
      price: "$99.98",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  interface Order {
    id: string;
    service: string;
    status: string;
    name: string;
    price: string;
  }

  const handleRowClick = (order: Order) => {
    const queryParams = new URLSearchParams({
      id: order.id.toString(),
      service: order.service,
      status: order.status,
      name: order.name,
      price: order.price,
    }).toString();

    router.push(`orders/ordered?${queryParams}`);
  };

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

  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won’t be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#2E84D3",
      cancelButtonColor: "#D93132",
      customClass: {
        popup: "dark:bg-[#122031] dark:text-white",
        confirmButton: "text-white bg-blue-600 hover:bg-blue-700 w-[133px] h-[47px] py-2 px-4 text-lg rounded-md", 
        cancelButton: "text-white bg-red-600 hover:bg-red-700 w-[133px] h-[47px] py-2 px-4 text-lg rounded-md",   
        
      },
    }).then((result) => {
      if (result.isConfirmed) {
        router.push("/orders");
      }
    });
  };
  


  return (
    <div>
      <div className="flex items-center justify-between text-3xl font-bold text-gray-700 dark:text-white">
        <span className="text-[40px] font-medium">Orders</span>
        <Link href="orders/neworder">
          <button className="rounded-md border-2 border-[#3584FA] bg-[#E0EDFF] hover:bg-[#3584FA] p-2 text-xl text-[#3584FA] hover:text-[#E0EDFF] dark:border-dark-3 dark:bg-dark-2 dark:text-white">
            New Order +
          </button>{" "}
        </Link>
      </div>
      <div className="mt-4 flex items-center p-4">
        <div className="text-md flex h-[30px] w-[227px] items-center rounded-lg border-2 border-gray-300 bg-white px-3 py-2 text-center text-gray-600 shadow-2xl dark:border-dark-3 dark:bg-dark-2 dark:text-white">
          <MdOutlineSearch className="mr-4 justify-start" />
          <input
            type="text"
            placeholder="Search Orders"
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

      <table className="w-full table-auto border-separate border-spacing-y-3 h-[91px] font-bold">
        <thead className="uppercase dark:text-white">
          <tr>
            <th className="p-4 text-left">ID</th>
            <th className="p-4 text-left">Customer Name</th>
            <th className="p-4 text-left">Status</th>
            <th className="p-4 text-left">Service</th>
            <th className="p-4 text-left">Price</th>
            <th className="p-4"></th>
            <th className="p-4"></th>
          </tr>
        </thead>
        <tbody>
          {currentOrders.map((order) => (
            <tr
              key={order.id}
              className="cursor-pointer rounded-md bg-white shadow-md hover:bg-[#E0EDFF] dark:bg-dark-2 dark:text-gray-3 dark:hover:bg-dark-4"
              onClick={() => handleRowClick(order)}
            >
              <td className="p-4">Order {order.id}</td>
              <td className="p-4">{order.name}</td>
              <td className="p-4">
                <span
                  className={`rounded-md font-semibold ${
                    order.status === "Paid"
                      ? "border-2 border-[#025826] bg-[#C3FFDA] px-6 py-1 text-[#025826]"
                      : "border-2 border-[#F70D1A] bg-[#FFCED1] px-3 py-1 text-[#F70D1A]"
                  }`}
                >
                  {order.status}
                </span>
              </td>
              <td className="p-4">{order.service}</td>
              <td className="p-4">{order.price}</td>
              <td className="p-4 text-right">
              <button
                  className="text-center text-red-500 hover:text-red-700"
                  onClick={(e) => {
                    e.stopPropagation(); 
                    handleDelete();
                  }}
                >
                  <FaTrashAlt />
                </button>
              </td>
              <td className="p-4"></td>
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

export default Orders;
