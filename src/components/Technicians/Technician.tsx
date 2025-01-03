"use client";

import { useState, useEffect } from "react";
import {
  useGetAllOrdersQuery,
  useUpdateOrderMutation,
} from "@/app/redux/features/orderApiSlice";
import { useGetAllCustomersQuery } from "@/app/redux/features/customerApiSlice";
import { useGetAllProductsQuery } from "@/app/redux/features/productApiSlice";
import { selectEmployee } from "@/app/redux/features/authSlice";
import { Order } from "@/types";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import {
  Loader2,
  CheckCircle,
  XCircle,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Technician = () => {
  const { data: allorders = [], isLoading: isOrdersLoading } =
    useGetAllOrdersQuery();
  const { data: customers = [], isLoading: isCustomersLoading } =
    useGetAllCustomersQuery();
  const { data: products = [], isLoading: isProductsLoading } =
    useGetAllProductsQuery();
  const employee = useSelector(selectEmployee);
  const name = employee ? employee.name : "";

  const [orders, setOrders] = useState<Order[]>([]);
  const [tempCode, setTempCode] = useState<{ [key: string]: string }>({});
  const [activeTab, setActiveTab] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 10;

  useEffect(() => {
    if (allorders.length > 0) {
      setOrders(allorders);
    }
  }, [allorders]);

  const getCustomerName = (customerId: string) => {
    const customer = customers.find(
      (customer) => customer.customer_id === customerId,
    );
    return customer ? customer.name : "N/A";
  };

  const getProductName = (productId: string) => {
    const product = products.find(
      (product) => product.product_id === productId,
    );
    return product ? product.product_type : "N/A";
  };

  const [updateOrder] = useUpdateOrderMutation();

  const handleCodeChange = (id: string, value: string) => {
    setTempCode((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSaveCode = async (id: string, name: string) => {
    const codeToSave = tempCode[id];
    if (!codeToSave) return;

    try {
      await updateOrder({
        id: id,
        technicianCode: codeToSave,
        employee_id: name,
      }).unwrap();

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === id ? { ...order, technicianCode: codeToSave } : order,
        ),
      );

      setTempCode((prev) => {
        const newTemp = { ...prev };
        delete newTemp[id];
        return newTemp;
      });
    } catch (error) {
      console.error("Failed to update order:", error);
    }
  };

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      await updateOrder({
        id: id,
        status: newStatus,
      }).unwrap();

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === id ? { ...order, status: newStatus } : order,
        ),
      );
    } catch (error) {
      console.error("Failed to update order status:", error);
    }
  };

  const filteredOrders = orders.filter((order) => {
    if (activeTab === "all") return true;
    if (activeTab === "pending") return order.status === "Pending";
    if (activeTab === "inProgress") return order.status === "In-progress";
    if (activeTab === "completed") return order.status === "Completed";
    return true;
  });

  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(
    indexOfFirstOrder,
    indexOfLastOrder,
  );

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const LoadingSpinner = () => (
    <div className="flex h-64 items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
    </div>
  );

  if (isOrdersLoading || isCustomersLoading || isProductsLoading) {
    return <LoadingSpinner />;
  }

  return (
    <Card className="">
      <CardHeader>
        <CardTitle className="text-black-700 mb-4 text-left text-4xl font-bold dark:text-white">
          Technician
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-6 flex items-center justify-between"></div>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList className="grid w-full grid-cols-4 gap-4 ">
            <TabsTrigger value="all" className="text-lg">
              All Orders
            </TabsTrigger>
            <TabsTrigger value="pending" className="text-lg">
              Pending
            </TabsTrigger>
            <TabsTrigger value="inProgress" className="text-lg">
              In Progress
            </TabsTrigger>
            <TabsTrigger value="completed" className="text-lg">
              Completed
            </TabsTrigger>
          </TabsList>
        </Tabs>
        <div className="rounded-lg bg-white p-6 shadow-inner">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-lg font-semibold text-indigo-700">
                  Customer
                </TableHead>
                <TableHead className="text-lg font-semibold text-indigo-700">
                  Product
                </TableHead>
                <TableHead className="text-lg font-semibold text-indigo-700">
                  Status
                </TableHead>
                <TableHead className="text-lg font-semibold text-indigo-700">
                  Code
                </TableHead>
                <TableHead className="text-lg font-semibold text-indigo-700">
                  Actions
                </TableHead>
                <TableHead className="text-lg font-semibold text-indigo-700">
                  Employee
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <AnimatePresence>
                {currentOrders.map((order) => (
                  <motion.tr
                    key={order._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <TableCell className="text-md">
                      {getCustomerName(order.customer_id)}
                    </TableCell>
                    <TableCell className="text-md">
                      {getProductName(order.product_id)}
                    </TableCell>
                    <TableCell>
                      <span
                        className={`rounded-full px-3 py-1 text-sm font-semibold
                        ${
                          order.status === "Pending"
                            ? "bg-yellow-200 text-yellow-800"
                            : order.status === "In-progress"
                              ? "bg-blue-200 text-blue-800"
                              : "bg-green-200 text-green-800"
                        }`}
                      >
                        {order.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      {order.status === "Pending" ||
                      (order.status === "In-progress" &&
                        (!order.technicianCode ||
                          order.technicianCode.trim() === "")) ? (
                        <div className="flex items-center gap-2">
                          <Input
                            type="text"
                            value={tempCode[order._id] || ""}
                            onChange={(e) =>
                              handleCodeChange(order._id, e.target.value)
                            }
                            className="w-28"
                            placeholder="Enter Code"
                          />
                          <Button
                            onClick={() => {
                              handleSaveCode(order._id, name);
                              updateStatus(order._id, "In-progress");
                            }}
                            disabled={!tempCode[order._id]}
                            size="sm"
                            className="bg-indigo-800 text-white hover:bg-indigo-600"
                          >
                            Save
                          </Button>
                        </div>
                      ) : (
                        <span className="text-md font-medium">
                          {order.technicianCode || "No Code Assigned"}
                        </span>
                      )}
                    </TableCell>
                    <TableCell>
                      {order.status === "Pending" && (
                        <Button
                          className={`h-9 w-20 transform transition-all duration-300 ease-in-out hover:scale-105 ${
                            !order.technicianCode
                              ? "cursor-not-allowed bg-gray-300 text-gray-600"
                              : "bg-indigo-500 text-white hover:bg-indigo-600"
                          }`}
                          disabled={
                            !order.technicianCode ||
                            order.technicianCode.trim() === ""
                          }
                          size="sm"
                        >
                          Start
                        </Button>
                      )}
                      {order.status === "In-progress" && (
                        <Button
                          onClick={() => updateStatus(order._id, "Completed")}
                          className="h-9 w-20 transform bg-green-500 text-white transition-all duration-300 ease-in-out hover:scale-105 hover:bg-green-600 "
                          size="sm"
                        >
                          Complete
                        </Button>
                      )}
                      {order.status === "Completed" && (
                        <span className="flex items-center font-bold text-green-500">
                          <CheckCircle className="mr-1 h-5 w-5" />
                          Completed
                        </span>
                      )}
                    </TableCell>
                    <TableCell className="text-md">
                      {order.employee_id || "N/A"}
                    </TableCell>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </TableBody>
          </Table>
        </div>
        <div className="mt-6 flex items-center justify-between">
          <Button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="flex items-center gap-2  bg-slate-950 text-white hover:bg-slate-800"
          >
            <ChevronLeft className="bg- h-4 w-4" /> Previous
          </Button>
          <div className="flex items-center gap-2 ">
            {[...Array(totalPages)].map((_, index) => (
              <Button
                key={index}
                onClick={() => paginate(index + 1)}
                variant={currentPage === index + 1 ? "default" : "outline"}
                className={`h-10 w-10 ${currentPage === index + 1 ? " bg-slate-950 text-white hover:bg-slate-800" : ""}`}
              >
                {index + 1}
              </Button>
            ))}
          </div>
          <Button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="flex items-center gap-2 bg-slate-950 text-white hover:bg-slate-800 "
          >
            Next <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
      <CardFooter className="mt-6 flex justify-center">
        <div className="grid grid-cols-4 gap-4 text-center">
          <div className="rounded-lg bg-white p-4 shadow-md">
            <p className="text-2xl font-bold text-indigo-600">
              {orders.length}
            </p>
            <p className="text-sm text-gray-600">Total Orders</p>
          </div>
          <div className="rounded-lg bg-white p-4 shadow-md">
            <p className="text-2xl font-bold text-yellow-600">
              {orders.filter((o) => o.status === "Pending").length}
            </p>
            <p className="text-sm text-gray-600">Pending</p>
          </div>
          <div className="rounded-lg bg-white p-4 shadow-md">
            <p className="text-2xl font-bold text-blue-600">
              {orders.filter((o) => o.status === "In-progress").length}
            </p>
            <p className="text-sm text-gray-600">In-progress</p>
          </div>
          <div className="rounded-lg bg-white p-4 shadow-md">
            <p className="text-2xl font-bold text-green-600">
              {orders.filter((o) => o.status === "Completed").length}
            </p>
            <p className="text-sm text-gray-600">Completed</p>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default Technician;
