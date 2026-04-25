
import type {RouteObject} from "react-router";
import LoginPage from "@pages/auth/LoginPage/LoginPage.tsx";
import SignupPage from "@pages/auth/SignupPage/SignupPage.tsx";
import ResetPasswordPage from "@pages/auth/ResetPasswordPage/RestPasswordPage.tsx";
import NewPasswordPage from "@pages/auth/NewPasswordPage/NewPasswordPage.tsx";

const routes: RouteObject[] = [
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

export default routes;