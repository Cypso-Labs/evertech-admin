"use client"
import { useState, useEffect } from 'react';


interface Order {
  id: string;
  customerName: string;
  service: string;
  status: 'pending' | 'in-progress' | 'completed';
  technicianCode?: string;
}

const Technician = () => {
  const [orders, setOrders] = useState<Order[]>([
    {
      id: '1',
      customerName: 'John Doe',
      service: 'Laptop Repair',
      status: 'pending'
    },
    {
      id: '2', 
      customerName: 'Jane Smith',
      service: 'Phone Screen Replacement',
      status: 'in-progress',
      technicianCode: 'LPR1'
    }
  ]);

  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [technicianCode, setTechnicianCode] = useState('');

  const handleOrderSelect = (order: Order) => {
    setSelectedOrder(order);
    setTechnicianCode(order.technicianCode || '');
  };

  const handleAssignCode = () => {
    if (!selectedOrder || !technicianCode) return;

    setOrders(orders.map(order => 
      order.id === selectedOrder.id 
        ? {...order, technicianCode, status: 'in-progress'}
        : order
    ));
    setSelectedOrder(null);
    setTechnicianCode('');
  };

  const handleComplete = (orderId: string) => {
    setOrders(orders.map(order =>
      order.id === orderId
        ? {...order, status: 'completed'}
        : order
    ));
  };

  return (
   
      <div className="mx-auto max-w-7xl p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Orders List */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Available Orders</h2>
            <div className="space-y-4">
              {orders.map(order => (
                <div 
                  key={order.id}
                  className="border dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                  onClick={() => handleOrderSelect(order)}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">{order.customerName}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{order.service}</p>
                      {order.technicianCode && (
                        <p className="text-sm text-blue-600">Code: {order.technicianCode}</p>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        order.status === 'completed' ? 'bg-green-100 text-green-800' :
                        order.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {order.status}
                      </span>
                      {order.status === 'in-progress' && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleComplete(order.id);
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

          {/* Order Details & Assignment */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Order Details</h2>
            {selectedOrder ? (
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium">Customer: {selectedOrder.customerName}</h3>
                  <p className="text-gray-600 dark:text-gray-400">Service: {selectedOrder.service}</p>
                  <p className="text-gray-600 dark:text-gray-400">Status: {selectedOrder.status}</p>
                </div>
                
                {selectedOrder.status === 'pending' && (
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
      </div>

  );
};

export default Technician;