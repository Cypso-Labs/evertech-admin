import DefaultLayout from "@/components/Layouts/DefaultLaout";
import TechnicalReport from "@/components/report/TechnicalReport";
import React from "react";

const Dashboard = () => {
  return (
    <DefaultLayout>
     <div>
        <TechnicalReport />
     </div>
    </DefaultLayout>
  );
};

export default Dashboard;
