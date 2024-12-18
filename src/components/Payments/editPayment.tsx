"use client";
import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { IoIosArrowDropleft } from "react-icons/io";
import Link from "next/link";
import Swal from "sweetalert2";
import { useSearchParams, useRouter } from "next/navigation";
import { useUpdatePaymentMutation } from "@/app/redux/features/paymentApiSlice";
import { useGetPaymentByIdQuery } from "@/app/redux/features/paymentApiSlice";

const EditPayment = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const paymentId = searchParams.get("id");

  const {
    data: payment,
    isLoading,
    isError,
  } = useGetPaymentByIdQuery(paymentId || "");

  const [updatePayment, { isLoading: isUpdating }] = useUpdatePaymentMutation();

  const [formData, setFormData] = useState({
    paymentId: paymentId || "",
    order_id: " ",
    customer_id: "",
    amount: "",
    product_id: "",
    payment_details: "",
  });

  useEffect(() => {
    if (payment) {
      setFormData({
        paymentId: payment.payment_id || "",
        order_id: payment.order_id || "",
        customer_id: payment.customer_id || "",
        product_id: payment.product_id || "",
        amount: payment.amount || "",
        payment_details: payment.payment_details || "",
      });
    }
  }, [payment]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!paymentId) {
      Swal.fire("Error", "Invalid payment ID", "error");
      return;
    }

    try {
      await updatePayment({ _id: paymentId, ...formData }).unwrap();
      Swal.fire("Success", "Payment updated successfully", "success");
      router.push("/payments");
    } catch (error) {
      Swal.fire("Error", "Failed to update payment", "error");
    }
  };

  const handleCancel = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You'll lose all entered data!",
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

  if (isLoading)
    return <p className="p-6 text-lg text-gray-600">Loading payment data...</p>;
  if (isError || !payment)
    return (
      <p className="p-6 text-lg text-red-600">Failed to load payment data.</p>
    );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-12 flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
        <div className="flex items-center space-x-4">
          <Link href="/payments" className="group">
            <IoIosArrowDropleft className="h-10 w-10 text-gray-500 transition-colors group-hover:text-blue-500" />
          </Link>
          <h1 className="text-3xl font-semibold text-gray-700 md:text-4xl">
            Edit Payment #{formData.paymentId}
          </h1>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mx-auto max-w-4xl rounded-lg bg-white p-8 shadow-md"
      >
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {Object.entries(formData).map(([key, value]) => {
            // Make paymentId, order_id, customer_id, and product_id read-only
            const isReadOnly =
              key === "paymentId" ||
              key === "order_id" ||
              key === "customer_id" ||
              key === "product_id";

            return (
              <div key={key} className="flex flex-col space-y-2">
                <label
                  htmlFor={key}
                  className="text-base font-medium capitalize text-gray-600"
                >
                  {key
                    .replace(/([A-Z])/g, " $1")
                    .replace(/^./, (str) => str.toUpperCase())}
                </label>
                <input
                  id={key}
                  name={key}
                  value={value}
                  onChange={handleChange}
                  type="text"
                  className="w-full rounded-md border 
                  border-gray-300 px-4 py-2 
                  transition-colors duration-300 focus:outline-none 
                  focus:ring-2 focus:ring-blue-500"
                  readOnly={isReadOnly} // Set readOnly based on condition
                />
              </div>
            );
          })}
        </div>

        <div className="mt-8 flex flex-col justify-end space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
          <button
            type="button"
            onClick={handleCancel}
            className="w-full rounded-lg border border-transparent 
            bg-red-500 px-6 py-3 
            font-medium 
            text-white transition-colors 
            duration-300 hover:bg-red-600 
            sm:w-auto"
          >
            Discard
          </button>
          <button
            type="submit"
            disabled={isUpdating}
            className="w-full rounded-lg border border-transparent 
            bg-green-500 px-6 py-3 
            font-medium 
            text-white transition-colors 
            duration-300 hover:bg-green-600 
            disabled:cursor-not-allowed
            disabled:opacity-50 sm:w-auto"
          >
            {isUpdating ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditPayment;
