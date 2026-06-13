import {useAuth} from "@hooks/api/useAuth.ts";
import {Navigate, Outlet, useLocation, useSearchParams} from "react-router-dom";
import LoadingScreen from "@components/LoadingScreen/LoadingScreen";

export default function Guest() {
    const {user} = useAuth();
    const location = useLocation();
    const [searchParams] = useSearchParams();

    if (user.isLoading) {
        return <LoadingScreen />;
    }

    if (user.data) {
        const redirect = searchParams.get("redirect");
        if (redirect && redirect.startsWith("/")) {
            return <Navigate to={redirect} replace/>;
        }
        if (location.pathname === "/signup") {
            return <Navigate to="/getting-started" replace/>;
        }
        return <Navigate to="/home" replace/>;
    }

    return <Outlet/>;
}

