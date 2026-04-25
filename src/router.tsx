import App from "./App.tsx";
import {createBrowserRouter} from "react-router-dom";
import type {RouteObject} from 'react-router'
import authRoutes from "@routes/auth";

export const routes: RouteObject[] = [
    ...authRoutes,
    {
        path: "/home",
        element: <App/>
    },
    {
        path: "/spaces",
        element: <App/>
    },
    {
        path: "summarize",
        element: <App/>
    },
    {
        path: "import-pdf",
        element: <App/>
    },
    {
        path: "settings",
        element: <App/>
    },
    {
        path: "trash",
        element: <App/>
    },

]

export const router = createBrowserRouter(routes);

