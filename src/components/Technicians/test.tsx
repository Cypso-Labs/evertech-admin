// // "use client"
// // import { useState, useEffect } from 'react';
// // import {
// //   useGetAllOrdersQuery,
// //   useUpdateOrderMutation
// //  } from '@/app/redux/features/orderApiSlice'


// // interface Order {
// //   _id: string;
// //   customer_id: string;
// //   service: string;
// //   status: 'pending' | 'in-progress' | 'completed';
// //   technician_code?: string;
// // }

// // const Technician = () => {
// //   // const [orders, setOrders] = useState<Order[]>([
// //   //   {
// //   //     id: '1',
// //   //     customerName: 'John Doe',
// //   //     service: 'Laptop Repair',
// //   //     status: 'pending'
// //   //   },
// //   //   {
// //   //     id: '2', 
// //   //     customerName: 'Jane Smith',
// //   //     service: 'Phone Screen Replacement',
// //   //     status: 'in-progress',
// //   //     technicianCode: 'LPR1'
// //   //   }
// //   // ]);
// //  const { data, isLoading, isError, error, refetch: refetchServices } = useGetAllOrdersQuery();
// //  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
// //  const [technicianCode, setTechnicianCode] = useState('');
// //  const [updateOrder] = useUpdateOrderMutation();

// //  const orders = data || [];
// // console.log(orders)
// //   const handleOrderSelect = (order: Order) => {
// //     setSelectedOrder(order);
// //     setTechnicianCode(order.technician_code || '');
// //   };

// //   const handleAssignCode = async () => {
// //     if (!selectedOrder || !technicianCode) return;
    
// //     try {
// //       await updateOrder({
// //         id: selectedOrder._id,
// //         status: 'in-progress',
// //         // technicianCode: selectedOrder.customerName
// //       }).unwrap();
// //       setSelectedOrder(null);
// //       setTechnicianCode('ss');
// //     } catch (error) {
// //       console.error('Failed to assign technician:', error);
// //     }
// //   };

// //   const handleComplete = async (orderId: string) => {
// //     try {
// //       await updateOrder({
// //         id: orderId,
// //         status: 'completed'
// //       }).unwrap();
// //     } catch (error) {
// //       console.error('Failed to complete order:', error);
// //     }
// //   };

// //   return (
   
// //       <div className="mx-auto max-w-7xl p-4">
// //         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
// //           {/* Orders List */}
// //           <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
// //             <h2 className="text-xl font-semibold mb-4">Available Orders</h2>
// //             <div className="space-y-4">
// //               {orders.map(order => (
// //                 <div 
// //                   key={order._id}
// //                   className="border dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
// //                   onClick={() => handleOrderSelect(order)}
// //                 >
// //                   <div className="flex justify-between items-center">
// //                     <div>
// //                       <h3 className="font-medium">{order.customer_id}</h3>
// //                       <p className="text-sm text-gray-600 dark:text-gray-400">{order.product_id}</p>
// //                       {order.customer_id && (
// //                         <p className="text-sm text-blue-600">Code: {orders.map((order) => order.technician_code) || 'No code yet'}</p>
// //                       )}
// //                     </div>
// //                     <div className="flex gap-2">
// //                       <span className={`px-2 py-1 rounded-full text-xs ${
// //                         order.status === 'completed' ? 'bg-green-100 text-green-800' :
// //                         order.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' :
// //                         'bg-gray-100 text-gray-800'
// //                       }`}>
// //                         {order.status}
// //                       </span>
// //                       {order.status === 'in-progress' && (
// //                         <button
// //                           onClick={(e) => {
// //                             e.stopPropagation();
// //                             handleComplete(order._id);
// //                           }}
// //                           className="px-2 py-1 text-xs bg-green-500 text-white rounded hover:bg-green-600"
// //                         >
// //                           Complete
// //                         </button>
// //                       )}
// //                     </div>
// //                   </div>
// //                 </div>
// //               ))}
// //             </div>
// //           </div>

// //           {/* Order Details & Assignment */}
// //           <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
// //             <h2 className="text-xl font-semibold mb-4">Order Details</h2>
// //             {selectedOrder ? (
// //               <div className="space-y-4">
// //                 <div>
// //                   <h3 className="font-medium">Customer: {selectedOrder.customer_id}</h3>
// //                   <p className="text-gray-600 dark:text-gray-400">Service: {selectedOrder.service}</p>
// //                   <p className="text-gray-600 dark:text-gray-400">Status: {selectedOrder.status}</p>
// //                 </div>
                
