import App from "./App.tsx";
import {createBrowserRouter} from "react-router-dom";
import type {RouteObject} from 'react-router'

export const routes: RouteObject[] = [
    {
        path: "/",
        element: <App/>
    },
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

