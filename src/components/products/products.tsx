"use client";
import React, { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { RiExpandUpDownFill } from "react-icons/ri";
import { MdOutlineSearch } from "react-icons/md";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { useGetAllProductsQuery , useDeleteProductMutation} from "@/app/redux/features/productApiSlice";
import { useGetAllCustomersQuery } from "@/app/redux/features/customerApiSlice";

const Products: React.FC = () => {
  const router = useRouter();
  const { data: products = [], isLoading } = useGetAllProductsQuery();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const { data: customers = [] } = useGetAllCustomersQuery();
  const [deleteProduct] = useDeleteProductMutation();

  // Filter and paginate products
  const filteredProducts = products.filter((product) =>
    product.product_type.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct,
  );

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

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

  // use customer name useing customer_id from useGetAllCustomersQuery
  const getCustomerName = (customerId: string) => {
    const customer = customers.find(
      (customer) => customer.customer_id === customerId,
    );
    return customer ? customer.name : "N/A";
  };

  const handleDelete = (productId: string) => {
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
        deleteProduct(productId);
        router.push("/products");
      }
    });
  }

  return (
    <div>
      <div className="flex items-center justify-between text-3xl font-bold text-gray-700 dark:text-white">
        <span className="text-[40px] font-medium text-[#475569]">Products</span>
        <Link href="/products/newproduct">
          <button className="rounded-md border-2 border-[#3584FA] bg-[#E0EDFF] p-2 text-[20px] text-xl text-[#3584FA] hover:bg-[#3584FA] hover:text-[#E0EDFF] dark:border-dark-3 dark:bg-dark-2 dark:text-white">
            New Product +
          </button>
        </Link>
      </div>

      <div className="mt-4 flex items-center p-4">
        <div className="text-md flex h-[30px] w-[227px] items-center rounded-lg border-2 border-gray-300 bg-white px-3 py-2 text-center text-gray-600 shadow-2xl dark:border-dark-3 dark:bg-dark-2 dark:text-white">
          <MdOutlineSearch className="mr-4 justify-start" />
          <input
            type="text"
            placeholder="Search Products"
            className="w-full border-none outline-none dark:border-dark-3 dark:bg-dark-2"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="text-md ml-8 flex h-[30px] w-[141px] items-center rounded-lg border-2 border-gray-300 bg-white px-3 py-2 text-center text-gray-600 shadow-2xl dark:border-dark-3 dark:bg-dark-2 dark:text-white">
          <RiExpandUpDownFill className="cursor-pointer justify-start" />
          <span> Sort by Id </span>
        </div>
      </div>

      <table className="w-full table-auto border-separate border-spacing-y-3 font-bold">
        <thead className="text-center text-[16px] uppercase text-[#475569] dark:text-white">
          <tr>
            <th className="p-4">Product ID</th>
            <th className="p-4">Product Name</th>
            <th className="p-4">Customer Name</th>
            <th className="p-4">Product Model</th>
            <th className="p-4"></th>
            <th className="p-4"></th>
          </tr>
        </thead>
        <tbody>
          {currentProducts.map((product) => (
            <tr
              key={product._id}
              className="cursor-pointer rounded-md bg-white shadow-md hover:bg-[#E0EDFF] dark:bg-dark-2 dark:text-gray-300"
            >
              <td className="rounded-lg p-2 px-4 py-6 text-center">
                #{product._id}
              </td>
              <td className="text-center">{product.product_type}</td>
              <td className="p-4 text-center">
                {getCustomerName(product.customer_id) || "N/A"}
              </td>
              <td className="p-4 text-center">{product.model_number}</td>
              <td className="p-4 text-center">
                <button className="text-center text-[#FF0000] hover:text-[#3584FA]"
               // onClick={(e) => { e.stopPropagation(); handleDelete(product._id)}}
                
                >
                  <FaTrashAlt />
                </button>
              </td>
              <td className="rounded-lg p-4"></td>
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

export default Products;