// //                 {selectedOrder.status === 'pending' && (
// //                   <div className="space-y-4">
// //                     <div>
// //                       <label className="block text-sm font-medium mb-1">
// //                         Assign Technician Code
// //                       </label>
// //                       <input
// //                         type="text"
// //                         value={technicianCode}
// //                         onChange={(e) => setTechnicianCode(e.target.value)}
// //                         className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
// //                         placeholder="Enter code (e.g. LPR2)"
// //                       />
// //                     </div>
// //                     <button
// //                       onClick={handleAssignCode}
// //                       className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
// //                     >
// //                       Assign Order
// //                     </button>
// //                   </div>
// //                 )}
// //               </div>
// //             ) : (
// //               <p className="text-gray-500 dark:text-gray-400">
// //                 Select an order to view details and assign technician code
// //               </p>
// //             )}
// //           </div>
          
// //         </div>
// //       </div>

// //   );
// // };

// // export default Technician;
// //  const { data: ordersData, isLoading: ordersLoading } = useGetAllOrdersQuery();
// //   // const [updateOrder] = useUpdateOrderMutation();
// //   const [orders, setOrders] = useState<Order[]>([]);

// //   console.log(
// //     ordersData
// //   );
// //   // Update orders state when data from getAllOrdersQuery changes
// //   useEffect(() => {
// //     if (ordersData) {
// //       setOrders(ordersData); // Set the fetched data into the orders state
// //     }
// //     console.log(ordersData)
// //   }, [ordersData]);
// // "use client";
// // import React, { useState } from "react";
// // import { FaTrashAlt } from "react-icons/fa";
// // import { RiExpandUpDownFill } from "react-icons/ri";
// // import { MdOutlineSearch } from "react-icons/md";
// // import Link from "next/link";
// // import { useRouter } from "next/navigation";
// // import Swal from "sweetalert2";
// // import { FaPrint } from "react-icons/fa";
// // import { FaCreditCard } from "react-icons/fa6";
// // import {
// //   useGetAllOrdersQuery,
// //   useDeleteOrderMutation,
// // } from "@/app/redux/features/orderApiSlice";
// // import { useGetAllProductsQuery } from "@/app/redux/features/productApiSlice";
// // import { useGetAllCustomersQuery } from "@/app/redux/features/customerApiSlice";
// // import { Order , Product } from "@/types";

// // const Orders: React.FC = () => {
// //   const router = useRouter();
// //   const { data: orders = [], isLoading } = useGetAllOrdersQuery();
// //   const [deleteOrder] = useDeleteOrderMutation();

// //  const { data: customers = [], isLoading: isCustomersLoading } =
// //    useGetAllCustomersQuery();
// //  const { data: products = [], isLoading: isProductsLoading } =
// //    useGetAllProductsQuery();

// //   const [searchTerm, setSearchTerm] = useState("");
// //   const [currentPage, setCurrentPage] = useState(1);
// //   const itemsPerPage = 6;

// //   const filteredOrders = orders.filter(
// //     (order) =>
// //       order._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
// //       order.order_id.toLowerCase().includes(searchTerm.toLowerCase()),
// //   );

// //   const indexOfLastOrder = currentPage * itemsPerPage;
// //   const indexOfFirstOrder = indexOfLastOrder - itemsPerPage;
// //   const currentOrders = filteredOrders.slice(
// //     indexOfFirstOrder,
// //     indexOfLastOrder,
// //   );
// //   const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

// //   const handleRowClick = (order: Order) => {
// //     const queryParams = new URLSearchParams({
// //       id: order._id.toString(),
// //       status: order.status,
// //     }).toString();

// //     router.push(`orders/ordered?${queryParams}`);
// //   };

// //   const handleNextPage = () => {
// //     if (currentPage < totalPages) setCurrentPage(currentPage + 1);
// //   };

// //   const handlePreviousPage = () => {
// //     if (currentPage > 1) setCurrentPage(currentPage - 1);
// //   };

// //   // use customer name useing customerId
// //   const getCustomerName = (customerId: string) => {
// //     const customer = customers.find(
// //       (customer) => customer.customer_id === customerId,
// //     );
// //     return customer ? customer.name : "N/A";
// //   };

// //   if (isLoading || isCustomersLoading) return <div>Loading...</div>;

// //   //use product name using productId
// //   const getProductName = (productId: string) => {
// //    const product = products.find(
// //     (product) => product.product_id === productId,
// //    );
// //    return product ? (
// //     product.product_type
// //    ) : (
// //     "N/A"
// //    )
// //   }
  
// //   if (isLoading || isCustomersLoading) return <div>Loading...</div>;

// //   const handleDelete = (orderId: string) => {
// //     Swal.fire({
// //       title: "Are you sure?",
// //       text: "You won't be able to revert this!",
// //       icon: "warning",
// //       showCancelButton: true,
// //       confirmButtonText: "Yes, delete it!",
// //       cancelButtonText: "Cancel",
// //       confirmButtonColor: "#2E84D3",
// //       cancelButtonColor: "#D93132",
// //     }).then((result) => {
// //       if (result.isConfirmed) {
// //         deleteOrder(orderId);
// //         router.push("/orders");
// //       }
// //     });
// //   };

