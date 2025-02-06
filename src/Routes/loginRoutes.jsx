import React, { lazy } from "react";
import { nanoid } from "nanoid";
const LoginDashboard = lazy(() => import("../Components/LoginDashboard/LoginDashboard"));
const MainChatViewPage = lazy(() => import("../View/MainChatView/MainChatViewPage"));

const loginRoutes = [
    {
      id: nanoid(),
      path: "home",
      name: "Home",
      component: <LoginDashboard />,
    },{
      id: nanoid(),
      path: "chat",
      name: "Chat",
      component: <MainChatViewPage />,
    },
];

export { loginRoutes };
