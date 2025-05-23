"use client";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "@/app/redux/features/authApiSlice";
import { setCredentials, selectEmployee } from "@/app/redux/features/authSlice";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";


const SigninWithPassword: React.FC = () => {
  const [formData, setFormData] = useState<{ email: string; password: string }>(
    {
      email: "",
      password: "",
    },
  );

  const dispatch = useDispatch();
  const router = useRouter();
  const [login, { isLoading }] = useLoginMutation();

  const employee = useSelector(selectEmployee); 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await login(formData).unwrap();
      if (response?.data?.employee && response?.data?.token) {
        const { employee, token } = response.data;
        dispatch(setCredentials({ employee, token })); 
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Login successful",
        })
        router.push("/dashboard");
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Invalid login credentials",
        })
      }
    } catch (err: any) {
      console.error(err);
      Swal.fire({
        icon: "error", 
        text: (err?.data?.message || "Something went wrong")
      })
    }
  };
  if (employee) {
    router.push("/dashboard");
  
  }

  return (
    <div className="mx-auto mt-8 max-w-md rounded-lg bg-white p-6 shadow-md">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
            required
            autoComplete="email"
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
            required
            autoComplete="current-password"
          />
        </div>
        <button
          type="submit"
          className="w-full rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
          disabled={isLoading}
        >
          {isLoading ? "Signing In..." : "Sign In"}
        </button>
      </form>
    </div>
  );
};

export default SigninWithPassword;
