import { Outlet } from "react-router";
import styles from "./styles.module.css"
import Sidebar from "@components/Sidebar/Sidebar"

const MainLayout = () => {
    return (
      <div className={styles.container}>
            <Sidebar/>
            <Outlet/>

        </div>
    );
};

export default MainLayout;