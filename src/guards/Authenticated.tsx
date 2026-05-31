import {useAuth} from "@hooks/api/useAuth.ts";
import {Navigate, Outlet} from "react-router-dom";
import LoadingScreen from "@components/LoadingScreen/LoadingScreen";

export default function Authenticated() {
    const {user} = useAuth();

    if (user.isLoading) {
        return <LoadingScreen />;
    }

    if (!user.data) {
        return <Navigate to="/login" replace/>;
    }
    return <Outlet/>;
}
