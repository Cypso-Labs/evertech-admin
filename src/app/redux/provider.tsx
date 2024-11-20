"use client";
import React, { useEffect, useState } from "react";
import Loader from "@/components/common/Loader";
import { Provider } from "react-redux";
import { store } from "./store/store";
import AuthWrapper from "../AuthWrapper/authWrapper";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <AuthWrapper>
        {children}
      </AuthWrapper>
    </Provider>
  );

export default Providers;


