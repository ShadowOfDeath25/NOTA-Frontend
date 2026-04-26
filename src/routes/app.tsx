import type {RouteObject} from "react-router";
import Homepage from "@pages/HomePage/HomePage.tsx";
import App from "../App.tsx";

const routes: RouteObject[] = [

    {
        path: "/",
        element: <Homepage/>
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

]

export default routes;