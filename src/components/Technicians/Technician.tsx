"use client";
import { useState, useEffect } from 'react';
import { useGetAllOrdersQuery, useUpdateOrderMutation } from '@/app/redux/features/orderApiSlice';
import { useGetAllCustomersQuery } from "@/app/redux/features/customerApiSlice";
import { useGetAllProductsQuery } from "@/app/redux/features/productApiSlice";
import { Order } from '@/types';
import {Customer} from '@/types'

const Technician = () => {
  const { data: allorders = [], isLoading } = useGetAllOrdersQuery();
  const { data: customers = [], isLoading: isCustomersLoading } = useGetAllCustomersQuery();
  const { data: products = [], isLoading: isProductsLoading } =useGetAllProductsQuery();


  const [orders, setOrders] = useState<Order[]>([]);
 
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [technicianCode, setTechnicianCode] = useState('');

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

  const handleOrderSelect = (order: Order) => {
    setSelectedOrder(order);
    setTechnicianCode(order.technicianCode || '');
  };
  const [updateOrder] = useUpdateOrderMutation();

  const handleAssignCode = async () => {
    if (!selectedOrder || !technicianCode) return;

    try {
      await updateOrder({
        id: selectedOrder._id,
        technicianCode:technicianCode,
        status: 'In-progress',
        employee_id:"e001"
      }).unwrap();

      setOrders(orders.map(order =>
        order._id === selectedOrder._id
          ? { ...order, technicianCode, status: 'In-progress' }
          : order
      ));
      setSelectedOrder(null);
      setTechnicianCode('');
    } catch (error) {
      console.error('Failed to update order:', error);
    }
  };

  const handleComplete = (orderId: string) => {
    setOrders(orders.map(order =>
      order._id === orderId
        ? { ...order, status: 'Complete' }
        : order
    ));
  };

  if (isLoading) return <div>Loading...</div>;

 return(
<div className="grid grid-cols-2 gap-4">
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Available Orders</h2>
          <div className="space-y-4">
            {orders.map(order => (
              <div
                key={order._id}
                className="border dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                onClick={() => handleOrderSelect(order)}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">  {getCustomerName(order.customer_id)}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{getProductName(order.product_id)}</p>
                    {order.technicianCode && (
                      <p className="text-sm text-blue-600">Code: {order.technicianCode}</p>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      order.status === 'Complete' ? 'bg-green-100 text-green-800' :
                      order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {order.status}
                    </span>
                    {order.status === 'In-progress' && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleComplete(order._id);
                        }}
                        className="px-2 py-1 text-xs bg-green-500 text-white rounded hover:bg-green-600"
                      >
                        Complete
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
  </div>

  <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
         Order Details & Assignment
         <h2 className="text-xl font-semibold mb-4">Order Details</h2>
           {selectedOrder ? (
            <div className="space-y-4">
              <div>
                <h3 className="font-medium">Customer: {selectedOrder.customer_id}</h3>
                <p className="text-gray-600 dark:text-gray-400">Service: {selectedOrder.product_id}</p>
                <p className="text-gray-600 dark:text-gray-400">Status: {selectedOrder.status}</p>
              </div>
              
              {selectedOrder.status === 'Pending' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Assign Technician Code
                    </label>
                    <input
                      type="text"
                      value={technicianCode}
                      onChange={(e) => setTechnicianCode(e.target.value)}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter code (e.g. LPR2)"
                    />
                  </div>
                  <button
                    onClick={handleAssignCode}
                    className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
                  >
                    Assign Order
                  </button>
                </div>
              )}
            </div>
          ) : (
            <p className="text-gray-500 dark:text-gray-400">
              Select an order to view details and assign technician code
            </p>
          )}
  </div>
</div>
 )
};

export default Technician;
