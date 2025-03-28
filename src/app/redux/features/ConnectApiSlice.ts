"use client"


import { apiSlice } from "../apiSlice";
import type { CustomerContact } from "@/types";

export const connectApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createConnect: builder.mutation<CustomerContact, CustomerContact>({
            query: (connect) => ({
                url: "/connect/create",
                method: "POST",
                body: connect,
            }),
            invalidatesTags: ["Connect"],
        }),

        getAllConnects: builder.query<CustomerContact[], void>({
            query: () => "/connect/",
            providesTags: ["Connect"],
        }),

        deleteConnect: builder.mutation<void, string>({
            query: (id) => ({
                url: `/connect/delete/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Connect"],
        }),

    }),
});

export const { useCreateConnectMutation , useGetAllConnectsQuery , useDeleteConnectMutation} = connectApiSlice;