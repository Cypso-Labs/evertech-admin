"use client";

import React , {Suspense} from "react";
import { IoIosArrowDropleft } from "react-icons/io";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useGetPaymentByIdQuery } from "@/app/redux/features/paymentApiSlice";
import { useGetAllCustomersQuery } from "@/app/redux/features/customerApiSlice";

const PaymentOrderPage: React.FC = () => {
  const searchParams = useSearchParams();
  const paymentId = searchParams.get("id");

  const {
    data: payment,
    isLoading: isPaymentLoading,
    isError: isPaymentError,
    error: paymentError,
  } = useGetPaymentByIdQuery(paymentId || "");

  const {
    data: customers,
    isLoading: isCustomersLoading,
    isError: isCustomersError,
  } = useGetAllCustomersQuery();

  if (isPaymentLoading || isCustomersLoading) {
    return <div>Loading...</div>;
  }

  if (isPaymentError || !payment) {
    return (
      <div className="text-center text-red-500">
        Error:{" "}
        {paymentError instanceof Error
          ? paymentError.message
          : "Failed to load payment details"}
      </div>
    );
  }

  if (isCustomersError || !customers) {
    return (
      <div className="text-center text-red-500">
        Error: Failed to load customer details
      </div>
    );
  }

  const getCustomerName = (customerId: string) => {
    const customer = customers.find(
      (customer) => customer.customer_id === customerId,
    );
    return customer ? customer.name : "N/A";
  };

  return (
    <div className="container mx-auto p-4">
      <div className="mb-6 flex items-center justify-between gap-2">
        <h1 className="flex items-center text-4xl font-medium text-slate-600 dark:text-white">
          <Link href="/payments" className="inline-block">
            <IoIosArrowDropleft className="mr-2 h-10 w-10 cursor-pointer hover:text-[#3584FA]" />
          </Link>
          Payment Details
        </h1>
        <Link
          href={`/payments/PaymentOrder/editPayment?id=${paymentId}`}
          className="rounded-md border-2 border-black bg-[#63676e] p-2 text-xl text-white hover:bg-[#63676e] hover:text-[#E0EDFF] dark:border-dark-3 dark:bg-dark-2 dark:text-white"
        >
          Edit Payment
        </Link>
      </div>

      <div className="mx-auto grid max-w-4xl grid-cols-2 gap-4 rounded-lg bg-white p-8 shadow-md">
        <div className="space-y-6 font-semibold">
          <div>Order ID</div>
          <div>Payment ID</div>
          <div>Customer ID</div>
          <div>Customer Name</div>
          <div>Product ID</div>
          <div>Payment Method</div>
          <div>Amount</div>
          <div>Payment Date</div>
        </div>
        <div className="space-y-6">
          <div>{payment.order_id}</div>
          <div>{payment.payment_id}</div>
          <div>{payment.customer_id}</div>
          <div>{getCustomerName(payment.customer_id)}</div>
          <div>{payment.product_id}</div>
          <div>{payment.payment_method}</div>
          <div>Rs.{payment.amount}.00</div>
          <div>{new Date(payment.payment_date).toLocaleDateString()}</div>
        </div>
      </div>
    </div>
  );
};

const PaymentOrder = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PaymentOrderPage />
    </Suspense>
  );
};

export default PaymentOrder;
