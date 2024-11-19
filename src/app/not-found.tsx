import React from "react";
import Link from "next/link";

const Custom404 = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 text-center">
      <div className="rounded-lg bg-white p-6 shadow-lg">
        <h1 className="text-6xl font-bold text-red-500">404</h1>
        <h2 className="mt-2 text-2xl text-gray-700">Page Not Found</h2>
        <p className="mt-4 text-gray-500">
          Oops! The page you&apos;re looking for doesn&apos;t exist or has been
          moved.
        </p>
        <Link
          href="/"
          className="mt-6 inline-block rounded-lg bg-blue-500 px-6 py-3 text-white transition hover:bg-blue-400"
        >
          Go Back to Homepage
        </Link>
      </div>
    </div>
  );
};

export default Custom404;
