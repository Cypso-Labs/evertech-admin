"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "../../app/redux/hooks";
import {
  setCredentials,
  setError,
  setLoading,
  selectAuth,
} from "../../app/redux/slices/authSlice";
import { useLoginMutation } from "../../app/redux/features/authApi";

export default function SigninWithPassword() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { loading, error } = useAppSelector(selectAuth);
  const [login, { isLoading }] = useLoginMutation();

  const [credentials, setCredentialsState] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentialsState({ ...credentials, [e.target.name]: e.target.value });
  };

  if (useAppSelector(selectAuth).token) {
    router.push("/dashboard");
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(setLoading(true));

    try {
      const result = await login(credentials).unwrap();

      if (result && result.token) {
        dispatch(
          setCredentials({
            token: result.token,
            employee: result.employee,
          }),
        );
        router.push("/dashboard");
      } else {
        dispatch(setError("Invalid token received. Please try again."));
      }
    } catch (err: any) {
      dispatch(setError("Login failed. Please check your credentials."));
    } finally {
      dispatch(setLoading(false));
    }
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
          value={credentials.email}
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
          value={credentials.password}
          onChange={handleChange}
          className="w-full rounded border p-2"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full rounded bg-blue-500 p-2 text-white"
        disabled={loading || isLoading}
      >
        {loading || isLoading ? "Signing In..." : "Sign In"}
      </button>

      {error && <p className="mt-2 text-red-500">{error}</p>}
    </form>
  );
}
