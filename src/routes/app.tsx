import type {RouteObject} from "react-router";
import Homepage from "@pages/HomePage/HomePage.tsx";
import MainLayout from "../layouts/MainLayout/MainLayout.tsx";
import App from "../App.tsx";
import { Navigate } from "react-router-dom";
import SettingsPage from "@pages/SettingsPage/SettingsPage.tsx";
import TrashPage from "@pages/TrashPage/TrashPage.tsx";
import NotePage from "@pages/NotePage/NotePage.tsx";

const routes: RouteObject[] = [

    {
        path: "/",
        element: <MainLayout/>,
        children: [
            { index: true, element: <Navigate to="/home" replace /> },
            { path: "/home",element: <Homepage/>},
            { path: "spaces", element: <App/>},
            { path: "summarize", element: <App/>},
            { path: "/import-pdf", element: <App/>},
            { path: "/settings", element: <SettingsPage/>},
            { path: "/trash", element: <TrashPage/>},
            { path: "/notes/:noteId", element: <NotePage />},
        ]
    },



]

export default routes;