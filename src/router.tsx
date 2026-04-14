import App from "./App.tsx";
import {createBrowserRouter} from "react-router";
import type {RouteObject} from 'react-router'

export const routes: RouteObject[] = [
    {
        path: "/",
        element: <App/>

    }
]

const router = createBrowserRouter(routes);

export default router;