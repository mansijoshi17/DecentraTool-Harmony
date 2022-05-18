// component
import Iconify from "../../components/Iconify";
import SideNav from "../../LendingPage/sideNavbar"

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const sidebarConfig = [
  //   {
  //     title: "Crypto Payment",
  //     icon: getIcon("fluent:payment-20-filled"),
  //   path: "/dashboard/role",

  // },
  //   {
  //     title: "Escrow Agreement",
  //     icon: getIcon("icon-park-outline:agreement"),
  //     path: "/dashboard/role",

  //   },
  {
    title: "Administration",
    icon: getIcon("icon-park-outline:user"),
    key: "administration",
    children: [
      {
        title: "Role",
        path: "/dashboard/administration/role",
      },
      {
        title: "Membership",
        path: "/dashboard/administration/membership",
      },
      {
        title: "Members",
        path: "/dashboard/administration/members",
      },
    ],
  },
  {
    title: "DAO Pay",
    icon: getIcon("fluent:wallet-credit-card-24-filled"),
    key: "dAOPay",
    children: [
      {
        title: "Pay Roll",
        path: "/dashboard/payroll",
      },
    ],
  },
  {
    title: "DAO Drive",
    icon: getIcon("icon-park-outline:cloud-storage"),
    key: "daodrive",
    path: "/dashboard/drive",
  },
  {
    title: "DAO Support",
    icon: getIcon("eva:people-fill"),
    children: [
      {
        title: "Whistle Blower",
        path: "/dashboard/support/whistleBlower",
      },
    ],
  },

  // {
  //   title: "Analytics",
  //   path: "/dashboard/app",
  //   key: "analytics",
  //   icon: getIcon("eva:pie-chart-2-fill"),
  // },

  // {
  //   title: "login",
  //   path: "/login",
  //   icon: getIcon("eva:lock-fill"),
  // },

  // {
  //   title: "register",
  //   path: "/register",
  //   icon: getIcon("eva:person-add-fill"),
  // },
  // {
  //   title: "Not found",
  //   path: "/404",
  //   icon: getIcon("eva:alert-triangle-fill"),
  // },
];

export default sidebarConfig;
