import styles from "./WelcomeHeader.module.css"
import CloudIcon from "@assets/icons/cloud.svg?react"
import BellIcon from "@assets/icons/bell.svg?react"
import { useTranslation } from "react-i18next"
import {useEffect, useState} from "react";
import {useAuth} from "@hooks/api/useAuth.ts";
import {echo} from "../../../echo.ts";

const WelcomeHeader = () => {
    const { t } = useTranslation()
    const [events, setEvents] = useState([]);
    const {user} = useAuth()
    const userId = user?.data?.id
    console.log('subscribing to reverb ');
    useEffect(() => {
        if (!userId) return

        const channel = echo.private(`App.Models.User.${userId}`)

        channel.listen(".note.summarized", (e) => {
            console.log(e);
            console.log("summary success");
        })

        channel.listenToAll((e) => {
            console.log(e)
            console.log("event received");
        })
        channel.listen(".note.summarization_failed", (e) => {
            console.log(e);
            console.log("summary failed")
        })

        channel.error((error) => {
            console.error("Channel subscription error:", error)
        })

        return () => {
            echo.leave(`App.Models.User.${userId}`)
        }
    }, [userId])

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