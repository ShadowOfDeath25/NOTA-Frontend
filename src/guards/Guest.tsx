import {useAuth} from "@hooks/api/useAuth.ts";
import {Navigate, Outlet, useLocation} from "react-router-dom";
import LoadingScreen from "@components/LoadingScreen/LoadingScreen";

export default function Guest() {
    const {user} = useAuth();
    const location = useLocation();

    if (user.isLoading) {
        return <LoadingScreen />;
    }

    if (user.data) {
        if (location.pathname === "/signup") {
            return <Navigate to="/getting-started" replace/>;
        }
        return <Navigate to="/" replace/>;
    }

    return <Outlet/>;
}

