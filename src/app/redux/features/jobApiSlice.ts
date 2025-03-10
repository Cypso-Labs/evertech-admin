"use client";

import { apiSlice } from "../apiSlice";
import type { Job } from "@/types";


export const jobApiSlice = apiSlice.injectEndpoints({

    endpoints: (builder) => ({
        getAllJobs: builder.query<Job[], void>({
            query: () => "/jobs/",
            providesTags: ["jobs"],
        }),


        getJobById: builder.query<Job, string>({
            query: (jobId) => `/jobs/${jobId}`,
            providesTags:["jobs"],
        }),


        createJob: builder.mutation<Job, Omit<Job, "_id">>({
            query: (jobData) => ({
                url: "/jobs/create",
                method: "POST",
                body: jobData,
            }),
            invalidatesTags: ["jobs"],
        }),


        updateJob: builder.mutation<Job, Partial<Job> & { jobId: string }>({
            query: ({ jobId, ...updates }) => ({
                url: `/jobs/update/${jobId}`,
                method: "PUT",
                body: updates,
            }),
            invalidatesTags: ["jobs"],
        }),


        deleteJob: builder.mutation<void, string>({
            query: (jobId) => ({
                url: `/jobs/${jobId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["jobs"],
        }),


    }),
});

export const {
    useGetAllJobsQuery,
    useGetJobByIdQuery,
    useCreateJobMutation,
    useUpdateJobMutation,
    useDeleteJobMutation,
} = jobApiSlice;