"use client"

import { useState, useEffect } from "react"
import { useGetAllOrdersQuery, useUpdateOrderMutation } from "@/app/redux/features/orderApiSlice"
import { useGetAllCustomersQuery } from "@/app/redux/features/customerApiSlice"
import { useGetAllProductsQuery } from "@/app/redux/features/productApiSlice"
import type { Order } from "@/types"
import { motion, AnimatePresence } from "framer-motion"
import { Loader2, ChevronLeft, ChevronRight } from "lucide-react"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useGetAllEmployeesQuery } from "@/app/redux/features/employeeApiSlice"

const Technician = () => {
  const { data: allorders = [], isLoading: isOrdersLoading } = useGetAllOrdersQuery()
  const { data: customers = [], isLoading: isCustomersLoading } = useGetAllCustomersQuery()
  const { data: products = [], isLoading: isProductsLoading } = useGetAllProductsQuery()
  const { data: employee = [], isLoading: isemployeeLoading } = useGetAllEmployeesQuery()

  const [orders, setOrders] = useState<Order[]>([])
  const [tempCode, setTempCode] = useState<{ [key: string]: string }>({})
  const [activeTab, setActiveTab] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [employeeSearch, setEmployeeSearch] = useState("") // Employee search state
  const ordersPerPage = 10

  useEffect(() => {
    if (allorders.length > 0) {
      setOrders(allorders)
    }
  }, [allorders])

  const getCustomerName = (customerId: string) => {
    const customer = customers.find((customer) => customer.customer_id === customerId)
    return customer ? customer.name : "N/A"
  }

  const getProductName = (productId: string) => {
    const product = products.find((product) => product.product_id === productId)
    return product ? product.product_type : "N/A"
  }

  const [updateOrder] = useUpdateOrderMutation()

  const handleCodeChange = (id: string, value: string) => {
    setTempCode((prev) => ({
      ...prev,
      [id]: value,
    }))
  }

  const handleSaveCode = async (id: string, name: string) => {
    const codeToSave = tempCode[id]
    if (!codeToSave) return

    try {
      await updateOrder({
        id: id,
        technicianCode: codeToSave,
        employee_id: name,
      }).unwrap()

      setOrders((prevOrders) =>
        prevOrders.map((order) => (order._id === id ? { ...order, technicianCode: codeToSave } : order)),
      )

      setTempCode((prev) => {
        const newTemp = { ...prev }
        delete newTemp[id]
        return newTemp
      })
    } catch (error) {
      console.error("Failed to update order:", error)
    }
  }

  // Updated status change function
  const updateStatus = async (id: string, newStatus: string) => {
    try {
      await updateOrder({
        id: id,
        status: newStatus,
      }).unwrap()

      setOrders((prevOrders) => prevOrders.map((order) => (order._id === id ? { ...order, status: newStatus } : order)))
    } catch (error) {
      console.error("Failed to update order status:", error)
    }
  }

  const filteredOrders = orders
    .filter((order) => {
      if (activeTab === "all") return true
      if (activeTab === "received") return order.status === "received"
      if (activeTab === "in-progress") return order.status === "in-progress"
      if (activeTab === "quality-check") return order.status === "quality-check"
      if (activeTab === "ready") return order.status === "ready"
      if (activeTab === "completed") return order.status === "completed"
      return true
    })
    .filter((order) => {
      if (employeeSearch === "") return true
      return order.employee_id?.toLowerCase().includes(employeeSearch.toLowerCase())
    })

  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage)
  const indexOfLastOrder = currentPage * ordersPerPage
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder)

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  const LoadingSpinner = () => (
    <div className="flex h-64 items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
    </div>
  )

  if (isOrdersLoading || isCustomersLoading || isProductsLoading) {
    return <LoadingSpinner />
  }

  return (
    <Card className="">
      <CardHeader>
        <CardTitle className="text-black-700 mb-4 text-left text-4xl font-bold dark:text-white">Technician</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <div className="flex items-center gap-4">
            <div className="w-full">
              <Input
                type="text"
                placeholder="Search by employee..."
                value={employeeSearch}
                onChange={(e) => setEmployeeSearch(e.target.value)}
                className="w-full"
              />
            </div>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList className="grid w-full grid-cols-6 gap-4 ">
            <TabsTrigger value="all" className="text-lg">
              All Orders
            </TabsTrigger>
            <TabsTrigger value="received" className="text-lg">
              Received
            </TabsTrigger>
            <TabsTrigger value="in-progress" className="text-lg">
              In Progress
            </TabsTrigger>
            <TabsTrigger value="quality-check" className="text-lg">
              Quality Check
            </TabsTrigger>
            <TabsTrigger value="ready" className="text-lg">
              Ready
            </TabsTrigger>
            <TabsTrigger value="completed" className="text-lg">
              Completed
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="rounded-lg bg-white p-6 shadow-inner  dark:border-dark-3 dark:bg-dark-2 dark:text-white">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-lg font-semibold text-indigo-700">Customer</TableHead>
                <TableHead className="text-lg font-semibold text-indigo-700">Product</TableHead>
                <TableHead className="text-lg font-semibold text-indigo-700">Status</TableHead>
                <TableHead className="text-lg font-semibold text-indigo-700">Actions</TableHead>
                <TableHead className="text-lg font-semibold text-indigo-700">Employee</TableHead>
                <TableHead className="text-lg font-semibold text-indigo-700">Code</TableHead>
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
                    <TableCell className="text-md">{getCustomerName(order.customer_id)}</TableCell>
                    <TableCell className="text-md">{getProductName(order.product_id)}</TableCell>
                    <TableCell>
                      <span
                        className={`rounded-full px-3 py-1 text-sm font-semibold
                        ${
                          order.status === "Pending"
                            ? "bg-yellow-200 text-yellow-800"
                            : order.status === "In-progress"
                              ? "bg-blue-200 text-blue-800"
                              : order.status === "Quality-check"
                                ? "bg-purple-200 text-purple-800"
                                : order.status === "Ready"
                                  ? "bg-green-200 text-green-800"
                                  : "bg-green-200 text-green-800"
                        }`}
                      >
                        {order.status}
                      </span>
                    </TableCell>
                   
                    <TableCell>
                      {/* Button to change status */}
                      <div className="flex gap-2">
                        {order.status !== "received" && (
                          <Button
                            onClick={() => updateStatus(order._id, "received")}
                            className="bg-slate-950 text-white hover:bg-slate-800"
                            size="sm"
                          >
                            Received
                          </Button>
                        )}
                        {order.status !== "in-progress" && (
                          <Button
                            onClick={() => updateStatus(order._id, "in-progress")}
                            className="bg-blue-500 text-white hover:bg-blue-600"
                            size="sm"
                          >
                            In-progress
                          </Button>
                        )}
                        {order.status !== "quality-check" && (
                          <Button
                            onClick={() => updateStatus(order._id, "quality-check")}
                            className="bg-purple-500 text-white hover:bg-purple-600"
                            size="sm"
                          >
                            Quality-check
                          </Button>
                        )}
                        {order.status !== "ready" && (
                          <Button
                            onClick={() => updateStatus(order._id, "ready")}
                            className="bg-green-500 text-white hover:bg-green-600"
                            size="sm"
                          >
                            Ready
                          </Button>
                        )}
                        {order.status !== "completed" && (
                          <Button
                            onClick={() => updateStatus(order._id, "completed")}
                            className="bg-green-600 text-white hover:bg-green-700"
                            size="sm"
                          >
                            Completed
                          </Button>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <select
                          className="w-full rounded-md border border-gray-300 p-2 text-sm dark:border-gray-600 dark:bg-gray-800"
                          value={order.employee_id || ""}
                          onChange={(e) => {
                            const selectedEmployeeId = e.target.value
                            updateOrder({
                              id: order._id,
                              employee_id: selectedEmployeeId,
                            })
                              .unwrap()
                              .then(() => {
                                setOrders((prevOrders) =>
                                  prevOrders.map((o) =>
                                    o._id === order._id ? { ...o, employee_id: selectedEmployeeId } : o,
                                  ),
                                )
                              })
                              .catch((error) => {
                                console.error("Failed to update employee:", error)
                              })
                          }}
                        >
                          <option value="">Select Employee</option>
                          {employee.map((emp) => (
                            <option key={emp._id} value={emp._id}>
                              {emp.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </TableCell>
                    <TableCell>
                      {order.status === "received" ||
                      (order.status === "in-progress" &&
                        (!order.technicianCode || order.technicianCode.trim() === "")) ? (
                        <div className="flex items-center gap-2">
                          <Input
                            type="text"
                            value={tempCode[order._id] || ""}
                            onChange={(e) => handleCodeChange(order._id, e.target.value)}
                            className="w-28"
                            placeholder="Enter Code"
                          />
                          <Button
                            onClick={() => {
                              const selectedEmployeeId = order.employee_id || ""
                              handleSaveCode(order._id, selectedEmployeeId)
                            }}
                            disabled={!tempCode[order._id]}
                            size="sm"
                            className="bg-indigo-800 text-white hover:bg-indigo-600"
                          >
                            Save
                          </Button>
                        </div>
                      ) : (
                        <span className="text-md font-medium">{order.technicianCode || "No Code Assigned"}</span>
                      )}
                    </TableCell>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="mt-6 flex items-center justify-between">
          <Button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="flex items-center gap-2  bg-slate-950 text-white hover:bg-slate-800 "
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
            className="flex items-center gap-2 bg-slate-950 text-white hover:bg-slate-800   dark:border-dark-3 dark:bg-dark-2 dark:text-white"
          >
            Next <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
      <CardFooter className="mt-6 flex justify-center">
        <div className="grid grid-cols-6 gap-4 text-center">
          {/* Total count stats */}
          <div className="rounded-lg bg-white p-4 shadow-md  dark:border-dark-3 dark:bg-dark-2 dark:text-white">
            <p className="text-2xl font-bold text-indigo-600">{orders.length}</p>
            <p className="text-sm text-gray-600">Total Orders</p>
          </div>
          <div className="rounded-lg bg-white p-4 shadow-md  dark:border-dark-3 dark:bg-dark-2 dark:text-white">
            <p className="text-2xl font-bold text-yellow-600">{orders.filter((o) => o.status === "received").length}</p>
            <p className="text-sm text-gray-600">Received</p>
          </div>
          <div className="rounded-lg bg-white p-4 shadow-md  dark:border-dark-3 dark:bg-dark-2 dark:text-white">
            <p className="text-2xl font-bold text-blue-600">
              {orders.filter((o) => o.status === "in-progress").length}
            </p>
            <p className="text-sm text-gray-600">In-progress</p>
          </div>
          <div className="rounded-lg bg-white p-4 shadow-md  dark:border-dark-3 dark:bg-dark-2 dark:text-white">
            <p className="text-2xl font-bold text-blue-600">
              {orders.filter((o) => o.status === "quality-check").length}
            </p>
            <p className="text-sm text-gray-600">Quality-check</p>
          </div>
          <div className="rounded-lg bg-white p-4 shadow-md  dark:border-dark-3 dark:bg-dark-2 dark:text-white">
            <p className="text-2xl font-bold text-blue-600">{orders.filter((o) => o.status === "ready").length}</p>
            <p className="text-sm text-gray-600">Ready</p>
          </div>
          <div className="rounded-lg bg-white p-4 shadow-md  dark:border-dark-3 dark:bg-dark-2 dark:text-white">
            <p className="text-2xl font-bold text-green-600">{orders.filter((o) => o.status === "completed").length}</p>
            <p className="text-sm text-gray-600">Completed</p>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}

export default Technician

