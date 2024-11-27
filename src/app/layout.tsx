

import "@/css/satoshi.css";
import "@/css/style.css";

import React  from "react";


import Providers from "./redux/provider";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
 
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <Providers>{children}</Providers>
      </body>
    </html>
  
  );
}
