"use client";
import React, { useState } from "react";
import Link from "next/link";
import { FiSearch, FiChevronDown, FiTrash2 } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { IoIosArrowDropleft } from "react-icons/io";
//import { FaEdit } from "react-icons/fa";
const Categories = () => {
  const router = useRouter();
  interface Category {
    id: string;
    service: string;
    category: string;
    description: string;
  }
 
  
  const initialCategory: Category[] = [
    {
      id: " #00142",
      service: "Lorem ipsum",
      category: "Lorem ipsum",
      description: "Lorem ipsum dolor sit amet consectetur...",
    },
    {
      id: "#00142",
      service: "Lorem ipsum",
      category: "Lorem ipsum",
      description: "Lorem ipsum dolor sit amet consectetur...",
    },
    {
      id: " #00142",
      service: "Lorem ipsum",
      category: "Lorem ipsum",
      description: "Lorem ipsum dolor sit amet consectetur...",
    },
    {
      id: "#00142",
      service: "Lorem ipsum",
      category: "Lorem ipsum",
      description: "Lorem ipsum dolor sit amet consectetur...",
    },
    {
      id: " #00142",
      service: "Lorem ipsum",
      category: "Lorem ipsum",
      description: "Lorem ipsum dolor sit amet consectetur...",
    },
    {
      id: "#00142",
      service: "Lorem ipsum",
      category: "Lorem ipsum",
      description: "Lorem ipsum dolor sit amet consectetur...",
    },
    {
      id: " #00142",
      service: "Lorem ipsum",
      category: "Lorem ipsum",
      description: "Lorem ipsum dolor sit amet consectetur...",
    },
  ];
  const [Category, setCategory] = useState(initialCategory);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Handle row click and route to another page
  const handleRowClick = (Categorys: Category) => {
    const queryParams = new URLSearchParams({
      id: Categorys.id,
      service: Categorys.service,
      category: Categorys.category,
      description: Categorys.description,
     
      
    }).toString();

    router.push(`/services/category/editCategory?${queryParams}`);
  };


  const handleDelete = (categoryId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setCategory(prevServices =>
      prevServices.filter(category => category.id !== categoryId)
    );
  };

  // Filtered categories based on search input
  const filteredCategorys = Category.filter(
    (category) =>
      category.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.id.toLowerCase().includes(searchTerm.toLowerCase()),
  );
  // Calculate the current services to display
  const indexOfLastCategory = currentPage * itemsPerPage;
  const indexOfFirstCategory = indexOfLastCategory - itemsPerPage;
  const currentCategorys = filteredCategorys.slice(
    indexOfFirstCategory,
    indexOfLastCategory,
  );

  // Calculate total pages
  const totalPages = Math.ceil(filteredCategorys.length / itemsPerPage);

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
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="font-inter flex items-center space-x-2 text-4xl font-medium text-slate-600 dark:text-white">
            <Link href="/services" className="inline-block">
              <IoIosArrowDropleft className="h-10 w-10 cursor-pointer hover:text-[#3584FA]" />
            </Link>
            <span>Categories</span>
          </h1>
        </div>
        <div className="flex  space-x-4">
          <button className=" h-[58px] w-[200px] rounded-md border border-blue-600 dark:hover:bg-blue-700 bg-blue-100 px-4 py-2 text-xl font-medium text-blue-500 transition-colors duration-300  dark:bg-blue-400 dark:text-white hover:bg-[#3584FA] hover:text-[#E0EDFF]">
          <Link href="/services/category/newCategory" className="inline-block">
            New Caregories +
           </Link> 
          </button>
        </div>
      </div>

      <div className="mb-10 flex space-x-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search Caregories"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="h-10 w-64 rounded-md border border-gray-300 pl-10 pr-4 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-[#122031] dark:text-white"
          />
          <FiSearch className="absolute left-3 top-3 text-gray-400" />
        </div>

        <button className="flex h-10 w-32 items-center justify-between rounded-md border border-gray-300 bg-white px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-[#122031] dark:text-white">
          <span className="text-gray-700 dark:text-white">Sort By ID</span>
          <FiChevronDown className="text-gray-400" />
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="container mx-auto border-separate border-spacing-y-3 ">
          <thead>
            <tr className="font-inter text-center text-base font-extrabold text-slate-600 dark:text-white">
              <th>ID</th>
              <th>SERVICE</th>
              <th>CATEGORY</th>
              <th>Description</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {currentCategorys.map((Categorys, index) => (
              <tr
                key={index}
                onClick={() => handleRowClick(Categorys)}
                className="font-inter rounded-lg bg-white py-2 text-center text-base font-medium text-slate-700 shadow-md dark:bg-[#122031] dark:text-white cursor-pointer hover:bg-[#E0EDFF] "
              >
                <td className="rounded-l-xl px-4 py-6 ">{Categorys.id}</td>
                <td className="px-4 py-2">{Categorys.service}</td>
                <td className="px-4 py-2">{Categorys.category}</td>
                <td className="px-2 py-2">{Categorys.description}</td>
                <td className="rounded-r-xl px-4 py-2 ">
                  <button className="text-red-500  hover:text-[#3584FA]"
                      onClick={(e) => handleDelete(Categorys.id, e)}>
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
              className="mx-1 rounded-md border border-gray-300 px-3 py-1 text-black disabled:opacity-50 dark:text-white"
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
                    ? "bg-blue-500 text-white"
                    : "text-black dark:text-white"
                }`}
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </button>
            ))}
            <button
              className="mx-1 rounded-md border border-gray-300 px-3 py-1 text-black disabled:opacity-50 dark:text-white"
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

export default Categories;
