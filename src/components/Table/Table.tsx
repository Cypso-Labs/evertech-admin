import React from 'react';
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
type OrderStatus = 'placed' | 'cancelled' | 'processing' | 'processed' | 'delivered';

interface Order {
  no: string;
  price: string;
  status: OrderStatus;
}

interface Employee {
  id: string;
  name: string;
  role: string;
}

const Table = () => {
  const orders: Order[] = [
    { no: '#0006', price: '$99.98', status: 'placed' },
    { no: '#0005', price: '$99.98', status: 'cancelled' },
    { no: '#0004', price: '$99.98', status: 'processing' },
    { no: '#0003', price: '$99.98', status: 'processed' },
    { no: '#0002', price: '$99.98', status: 'delivered' },
  ];

  const employees: Employee[] = [
    { id: '#0001', name: 'Lorem Ipsum', role: 'Dolor Sit' },
    { id: '#0001', name: 'Lorem Ipsum', role: 'Dolor Sit' },
    { id: '#0001', name: 'Lorem Ipsum', role: 'Dolor Sit' },
    { id: '#0001', name: 'Lorem Ipsum', role: 'Dolor Sit' },
    { id: '#0001', name: 'Lorem Ipsum', role: 'Dolor Sit' },
    { id: '#0001', name: 'Lorem Ipsum', role: 'Dolor Sit' },
  ];

  const getStatusColor = (status: OrderStatus): string => {
    switch (status) {
      case 'placed': return ' border border-[#B48701] text-[#B48701]  px-3 py-1 ';
      case 'cancelled': return 'border border-[#FF0404] text-[#FF0404] px-2 py-1';
      case 'processing': return 'border border-[#FF6A00] text-[#FF6A00] px-2 py-1';
      case 'processed': return 'border border-[#3F9C50] text-[#3F9C50] px-2 py-1';
      case 'delivered': return 'border border-[#002BFF] text-[#002BFF] px-3 py-1';
      default: return 'border border-[#B48701] text-[#B48701] px-3 py-1';
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-6   ">
      <div className="w-full  md:w-1/2 shadow-lg  ">
        <div className="bg-white rounded-lg shadow-md p-6 h-[430px] dark:bg-[#122031]">
          <div className="flex justify-between items-center mb-10">
     
            <h2 className="text-[20px] font-medium text-[#475569] dark:text-white" style={{font:"Inter"}}>Latest Orders</h2>
            <a href="#" className="text-slate-400 hover:underline text-[18px] flex   " style={{font:"Inter"}}>View all
            <MdKeyboardDoubleArrowRight className='h-6 w-6' />
            </a>
          </div>
          <table className="w-full">
            <thead>
              <tr className="border-b border-t dark:text-white border-slate-400 text-center py-2 text-[16px] font-normal text-slate-600"  style={{font:"Inter"}}>
                <th >NO</th>
                <th >Price</th>
                <th >Status</th>
                
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={index} className="last:border-b-0 text-center ">
                  <td className="py-2 font-normal text-[16px] pt-4"  style={{font:"Inter"}}>{order.no}</td>
                  <td className="py-2 font-normal text-[16px]">{order.price}</td>
                  <td className="py-2 font-normal text-[13px] "  style={{font:"Inter"}}>
                    <span className={`  font-normal text-[13px] rounded-md  ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

{/*Table 2*/}
      <div className="w-full md:w-1/2 shadow-lg  ">
        <div className="bg-white rounded-lg shadow-md p-6 dark:bg-[#122031]">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-[20px] font-medium text-[#475569] dark:text-white" style={{font:"Inter"}}>Employees</h2>
            <a href="#" className="text-slate-400 hover:underline text-[18px] flex  mb-6  " style={{font:"Inter"}}>View all
            <MdKeyboardDoubleArrowRight className='h-6 w-6' />
            </a>
          </div>
          <table className="w-full">
            <thead>
              <tr className="border-b border-t dark:text-white border-slate-400 text-center py-2 text-[16px] font-normal text-slate-600"  style={{font:"Inter"}}>
                <th>ID</th>
                <th>Name</th>
                <th >Role</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee, index) => (
                <tr key={index} className=" text-center last:border-b-0">
                  <td className="py-2 font-normal text-[16px] pt-4">{employee.id}</td>
                  <td className="py-2 font-normal text-[16px]">{employee.name}</td>
                  <td className="py-2 font-normal text-[16px]">{employee.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Table;