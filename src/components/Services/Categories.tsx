"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FiSearch, FiTrash2 } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { IoIosArrowDropleft } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { AppDispatch, RootState } from "../../app/redux/store/store";
import {
  fetchCategories,
  deleteCategory,
  Category,
} from "../../app/redux/slices/catogarySlice";
import { fetchServices } from "@/app/redux/slices/serviceSlice";

const Categories = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { categories, loading } = useSelector(
    (state: RootState) => state.categories,
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchServices());
  }, [dispatch]);

  const handleRowClick = (category: Category) => {
    router.push(`/services/category/editCategory?id=${category._id}`);
  };

  const handleDelete = async (categoryId: string, e: React.MouseEvent) => {
    e.stopPropagation();

    // Show confirmation dialog using SweetAlert2
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    // If user confirms deletion
    if (result.isConfirmed) {
      try {
        await dispatch(deleteCategory(categoryId)).unwrap();
        // Show success message
        await Swal.fire({
          title: "Deleted!",
          text: "Category has been deleted successfully.",
          icon: "success",
          timer: 1500,
        });
      } catch (error) {
        // Show error message if deletion fails
        await Swal.fire({
          title: "Error!",
          text: "Failed to delete the category.",
          icon: "error",
        });
        console.error("Failed to delete category:", error);
      }
    }
  };

  // Filter categories based on search input
  const filteredCategories =
    categories?.filter(
      (category) =>
        category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        category.description
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        category._id.toLowerCase().includes(searchTerm.toLowerCase()),
    ) ?? [];

  // Pagination logic
  const indexOfLastCategory = currentPage * itemsPerPage;
  const indexOfFirstCategory = indexOfLastCategory - itemsPerPage;
  const currentCategories = filteredCategories.slice(
    indexOfFirstCategory,
    indexOfLastCategory,
  );
  const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage((prevPage) => prevPage - 1);
  };

  const getServiceNameByCategoryId = (categoryId: string) => {
    const service = categories.find((category) => category._id === categoryId);
    return service ? service.name : "Unknown Service";
  };

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="flex items-center text-4xl font-medium text-slate-600 dark:text-white">
            <Link href="/services">
              <IoIosArrowDropleft className="h-10 w-10 cursor-pointer hover:text-blue-500" />
            </Link>
            Categories
          </h1>
        </div>
        <Link href="/services/category/newCategory">
          <button className="rounded-md bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600">
            New Category +
          </button>
        </Link>
      </div>

      <div className="mb-10 flex space-x-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search Categories"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="h-10 w-64 rounded-md border pl-10 pr-4 focus:ring-2 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          />
          <FiSearch className="absolute left-3 top-3 text-gray-400" />
        </div>
      </div>

      {loading === "pending" ? (
        <div className="py-4 text-center">Loading...</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-separate border-spacing-y-3">
            <thead>
              <tr className="text-center text-lg font-bold text-slate-600 dark:text-white">
                <th className="px-4">ID</th>
                <th className="px-4">Service</th>
                <th className="px-4">Name</th>
                <th className="px-4">Description</th>
                <th className="px-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentCategories.map((category) => (
                <tr
                  key={category._id}
                  onClick={() => handleRowClick(category)}
                  className="cursor-pointer bg-white transition-colors hover:bg-blue-100 dark:bg-[#122031] dark:hover:bg-blue-800"
                >
                  <td className="px-4 py-2 text-center">
                    Category #{category._id.slice(-5)}
                  </td>
                  <td className="px-4 py-2 text-center">
                    {getServiceNameByCategoryId(category._id)}
                  </td>
                  <td className="px-4 py-2 text-center">{category.name}</td>
                  <td className="px-4 py-2 text-center">
                    {category.description}
                  </td>
                  <td className="px-4 py-2 text-center">
                    <button
                      className="text-red-500 transition-colors hover:text-red-700"
                      onClick={(e) => handleDelete(category._id, e)}
                    >
                      <FiTrash2 size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-4 flex items-center justify-center gap-4">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className="rounded bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600 disabled:cursor-not-allowed disabled:bg-gray-300"
            >
              Previous
            </button>
            <span className="text-slate-600 dark:text-white">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="rounded bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600 disabled:cursor-not-allowed disabled:bg-gray-300"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Categories;
