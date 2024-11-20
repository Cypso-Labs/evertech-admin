import { Metadata } from "next";
import React from "react";
import SignIn from "./auth/signin/page";

export const metadata: Metadata = {
  title:
    "Next.js E-commerce Dashboard Page | NextAdmin - Next.js Dashboard Kit",
  description: "This is Next.js Home page for NextAdmin Dashboard Kit",
};

export default function Home() {
  return (
      <SignIn/>
  );
}
