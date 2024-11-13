"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import {
  setEmployee,
  // setLoading,
  // setError,
} from "../../app/redux/authSlice";
import { useLoginMutation } from "../../app/redux/authApi";

export default function SigninWithPassword() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

   

    login(formData)
      .unwrap()
      .then((res) => {
        toast.success("Login successful!");
        dispatch(setEmployee({ token: res.token, user: res.user }));
        router.push("/dashboard");
      })
      .catch((err: any) => {
        console.log(err);
        const errorMessage =
          err?.data?.message || "Login failed. Please check your credentials.";
       // dispatch(setError(errorMessage)); // Set the error state in Redux
        toast.error(errorMessage);
      })
      .finally(() => {
       // dispatch(setLoading(false));
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="email" className="block font-medium">
          Email
        </label>
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
          className="w-full rounded border p-2"
          required
        />
      </div>

      <div className="mb-5">
        <label htmlFor="password" className="block font-medium">
          Password
        </label>
        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleChange}
          className="w-full rounded border p-2"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full rounded bg-blue-500 p-2 text-white"
        disabled={isLoading} // Disable the button when loading
      >
        {isLoading ? "Loading..." : "Login"}
      </button>
    </form>
  );
}
