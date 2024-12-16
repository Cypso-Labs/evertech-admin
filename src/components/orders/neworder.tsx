"use client";

import React, { useState, useMemo } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { MdKeyboardArrowLeft, MdOutlineAddCircle } from "react-icons/md";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { X, Plus, Minus } from "lucide-react";

// Import RTK Query hooks
import { useCreateOrderMutation } from "@/app/redux/features/orderApiSlice";
import { useGetAllCustomersQuery } from "@/app/redux/features/customerApiSlice";
import { useGetAllServicesQuery } from "@/app/redux/features/serviceApiSlice";
import { useGetAllProductsQuery } from "@/app/redux/features/productApiSlice";
import { Order, Service, Product } from "@/types";

const NewOrder: React.FC = () => {
  const router = useRouter();

  // State management
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [orderData, setOrderData] = useState<any[]>([]);
  const [customerSearch, setCustomerSearch] = useState<string>("");
  const [productSearch, setProductSearch] = useState<string>("");

  // Form data state
  const [formData, setFormData] = useState({
    order_id: "",
    customer_id: "",
    product_id: "",
    status: "Pending",
  });

  // RTK Query hooks
  const { data: services = [], isLoading: isServicesLoading } =
    useGetAllServicesQuery();
  const [createOrder, { isLoading: isCreatingOrder }] =
    useCreateOrderMutation();
  const { data: customers = [], isLoading: isCustomersLoading } =
    useGetAllCustomersQuery();
  const { data: products = [], isLoading: isProductsLoading } =
    useGetAllProductsQuery();

  // Calculated grand total
  const grandTotal = useMemo(
    () =>
      orderData.reduce((total, item) => total + parseFloat(item.subtotal), 0),
    [orderData],
  );

  // Handle input changes for form fields
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Filtered customer list based on search query
  const filteredCustomers = useMemo(
    () =>
      customers.filter(
        (customer) =>
          customer.name.toLowerCase().includes(customerSearch.toLowerCase()) ||
          customer.customer_id
            .toLowerCase()
            .includes(customerSearch.toLowerCase()),
      ),
    [customers, customerSearch],
  );

  // Filtered product list based on search query
  const filteredProducts = useMemo(
    () =>
      products.filter(
        (product) =>
          product.product_type
            .toLowerCase()
            .includes(productSearch.toLowerCase()) ||
          product.product_id
            .toLowerCase()
            .includes(productSearch.toLowerCase()),
      ),
    [products, productSearch],
  );

const handleAddService = () => {
  const service = services.find((s: Service) => s._id === selectedService);

  if (service) {
    // Define the price logic if price is not in the service object
    const price = service.name ? parseFloat(service.name) : 0; // Adjust to a default price if necessary

    const subtotal = quantity * price;

    const newOrderItem = {
      id: service._id,
      name: service.name,
      qty: quantity,
      each: price.toFixed(2),
      subtotal: subtotal.toFixed(2),
    };

    setOrderData((prev) => [...prev, newOrderItem]);
    setIsModalOpen(false);
    setSelectedService("");
    setQuantity(1);
  }
};


  const handleSave = async () => {
  const payload = {
    order_id: formData.order_id, 
    customer_id: formData.customer_id,
    items: orderData,
    total: grandTotal,
    grand_total: grandTotal.toFixed(2),
    status: "pending",
    qty: orderData.reduce((acc, item) => acc + item.qty, 0),
    sub_total: grandTotal.toFixed(2),
    unit_price: orderData.reduce(
      (acc, item) => acc + parseFloat(item.subtotal),
      0,
    ),
    order_date: new Date(),
    product_id: formData.product_id,
  };

  try {
    await createOrder(payload).unwrap();
    Swal.fire({
      title: "Success!",
      text: "Order has been made",
      icon: "success",
      confirmButtonText: "ok",
    }).then(() => {
      router.push("/orders");
    });
  } catch (error) {
    Swal.fire({
      title: "Error!",
      text: "Failed to create order",
      icon: "error",
    });
  }
};

  // Handle order cancellation
  const handleCancel = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will lose all newly entered data!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Cancel",
      cancelButtonText: "No, Keep Editing",
    }).then((result) => {
      if (result.isConfirmed) {
        router.push("/orders");
      }
    });
  };

  // Remove order item
  const removeOrderItem = (index: number) => {
    setOrderData((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div>
      {/* Header Section */}
      <div className="mb-12 flex items-center text-[40px] font-medium text-gray-700 dark:text-white">
        <button
          className="mr-4 h-[51px] w-[51px] rounded-full text-center dark:bg-dark-2"
          onClick={() => router.back()}
        >
          <MdKeyboardArrowLeft className="h-[51px] w-[51px] cursor-pointer rounded-full border-2 border-gray-4 bg-white hover:text-[#3584FA]" />
        </button>
        New Order
      </div>

      {/* Order Form */}
      <div className="grid grid-cols-4 gap-x-4">
        <div className="space-y-2 text-2xl font-semibold dark:text-white">
          <div className="h-[36px]">Customer Id</div>
          <div className="h-[36px]">Product Id</div>
        </div>

        <div className="col-span-2 space-y-2">
          <div className="relative">
            <input
              type="search"
              id="search"
              value={customerSearch}
              onChange={(e) => setCustomerSearch(e.target.value)}
              placeholder="Search customer by name or ID"
              className="h-[36px] w-[520px] border border-gray-300 bg-white p-2 text-gray-900"
            />
            {customerSearch &&
              !isCustomersLoading &&
              filteredCustomers.length > 0 && (
                <div className="absolute z-10 mt-1 rounded-md border border-gray-300 bg-white">
                  {filteredCustomers.map((customer) => (
                    <div
                      key={customer._id}
                      className="cursor-pointer p-2 hover:bg-gray-100"
                      onClick={() => {
                        setCustomerSearch(
                          `${customer.name} ${customer.customer_id}`,
                        );
                        setFormData((prev) => ({
                          ...prev,
                          customer_id: customer._id,
                        }));
                      }}
                    >
                      {customer.name} {customer.customer_id}
                    </div>
                  ))}
                </div>
              )}
          </div>
        

          <div className="relative">
            <input
              type="search"
              id="search"
              value={productSearch}
              onChange={(e) => setProductSearch(e.target.value)}
              placeholder="Search product by name or ID"
              className="h-[36px] w-[520px] border border-gray-300 bg-white p-2 text-gray-900"
            />
            {productSearch &&
              !isProductsLoading &&
              filteredProducts.length > 0 && (
                <div className="absolute z-10 mt-1 rounded-md border border-gray-300 bg-white">
                  {filteredProducts.map((product) => (
                    <div
                      key={product._id}
                      className="cursor-pointer p-2 hover:bg-gray-100"
                      onClick={() => {
                        setProductSearch(
                          `${product.product_type} - ${product.product_id}`,
                        );
                        setFormData((prev) => ({
                          ...prev,
                          product_id: product.product_id,
                        }));
                      }}
                    >
                      {product.product_type} - {product.product_id}
                    </div>
                  ))}
                </div>
              )}
          </div>
        </div>
      </div>

      {/* Add Service Button */}
      <div className="mb-4 mt-4">
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
        >
          <MdOutlineAddCircle className="mr-2" /> Add Service
        </button>
      </div>

      {/* Services Table */}
      <div className="relative col-span-4 mt-4">
        <div className="w-[900px] rounded-md border bg-white shadow-md">
          <table className="w-full table-auto border-separate border-spacing-y-3 p-4">
            <thead>
              <tr className="text-sm uppercase text-gray-700">
                <th className="pb-2 text-left font-semibold">ID</th>
                <th className="pb-2 text-left font-semibold">Service</th>
                <th className="pb-2 text-left font-semibold">QTY</th>
                <th className="pb-2 text-left font-semibold">Each</th>
                <th className="pb-2 text-left font-semibold">Sub Total</th>
                <th className="pb-2"></th>
              </tr>
            </thead>
            <tbody>
              {orderData.map((order, index) => (
                <tr key={index} className="text-sm text-gray-700">
                  <td className="py-2">{order.name}</td>
                  <td className="py-2">{order.qty}</td>
                  <td className="py-2">Rs.{order.each}</td>
                  <td className="py-2">Rs.{order.subtotal}</td>
                  <td className="py-2">
                    <button
                      onClick={() => removeOrderItem(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 flex justify-end">
          <div className="text-lg font-semibold">
            <span>Grand Total: </span> <span>Rs.{grandTotal}</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-10 flex justify-end space-x-6">
        <button
          onClick={handleCancel}
          className="h-[49px] w-[181px] rounded-lg border bg-red-200 text-red-600 hover:bg-red-600 hover:text-white"
        >
          Discard
        </button>
        <button
          onClick={handleSave}
          disabled={isCreatingOrder}
          className={`h-[49px] w-[181px] rounded-lg border bg-green-500 text-white ${
            isCreatingOrder ? "cursor-not-allowed" : "hover:bg-green-600"
          }`}
        >
          {isCreatingOrder ? "Creating..." : "Save Order"}
        </button>
      </div>

      {/* Modal for adding services */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-lg space-y-6 rounded-lg bg-white p-8 shadow-xl">
            {/* Title */}
            <div className="text-center">
              <h1 className="text-2xl font-extrabold text-gray-800">
                Add Service
              </h1>
            </div>

            {/* Service Selection */}
            <div>
              <label className="mb-2 block text-lg font-semibold text-gray-700">
                Service
              </label>
              <select
                onChange={(e) => setSelectedService(e.target.value)}
                className="h-12 w-full rounded-md border border-gray-300 bg-white text-gray-800 focus:ring-2 focus:ring-green-500"
              >
                <option value="">-- Select a Service --</option>
                {services.map((service) => (
                  <option key={service._id} value={service._id}>
                    {service.name} 
                  </option>
                ))}
              </select>
            </div>

            {/* Quantity and Add Button */}
            <div className="flex items-center justify-between space-x-4">
              <div className="flex-1">
                <label className="mb-2 block text-lg font-semibold text-gray-700">
                  Quantity
                </label>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="h-12 w-full rounded-md border border-gray-300 bg-white text-gray-800 focus:ring-2 focus:ring-green-500"
                  min={1}
                />
              </div>

              <div className="flex-shrink-0">
                <button
                  onClick={handleAddService}
                  className="w-full rounded-md bg-green-500 px-6 py-3 text-lg font-semibold text-white transition duration-200 hover:bg-green-600 sm:w-auto"
                >
                  Add
                </button>
              </div>
            </div>

            {/* Close Button */}
            <div className="flex justify-end">
              <button
                onClick={() => setIsModalOpen(false)}
                className="rounded-md bg-gray-200 px-6 py-3 text-gray-700 transition hover:bg-gray-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewOrder;
