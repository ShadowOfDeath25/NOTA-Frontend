import App from "./App.tsx";
import {createBrowserRouter} from "react-router-dom";
import type {RouteObject} from 'react-router'
import LoginPage from "./pages/auth/LoginPage/LoginPage.tsx";
import SignupPage from "./pages/auth/SignupPage/SignupPage.tsx";
import ResetPasswordPage from "./pages/auth/ResetPasswordPage/RestPasswordPage.tsx";
import NewPasswordPage from "./pages/auth/NewPasswordPage/NewPasswordPage.tsx";
export const routes: RouteObject[] = [
    {
        path: "/",
        element: <LoginPage/>
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
    {
        path: "/login",
        element: <LoginPage/>
    },
    {
        path: "/signup",
        element: <SignupPage/>
    },
    {
        path: "/forgot-password",
        element: <ResetPasswordPage/>
    },
    {
        path: "/new-password",
        element: <NewPasswordPage/>
    }
]

export const router = createBrowserRouter(routes);

