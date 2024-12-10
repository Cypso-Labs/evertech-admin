"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { IoIosArrowDropleft } from "react-icons/io";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Swal from "sweetalert2";
import { useCreateProductMutation } from "@/app/redux/features/productApiSlice";
import { useGetAllCustomersQuery } from "@/app/redux/features/customerApiSlice";

const NewProduct = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    customer_id: "",
    product_type: "",
    model_number: "",
    serial_number: "",
    status: "",
    problem: "",
    description: "",
  });

  const [customerSearch, setCustomerSearch] = useState("");

  // RTK Query hooks
  const [createProduct, { isLoading: isCreatingProduct }] = useCreateProductMutation();
  const { data: customers = [], isLoading: isLoadingCustomers } = useGetAllCustomersQuery();

  const filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().includes(customerSearch.toLowerCase())
  );

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!formData.customer_id || !formData.product_type || !formData.model_number) {
      Swal.fire("Error", "Please fill in all required fields", "error");
      return;
    }

    try {
      await createProduct(formData).unwrap();
      Swal.fire("Success", "Product created successfully", "success");
      router.push("/products");
    } catch (error) {
      Swal.fire("Error", "Failed to create product", "error");
    }
  };

  const handleDiscard = () => {
    setFormData({
      customer_id: "",
      product_type: "",
      model_number: "",
      serial_number: "",
      status: "",
      problem: "",
      description: "",
    });
    setCustomerSearch("");
  };

  return (
    <div className="p-6">
      <div className="mb-20 flex items-center">
        <Link href="/products" className="mr-4">
          <IoIosArrowDropleft className="h-10 w-10 cursor-pointer text-slate-600 hover:text-[#3584FA] dark:text-white" />
        </Link>
        <h1 className="text-4xl font-medium text-slate-600 dark:text-white">
          New Product
        </h1>
      </div>

      <form className="w-full max-w-6xl" onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-x-10 gap-y-6">
          <div className="space-y-6">
            <div className="flex items-center">
            <label className="w-32 text-[20px] font-medium text-gray-500 dark:text-white">
                Customer
              </label>
              <input
                type="text"
                value={customerSearch}
                onChange={(e) => setCustomerSearch(e.target.value)}
                placeholder="Search Customer"
                className="flex-1 rounded-md border border-gray-200 px-3 py-2 text-base font-normal focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-[#122031] dark:text-white"
              />
              {customerSearch && filteredCustomers.length > 0 && (
                <div className="absolute mt-1 max-h-60  overflow-y-auto rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  {filteredCustomers.map((customer) => (
                    <div
                      key={customer.customer_id}
                      className="cursor-pointer p-2 hover:bg-gray-100"
                      onClick={() => {
                        setFormData((prevState) => ({
                          ...prevState,
                          customer_id: customer.customer_id,
                        }));
                        setCustomerSearch(
                          `${customer.name} - ${customer.customer_id}`,
                        );
                      }}
                    >
                      {customer.name} - {customer.customer_id}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-center">
              <label className="w-32 text-[20px] font-medium text-gray-500 dark:text-white">
                Product Type
              </label>
              <input
                type="text"
                name="product_type"
                value={formData.product_type}
                onChange={handleChange}
                className="flex-1 rounded-md border border-gray-200 px-3 py-2 text-base font-normal focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-[#122031] dark:text-white"
              />
            </div>

            <div className="flex items-center">
              <label className="w-32 text-[20px] font-medium text-gray-500 dark:text-white">
                Model
              </label>
              <input
                type="text"
                name="model_number"
                value={formData.model_number}
                onChange={handleChange}
                className="flex-1 rounded-md border border-gray-200 px-3 py-2 text-base font-normal focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-[#122031] dark:text-white"
              />
            </div>

            <div className="flex items-center">
              <label className="w-32 text-[20px] font-medium text-gray-500 dark:text-white">
                Serial No
              </label>
              <input
                type="text"
                name="serial_number"
                value={formData.serial_number}
                onChange={handleChange}
                className="flex-1 rounded-md border border-gray-200 px-3 py-2 text-base font-normal focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-[#122031] dark:text-white"
              />
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center">
              <label className="w-32 text-[20px] font-medium text-gray-500 dark:text-white">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="flex-1 rounded-md border border-gray-200 px-3 py-2 text-base font-normal focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-[#122031] dark:text-white"
              >
                <option value="">Select Status</option>
                <option value="Shop Based">Shop Based</option>
                <option value="Outsource">Outsource</option>
              </select>
            </div>

            <div className="flex items-center">
              <label className="w-32 text-[20px] font-medium text-gray-500 dark:text-white">
                Problem
              </label>
              <input
                type="text"
                name="problem"
                value={formData.problem}
                onChange={handleChange}
                className="flex-1 rounded-md border border-gray-200 px-3 py-2 text-base font-normal focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-[#122031] dark:text-white"
              />
            </div>

            <div className="flex items-start">
              <label className="w-32 text-[20px] font-medium text-gray-500 dark:text-white">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="flex-1 rounded-md border border-gray-200 px-3 py-2 text-base font-normal focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-[#122031] dark:text-white"
              />
            </div>

            <div className="mt-8 flex justify-end space-x-4">
              <button
                type="button"
                onClick={handleDiscard}
                className="rounded-md border border-red-400 bg-[#FFCDCD] px-4 py-2 text-sm font-medium text-[#FF2323] hover:bg-[#FF2323] hover:text-[#FFCDCD] dark:bg-red-600 dark:text-white dark:hover:bg-red-700"
              >
                Discard
              </button>
              <button
                type="submit"
                disabled={isCreatingProduct}
                className={`rounded-md border border-green-400 bg-[#BCFFC8] px-4 py-2 text-[#08762D] hover:bg-[#08762D] hover:text-[#BCFFC8] dark:bg-green-600 dark:text-white dark:hover:bg-green-700 ${
                  isCreatingProduct && "opacity-50 cursor-not-allowed"
                }`}
              >
                {isCreatingProduct ? "Creating..." : "Create Product"}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default NewProduct;
