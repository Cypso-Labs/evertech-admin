"use client";
import { useState, useEffect } from 'react';
import { useGetAllOrdersQuery, useUpdateOrderMutation } from '@/app/redux/features/orderApiSlice';
import { useGetAllCustomersQuery } from "@/app/redux/features/customerApiSlice";
import { useGetAllProductsQuery } from "@/app/redux/features/productApiSlice";
import { selectEmployee}  from "@/app/redux/features/authSlice";
import { Order } from '@/types';
import {Customer} from '@/types'
import { useSelector } from 'react-redux';

const Technician = () => {
  const { data: allorders = [], isLoading } = useGetAllOrdersQuery();
  const { data: customers = [], isLoading: isCustomersLoading } = useGetAllCustomersQuery();
  const { data: products = [], isLoading: isProductsLoading } =useGetAllProductsQuery();
  const employee = useSelector(selectEmployee);
  const name = employee ? employee.name : '';
  
  const [orders, setOrders] = useState<Order[]>([]);
 
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [technicianCode, setTechnicianCode] = useState('');

  // Add new state for temporary code input
  const [tempCode, setTempCode] = useState<{ [key: string]: string }>({});

  // Update orders when fetched from the API
  useEffect(() => {
    if (allorders.length > 0) {
      setOrders(allorders);
    }
  }, [allorders]);


  
  const getCustomerName = (customerId: string) => {
    const customer = customers.find(
      (customer) => customer.customer_id === customerId,
    );
    return customer ? customer.name : "N/A";
  };

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

  
  const [updateOrder] = useUpdateOrderMutation();



   const handleCodeChange = (id: string, value: string) => {
    setTempCode(prev => ({
      ...prev,
      [id]: value
    }));
  };

  // New function to save code to backend
  const handleSaveCode = async (id: string,name: string) => {
    const codeToSave = tempCode[id];
    if (!codeToSave) return;

    try {
      await updateOrder({
        id: id,
        technicianCode: codeToSave,
        employee_id: name
      }).unwrap();
      
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === id ? { ...order, technicianCode: codeToSave } : order
        )
      );
      
      // Clear temporary code after successful save
      setTempCode(prev => {
        const newTemp = { ...prev };
        delete newTemp[id];
        return newTemp;
      });
    } catch (error) {
      console.error('Failed to update order:', error);
    }
  };

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      await updateOrder({
        id: id,
        status: newStatus,
      }).unwrap();

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === id ? { ...order, status: newStatus } : order
        )
      );
    } catch (error) {
      console.error('Failed to update order status:', error);
    }
  };

  // const [orders, setOrders] = useState([
  //   { id: 1, status: "Pending", code: "" },
  //   { id: 2, status: "Pending", code: "" },
  //   { id: 3, status: "In Progress", code: "12345" },
  // ]);
 return(
<div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Orders Management</h1>
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">Customer Id</th>
            <th className="border border-gray-300 px-4 py-2">Prouct Id</th>
            <th className="border border-gray-300 px-4 py-2">Status</th>
            <th className="border border-gray-300 px-4 py-2">Code</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
            <th className="border border-gray-300 px-4 py-2">Employee</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td className="border border-gray-300 px-4 py-2 text-center">
                {getCustomerName(order.customer_id)}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                {getProductName(order.product_id)}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                {order.status}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                {(order.status === "Pending" && (!order.technicianCode || order.technicianCode.trim() === "")) ? (
                  <div className="flex items-center justify-center gap-2">
                    <input
                      type="text"
                      value={tempCode[order._id] || ''}
                      onChange={(e) => handleCodeChange(order._id, e.target.value)}
                      className="border px-2 py-1 rounded"
                      placeholder="Enter Code"
                    />
                    <button
                      onClick={() => {
                        handleSaveCode(order._id,name);
                        updateStatus(order._id, "In-progress");
                      }}
                      className="bg-gray-500 text-white px-2 py-1 rounded hover:bg-gray-600"
                      disabled={!tempCode[order._id]}
                    >
                      Save
                    </button>
                  </div>
                ) : (
                  order.technicianCode || "No Code Assigned"
                )}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                {order.status === "Pending" && (
                  <button
                  className={`px-4 py-1 rounded ${
                    !order.technicianCode
                      ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                      : "bg-blue-500 text-white hover:bg-blue-600"
                  }`}
                  disabled={!order.technicianCode || order.technicianCode.trim() === ""}
                >
                  Status
                </button>
                )}
                {order.status === "In-progress" && (
                  <button
                    onClick={() => updateStatus(order._id, "Completed")}
                    className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600"
                  >
                    Complete
                  </button>
                )}
                {order.status === "Completed" && (
                  <span className="text-green-500 font-bold">Completed</span>
                )}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                {order.employee_id || 'N/A'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
 )
};

export default Technician;
