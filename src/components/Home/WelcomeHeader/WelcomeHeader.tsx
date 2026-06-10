import styles from "./WelcomeHeader.module.css"
import CloudIcon from "@assets/icons/cloud.svg?react"
import BellIcon from "@assets/icons/bell.svg?react"
import { useTranslation } from "react-i18next"
import {useEffect, useState} from "react";
import {echo} from "../../../echo.ts";
import {useAuth} from "@hooks/api/useAuth.ts";

const WelcomeHeader = () => {
    const { t } = useTranslation()
    const [events, setEvents] = useState([]);
    const {user} = useAuth();
    useEffect(() => {
        const channel = echo.private(`App.Models.User.${user?.data?.id}`);

        channel
            .listen(".note.summarized", (e) => {
                setEvents((prev) => [...prev, {type: "success", payload: e}]);
            })
            .listen(".note.summarization_failed", (e) => {
                setEvents((prev) => [...prev, {type: "error", payload: e}]);
            });

        return () => echo.leave(`users.${user?.data?.id}`);
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.welcome}>
                <h1>{t("welcome_back","Welcome back!")}</h1>
                <div className={styles.synced}>
                    <div className={styles.cloudIcon}>
                        <CloudIcon/>
                    </div>
                    <p className="bodyTextSm"> {t("all_changes_synced","All changes synced")}</p>
                </div>
            </div>
            <div className={styles.notification} onClick={() => alert("hello")}>
                <BellIcon/>
                <span className={styles.badge}>3</span>
            </div>


        </div>
    )
}

export default WelcomeHeader