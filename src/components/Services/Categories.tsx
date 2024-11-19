"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FiSearch, FiTrash2 } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { IoIosArrowDropleft } from "react-icons/io";
import Swal from "sweetalert2";
import {
  useGetAllCategoriesQuery,
  useDeleteCategoryMutation,
} from "../../app/redux/features/categoryApiSlice";
import type { Category } from "@/types"; 

const Categories = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const { data: categories = [], isLoading: loading } =
    useGetAllCategoriesQuery();
  const [deleteCategory, { isLoading: isDeleting }] =
    useDeleteCategoryMutation();

  const handleRowClick = (category: Category) => {
    router.push(`/services/category/editCategory?id=${category._id}`);
  };

  const handleDelete = async (categoryId: string, e: React.MouseEvent) => {
    e.stopPropagation();

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

    if (result.isConfirmed) {
      try {
        await deleteCategory(categoryId).unwrap();
        await Swal.fire({
          title: "Deleted!",
          text: "Category has been deleted successfully.",
          icon: "success",
          timer: 1500,
        });
      } catch (error) {
        await Swal.fire({
          title: "Error!",
          text:
            typeof error === "string"
              ? error
              : "Failed to delete the category.",
          icon: "error",
        });
        console.error("Failed to delete category:", error);
      }
    }
  };

  const filteredCategories = categories.filter((category) => {
    if (!searchTerm) return true;

    const searchTermLower = searchTerm.toLowerCase();
    return (
      category.name?.toLowerCase().includes(searchTermLower) ||
      category.description?.toLowerCase().includes(searchTermLower) ||
      category._id?.toLowerCase().includes(searchTermLower)
    );
  });

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
    const category = categories.find((cat) => cat._id === categoryId);
    return category?.name || "Unknown Service";
  };

  return (
    <div className="p-6">
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="flex items-center text-4xl font-medium text-slate-700 dark:text-white">
            <Link href="/services">
              <IoIosArrowDropleft className="h-10 w-10 transform cursor-pointer transition-transform duration-200 hover:scale-110 hover:text-blue-500" />
            </Link>
            Categories
          </h1>
        </div>
        <Link href="/services/category/newCategory">
          <button className="rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-2.5 text-white shadow-lg transition-all duration-200 hover:scale-105 hover:from-blue-600 hover:to-blue-700 hover:shadow-blue-200 dark:hover:shadow-blue-900">
            New Category +
          </button>
        </Link>
      </div>

      <div className="mb-10 flex space-x-4">
        <div className="relative w-full max-w-md">
          <input
            type="text"
            placeholder="Search Categories"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="h-12 w-full rounded-lg border border-gray-200 bg-white pl-12 pr-4 shadow-sm transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:ring-blue-900"
          />
          <FiSearch className="absolute left-4 top-4 text-gray-400" />
        </div>
      </div>

      {loading ? (
        <div className="flex h-40 items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow-md">
          <table className="w-full border-separate border-spacing-y-2">
            <thead>
              <tr className="bg-gray-50 text-left text-lg font-semibold text-slate-700 dark:bg-slate-800 dark:text-white">
                <th className="px-6 py-4">ID</th>
                <th className="px-6 py-4">Service</th>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Description</th>
                <th className="px-6 py-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentCategories.map((category) => (
                <tr
                  key={category._id}
                  onClick={() => handleRowClick(category)}
                  className="cursor-pointer bg-white transition-all duration-200 hover:scale-[1.01] hover:transform hover:bg-blue-50 dark:bg-slate-800 dark:hover:bg-slate-700"
                >
                  <td className="px-6 py-4">
                    Category #{category._id?.slice(-5) ?? "N/A"}
                  </td>
                  <td className="px-6 py-4">
                    {getServiceNameByCategoryId(category._id)}
                  </td>
                  <td className="px-6 py-4">{category.name ?? "N/A"}</td>
                  <td className="px-6 py-4">{category.description ?? "N/A"}</td>
                  <td className="px-6 py-4 text-center">
                    <button
                      className={`group relative rounded-full p-2 transition-all duration-200 hover:bg-red-50 dark:hover:bg-red-900/30 ${
                        isDeleting ? "cursor-not-allowed opacity-50" : ""
                      }`}
                      onClick={(e) => handleDelete(category._id, e)}
                      disabled={isDeleting}
                    >
                      {isDeleting ? (
                        <div className="h-5 w-5 animate-spin rounded-full border-2 border-red-500 border-t-transparent" />
                      ) : (
                        <FiTrash2 className="h-5 w-5 text-red-500 transition-colors group-hover:text-red-600" />
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-6 flex items-center justify-center gap-4 pb-4">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className="rounded-lg bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-2.5 text-slate-700 shadow-sm transition-all duration-200 hover:scale-105 hover:from-gray-100 hover:to-gray-200 disabled:cursor-not-allowed disabled:opacity-50 dark:from-slate-700 dark:to-slate-800 dark:text-white dark:hover:from-slate-600 dark:hover:to-slate-700"
            >
              Previous
            </button>
            <span className="text-lg font-medium text-slate-600 dark:text-white">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="rounded-lg bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-2.5 text-slate-700 shadow-sm transition-all duration-200 hover:scale-105 hover:from-gray-100 hover:to-gray-200 disabled:cursor-not-allowed disabled:opacity-50 dark:from-slate-700 dark:to-slate-800 dark:text-white dark:hover:from-slate-600 dark:hover:to-slate-700"
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
