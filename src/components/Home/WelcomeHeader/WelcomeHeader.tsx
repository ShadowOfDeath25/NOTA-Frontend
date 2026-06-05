import styles from "./WelcomeHeader.module.css"
import CloudIcon from "@assets/icons/cloud.svg?react"
import BellIcon from "@assets/icons/bell.svg?react"
import {useEffect, useState} from "react";

const WelcomeHeader = () => {
    const [events, setEvents] = useState([]);
    useEffect(() => {
        const channel = echo.private(`App.Models.User.${userId}`);

        channel
            .listen(".note.summarized", (e) => {
                setEvents((prev) => [...prev, {type: "success", payload: e}]);
            })
            .listen(".note.summarization_failed", (e) => {
                setEvents((prev) => [...prev, {type: "error", payload: e}]);
            });

        return () => echo.leave(`users.${userId}`);
    }, []);
    return (
        <div className={styles.container}>
            <div className={styles.welcome}>
                <h1>Welcome back!</h1>
                <div className={styles.synced}>
                    <div className={styles.cloudIcon}>
                        <CloudIcon/>
                    </div>
                    <p className="bodyTextSm"> All changes synced</p>
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