import type {ReactNode} from "react";
import {useAuth} from "@hooks/api/useAuth.ts";
import {Navigate, Outlet, useLocation} from "react-router-dom";

export default function Guest({fallback = <h1>Loading ....</h1>}: { fallback?: ReactNode | string }) {
    const {user} = useAuth();
    const location = useLocation()
    if (user.isLoading) {
        return fallback;
    }


    if (user.data) {
        if (location.pathname === "/signup") {
            return <Navigate to="/getting-started" replace/>;
        }
        return <Navigate to="/" replace/>;
    }

    return <Outlet/>;


}

