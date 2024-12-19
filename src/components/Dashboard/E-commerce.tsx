"use client";
import React from "react";

import ChatCard from "../Chat/ChatCard";
import TableOne from "../Tables/TableOne";
import MapOne from "../Maps/MapOne";
import DataStatsOne from "@/components/DataStats/DataStatsOne";

import Table from "../Table/Table";
import ComparisonChart from "../BarChart/barChart";

const ECommerce: React.FC = () => {
  return (
    <>
      <DataStatsOne />
      <div className="mt-6">
        <Table />
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 md:mt-6 md:gap-6 2xl:mt-9 2xl:gap-7.5 ">
        <ComparisonChart />
      </div>
    </>
  );
};

export default ECommerce;
