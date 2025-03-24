"use client"

import { apiSlice } from "../apiSlice";
import type { ApplyJob } from "@/types";

export const applyJobApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createApplyJob: builder.mutation<ApplyJob, ApplyJob>({
            query: (job) => ({
                url: "/applyjobs/create",
                method: "POST",
                body: job,
            }),
            invalidatesTags: ["applyjobs"],
        }),

     getAllApplyJobs: builder.query<ApplyJob[], void>({
        query: () => "/applyjobs/",
        providesTags: ["applyjobs"],
      }),
     
      deleteApplyJob: builder.mutation<void, string>({
        query: (id) => ({
          url: `/applyjobs/delete/${id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["applyjobs"],
      }),



    }),
});

export const {
    useCreateApplyJobMutation,
    useGetAllApplyJobsQuery,
    useDeleteApplyJobMutation,
} = applyJobApiSlice;