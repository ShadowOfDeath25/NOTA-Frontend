import type {RouteObject} from "react-router";

import App from "../App.tsx";

const routes: RouteObject[] = [

    {
        path: "/",
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

]

export default routes;