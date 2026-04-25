import {createBrowserRouter} from "react-router-dom";
import type {RouteObject} from 'react-router'
import authRoutes from "@routes/auth";
import appRoutes from '@routes/app'
import Authenticated from "./guards/Authenticated.tsx";
import Guest from "@guards/Guest.tsx";

export const routes: RouteObject[] = [
    {
        element: <Authenticated/>,
        children: [
            ...appRoutes
        ]
    },
    {
        element: <Guest/>,
        children: [

            ...authRoutes,
        ]
    }

]

export const router = createBrowserRouter(routes);

