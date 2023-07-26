import { createBrowserRouter } from "react-router-dom";
import { App } from "../App";
import { Children } from "react";
import { HomeScreen, ProfileScreen, VerifyScreen } from "../screens";

export const routerConfig = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomeScreen />,
      },
      {
        path: "/profile/:id",
        element: <ProfileScreen />,
      },
      {
        path: "/verify",
        element: <VerifyScreen />,
      },
    ],
  },
]);
