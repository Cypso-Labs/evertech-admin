import { Metadata } from "next";
import React from "react";
import SignIn from "./auth/signin/page";

export const metadata: Metadata = {
  title:
    "EverTech.lk",
  description: "Admin Panal",
};

export default function Home() {
  return (
      <SignIn/>
  );
}
