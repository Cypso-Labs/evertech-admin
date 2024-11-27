import "jsvectormap/dist/css/jsvectormap.css";
import "flatpickr/dist/flatpickr.min.css";
import "@/css/satoshi.css";
import "@/css/style.css";

import React, { useEffect, useState } from "react";
import Loader from "@/components/common/Loader";
import {store} from '../redux/store'
import { Provider } from 'react-redux'
import React from "react";
import Providers from "./redux/provider";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Provider store={store}>
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <Providers>{children}</Providers>
      </body>
    </html>
    </Provider>
  );
}