// //   const handlePrint = (orderId: string) => {
// //     Swal.fire({
// //       title: "Are you sure?",
// //       text: "You won't be able to revert this!",
// //       icon: "warning",
// //       showCancelButton: true,
// //       confirmButtonText: "Yes, print it!",
// //       cancelButtonText: "Cancel",
// //       confirmButtonColor: "#2E84D3",
// //       cancelButtonColor: "#D93132",
// //     });
// //   };

// //   const handlePayment = (orderId: string ) => {
// //     const queryParams = new URLSearchParams({
// //       id: orderId,
      
// //     }).toString();

// //     router.push(`/payments/PaymentOrder?id=${queryParams}`);
// //   };

  

// //   if (isLoading) return <div>Loading...</div>;

// //   return (
// //     <div>
// //       <div className="flex items-center justify-between text-3xl font-bold text-gray-700 dark:text-white">
// //         <span className="text-[40px] font-medium">Orders</span>
// //         <Link href="orders/neworder">
// //           <button className="rounded-md border-2 border-[#3584FA] bg-[#E0EDFF] p-2 text-xl text-[#3584FA] hover:bg-[#3584FA] hover:text-[#E0EDFF] dark:border-dark-3 dark:bg-dark-2 dark:text-white">
// //             New Order +
// //           </button>{" "}
// //         </Link>
// //       </div>
// //       <div className="mt-4 flex items-center p-4">
// //         <div className="text-md flex h-[30px] w-[227px] items-center rounded-lg border-2 border-gray-300 bg-white px-3 py-2 text-center text-gray-600 shadow-2xl dark:border-dark-3 dark:bg-dark-2 dark:text-white">
// //           <MdOutlineSearch className="mr-4 justify-start" />
// //           <input
// //             type="text"
// //             placeholder="Search Orders"
// //             className="w-full border-none outline-none dark:border-dark-3 dark:bg-dark-2"
// //             value={searchTerm}
// //             onChange={(e) => setSearchTerm(e.target.value)}
// //           />
// //         </div>
// //         <div className="text-md ml-8 flex h-[30px] w-[141px] items-center rounded-lg border-2 border-gray-300 bg-white px-3 py-2 text-center text-gray-600 shadow-2xl dark:border-dark-3 dark:bg-dark-2 dark:text-white">
// //           <RiExpandUpDownFill className="cursor-pointer justify-start" />
// //           <span> Sort by order </span>
// //         </div>
// //       </div>

// //       <table className="roun h-[91px] w-full table-auto border-separate border-spacing-y-3 font-bold">
// //         <thead className="uppercase dark:text-white">
// //           <tr>
// //             <th className="p-4 text-center">ID</th>
// //             <th className="p-4 text-center">Customer Name</th>
// //             <th className="p-4 text-center">Status</th>
// //             <th className="p-4 text-center">Product ID</th>
// //             <th className="p-4 text-center">Product Name</th>
// //             <th className="p-4 text-center">Deliverd From</th>
// //             <th className="p-4"></th>
// //             <th className="p-4"></th>
// //           </tr>
// //         </thead>
// //         <tbody>
// //           {currentOrders.map((order) => (
// //             <tr key={order._id} className="bg-white shadow-md">
// //               <td className="rounded-lg px-4 py-6 text-center">
// //                 {order.order_id}
// //               </td>
// //               <td className="p-4 text-center">
// //                 {getCustomerName(order.customer_id)}
// //               </td>
// //               <td className="p-4 text-center">
// //                 <span
// //                   className={`font-semibold ${
// //                     order.status === "Pending"
// //                       ? "border-2 border-[#F70D1A] bg-[#FFCED1] px-3 py-1 text-[#F70D1A]"
// //                       : "border-2 border-[#025826] bg-[#C3FFDA] px-6 py-1 text-[#025826]"
// //                   }`}
// //                 >
// //                   {order.status}
// //                 </span>
// //               </td>
// //               <td className="p-4 text-center">{order.product_id || "N/A"}</td>
// //               <td className="p-4 text-center">
// //                 {getProductName(order.product_id) || "N/A"}
// //               </td>
// //               <td className="p-4 text-center">
// //                 {order.delivery_status || "N/A"}
// //               </td>

