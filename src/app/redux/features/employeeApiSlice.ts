"use client";
import { apiSlice } from "../apiSlice";
import type { Employee } from "@/types";

export const employeeApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllEmployees: builder.query<Employee[], void>({
      query: () => "/employees/",
      transformResponse: (response: {
        status: string;
        data: { employees: Employee[] };
      }) => {
        return response.data.employees;
      },
      providesTags: ["Employee"],
    }),
    getEmployeeById: builder.query<Employee, string>({
      query: (id) => `/employees/${id}`,
      providesTags: ["Employee"],
    }),
    updateEmployee: builder.mutation<
      Employee,
      Partial<Employee> & { id: string }
    >({
      query: ({ id, ...updates }) => ({
        url: `/employees/${id}`,
        method: "PUT",
        body: updates,
      }),
      invalidatesTags: ["Employee"],
    }),
    deleteEmployee: builder.mutation<void, string>({
      query: (id) => ({
        url: `/employees/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Employee"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetAllEmployeesQuery,
  useGetEmployeeByIdQuery,
  useUpdateEmployeeMutation,
  useDeleteEmployeeMutation,
} = employeeApiSlice;
