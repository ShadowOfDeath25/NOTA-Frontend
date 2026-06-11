import { Outlet } from "react-router";
import LandingHeader from "@components/Landing/LandingHeader/LandingHeader.tsx";
import LandingFooter from "@components/Landing/LandingFooter/LandingFooter.tsx";
import styles from "./LandingLayout.module.css";

export default function LandingLayout() {
  return (
    <div className={styles.layout}>
      <LandingHeader />
      <main className={styles.main}>
        <Outlet />
      </main>
      <LandingFooter />
    </div>
  );
}
