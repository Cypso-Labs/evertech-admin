"use client";
import Link from "next/link";
import React from "react";
import GoogleSigninButton from "../GoogleSigninButton";
import SigninWithPassword from "../SigninWithPassword";

export default function Signin() {
  
  return (
    <>
      <div>
        <SigninWithPassword />
      </div>

      <div className="mt-6 text-center">
        <p>
          
          <Link href="https://www.cypsolabs.com/">
          © 2024 Cypso Labs (PVT) LTD. All Rights Reserved.
          </Link>
        </p>
      </div>
    </>
  );
}
