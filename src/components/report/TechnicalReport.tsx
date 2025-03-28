"use client";
import React, { useState, useEffect, useRef } from "react";
import { useGetAllOrdersQuery } from "@/app/redux/features/orderApiSlice";
import { useGetAllPaymentsQuery } from "@/app/redux/features/paymentApiSlice";
import { useGetAllCustomersQuery } from "@/app/redux/features/customerApiSlice";
import { useGetAllProductsQuery } from "@/app/redux/features/productApiSlice";
import { Order } from "@/types";
import { FaDownload } from "react-icons/fa6";
import jsPDF from "jspdf";

const TechnicalReport: React.FC = () => {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [currentDate] = useState(new Date());

  const reportRef = useRef<HTMLDivElement>(null);

  const {
    data: orders,
    isLoading: isOrdersLoading,
    isError: isOrdersError,
  } = useGetAllOrdersQuery();
  const {
    data: payments,
    isLoading: isPaymentsLoading,
    isError: isPaymentsError,
  } = useGetAllPaymentsQuery();
  const {
    data: customers,
    isLoading: isCustomersLoading,
    isError: isCustomersError,
  } = useGetAllCustomersQuery();
  const {
    data: products,
    isLoading: isProductsLoading,
    isError: isProductsError,
  } = useGetAllProductsQuery();

  if (isOrdersLoading || isPaymentsLoading) {
    return <div>Loading...</div>;
  }
  if (isCustomersLoading || isProductsLoading) {
    return <div>Loading...</div>;
  }

  if (isOrdersError || !orders) {
    return <div>Error: Failed to load orders</div>;
  }

  if (isPaymentsError || !payments) {
    return <div>Error: Failed to load payments</div>;
  }

  if (isCustomersError || !customers) {
    return <div>Error: Failed to load customers</div>;
  }

  const getCustomerDetails = (customerId: string) => {
    const customer = customers.find(
      (customer) => customer.customer_id === customerId,
    );
    return {
      name: customer ? customer.name : "N/A",
      address: customer ? customer.address : "N/A",
      contact: customer ? customer.contact : "N/A",
      email: customer ? customer.mail : "N/A",
    };
  };

  if (isProductsError || !products) {
    return (
      <div className="text-center text-red-500">
        Error: Failed to load product details
      </div>
    );
  }

  const getProductDetails = (productId: string) => {
    const product = products.find(
      (product) => product.product_id === productId,
    );
    return {
      model_number: product ? product.model_number : "N/A",
      serial_number: product ? product.serial_number : "N/A",
      description: product ? product.description : "N/A",
      problem: product ? product.problem : "N/A",
    };
  };

  const handleOrderSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const orderId = event.target.value;
    const order = orders.find((o) => o.order_id === orderId) || null;
    setSelectedOrder(order);
  };

  // Download PDF function
  const handleDownload = () => {
    if (reportRef.current) {
      const doc = new jsPDF({
        unit: "mm",
        format: "a4",
        orientation: "portrait",
      });

      doc.html(reportRef.current, {
        callback: (doc) => {
          doc.save("technical-report.pdf");
        },
        margin: [10, 10, 10, 10],
        x: 10,
        y: 10,
        html2canvas: {
          scale: 0.2,
          logging: false,
        },
        autoPaging: true,
      });
    }
  };

  return (
    <div className="container mx-auto max-w-4xl p-6">
      <div className="overflow-hidden rounded-lg bg-white shadow-md ">
        <div className="border-b bg-gray-100 p-6  dark:border-dark-3 dark:bg-dark-2 dark:text-white">
          <label
            htmlFor="orderSelect"
            className="mb-2 block text-sm font-medium text-gray-700  dark:border-dark-3 dark:bg-dark-2 dark:text-white"
          >
            Select Order
          </label>
          <select
            id="orderSelect"
            onChange={handleOrderSelect}
            className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500  dark:border-dark-3 dark:bg-dark-2 dark:text-white"
          >
            <option value="">Select an Order</option>
            {orders.map((order) => (
              <option key={order.order_id} value={order.order_id}>
                {order.order_id} - {getCustomerDetails(order.customer_id).name}
              </option>
            ))}
          </select>
        </div>

        {selectedOrder && (
          <div ref={reportRef} className="p-6">
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

            <div className="mb-8 text-center ">
              <h2 className="text-lg font-bold text-gray-700 underline">
                Technical Report
              </h2>
            </div>

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
                  {selectedOrder.order_id || "N/A"}
                </p>
              </div>
              <div className="space-y-2">
                <p>
                  <span className="font-semibold text-gray-700">Customer:</span>{" "}
                  {getCustomerDetails(selectedOrder.customer_id).name}
                </p>
                <p>
                  <span className="font-semibold text-gray-700">Address:</span>{" "}
                  {getCustomerDetails(selectedOrder.customer_id).address}
                </p>
                <p>
                  <span className="font-semibold text-gray-700">Email:</span>{" "}
                  {getCustomerDetails(selectedOrder.customer_id).email}
                </p>
                <p>
                  <span className="font-semibold text-gray-700">
                    Contact No:
                  </span>{" "}
                  {getCustomerDetails(selectedOrder.customer_id).contact}
                </p>
              </div>
            </div>

            <div className="mb-6 space-y-2 text-sm">
              <p>
                <span className="font-semibold text-gray-700">Model ID:</span>{" "}
                {getProductDetails(selectedOrder.product_id).model_number}
              </p>

              <p>
                <span className="font-semibold text-gray-700">
                  Description:
                </span>{" "}
                {getProductDetails(selectedOrder.product_id).description}
              </p>
              <p>
                <span className="font-semibold text-gray-700">Serial No:</span>{" "}
                {getProductDetails(selectedOrder.product_id).serial_number}
              </p>
              <p>
                <span className="font-semibold text-gray-700">
                  Fault Description:
                </span>{" "}
                {getProductDetails(selectedOrder.product_id).problem}
              </p>
            </div>

            <div className="mb-6 space-y-2 text-sm">
              <p>
                <span className="font-semibold text-gray-700">
                  Repair Status:
                </span>{" "}
                {/*selectedOrder.repairStatus || "Pending"*/}
              </p>
              <p>
                <span className="font-semibold text-gray-700">
                  Replacement:
                </span>{" "}
                {/*selectedOrder.replacement || "N/A"*/}
              </p>
            </div>

            <div className="mb-6 grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-semibold text-gray-700">
                  Technician&apos;s Name:{" "}
                  {/*selectedOrder.technician?.name || "Not Assigned"*/}
                </p>
              </div>
              <div>
                <p className="font-semibold text-gray-700">
                  Technician&apos;s Signature: __________
                </p>
              </div>
            </div>

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

            <div className="border-t pt-4 text-center text-sm">
              <p className="text-gray-700">
                Customer Name & Signature: _____________________________
              </p>
            </div>
          </div>
        )}
      </div>
      <div className="flex justify-end">
        <button
          onClick={handleDownload}
          className="mt-6 flex items-center rounded-md bg-green-600 px-4 py-2 text-white"
        >
          Download <FaDownload className="ml-2" />
        </button>
      </div>
    </div>
  );
};

export default TechnicalReport;
