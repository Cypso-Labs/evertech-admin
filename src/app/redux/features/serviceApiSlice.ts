"use client";
import { apiSlice } from "../apiSlice";
import type { Service } from "@/types";

export const serviceApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllServices: builder.query<Service[], void>({
      query: () => "/services",
      transformResponse: (response: { data: Service[] }) => response.data,
      providesTags: [{ type: "Service", id: "LIST" }],
    }),
    getServiceById: builder.query<Service, string>({
      query: (id) => `/services/${id}`, 
      providesTags: (result, error, id) => [{ type: "Service", id }],
    }),
    createService: builder.mutation<Service, Omit<Service, "_id">>({
      query: (serviceData) => ({
        url: "/services",
        method: "POST",
        body: serviceData,
      }),
      invalidatesTags: [{ type: "Service", id: "LIST" }],
    }),
    updateService: builder.mutation<Service, Partial<Service> & { id: string }>(
      {
        query: ({ id, ...updates }) => ({
          url: `/services/${id}`,
          method: "PUT",
          body: updates,
        }),
        invalidatesTags: (result, error, { id }) => [{ type: "Service", id }],
      },
    ),
    deleteService: builder.mutation<void, string>({
      query: (id) => ({
        url: `/services/${id}`, // Correctly interpolate the service ID
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Service", id: "LIST" }],
    }),
  }),
});

export const {
  useGetAllServicesQuery,
  useGetServiceByIdQuery,
  useCreateServiceMutation,
  useUpdateServiceMutation,
  useDeleteServiceMutation,
} = serviceApiSlice;
