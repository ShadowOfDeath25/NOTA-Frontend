import {createBrowserRouter} from "react-router-dom";
import type {RouteObject} from 'react-router'
import authRoutes from "@routes/auth";
import appRoutes from '@routes/app'
import Authenticated from "./guards/Authenticated.tsx";
import Guest from "@guards/Guest.tsx";
import GuestLayout from "./layouts/GuestLayout/GuestLayout.tsx";
import GettingStartedPage from "@pages/auth/GettingStartedPage/GettingStartedPage.tsx";


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
            {
                element: <GuestLayout/>,
                children: [
                    ...authRoutes,
                ]
            }
        ]
    },
    {
        element: <Authenticated/>,
        children: [
            {
                element: <GuestLayout/>,
                children: [
                    {
                        path: "/getting-started",
                        element: <GettingStartedPage/>
                    }
                ]
            }
        ]
    }


]

export const router = createBrowserRouter(routes);

