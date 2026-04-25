import type {ReactNode} from "react";
import {useAuth} from "@hooks/api/useAuth.ts";
import {Navigate, Outlet} from "react-router-dom";

export default function Guest({fallback = <h1>Loading ....</h1>}: { fallback?: ReactNode | string }) {
    const {user} = useAuth();

    if (user.isLoading) {
        return fallback;
    }


    if (user.data) {
        return <Navigate to="/" replace/>;
    }

    return <Outlet/>;


}