// //               <td className="p-4 text-center">
// //                 <button
// //                   className="text-center text-red-500 hover:text-red-700"
// //                   onClick={(e) => {
// //                     e.stopPropagation();
// //                     handleDelete(order._id);
// //                   }}
// //                 >
// //                   <FaTrashAlt />
// //                 </button>
// //                 <button
// //                   className="ml-4 text-center text-blue-500 hover:text-blue-700"
// //                   onClick={(e) => {
// //                     e.stopPropagation();
// //                     handlePrint(order._id);
// //                   }}
// //                 >
// //                   <FaPrint />
// //                 </button>
// //                 <button
// //                   className="ml-4 text-center text-green-500 hover:text-green-700"
// //                   onClick={(e) => {
// //                     e.stopPropagation();
// //                     handlePayment(order._id);
// //                   }}
// //                 >
// //                   <FaCreditCard />
// //                 </button>
// //               </td>
// //               <td className="rounded-lg p-4"></td>
// //             </tr>
// //           ))}
// //         </tbody>
// //       </table>

// //       <div className="mt-4 flex items-center justify-between">
// //         <div>
// //           <nav className="inline-flex items-center font-semibold">
// //             <button
// //               className="mx-1 rounded-md border border-gray-300 px-3 py-1 text-black dark:text-white"
// //               onClick={handlePreviousPage}
// //               disabled={currentPage === 1}
// //             >
// //               <span>&lt;</span>
// //             </button>
// //             {Array.from({ length: totalPages }, (_, index) => (
// //               <button
// //                 key={index + 1}
// //                 className={`mx-1 rounded-md border border-gray-300 px-3 py-1 ${
// //                   currentPage === index + 1
// //                     ? "bg-blue text-white"
// //                     : "text-black dark:text-white"
// //                 }`}
// //                 onClick={() => setCurrentPage(index + 1)}
// //               >
// //                 {index + 1}
// //               </button>
// //             ))}
// //             <button
// //               className="mx-1 rounded-md border border-gray-300 px-3 py-1 text-black dark:text-white"
// //               onClick={handleNextPage}
// //               disabled={currentPage === totalPages}
// //             >
// //               <span>&gt;</span>
// //             </button>
// //           </nav>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Orders;
// return (
//     <div className="mx-auto max-w-7xl p-4 ">
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

//         {/* Orders List */}
//         <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
//           <h2 className="text-xl font-semibold mb-4">Available Orders</h2>
//           <div className="space-y-4">
//             {orders.map(order => (
//               <div
//                 key={order._id}
//                 className="border dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
//                 onClick={() => handleOrderSelect(order)}
//               >
//                 <div className="flex justify-between items-center">
//                   <div>
//                     <h3 className="font-medium">  {getCustomerName(order.customer_id)}</h3>
//                     <p className="text-sm text-gray-600 dark:text-gray-400">{getProductName(orde.product_idr.)}</p>
//                     {order.technicianCode && (
//                       <p className="text-sm text-blue-600">Code: {order.technicianCode}</p>
//                     )}
//                   </div>
//                   <div className="flex gap-2">
//                     <span className={`px-2 py-1 rounded-full text-xs ${
//                       order.status === 'Complete' ? 'bg-green-100 text-green-800' :
//                       order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
//                       'bg-gray-100 text-gray-800'
//                     }`}>
//                       {order.status}
//                     </span>
//                     {order.status === 'In-progress' && (
//                       <button
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           handleComplete(order._id);
//                         }}
//                         className="px-2 py-1 text-xs bg-green-500 text-white rounded hover:bg-green-600"
//                       >
//                         Complete
//                       </button>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>




// // <div className='grid grid-cols-1 lg:grid-cols-1'>
        
//          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
//             Order Details & Assignment
//          <h2 className="text-xl font-semibold mb-4">Order Details</h2>
//            {selectedOrder ? (
//             <div className="space-y-4">
//               <div>
//                 <h3 className="font-medium">Customer: {selectedOrder.customer_id}</h3>
//                 <p className="text-gray-600 dark:text-gray-400">Service: {selectedOrder.product_id}</p>
//                 <p className="text-gray-600 dark:text-gray-400">Status: {selectedOrder.status}</p>
//               </div>
              
//               {selectedOrder.status === 'Pending' && (
//                 <div className="space-y-4">
//                   <div>
//                     <label className="block text-sm font-medium mb-1">
//                       Assign Technician Code
//                     </label>
//                     <input
//                       type="text"
//                       value={technicianCode}
//                       onChange={(e) => setTechnicianCode(e.target.value)}
//                       className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                       placeholder="Enter code (e.g. LPR2)"
//                     />
//                   </div>
//                   <button
//                     onClick={handleAssignCode}
//                     className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
//                   >
//                     Assign Order
//                   </button>
//                 </div>
//               )}
//             </div>
//           ) : (
//             <p className="text-gray-500 dark:text-gray-400">
//               Select an order to view details and assign technician code
//             </p>
//           )}
//         </div>
// </div>
//       </div>
//     </div>
//   );