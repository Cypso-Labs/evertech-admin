"use client";
import React, { useState, useEffect, FormEvent } from "react";
import { IoIosArrowDropleft } from "react-icons/io";
import Link from "next/link";
import Image from "next/image";
import cash from "../../assets/Payment/cash.png";
import visa from "../../assets/Payment/visa.png";
import master from "../../assets/Payment/Mastercard.png";
import Swal from 'sweetalert2';
import { useSearchParams, useRouter } from "next/navigation";

interface Service {
  name: string;
  quantity: string;
  price: string;
}

interface PaymentFormData {
  id: string;
  orderId: string;
  customerName: string;
  contactNumber: string;
  orderDate: string;
  amount: string;
  status: string;
}

export default function PaymentOrder() {
  const [selectedPayment, setSelectedPayment] = useState<"cash" | "visa" | "mastercard">("cash");
  const router = useRouter();
  const searchParams = useSearchParams();

  const services: Service[] = [
    { name: "Lorem Ipsum", quantity: "Dolor Sit", price: "Dolor Sit" },
    { name: "Lorem Ipsum", quantity: "Dolor Sit", price: "Dolor Sit" },
    { name: "Lorem Ipsum", quantity: "Dolor Sit", price: "Dolor Sit" },
    { name: "Lorem Ipsum", quantity: "Dolor Sit", price: "Dolor Sit" },
    { name: "Lorem Ipsum", quantity: "Dolor Sit", price: "Dolor Sit" },
  ];

  const [formData, setFormData] = useState<PaymentFormData>({
    id: "",
    orderId: "",
    customerName: "",
    contactNumber: "",
    orderDate: "",
    amount: "",
    status: ""
  });

  useEffect(() => {
    if (searchParams) {
      setFormData({
        id: searchParams.get("id") || "",
        orderId: searchParams.get("orderId") || "",
        customerName: searchParams.get("customerName") || "",
        contactNumber: searchParams.get("contactNumber") || "",
        orderDate: searchParams.get("orderDate") || "",
        amount: searchParams.get("amount") || "",
        status: searchParams.get("status") || ""
      });
    }
  }, [searchParams]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePaymentSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    try {
      // API call would go here
      await Swal.fire({
        title: 'Success!',
        text: 'Payment processed successfully',
        icon: 'success',
        confirmButtonText: 'OK',
        confirmButtonColor: '#08762D',
        customClass: {
          popup: 'dark:bg-[#122031] dark:text-white',
          confirmButton: 'bg-[#BCFFC8] text-[#BCFFC8] hover:bg-[#08762D] hover:text-[#BCFFC8]'
        }
      });

      router.push('/payments');
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: 'Payment processing failed',
        icon: 'error',
        confirmButtonText: 'OK',
        confirmButtonColor: '#FF2323',
        customClass: {
          popup: 'dark:bg-[#122031] dark:text-white'
        }
      });
    }
  };

  const PaymentOption = ({ type, image, label }: { type: "cash" | "visa" | "mastercard"; image: any; label: string }) => (
    <div className="mt-6 grid">
      <label
        className={`relative flex h-[110px] w-full cursor-pointer flex-col items-center rounded-lg border-2 p-3 transition-colors ${
          selectedPayment === type ? "border-blue-500" : "border-gray-200"
        }`}
      >
        <input
          type="radio"
          name="payment"
          value={type}
          className="absolute left-2 top-1/2 h-3 w-3 -translate-y-1/2 transform"
          checked={selectedPayment === type}
          onChange={() => setSelectedPayment(type)}
        />
        <div className="mb-1 flex h-[60px] w-[60px] items-center justify-center">
          <Image
            src={image}
            alt={label}
            width={60}
            height={60}
            className={`${type === 'visa' ? 'h-[40px]' : 'h-[50px]'} w-[50px] rounded-lg`}
          />
        </div>
        <span className="text-center text-xs font-semibold text-black">
          {label}
        </span>
      </label>
    </div>
  );





  return (
    <div className="container mx-auto p-4">
      <div className="mb-15 flex items-center gap-2">
        <h1
          className="font-inter flex text-4xl font-medium text-slate-600 dark:text-white"
          style={{ font: "Inter" }}
        >
          <Link href="/payments" className="inline-block">
            <IoIosArrowDropleft className="mr-2 h-10 w-10 cursor-pointer hover:text-[#3584FA]" />
          </Link>
          Payment Order {formData.id}
        </h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2 ">
        {/*left 1*/}
        <div className="space-y-6">
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-md">
            <h2
              className="mb-5 text-xl font-semibold text-slate-600 "
              style={{ font: "Inter" }}
            >
              Order Details
            </h2>
            <div className="ml-20 space-y-2 p-4">
              <div className="flex items-center  space-x-50 ">
                <span
                  className=" text-[16px] font-medium text-gray-500"
                  style={{ font: "Inter" }}
                >
                  Order ID
                </span>
                <input
                  type="text"
                  value={formData.id}
                  className="bg-transparent text-[16px] font-normal  text-gray-500 focus:outline-none  "
                  style={{ font: "Inter" }}
                />
              </div>

              <div className="flex items-center  space-x-[146px]">
                <span
                  className=" text-[16px] font-medium text-gray-500"
                  style={{ font: "Inter" }}
                >
                  Customer Name
                </span>
                <input
                  type="text"
                  value={formData.customerName}
                  className="bg-transparent text-[16px] font-normal  text-gray-500 focus:outline-none"
                  style={{ font: "Inter" }}
                />
              </div>

              <div className="flex items-center  space-x-[200px]">
                <span
                  className=" text-[16px] font-medium text-gray-500"
                  style={{ font: "Inter" }}
                >
                  Order ID
                </span>
                <input
                  type="text"
                  value={formData.orderId}
                  className="bg-transparent text-[16px] font-normal  text-gray-500 focus:outline-none  "
                  style={{ font: "Inter" }}
                />
              </div>

              <div className="flex items-center  space-x-[142px]">
                <span
                  className=" text-[16px] font-medium text-gray-500"
                  style={{ font: "Inter" }}
                >
                  Contact Number
                </span>
                <input
                  type="text"
                  value={formData.contactNumber}
                  className="bg-transparent text-[16px] font-normal  text-gray-500 focus:outline-none"
                  style={{ font: "Inter" }}
                />
              </div>

              <div className="flex items-center  space-x-[182px]">
                <span
                  className=" text-[16px] font-medium text-gray-500"
                  style={{ font: "Inter" }}
                >
                  Order Date
                </span>
                <input
                  type="text"
                  value={formData.orderDate}
                  className="bg-transparent text-[16px] font-normal  text-gray-500 focus:outline-none"
                  style={{ font: "Inter" }}
                />
              </div>

              <div className="flex items-center  space-x-[178px]">
                <span
                  className=" text-[16px] font-medium text-gray-500"
                  style={{ font: "Inter" }}
                >
                  Grand Total
                </span>
                <input
                  type="text"
                  value={formData.amount}
                  className="bg-transparent text-[16px] font-bold  text-gray-500 focus:outline-none"
                  style={{ font: "Inter" }}
                />
              </div>
            </div>
          </div>
          {/*left 2*/}
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h2
              className="mb-5 text-xl font-semibold text-slate-600  "
              style={{ font: "Inter" }}
            >
              Services
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-t border-slate-400 text-left">
                    <th
                      className="px-4 py-3 text-center text-[16px] font-normal text-slate-600"
                      style={{ font: "Inter" }}
                    >
                      Name
                    </th>
                    <th
                      className="px-4 py-3 text-center text-[16px] font-normal text-slate-600"
                      style={{ font: "Inter" }}
                    >
                      Quantity
                    </th>
                    <th
                      className="px-4 py-3 text-center text-[16px] font-normal text-slate-600"
                      style={{ font: "Inter" }}
                    >
                      Price
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {services.map((service, index) => (
                    <tr
                      key={index}
                      className="  text-center hover:bg-gray-100 "
                      style={{ font: "Inter" }}
                    >
                      <td className="px-2 py-2 text-[13px] font-normal text-slate-500">
                        {service.name}
                      </td>
                      <td className="px-2 py-2 text-[13px] font-normal text-slate-500">
                        {service.quantity}
                      </td>
                      <td className="px-2 py-2 text-[13px] font-normal text-slate-500">
                        {service.price}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/*payment*/}
        <form onSubmit={handlePaymentSubmit}>
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm ">
          <h2 className="mb-1 text-xl font-semibold ">Payment Details</h2>
          <div className="space-y-4 p-5">
            <div className="flex items-center gap-4 space-x-20  space-y-4">
              <label
                htmlFor="charges"
                className=" block text-[16px] font-medium text-slate-500"
              >
                Charges
              </label>
              <input
                type="text"
                id="charges"
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div className="flex items-center gap-4 space-x-2 space-y-4">
              <label
                htmlFor="discount"
                className="mb-1 block text-[16px] font-medium text-slate-500"
              >
                Discount/Surcharge
              </label>
              <input
                type="text"
                id="discount"
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div className="flex items-center gap-4 space-x-8 space-y-4">
              <label
                htmlFor="description"
                className="mb-1 block text-[16px] font-medium text-slate-500"
              >
                Description (Optional)
              </label>
              <textarea
                id="description"
                rows={3}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              ></textarea>
            </div>

            {/* selection */}
            <div className="mt-8 grid grid-cols-3 gap-4">
              {/* Cash */}
              <div className="mt-6 grid">
                <label
                  className={`relative flex h-[110px] w-full cursor-pointer flex-col items-center rounded-lg border-2 p-3 transition-colors ${
                    selectedPayment === "cash"
                      ? "border-blue-500"
                      : "border-gray-200"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="cash"
                    className="absolute left-2 top-1/2 h-3 w-3 -translate-y-1/2 transform"
                    checked={selectedPayment === "cash"}
                    onChange={() => setSelectedPayment("cash")}
                  />
                  <div className="mb-1 flex h-[60px] w-[60px] items-center justify-center object-cover">
                    <Image
                      src={cash}
                      alt="Cash"
                      width={60}
                      height={60}
                      className="h-[50px] w-[50px] rounded-lg"
                    />
                  </div>
                  <span className="text-center text-xs font-semibold text-black">
                    CASH
                  </span>
                </label>
              </div>

              {/* Visa */}
              <div className="mt-6 grid">
                <label
                  className={`relative flex h-[110px] w-full cursor-pointer flex-col items-center rounded-lg border-2 p-3 transition-colors ${
                    selectedPayment === "visa"
                      ? "border-blue-500"
                      : "border-gray-200"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="visa"
                    className="absolute left-2 top-1/2 h-3 w-3 -translate-y-1/2 transform"
                    checked={selectedPayment === "visa"}
                    onChange={() => setSelectedPayment("visa")}
                  />
                  <div className="mb-1 flex h-[60px] w-[60px] items-center justify-center object-cover">
                    <Image
                      src={visa}
                      alt="Visa"
                      width={60}
                      height={60}
                      className="h-[40px] w-[50px] rounded-lg"
                    />
                  </div>
                  <span className="text-center text-xs font-semibold text-black">
                    VISA
                  </span>
                </label>
              </div>

              {/* Mastercard */}
              <div className="mt-6 grid">
                <label
                  className={`relative flex h-[110px] w-full cursor-pointer flex-col items-center rounded-lg border-2 p-3 transition-colors ${
                    selectedPayment === "mastercard"
                      ? "border-blue-500"
                      : "border-gray-200"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="mastercard"
                    className="absolute left-2 top-1/2 h-3 w-3 -translate-y-1/2 transform"
                    checked={selectedPayment === "mastercard"}
                    onChange={() => setSelectedPayment("mastercard")}
                  />
                  <div className="mb-1 flex h-[60px] w-[60px] items-center justify-center object-cover">
                    <Image
                      src={master}
                      alt="Mastercard"
                      width={60}
                      height={60}
                      className="h-[50px] w-[50px] rounded-lg"
                    />
                  </div>
                  <span className="text-center text-xs font-semibold text-black">
                    MASTERCARD
                  </span>
                </label>
              </div>
            </div>

            <div className="flex justify-between pt-4  ">
              <span
                className="text-[23px] font-semibold text-gray-500"
                style={{ font: "Inter" }}
              >
                Total Price
              </span>
              <span className="text-[20px] font-bold" style={{ font: "Inter" }}>
                $99.99
              </span>
            </div>
            <div className="">
              <button
                className="mt-10  w-full rounded-md bg-blue-600 px-4 py-2 text-[19px] text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                style={{ font: "Inter" }}
                type="submit"
              >
                Proceed Payment
              </button>
            </div>
          </div>
        </div>
        </form>
      </div>
    </div>
  );
}
