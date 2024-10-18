interface MenuItem {
    icon?: string;
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
                icon: '/images/icon/dashboard-svgrepo-com.svg',
                label: "Dashboard",
                route: "/dashboard",
            },
            {
                icon: '/images/icon/order.svg',
                label: "Orders",
                route: "/orders",
            },
            {
                icon: '/images/icon/payment.svg',
                label: "Payments",
                route: "/payments",
            },
            {
                icon: '/images/icon/service.svg',
                label: "Services",
                route: "/services",
            },
            {
                icon: '/images/icon/customer.svg',
                label: "Customer",
                route: "/customers",
            },
            {
                icon: '/images/icon/employee.svg',
                label: "Employees",
                route: "/employees",
            },
        ],
    }
];

export default MenuGroupsData;
