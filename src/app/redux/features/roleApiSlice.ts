"use client";
import { apiSlice } from "../apiSlice";
import type { Role } from "@/types";

export const roleApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    getAllRoles: builder.query<Role[], void>({
      query: () => "/role/",
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({ type: "Role" as const, id: _id })),
              { type: "Role", id: "LIST" },
            ]
          : [{ type: "Role", id: "LIST" }],
    }),


    getRoleById: builder.query<Role, string>({
      query: (id) => `/role/${id}`,
      providesTags: (result) =>
        result ? [{ type: "Role", id: result._id }] : [],
    }),

   
    createRole: builder.mutation<
      Role,
      Omit<Role, "_id" | "createdAt" | "updatedAt">
    >({
      query: (roleData) => ({
        url: "/role/",
        method: "POST",
        body: roleData,
      }),
      
      invalidatesTags: [{ type: "Role", id: "LIST" }],
    }),


    updateRole: builder.mutation<Role, Partial<Role> & { id: string }>({
      query: ({ id, ...updates }) => ({
        url: `/role/${id}`,
        method: "PUT",
        body: updates,
      }),
     
      invalidatesTags: (result, error, { id }) => [
        { type: "Role", id },
        { type: "Role", id: "LIST" },
      ],
    }),

 
    deleteRole: builder.mutation<void, string>({
      query: (id) => ({
        url: `/role/${id}`,
        method: "DELETE",
      }),
     
      invalidatesTags: (result, error, id) => [
        { type: "Role", id },
        { type: "Role", id: "LIST" },
      ],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetAllRolesQuery,
  useGetRoleByIdQuery,
  useCreateRoleMutation,
  useUpdateRoleMutation,
  useDeleteRoleMutation,
} = roleApiSlice;
