import type { RouteObject } from "react-router";
import LandingLayout from "../layouts/LandingLayout/LandingLayout.tsx";
import LandingPage from "../pages/LandingPage/LandingPage.tsx";

const landingRoutes: RouteObject[] = [
  {
    element: <LandingLayout />,
    children: [
      { index: true, element: <LandingPage /> },
    ],
  },
];

export default landingRoutes;
