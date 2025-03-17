import dashboard from "@/assets/images/icon/dashboard-svgrepo-com.svg";
import orders from "@/assets/images/icon/order.svg";
import payments from "@/assets/images/icon/payment.svg";
import services from "@/assets/images/icon/service.svg";
import customers from "@/assets/images/icon/customer.svg";
import employees from "@/assets/images/icon/employee.svg";
import product from "@/assets/images/icon/product1.png";

import tech from "@/assets/images/icon/tech.svg";
import Jobs from "@/assets/images/icon/jobs.png";

import ClipboardMinus from "@/assets/images/icon/report1.png";

interface MenuItem {
  icon?: string | React.ComponentType;
  label: string;
  route: string;
  privilegeId: number;
  children?: MenuItem[];
}

interface MenuGroup {
  name: string;
  menuItems: MenuItem[];
}

const MenuGroupsData: MenuGroup[] = [
  {
    name: "MAIN MENU",
    menuItems: [
      {
        icon: dashboard,
        label: "Dashboard",
        route: "/dashboard",
        privilegeId: 1,
      },
      {
        icon: orders,
        label: "Orders",
        route: "/orders",
        privilegeId: 2,
      },
      {
        icon: payments,
        label: "Payments",
        route: "/payments",
        privilegeId: 3,
      },
      {
        icon: services,
        label: "Services",
        route: "/services",
        privilegeId: 4,
      },
      {
        icon: customers,
        label: "Customer",
        route: "/customers",
        privilegeId: 5,
      },
      {
        icon: employees,
        label: "Employees",
        route: "/employees",
        privilegeId: 6,
      },
      {
        icon: product,
        label: "Products",
        route: "/products",
        privilegeId: 7,
      },
      {
        icon: Jobs,
        label: "Jobs",
        route: "/jobs",
        privilegeId: 8,
      },
      {
        icon: ClipboardMinus,
        label: "Reports",
        route: "/reports",
        privilegeId: 9,
      },
      {
        icon: tech,
        label: "Technician",
        route: "/technicians",
        privilegeId: 10,
      },
    ],
  },
];

export default MenuGroupsData;
