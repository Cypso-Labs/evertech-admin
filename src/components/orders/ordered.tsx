"use client";
import { useState, useEffect } from "react";
import { FaRegEdit, FaTrashAlt } from "react-icons/fa";
import Image from "next/image";
import { CheckCircle2, Circle } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { IoIosArrowDropleft } from "react-icons/io";
import { MdKeyboardArrowLeft } from "react-icons/md";
import circle from "@/assets/image/circle.png";

interface Order {
  id: string;
  service: string;
  status: string;
  name: string;
  price: string;
}

interface OrderItem {
  id: number;
  name: string;
  qty: string;
  each: string;
  subtotal: string;
}

const Orderd = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [formData, setFormData] = useState<Order>({
    id: "",
    service: "",
    status: "",
    name: "",
    price: "",
  });

  useEffect(() => {
    if (searchParams) {
      setFormData({
        id: searchParams.get("id") || "",
        service: searchParams.get("service") || "",
        status: searchParams.get("status") || "",
        name: searchParams.get("name") || "",
        price: searchParams.get("price") || "",
      });
    }
  }, [searchParams]);

  const [orderData] = useState<OrderItem[]>([
    {
      id: 1,
      name: "Lorem Ipsum",
      qty: "5",
      each: "$0.99",
      subtotal: "$4.95",
    },
    {
      id: 2,
      name: "Lorem Ipsum",
      qty: "5",
      each: "$0.99",
      subtotal: "$4.95",
    },
    {
      id: 3,
      name: "Lorem Ipsum",
      qty: "5",
      each: "$0.99",
      subtotal: "$4.95",
    },
  ]);

  const [activeStep, setActiveStep] = useState<number>(0);

  const handleStepClick = (index: number) => {
    setActiveStep(index);
  };

  const handleClick = (order: Order) => {
    const queryParams = new URLSearchParams({
      id: order.id,
      service: order.service,
      status: order.status,
      name: order.name,
      price: order.price,
    }).toString();

    router.push(`orderedit?${queryParams}`);
  };

  interface StepIconProps {
    status: "completed" | "pending";
    onClick: () => void;
  }

  const StepIcon: React.FC<StepIconProps> = ({ status, onClick }) => {
    return (
      <div onClick={onClick} className="cursor-pointer">
        {status === "completed" ? (
          <CheckCircle2 className="h-6 w-6 text-green-500" />
        ) : (
          <Circle className="h-6 w-6 text-gray-300" />
        )}
      </div>
    );
  };

  return (
    <div>
      <div className="mb-12 flex items-center justify-between text-[40px] font-medium text-gray-700 dark:text-white">
        <div className="flex items-center">
          <button
            className="mr-4 h-[51px] w-[51px] rounded-full text-center dark:bg-dark-2"
            onClick={() => router.back()}
          >
            <MdKeyboardArrowLeft className=" cursor-pointer hover:text-[#3584FA] bg-white rounded-full h-[51px] w-[51px] border-2 border-gray-4" />
          </button>
          Order {formData.id || "0001"}
        </div>
        <button
          onClick={() => handleClick(formData)}
          className="flex rounded-md border-2 border-[#000000] bg-[#CBD5E1] hover:bg-[#000000] hover:text-[#CBD5E1] hover:border-[#CBD5E1] p-2 text-xl text-[#000000] dark:border-dark-3 dark:bg-dark-2 dark:text-white"
        >
          Edit Order <FaRegEdit className="ml-3" />
        </button>
      </div>

      {/* Order Details and Order Tracking */}
      <div className="grid grid-cols-2 gap-4">
        <div className="h-[310px] w-[520px] space-y-3 rounded-xl bg-white p-4 shadow-xl dark:bg-dark-3 dark:text-white">
          <div className="text-2xl font-semibold">Order Details</div>
          <div className="ml-6 mr-10 mt-5 flex justify-between">
            <span>Order ID:</span>
            <span className="flex-1 text-center">{formData.id}</span>
          </div>
          <div className="ml-6 mr-10 mt-5 flex justify-between">
            <span>Customer Name:</span>
            <span className="flex-1 text-center">{formData.name}</span>
          </div>
          <div className="ml-6 mr-10 mt-5 flex justify-between">
            <span>Contact Number:</span>
            <span className="flex-1 text-center"></span>
          </div>
          <div className="ml-6 mr-10 mt-5 flex justify-between">
            <span>Order Date:</span>
            <span className="flex-1 text-center"></span>
          </div>
          <div className="ml-6 mr-10 mt-5 flex justify-between">
            <span>Grand Total:</span>
            <span className="flex-1 text-center">
              {}
            </span>
          </div>
          <div className="ml-6 mr-10 mt-5 flex justify-between">
            <span>Status:</span>
            <span className="flex-1 text-center">
              {formData.status || "Pending"}
            </span>
          </div>
        </div>

        <div className="h-[310px] w-[520px] rounded-xl bg-white shadow-xl">
          <div className="p-6 text-2xl font-semibold dark:bg-dark-3 dark:text-white">
            Order Tracking
          </div>

          {[
            "Order Placed",
            "Started Processing",
            "Finished Processing",
            "Handed Over Order",
          ].map((step, index) => (
            <div key={index} className="relative mb-6 px-8">
              {index !== 3 && (
                <div
                  className={`absolute right-3 top-6 mx-8 h-10 w-0.5 ${
                    activeStep > index ? "bg-green-500" : "bg-gray-200"
                  }`}
                />
              )}
              <div className="flex items-start justify-between">
                <div className="flex-grow px-8">
                  <h3 className="text-sm font-medium text-gray-600 dark:text-gray-300">
                    {step} 20 Aug 2024
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    01:55:59 PM
                  </p>
                </div>
                <div className="relative z-10 ml-4">
                  <StepIcon
                    status={activeStep > index ? "completed" : "pending"}
                    onClick={() => handleStepClick(index + 1)}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Order Items Table */}
      <div className="relative col-span-4 mt-4 flex gap-20">
        <div className="w-[900px] rounded-2xl border bg-white shadow-md dark:bg-dark-2">
        <div className="text-[20px] font-medium p-4 h-[30px] text-[#475569]">Services</div>
          <table className="w-full table-auto border-separate border-spacing-y-3 p-4">
           
            <thead>
              <tr className="text-sm uppercase text-gray-700 dark:text-white">
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
                <tr key={index} className="dark:text-white">
                  <td className="border-b border-l border-t border-gray-300 p-2">{order.id}</td>
                  <td className="border-b border-t border-gray-300 p-2">{order.name}</td>
                  <td className="border-b border-t border-gray-300 p-2">{order.qty}</td>
                  <td className="border-b border-t border-gray-300 p-2">{order.each}</td>
                  <td className="border-b border-t border-gray-300 p-2">{order.subtotal}</td>
                  <td className="border-b border-r border-t border-gray-300 p-2 text-center">
                    <button className="text-red-500 hover:text-red-700">
                      <FaTrashAlt size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Order Status */}
        <div className=" w-[250px] rounded-2xl bg-white p-6 shadow-xl dark:bg-dark-3 dark:text-white">
          <div className="text-2xl font-semibold">Order Status</div>
          <div className="mt-4">Payment Status</div>
          <button className="mt-4 h-[48px] w-[190px] rounded-lg border-2 border-[#FF2323] bg-[#FFCDCD] p-4 font-medium text-[#F70D1A]">
            UnPaid
          </button>
          <div className="mt-6">Order Status</div>
          <button className="mt-5 flex h-[48px] w-[190px] items-center justify-center border-2 border-[#FFFFFF] bg-[#000000] px-4 text-[#FFFFFF]">
            <span>Processing</span>
            <Image
              className="ml-2"
              src={circle}
              alt="circle"
              width={12}
              height={12}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Orderd;
