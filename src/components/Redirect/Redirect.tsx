import {useEffect} from "react";

export function Redirect() {


    useEffect(() => {
        window.location.href = `${import.meta.env.VITE_API_BASE_URL}/api/auth/social/google/redirect`;
    }, []);
    return (<></>)
}

