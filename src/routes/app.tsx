    import type {RouteObject} from "react-router";
    import Homepage from "@pages/HomePage/HomePage.tsx";
    import MainLayout from "../layouts/MainLayout/MainLayout.tsx";
    import App from "../App.tsx";
    import { Navigate } from "react-router-dom";
    import SettingsPage from "@pages/SettingsPage/SettingsPage.tsx";
    import TrashPage from "@pages/TrashPage/TrashPage.tsx";
    import NotePage from "@pages/NotePage/NotePage.tsx";
    import SpacesPage from "@pages/SpacesPage/SpacesPage.tsx";
    import SpaceDetailPage from "@pages/SpaceDetailPage/SpaceDetailPage.tsx";
    import SpaceSettingsPage from "@pages/SpaceSettingsPage/SpaceSettingsPage.tsx";
    import SummarizePage from "@pages/SummarizePage/SummarizePage.tsx";
    import AllNotesPage from "@pages/AllNotesPage/AllNotesPage.tsx";

    const routes: RouteObject[] = [
        {
            path: "/",
            element: <MainLayout/>,
            children: [
                { index: true, element: <Navigate to="/home" replace /> },
                { path: "/home", element: <Homepage/> },
                { path: "spaces", element: <SpacesPage/> },
                { path: "spaces/:spaceId", element: <SpaceDetailPage/> },
                { path: "spaces/:spaceId/settings", element: <SpaceSettingsPage/> },
                { path: "summarize", element: <SummarizePage/> },
                { path: "/import-pdf", element: <App/> },
                { path: "/settings", element: <SettingsPage/> },
                { path: "/trash", element: <TrashPage/> },
                { path: "notes", element: <AllNotesPage/> },

            ]
        },

        {
            path: "/notes/:noteId",
            element: <NotePage />,
        }
    ]

    export default routes;