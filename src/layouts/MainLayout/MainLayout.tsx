import { useState } from "react";
import { Outlet } from "react-router";
import styles from "./styles.module.css"
import Sidebar from "@components/Sidebar/Sidebar"
import TopBar from "@components/TopBar/TopBar"

const MainLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => setIsSidebarOpen(prev => !prev);

    return (
      <div className={styles.mainContainer}>
            <TopBar onMenuClick={toggleSidebar} isSidebarOpen={isSidebarOpen} />
            <Sidebar isSidebarOpen={isSidebarOpen} onToggle={toggleSidebar} />
            <Outlet />
        </div>
    );
};

export default MainLayout;