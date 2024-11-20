import { Metadata } from "next";
import React from "react";
import SignIn from "./auth/signin/page";

export const metadata: Metadata = {
  title: "EVERTECH.LK Admin Panel",
  description:
    "A robust and user-friendly dashboard for managing operations efficiently. Streamline workflows, monitor performance, and make data-driven decisions with ease.",
};
export default function Home() {
  return (
      <SignIn/>
  );
}
