"use client";

import "jsvectormap/dist/css/jsvectormap.css";
import "flatpickr/dist/flatpickr.min.css";
import "@/css/satoshi.css";
import "@/css/style.css";
import React, { useEffect, useState } from "react";
import Loader from "@/components/common/Loader";
import { Provider } from "react-redux";
import { store } from "@/redux/store";

// RootLayout component for Next.js
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Improved loading state logic: you could also check actual loading events
    const timer = setTimeout(() => setLoading(false), 1000); // Consider replacing with actual loading checks
    return () => clearTimeout(timer);
  }, []);

  return (
    <Provider store={store}>
      {/* Using `lang` in html tag to specify language, relevant for SEO */}
      <html lang="en">
        <head>
          {/* You can include custom head meta tags, title, or additional fonts here */}
        </head>
        <body suppressHydrationWarning={true}>
          {/* Conditional rendering based on loading state */}
          {loading ? <Loader /> : children}
        </body>
      </html>
    </Provider>
  );
}
