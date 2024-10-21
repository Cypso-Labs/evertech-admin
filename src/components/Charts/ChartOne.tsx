import { ApexOptions } from "apexcharts";
import React from "react";
import ReactApexChart from "react-apexcharts";
import DefaultSelectOption from "@/components/SelectOption/DefaultSelectOption";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
const ChartOne: React.FC = () => {
  const series = [
    {
      name: "Received Amount",
      data: [0, 20, 35, 45, 35, 55, 65],
    },
    {
      name: "Due Amount",
      data: [15, 9, 17, 32, 25, 68, 80,],
    },
  ];

  const options: ApexOptions = {
    legend: {
      show: false,
      position: "top",
      horizontalAlign: "left",
    },
    colors: ["#5750F1", "#0ABEF9"],
    chart: {
      fontFamily: "Satoshi, sans-serif",
      height: 310,
      type: "area",
      toolbar: {
        show: false,
      },
    },
    fill: {
      gradient: {
        opacityFrom: 0.55,
        opacityTo: 0,
      },
    },
    responsive: [
      {
        breakpoint: 1024,
        options: {
          chart: {
            height: 300,
          },
        },
      },
      {
        breakpoint: 1366,
        options: {
          chart: {
            height: 320,
          },
        },
      },
    ],
    stroke: {
      curve: "smooth",
    },

    markers: {
      size: 0,
    },
    grid: {
      strokeDashArray: 5,
      xaxis: {
        lines: {
          show: false,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      fixed: {
        enabled: !1,
      },
      x: {
        show: !1,
      },
      y: {
        title: {
          formatter: function (e) {
            return "";
          },
        },
      },
      marker: {
        show: !1,
      },
    },
    xaxis: {
      type: "category",
      categories: [
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Sat",
        "Sun",
        
      ],
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      title: {
        style: {
          fontSize: "0px",
        },
      },
    },
  };

  return (
    <div className="col-span-12 rounded-[10px] bg-white px-7.5 pb-6 pt-7.5  dark:bg-gray-dark dark:shadow-card xl:col-span-7 shadow-lg shadow-gray-4">
      <div className="mb-3.5 flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h4 className="text-body-2xlg font-bold text-slate-600 dark:text-white " style={{font:"Inter"}}>
          Orders Chart
          </h4>
        </div>
        <div className="flex space-x-4">
          < label className="inline-flex items-center">
                <input type="radio"
                className="form-radio text-blue-600 h-4 w-4"
                name="week"
                value="Last Week"
                />
                <span className="ml-2 text-slate-400">Last Week</span>
          </label>
          <label className="inline-flex items-center">
                <input type="radio"
                   className="form-radio text-blue-600 h-4 w-4"
                   name="week"
                   value="This Week"/>
                <span className="ml-2 text-slate-400">This Week</span>
          </label>
        </div>
        <div className="flex items-center gap-2.5">
        <a href="#" className="text-slate-400 hover:underline text-[25px] flex  mb-6  " style={{font:"Inter"}}>View orders
            <MdKeyboardDoubleArrowRight className='h-6 w-6' />
            </a>
        </div>
      </div>
      <div>
        <div className="-ml-4 -mr-5">
          <ReactApexChart
            options={options}
            series={series}
            type="area"
            height={310}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2 text-center xsm:flex-row xsm:gap-0">
        
      </div>
    </div>
  );
};

export default ChartOne;
