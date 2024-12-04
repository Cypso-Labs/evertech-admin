import dashboard from "@/assets/images/icon/dashboard-svgrepo-com.svg";
import orders from "@/assets/images/icon/order.svg";
import payments from "@/assets/images/icon/payment.svg";
import services from "@/assets/images/icon/service.svg";
import customers from "@/assets/images/icon/customer.svg";
import employees from "@/assets/images/icon/employee.svg";
import ClipboardMinus  from "@/assets/images/icon/repory.png";

interface MenuItem {
  icon?: string | React.ComponentType;
  label: string;
  route: string;
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
      },
      {
        icon: orders,
        label: "Orders",
        route: "/orders",
      },
      {
        icon: payments,
        label: "Payments",
        route: "/payments",
      },
      {
        icon: services,
        label: "Services",
        route: "/services",
      },
      {
        icon: customers,
        label: "Customer",
        route: "/customers",
      },
      {
        icon: employees,
        label: "Employees",
        route: "/employees",
      },
      {
        icon: ClipboardMinus,
        label: "Reports",
        route: "/reports",
      },
    ],
  },
];

export default MenuGroupsData;
