"use client";
import React, { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { RiExpandUpDownFill } from "react-icons/ri";
import { MdOutlineSearch } from "react-icons/md";
import Link from "next/link";
import { useRouter  } from "next/navigation";
import Swal from "sweetalert2";
import { FaPrint } from "react-icons/fa";
import { FaCreditCard } from "react-icons/fa6";
import {
  useGetAllOrdersQuery,
  useDeleteOrderMutation,
} from "@/app/redux/features/orderApiSlice";
import { useGetAllProductsQuery } from "@/app/redux/features/productApiSlice";
import { useGetAllCustomersQuery } from "@/app/redux/features/customerApiSlice";
import { Order , Product } from "@/types";

const Orders: React.FC = () => {
  const router = useRouter();
  const { data: orders = [], isLoading } = useGetAllOrdersQuery();
  const [deleteOrder] = useDeleteOrderMutation();

 const { data: customers = [], isLoading: isCustomersLoading } =
   useGetAllCustomersQuery();
 const { data: products = [], isLoading: isProductsLoading } =
   useGetAllProductsQuery();

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const filteredOrders = orders.filter(
    (order) =>
      order._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.order_id.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const indexOfLastOrder = currentPage * itemsPerPage;
  const indexOfFirstOrder = indexOfLastOrder - itemsPerPage;
  const currentOrders = filteredOrders.slice(
    indexOfFirstOrder,
    indexOfLastOrder,
  );
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

  const handleRowClick = (order: Order) => {
    const queryParams = new URLSearchParams({
      id: order._id.toString(),
      status: order.status,
    }).toString();

    router.push(`orders/ordered?${queryParams}`);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  // use customer name useing customerId
  const getCustomerName = (customerId: string) => {
    const customer = customers.find(
      (customer) => customer.customer_id === customerId,
    );
    return customer ? customer.name : "N/A";
  };

  if (isLoading || isCustomersLoading) return <div>Loading...</div>;

  //use product name using productId
  const getProductName = (productId: string) => {
   const product = products.find(
    (product) => product.product_id === productId,
   );
   return product ? (
    product.product_type
   ) : (
    "N/A"
   )
  }
  
  if (isLoading || isCustomersLoading) return <div>Loading...</div>;

  const handleDelete = (orderId: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#2E84D3",
      cancelButtonColor: "#D93132",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteOrder(orderId);
        router.push("/orders");
      }
    });
  };

  const handlePrint = (order: Order) => {
    const queryParams = new URLSearchParams({
      _id: order._id,
      
    }).toString();
  
    router.push(`/orders/orderprint?${queryParams}`);
  };
  
  

  const handlePayment = (order: Order) => {
    const queryParams = new URLSearchParams({
      order_id: order._id.toString(), 
    }).toString();
  
   
    router.push(`/payments/createPayment?${queryParams}`);
  };
  
  

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <div className="flex items-center justify-between text-3xl font-bold text-gray-700 dark:text-white">
        <span className="text-[40px] font-medium">Orders</span>
        <Link href="orders/neworder">
          <button className="rounded-md border-2 border-[#3584FA] bg-[#E0EDFF] p-2 text-xl text-[#3584FA] hover:bg-[#3584FA] hover:text-[#E0EDFF] dark:border-dark-3 dark:bg-dark-2 dark:text-white">
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

      <table className="roun h-[91px] w-full table-auto border-separate border-spacing-y-3 font-bold">
        <thead className="uppercase dark:text-white">
          <tr>
            <th className="p-4 text-center">ID</th>
            <th className="p-4 text-center">Customer Name</th>
            <th className="p-4 text-center">Status</th>
            <th className="p-4 text-center">Product ID</th>
            <th className="p-4 text-center">Product Name</th>
            <th className="p-4 text-center">Deliverd From</th>
            <th className="p-4"></th>
            <th className="p-4"></th>
          </tr>
        </thead>
        <tbody>
          {currentOrders.map((order) => (
            <tr
              key={order._id}
              className="bg-white shadow-md"
              onClick={() => handleRowClick(order)}
            >
              <td className="rounded-lg px-4 py-6 text-center">
                {order.order_id}
              </td>
              <td className="p-4 text-center">
                {getCustomerName(order.customer_id)}
              </td>
              <td className="p-4 text-center">
                <span
                  className={`rounded-lg px-3 py-1 font-semibold ${
                    order.status === "Pending"
                      ? "border-2 border-[#F70D1A] bg-[#FFCED1] text-[#F70D1A]" 
                      : order.status === "In-progress"
                        ? "border-2 border-[#E6A400] bg-[#FFF3CE] text-[#E6A400]" 
                        : "border-2 border-[#025826] bg-[#C3FFDA] text-[#025826]" 
                  }`}
                >
                  {order.status}
                </span>
              </td>

              <td className="p-4 text-center">{order.product_id || "N/A"}</td>
              <td className="p-4 text-center">
                {getProductName(order.product_id) || "N/A"}
              </td>
              <td className="p-4 text-center">
                {order.delivery_status || "N/A"}
              </td>

              <td className="p-4 text-center">
                <button
                  className="text-center text-red-500 hover:text-red-700"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(order._id);
                  }}
                >
                  <FaTrashAlt />
                </button>
                <button
                  className="ml-4 text-center text-blue-500 hover:text-blue-700"
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrint(order);
                  }}
                >
                  <FaPrint />
                </button>

                <button
                  className="ml-4 text-center text-green-500 hover:text-green-700"
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePayment(order);
                  }}
                >
                  <FaCreditCard />
                </button>
              </td>
              <td className="rounded-lg p-4"></td>
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
