"use client";
import React, {
  useState,
  useEffect,
  ChangeEvent,
  FormEvent,
  Suspense,
} from "react";
import { IoIosArrowDropleft } from "react-icons/io";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { LuArrowRightToLine } from "react-icons/lu";
import {
  useGetProductByIdQuery,
  useUpdateProductMutation,
} from "@/app/redux/features/productApiSlice";
import Swal from "sweetalert2";

const EditProductPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const productId = searchParams.get("id");

  const {
    data: product,
    isLoading,
    isError,
  } = useGetProductByIdQuery(productId || "");

  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();

  const [formData, setFormData] = useState({
    productId: productId || "",
    product_type: "",
    serial_number: "",
    model_number: "",
    problem: "",
    description: "",
  });

  useEffect(() => {
    if (product) {
      setFormData({
        productId: product._id,
        product_type: product.product_type,
        serial_number: product.serial_number,
        model_number: product.model_number,
        problem: product.problem,
        description: product.description || "",
      });
    }
  }, [product]);

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

    if (!productId) {
      Swal.fire("Error", "Invalid product ID", "error");
      return;
    }

    try {
      await updateProduct({ _id: productId, ...formData }).unwrap();
      Swal.fire("Success", "Product updated successfully", "success");
      router.push("/products");
    } catch (error) {
      Swal.fire("Error", "Failed to update product", "error");
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
        router.push("/products");
      }
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-12 flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
        <div className="flex items-center space-x-4">
          <Link href="/products" className="group">
            <IoIosArrowDropleft className="h-10 w-10 text-gray-500 transition-colors group-hover:text-blue-500" />
          </Link>
          <h1 className="text-3xl font-semibold text-gray-700 md:text-4xl">
            Edit Product
          </h1>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mx-auto max-w-4xl rounded-lg bg-white p-8 shadow-md"
      >
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="flex flex-col space-y-2">
            <label
              htmlFor="product_type"
              className="text-base font-medium capitalize text-gray-600"
            >
              Product Name
            </label>
            <input
              id="product_type"
              name="product_type"
              type="text"
              value={formData.product_type}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 px-4 py-2 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label
              htmlFor="serial_number"
              className="text-base font-medium capitalize text-gray-600"
            >
              Serial Number
            </label>
            <input
              id="serial_number"
              name="serial_number"
              type="text"
              value={formData.serial_number}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 px-4 py-2 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label
              htmlFor="model_number"
              className="text-base font-medium capitalize text-gray-600"
            >
              Model Number
            </label>
            <input
              id="model_number"
              name="model_number"
              type="text"
              value={formData.model_number}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 px-4 py-2 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label
              htmlFor="problem"
              className="text-base font-medium capitalize text-gray-600"
            >
              Problem
            </label>
            <input
              id="problem"
              name="problem"
              type="text"
              value={formData.problem}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 px-4 py-2 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="mt-6 flex flex-col space-y-2">
          <label
            htmlFor="description"
            className="text-base font-medium capitalize text-gray-600"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="h-[120px] w-full rounded-md border border-gray-300 px-4 py-2 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mt-8 flex flex-col justify-end space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
          <button
            type="button"
            onClick={handleCancel}
            className="w-full rounded-lg border border-transparent bg-red-500 px-6 py-3 font-medium text-white transition-colors duration-300 hover:bg-red-600 sm:w-auto"
          >
            Discard
          </button>
          <button
            type="submit"
            disabled={isUpdating}
            className="w-full rounded-lg border border-transparent bg-green-500 px-6 py-3 font-medium text-white transition-colors duration-300 hover:bg-green-600 sm:w-auto"
          >
            {isUpdating ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
};

const EditProduct = () => {
  return (
  <Suspense fallback={<div>Loading...</div>}><EditProductPage />
  </Suspense>);
};

export default EditProduct;
