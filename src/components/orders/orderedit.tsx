"use client"
import type React from "react"
import { useState, Suspense } from "react"
import { FaTrashAlt } from "react-icons/fa"
import { MdOutlineAddCircle } from "react-icons/md"
import { useRouter, useSearchParams } from "next/navigation"
import Swal from "sweetalert2"
import { MdKeyboardArrowLeft } from "react-icons/md"
import { useGetAllServicesQuery } from "@/app/redux/features/serviceApiSlice"
import type { Order1, Service2 } from "@/types"
import { useUpdateOrderMutation } from "@/app/redux/features/orderApiSlice"

// Define interfaces for better type safety
interface ServiceItem {
  id: string
  service_id: string
  name: string
  description: string
  qty: number
}

interface FormDataType {
  _id: string | null
  order_id: string
  customer_id: string
  product_id: string
  services: ServiceItem[]
  delivery_status: string
  status: string
}

const OrdereditPage: React.FC = () => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedService, setSelectedService] = useState<string>("")
  const order_id = searchParams.get("order_id") || ""
  const customer_id = searchParams.get("customer_id") || ""
  const product_id = searchParams.get("product_id") || ""
  const services = searchParams.get("services") ? JSON.parse(searchParams.get("services")!) : []

  const _id = searchParams.get("id")

  const { data: services1 = [], isLoading: isServicesLoading } = useGetAllServicesQuery()

  const [updateOrder] = useUpdateOrderMutation()

  console.log("Services:", services)
  const [formData, setFormData] = useState<FormDataType>({
    _id,
    order_id,
    customer_id,
    product_id,
    services,
    delivery_status: "in_Workshop",
    status: "received",
  })

  const [servicesList, setServicesList] = useState<ServiceItem[]>(services) // Keep services state
  const [quantity, setQuantity] = useState<number>(1) // Store quantity input

  const handleAddService = () => {
    if (!selectedService) {
      Swal.fire("Error", "Please select a service", "error")
      return
    }

    const service = services1.find((s: Service2) => s._id === selectedService)
    if (!service) return

    // Prevent duplicate service entries
    // const alreadyExists = servicesList.some((s) => s.service_id === service.service_id);
    // if (alreadyExists) {
    //   Swal.fire("Error", "Service already added", "error");
    //   return;
    // }

    const newService: ServiceItem = {
      id: service._id,
      service_id: service.service_id,
      name: service.name,
      description: service.description,
      qty: quantity,
    }

    setServicesList([...servicesList, newService]) // Update the services list
    setIsModalOpen(false)
    setSelectedService("")
    setQuantity(1)
  }

  const handleDiscard = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will lose all newly entered data!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Cancel",
      cancelButtonText: "No, keep editing",
      confirmButtonColor: "#D93132",
      cancelButtonColor: "#2ED36D",
      customClass: {
        popup: "dark:bg-[#122031] dark:text-white",
        confirmButton: "text-white bg-[#D93132] hover:bg-blue-700 w-[133px] h-[47px] text-[15px] rounded-md",
        cancelButton: "text-white bg-[#2ED36D] hover:bg-red-700 w-[150px] h-[47px] text-[15px] text-left rounded-md",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        router.push("/orders")
      }
    })
  }

  const handleSave = async () => {
    const payload: Order1 = {
      _id: formData._id || "",
      order_id: formData.order_id,
      customer_id: formData.customer_id,
      product_id: formData.product_id,
      services: servicesList.map((service) => ({
        service_id: service.service_id,
        name: service.name,
        description: service.description,
        qty: service.qty,
      })),
      delivery_status: formData.delivery_status,
      order_date: new Date().toISOString(),
      status: "received",
    }

    try {
      await updateOrder({ id: formData._id || "", ...payload }).unwrap()

      Swal.fire({
        title: "Success!",
        text: "Order has been updated",
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        router.push("/orders")
      })
    } catch (error) {
      console.error("Update Error:", error)
      Swal.fire({
        title: "Error!",
        text: "Failed to update order",
        icon: "error",
      })
    }
  }

  const handleRemoveService = (index: number) => {
    setServicesList((prev) => prev.filter((_, i) => i !== index)) // Correctly update state
  }

  return (
    <div>
      <div className="mb-12 flex items-center text-[40px] font-medium text-gray-700 dark:text-white ">
        <button
          className="mr-4 h-[51px] w-[51px] rounded-full text-center dark:bg-dark-2"
          onClick={() => router.back()}
        >
          <MdKeyboardArrowLeft className=" h-[51px] w-[51px] cursor-pointer rounded-full border-2 border-gray-4  hover:text-[#3584FA] drak:bg-slate-600" />
        </button>
        Edit Order {formData.order_id || "0001"}
      </div>

      <div className="grid grid-cols-4 gap-x-4 ">
        <div className="space-y-2 text-2xl font-semibold dark:text-white">
          <div className="h-[36px]">Order Id</div>
          <div className="h-[36px]">Customer Id</div>
          <div className="h-[36px]">Product Id</div>

          <div className="mb-2 w-full text-2xl font-bold">
            <div className="relative flex w-[900px] items-center justify-between pt-4">
              <div>Services</div>
              <MdOutlineAddCircle
                className="size-14 cursor-pointer text-[#5E91FF] dark:text-dark-5"
                onClick={() => setIsModalOpen(true)}
              />
            </div>
          </div>
        </div>
        <div className="col-span-2 space-y-2">
          <input
            type="text"
            className="h-[36px] w-[520px] border border-gray-300 bg-white p-2 text-gray-900 dark:border-slate-500 dark:bg-slate-600 dark:text-white"
            value={formData.order_id}
            readOnly
            disabled
          />
          <input
            type="text"
            className="h-[36px] w-[520px] border border-gray-300 bg-white p-2 text-gray-900 dark:border-slate-500 dark:bg-slate-600 dark:text-white"
            value={formData.customer_id}
            readOnly
            disabled
          />
          <input
            type="text"
            className="h-[36px] w-[520px] border border-gray-300 bg-white p-2 text-gray-900 dark:border-slate-500 dark:bg-slate-600 dark:text-white"
            value={formData.product_id}
            readOnly
            disabled
          />
        </div>
      </div>

      <div className="relative col-span-4 mt-4">
        <div className="w-[900px] rounded-md border bg-white shadow-md dark:bg-dark-2">
          <table className="w-full table-auto border-separate border-spacing-y-3 p-4">
            <thead>
              <tr className="text-sm uppercase text-gray-700 dark:text-white">
                <th className="pb-2 text-left font-semibold">ID</th>
                <th className="pb-2 text-left font-semibold">Service</th>
                <th className="pb-2 text-left font-semibold">QTY</th>
                <th className="pb-2 text-left font-semibold">Description</th>
                <th className="pb-2"></th>
              </tr>
            </thead>

            <tbody>
              {servicesList.map((service, index) => (
                <tr key={index} className="dark:text-white">
                  <td className="border-b border-l border-t border-gray-300 p-2">{service.service_id}</td>
                  <td className="border-b border-t border-gray-300 p-2">{service.name}</td>
                  <td className="border-b border-t border-gray-300 p-2">{service.qty}</td>
                  <td className="border-b border-t border-gray-300 p-2">{service.description}</td>
                  <td className="border-b border-r border-t border-gray-300 p-2 text-center">
                    <button className="text-red-500 hover:text-red-700" onClick={() => handleRemoveService(index)}>
                      <FaTrashAlt size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex justify-center space-x-8">
          <button
            className="h-[49px] w-[181px] rounded-lg border-[1px] border-[#FF2323] bg-[#FFCDCD] font-medium text-[#FF2323] hover:border-[#FFCDCD] hover:bg-[#FF2323] hover:text-[#FFCDCD]"
            onClick={(e) => {
              e.stopPropagation()
              handleDiscard()
            }}
          >
            Discard
          </button>
          <button
            className="h-[49px] w-[181px] rounded-lg border-[1px] border-[#08762D] bg-[#BCFFC8] font-medium text-[#08762D] hover:border-[#BCFFC8] hover:bg-[#08762D] hover:text-[#BCFFC8]"
            onClick={(e) => {
              e.stopPropagation()
              handleSave()
            }}
          >
            Save Order
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-lg space-y-6 rounded-lg bg-white p-8 shadow-xl">
            {/* Title */}
            <div className="text-center">
              <h1 className="text-2xl font-extrabold text-gray-800">Add Service</h1>
            </div>

            {/* Service Selection */}
            <div>
              <label className="mb-2 block text-lg font-semibold text-gray-700">Service</label>
              <select
                onChange={(e) => setSelectedService(e.target.value)}
                className="h-12 w-full rounded-md border border-gray-300 bg-white text-gray-800 focus:ring-2 focus:ring-green-500"
              >
                <option value="">-- Select a Service --</option>
                {services1.map((service: Service2) => (
                  <option key={service._id} value={service._id}>
                    {service.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Quantity and Add Button */}
            <div className="flex items-center justify-between space-x-4">
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
  )
}

const EditOrder = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OrdereditPage />
    </Suspense>
  )
}

export default EditOrder

