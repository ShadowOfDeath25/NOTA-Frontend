import App from "./App.tsx";
import {createBrowserRouter} from "react-router-dom";
import type {RouteObject} from 'react-router'

export const routes: RouteObject[] = [
    {
        path: "/",
        element: <App/>

    }
]

export const router = createBrowserRouter(routes);

