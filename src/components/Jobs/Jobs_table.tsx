"use client";
import React, { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { MdOutlineSearch } from "react-icons/md";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

import { Job } from "@/types";
import { useDeleteJobMutation, useGetAllJobsQuery } from "@/app/redux/features/jobApiSlice";

const Jobs_table: React.FC = () => {
  const router = useRouter();
  const { data: jobs = [], isLoading } = useGetAllJobsQuery();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const [deleteJob] = useDeleteJobMutation();

  const filteredJobs = jobs.filter((job) =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastJob = currentPage * itemsPerPage;
  const indexOfFirstJob = indexOfLastJob - itemsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);

  const totalPages = Math.ceil(filteredJobs.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleDelete = (jobId: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteJob(jobId);
        router.push("/jobs");
      }
    });
  };

  const handleViewDetails = (job: Job) => {
    Swal.fire({
      title: job.title,
      html: `
        <strong>Description:</strong> ${job.description}<br/><br/>
        <strong>Key Responsibility:</strong> ${job.key_Responsibility}<br/><br/>
        <strong>Qualifications:</strong> ${job.qualifications}
      `,
      icon: "info",
    });
  };


  const handleRowClick = (job: Job) => {
    const queryParams = new URLSearchParams({
      id: job._id,
    }).toString();
    router.push(`/jobs/editjob?${queryParams}`);
  };
  
  

  return (
    <div>
      <div className="flex items-center justify-between text-3xl font-bold text-gray-700 dark:text-white">
        <span className="text-[40px] font-medium text-[#475569]">Jobs</span>
        <Link href="/jobs/newjob">
          <button className="rounded-md border-2 border-[#3584FA] bg-[#E0EDFF] p-2 text-[20px] text-xl text-[#3584FA] hover:bg-[#3584FA] hover:text-[#E0EDFF] dark:border-dark-3 dark:bg-dark-2 dark:text-white">
            New Job +
          </button>
        </Link>
      </div>

      <div className="mt-4 flex items-center p-4">
        <div className="text-md flex h-[30px] w-[227px] items-center rounded-lg border-2 border-gray-300 bg-white px-3 py-2 text-center text-gray-600 shadow-2xl dark:border-dark-3 dark:bg-dark-2 dark:text-white">
          <MdOutlineSearch className="mr-4 justify-start" />
          <input
            type="text"
            placeholder="Search Jobs"
            className="w-full border-none outline-none dark:border-dark-3 dark:bg-dark-2"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <table className="w-full table-auto border-separate border-spacing-y-3 font-bold">
        <thead className="text-center text-[16px] uppercase text-[#475569] dark:text-white">
          <tr>
            <th className="p-4">Job ID</th>
            <th className="p-4">Title</th>
            <th className="p-4">Location</th>
            <th className="p-4">Type</th>
            <th className="p-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentJobs.map((job) => (
            <tr key={job._id} 
           
            className="cursor-pointer rounded-md bg-white shadow-md hover:bg-[#E0EDFF] dark:bg-dark-2 dark:text-gray-300">
              <td 
               onClick={() => handleRowClick(job)}
              className="rounded-lg p-2 px-4 py-6 text-center">{job._id}</td>
              <td 
              onClick={() => handleRowClick(job)}
              className="text-center">{job.title}</td>
              <td 
              onClick={() => handleRowClick(job)}
              className="p-4 text-center">{job.location}</td>
              <td 
              onClick={() => handleRowClick(job)}
              className="p-4 text-center">{job.type}</td>
              <td className="p-4 text-center space-x-4">
                <button className="mr-2 text-blue-600 hover:text-blue-800" onClick={() => handleViewDetails(job)}>
                  View
                </button>
                <button className="text-[#FF0000] hover:text-[#3584FA]" onClick={() => handleDelete(job._id)}>
                  <FaTrashAlt />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

     {/* Pagination */}
      <div className="mt-4 flex items-center justify-between">
        <div>
          <nav className="inline-flex items-center font-semibold">
            <button
              className="mx-1 rounded-md border border-gray-300 px-3 py-1 text-black dark:text-white"
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
            >
              <span>&lt;</span>
            </button>
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                className={`mx-1 rounded-md border border-gray-300 px-3 py-1 ${
                  currentPage === index + 1
                    ? "bg-[#3584FA] text-white"
                    : "text-black dark:text-white"
                }`}
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </button>
            ))}
            <button
              className="mx-1 rounded-md border border-gray-300 px-3 py-1 text-black dark:text-white"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              <span>&gt;</span>
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Jobs_table;