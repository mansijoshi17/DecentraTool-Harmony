import { Navigate, useRoutes } from "react-router-dom";
// layouts
import DashboardLayout from "./layouts/dashboard";
import LendingPageLayout from "./layouts/LendingPageLayout";
//

import DashboardApp from "./pages/DashboardApp";

import NotFound from "./pages/Page404";
import Role from "./pages/Role";
import UserProfile from "./layouts/dashboard/UserProfile";
import Profile from "./pages/Profile";

import Lending from "./LendingPage/Lending";

import Members from "./pages/Members";

import Subscription from "./pages/Subscribtion";
import Membership from "./pages/Membership";
import Drive from "./pages/Drive"; 
import Payroll from "./pages/Payroll"; 
import WhistleBlower from "./pages/WhistleBlower";

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: "/dashboard",
      element: <DashboardLayout />,
      children: [
        // { path: "app", element: <DashboardApp /> },
        { path: "userProfile", element: <UserProfile /> },
        { path: "administration/role", element: <Role /> },
        // { path: "send-request", element: <SendRequest /> },
        { path: "administration/membership", element: <Membership /> },
        { path: "administration/members", element: <Members /> },
        { path: "drive", element: <Drive /> },
        { path: "support/whistleBlower", element: <WhistleBlower /> },
        { path: "subscriptions", element: <Subscription /> },
        { path: "payroll", element: <Payroll /> },
      ],
    },

    // {
    //   path: "/dashboard/invoice/invoicedetail",
    //   element: <InvoiceDetail />,
    //   //   children: [{ path: "/invoicedetail", element: <InvoiceDetail /> }],
    // },

    {
      path: "/",
      element: <LendingPageLayout />,
      children: [
        { path: "/", element: <Lending /> },
        { path: "/:name", element: <Profile /> },
      ],
    },
    { path: "*", element: <Navigate to="/404" replace /> },

    { path: "404", element: <NotFound /> },
    { path: "*", element: <Navigate to="/404" /> },
  ]);
}
