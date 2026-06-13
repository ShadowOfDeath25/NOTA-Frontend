import {createBrowserRouter} from "react-router-dom";
import type {RouteObject} from 'react-router'
import authRoutes from "@routes/auth";
import appRoutes from '@routes/app'
import landingRoutes from "@routes/landing.tsx";
import Authenticated from "./guards/Authenticated.tsx";
import Guest from "@guards/Guest.tsx";
import GuestLayout from "./layouts/GuestLayout/GuestLayout.tsx";
import GettingStartedPage from "@pages/auth/GettingStartedPage/GettingStartedPage.tsx";
import JoinPage from "@pages/JoinPage/JoinPage.tsx";
import NotFoundPage from "@pages/NotFoundPage/NotFoundPage.tsx";


export const routes: RouteObject[] = [
    {
        path: "/join/:token",
        element: <JoinPage />,
    },
    {
        element: <Guest/>,
        children: [
            ...landingRoutes,
        ]
    },
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
    },
    {
        path: "*",
        element: <NotFoundPage />
    }

]

export const router = createBrowserRouter(routes);

