import {useAuth} from "@hooks/api/useAuth.ts";
import {Navigate, Outlet} from "react-router-dom";
import type {ReactNode} from "react";

export default function Authenticated({fallback = <h1>Loading ....</h1>}: { fallback?: ReactNode | string }) {

    const {user} = useAuth();
    if (user.isLoading) {
        return fallback;
    }

    if (!user.data) {
        return <Navigate to="/login" replace/>;
    }
    return <Outlet/>

}

