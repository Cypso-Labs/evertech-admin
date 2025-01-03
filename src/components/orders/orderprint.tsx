"use client";
import React, { useState, useRef,Suspense } from "react";
import { useSearchParams } from "next/navigation"; 
import { useGetOrderByIdQuery } from "@/app/redux/features/orderApiSlice";
import { useGetAllPaymentsQuery } from "@/app/redux/features/paymentApiSlice";
import { useGetAllCustomersQuery } from "@/app/redux/features/customerApiSlice";
import { useGetAllProductsQuery } from "@/app/redux/features/productApiSlice";
import { FaDownload } from "react-icons/fa6";
import jsPDF from "jspdf";

const OrderPrints: React.FC = () => {
    const searchParams = useSearchParams(); 
    const orderId = searchParams.get("_id");  
    
  const [currentDate] = useState(new Date());
  const reportRef = useRef<HTMLDivElement>(null);

  const { data: orders, isLoading: isOrderLoading, isError: isOrderError } = useGetOrderByIdQuery(orderId || "");
  const { data: payments, isLoading: isPaymentsLoading, isError: isPaymentsError } = useGetAllPaymentsQuery();
  const { data: customers, isLoading: isCustomersLoading, isError: isCustomersError } = useGetAllCustomersQuery();
  const { data: products, isLoading: isProductsLoading, isError: isProductsError } = useGetAllProductsQuery();

  if (isOrderLoading || isPaymentsLoading || isCustomersLoading || isProductsLoading) {
    return <div>Loading...</div>;
  }

  if (isOrderError || !orders) return <div>Error: Failed to load order</div>;
  if (isPaymentsError || !payments) return <div>Error: Failed to load payments</div>;
  if (isCustomersError || !customers) return <div>Error: Failed to load customers</div>;
  if (isProductsError || !products) return <div>Error: Failed to load products</div>;

  const getCustomerDetails = (customerId: string) => {
    const customer = customers.find((customer) => customer.customer_id === customerId);
    return {
      name: customer?.name || "N/A",
      address: customer?.address || "N/A",
      contact: customer?.contact || "N/A",
      email: customer?.mail || "N/A",
    };
  };

  const getProductDetails = (productId: string) => {
    const product = products.find((product) => product.product_id === productId);
    return {
      model_number: product?.model_number || "N/A",
      serial_number: product?.serial_number || "N/A",
      description: product?.description || "N/A",
      problem: product?.problem || "N/A",
    };
  };

  const handleDownload = () => {
    if (reportRef.current) {
      const doc = new jsPDF({
        unit: "mm",
        format: "a4",
        orientation: "portrait",
      });

      doc.html(reportRef.current, {
        callback: (doc) => {
          doc.save("order-report.pdf");
        },
        margin: [10, 10, 10, 10],
        x: 10,
        y: 10,
        html2canvas: {
          scale: 0.2,
        },
      });
    }
  };

  return (
    <div className="container mx-auto max-w-4xl p-6">
      <div className="overflow-hidden rounded-lg bg-white shadow-md">
        <div ref={reportRef} className="p-6">
          <div className="mb-8 border-b pb-4 text-center">
            <h1 className="text-2xl font-bold text-gray-800">EVERTECH TECHNOLOGY (PVT) LTD</h1>
            <p className="text-sm uppercase text-gray-600">Advanced Technology Partner in Sri Lanka</p>
            <p className="text-xs text-gray-500">Email: info@evertech.lk | Web: www.evertech.lk</p>
          </div>

          <div className="mb-8 text-center">
            <h2 className="text-lg font-bold text-gray-700 underline">Order Details Report</h2>
          </div>

          <div className="mb-6 grid grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <p>
                <span className="font-semibold text-gray-700">Date:</span> {currentDate.toLocaleDateString()}
              </p>
              <p>
                <span className="font-semibold text-gray-700">Time In:</span> {currentDate.toLocaleTimeString()}
              </p>
              <p>
                <span className="font-semibold text-gray-700">Job Ref:</span> {orders.order_id}
              </p>
            </div>
            <div className="space-y-2">
              <p>
                <span className="font-semibold text-gray-700">Customer:</span>{" "}
                {getCustomerDetails(orders.customer_id).name}
              </p>
              <p>
                <span className="font-semibold text-gray-700">Address:</span>{" "}
                {getCustomerDetails(orders.customer_id).address}
              </p>
              <p>
                <span className="font-semibold text-gray-700">Email:</span>{" "}
                {getCustomerDetails(orders.customer_id).email}
              </p>
              <p>
                <span className="font-semibold text-gray-700">Contact No:</span>{" "}
                {getCustomerDetails(orders.customer_id).contact}
              </p>
            </div>
          </div>

          <div className="mb-6 space-y-2 text-sm">
            <p>
              <span className="font-semibold text-gray-700">Model ID:</span>{" "}
              {getProductDetails(orders.product_id).model_number}
            </p>
            <p>
              <span className="font-semibold text-gray-700">Description:</span>{" "}
              {getProductDetails(orders.product_id).description}
            </p>
            <p>
              <span className="font-semibold text-gray-700">Serial No:</span>{" "}
              {getProductDetails(orders.product_id).serial_number}
            </p>
            <p>
              <span className="font-semibold text-gray-700">Fault Description:</span>{" "}
              {getProductDetails(orders.product_id).problem}
            </p>
          </div>
        </div>
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
const OrderPrint = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OrderPrints/>
    </Suspense>
  );
};

export default OrderPrint;
