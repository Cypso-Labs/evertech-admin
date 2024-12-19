"use client";

import React, { useEffect, useState } from "react";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { useRouter, useSearchParams } from "next/navigation";
import { useGetOrderByIdQuery } from "@/app/redux/features/orderApiSlice";
import { useCreatePaymentMutation } from "@/app/redux/features/paymentApiSlice";
import Swal from "sweetalert2";

const CreatePayment: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get("order_id");

  const {
    data: orders,
    isLoading,
    isError,
  } = useGetOrderByIdQuery(orderId || "");
  const [createPayment, { isLoading: updateLoading }] =
    useCreatePaymentMutation();

  const [formData, setFormData] = useState({
    _id: "",
    payment_id: "",
    order_id: " ",
    customer_id: "",
    amount: "",
    payment_method: "",
    payment_date: Date.now(),
    status: "",
    employee_id: "",
    product_id: "",
    payment_details: "",
  });

  useEffect(() => {
    if (orders) {
      setFormData({
        _id: orders._id || "",
        payment_id: "",
        order_id: orders.order_id || "",
        customer_id: orders.customer_id || "",
        amount: "",
        payment_method: "",
        payment_date: Date.now(),
        status: "",
        employee_id: "",
        product_id: orders.product_id || "",
        payment_details: "",
      });
    }
  }, [orders]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const paymentData = {
        ...formData,
        payment_date: new Date(formData.payment_date),
      };
      await createPayment(paymentData);
      router.push("/payments");
    } catch (error) {
      console.error("Error creating payment:", error);
    }
  };

  const handleCancel = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Unsaved changes will be lost.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, cancel",
      cancelButtonText: "No, keep editing",
    }).then((result) => {
      if (result.isConfirmed) {
        router.push("/payments");
      }
    });
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Failed to fetch order details.</p>;
  }

  return (
    <div>
      <div className="mb-12 flex items-center text-[40px] font-medium text-gray-700 dark:text-white">
        <button
          className="mr-4 h-[51px] w-[51px] rounded-full text-center dark:bg-dark-2"
          onClick={() => router.back()}
        >
          <MdKeyboardArrowLeft className="h-[51px] w-[51px] cursor-pointer rounded-full border-2 border-gray-4 bg-white hover:text-[#3584FA]" />
        </button>
        Create Payment
      </div>

      <form
        onSubmit={handleSubmit}
        className="mx-auto max-w-4xl rounded-lg bg-white p-8 shadow-md"
      >
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="flex flex-col space-y-2">
            <label
              htmlFor="order_id"
              className="text-base font-medium capitalize text-gray-600"
            >
              Order ID
            </label>
            <input
              id="order_id"
              name="order_id"
              type="text"
              value={formData.order_id}
              readOnly
              className="w-full rounded-md border border-gray-300 px-4 py-2 text-black focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label
              htmlFor="customer_id"
              className="text-base font-medium capitalize text-gray-600"
            >
              Customer ID
            </label>
            <input
              id="customer_id"
              name="customer_id"
              type="text"
              value={formData.customer_id}
              readOnly
              className="w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label
              htmlFor="product_id"
              className="text-base font-medium capitalize text-gray-600"
            >
              Product ID
            </label>
            <input
              id="product_id"
              name="product_id"
              type="text"
              value={formData.product_id}
              readOnly
              className="w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label
              htmlFor="status"
              className="text-base font-medium capitalize text-gray-600"
            >
              Status
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500"
            >
              <option value="pending">Pending</option>
              <option value="complete">Complete</option>
            </select>
          </div>

          <div className="flex flex-col space-y-2">
            <label
              htmlFor="payment_method"
              className="text-base font-medium capitalize text-gray-600"
            >
              Payment Method
            </label>
            <select
              id="payment_method"
              name="payment_method"
              value={formData.payment_method}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Payment Method</option>
              <option value="cash">Cash</option>
              <option value="visa">Visa</option>
              <option value="mastercard">MasterCard</option>
            </select>
          </div>

          <div className="flex flex-col space-y-2">
            <label
              htmlFor="amount"
              className="text-base font-medium capitalize text-gray-600"
            >
              Amount
            </label>
            <input
              id="amount"
              name="amount"
              type="number"
              value={formData.amount}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="flex flex-col space-y-2">
          <label
            htmlFor="payment_details"
            className="text-base font-medium capitalize text-gray-600"
          >
            Payment Details
          </label>
          <input
            id="payment_details"
            name="payment_details"
            type="text"
            value={formData.payment_details}
            onChange={handleChange}
            className="h-[120px] w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mt-8 flex justify-end space-x-4">
          <button
            type="button"
            onClick={handleCancel}
            className="rounded-lg bg-red-500 px-6 py-3 text-white hover:bg-red-600"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={updateLoading}
            className="rounded-lg bg-green-500 px-6 py-3 text-white hover:bg-green-600"
          >
            {updateLoading ? "Saving..." : "Save Payment"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePayment;
