"use client";
import React, { useState, useEffect } from "react";



interface Order {
  id: string;
  customer: {
    name: string;
    address: string;
    contactPerson: string;
    contactNo: string;
  };
  equipment: {
    modelId: string;
    description: string;
    serialNo: string;
    faultDescription: string;
  };
  technician?: {
    name: string;
  };
  repairStatus?: string;
  replacement?: string;
}


const fetchOrders = async (): Promise<Order[]> => {
 
  return [
    {
      id: "ORD-001",
      customer: {
        name: "John Doe",
        address: "123 Tech Street, Colombo, Sri Lanka",
        contactPerson: "John Doe",
        contactNo: "+94 77 123 4567",
      },
      equipment: {
        modelId: "LT-2024",
        description: "Laptop Repair",
        serialNo: "SN-ABC123",
        faultDescription: "Broken Screen",
      },
      technician: {
        name: "Mike Johnson",
      },
      repairStatus: "In Progress",
      replacement: "Screen Replacement",
    },
    {
      id: "ORD-002",
      customer: {
        name: "Jane Smith",
        address: "456 Innovation Road, Kandy, Sri Lanka",
        contactPerson: "Jane Smith",
        contactNo: "+94 71 987 6543",
      },
      equipment: {
        modelId: "PC-2023",
        description: "Desktop Computer Repair",
        serialNo: "SN-XYZ789",
        faultDescription: "Power Supply Failure",
      },
      technician: {
        name: "Sarah Williams",
      },
      repairStatus: "Completed",
      replacement: "Power Supply Unit",
    },
  ];
};

const TechnicalReport: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [currentDate] = useState(new Date());

  useEffect(() => {
    const loadOrders = async () => {
      const fetchedOrders = await fetchOrders();
      setOrders(fetchedOrders);
    };

    loadOrders();
  }, []);

  const handleOrderSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const orderId = event.target.value;
    const order = orders.find((o) => o.id === orderId) || null;
    setSelectedOrder(order);
  };

  return (
    <div className="container mx-auto max-w-4xl p-6">
      <div className="overflow-hidden rounded-lg bg-white shadow-md">
        {/* Order Selection */}
        <div className="border-b bg-gray-100 p-6">
          <label
            htmlFor="orderSelect"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Select Order
          </label>
          <select
            id="orderSelect"
            onChange={handleOrderSelect}
            className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select an Order</option>
            {orders.map((order) => (
              <option key={order.id} value={order.id}>
                {order.id} - {order.customer.name}
              </option>
            ))}
          </select>
        </div>

        {/* Technical Report */}
        {selectedOrder && (
          <div className="p-6">
            {/* Header */}
            <div className="mb-8 border-b pb-4 text-center">
              <h1 className="text-2xl font-bold text-gray-800">
                EVERTECH TECHNOLOGY (PVT) LTD
              </h1>
              <p className="text-sm uppercase text-gray-600">
                Advanced Technology Partner in Sri Lanka
              </p>
              <p className="text-xs text-gray-500">
                Email: info@evertech.lk | Web: www.evertech.lk
              </p>
            </div>

            {/* Report Title */}
            <div className="mb-8 text-center">
              <h2 className="text-lg font-bold text-gray-700 underline">
                Technical Report
              </h2>
            </div>

            {/* Details Grid */}
            <div className="mb-6 grid grid-cols-2 gap-4 text-sm">
              <div className="space-y-2">
                <p>
                  <span className="font-semibold text-gray-700">Date:</span>{" "}
                  {currentDate.toLocaleDateString()}
                </p>
                <p>
                  <span className="font-semibold text-gray-700">Time In:</span>{" "}
                  {currentDate.toLocaleTimeString()}
                </p>
                <p>
                  <span className="font-semibold text-gray-700">Job Ref:</span>{" "}
                  {selectedOrder.id}
                </p>
              </div>
              <div className="space-y-2">
                <p>
                  <span className="font-semibold text-gray-700">Customer:</span>{" "}
                  {selectedOrder.customer.name}
                </p>
                <p>
                  <span className="font-semibold text-gray-700">Address:</span>{" "}
                  {selectedOrder.customer.address}
                </p>
                <p>
                  <span className="font-semibold text-gray-700">
                    Contact Person:
                  </span>{" "}
                  {selectedOrder.customer.contactPerson}
                </p>
                <p>
                  <span className="font-semibold text-gray-700">
                    Contact No:
                  </span>{" "}
                  {selectedOrder.customer.contactNo}
                </p>
              </div>
            </div>

            {/* Equipment Details */}
            <div className="mb-6 space-y-2 text-sm">
              <p>
                <span className="font-semibold text-gray-700">Model ID:</span>{" "}
                {selectedOrder.equipment.modelId}
              </p>
              <p>
                <span className="font-semibold text-gray-700">
                  Description:
                </span>{" "}
                {selectedOrder.equipment.description}
              </p>
              <p>
                <span className="font-semibold text-gray-700">Serial No:</span>{" "}
                {selectedOrder.equipment.serialNo}
              </p>
              <p>
                <span className="font-semibold text-gray-700">
                  Fault Description:
                </span>{" "}
                {selectedOrder.equipment.faultDescription}
              </p>
            </div>

            {/* Repair Status */}
            <div className="mb-6 space-y-2 text-sm">
              <p>
                <span className="font-semibold text-gray-700">
                  Repair Status:
                </span>{" "}
                {selectedOrder.repairStatus || "Pending"}
              </p>
              <p>
                <span className="font-semibold text-gray-700">
                  Replacement:
                </span>{" "}
                {selectedOrder.replacement || "N/A"}
              </p>
            </div>

            {/* Technician Details */}
            <div className="mb-6 grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-semibold text-gray-700">
                  Technician's Name:{" "}
                  {selectedOrder.technician?.name || "Not Assigned"}
                </p>
              </div>
              <div>
                <p className="font-semibold text-gray-700">
                  Technician's Signature: __________
                </p>
              </div>
            </div>

            {/* Customer Comments */}
            <div className="mb-6 border-t pt-4">
              <p className="text-sm">
                <span className="font-semibold text-gray-700">
                  Customer Comments:
                </span>
                <textarea
                  className="mt-2 w-full rounded-md border p-2 text-sm"
                  rows={3}
                  placeholder="Enter customer comments here"
                ></textarea>
              </p>
            </div>

            {/* Footer */}
            <div className="border-t pt-4 text-center text-sm">
              <p className="text-gray-700">
                Customer Name & Signature: _____________________________
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TechnicalReport;
