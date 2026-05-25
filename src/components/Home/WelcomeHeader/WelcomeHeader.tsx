import styles from "./WelcomeHeader.module.css"
import CloudIcon from "@assets/icons/cloud.svg?react"
import BellIcon from "@assets/icons/bell.svg?react"
import { useTranslation } from "react-i18next"
const WelcomeHeader = () => {
    const { t } = useTranslation()
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
            <div className={styles.notification} onClick={()=>alert("hello")}>
                <BellIcon/>
                <span className={styles.badge}>3</span>
            </div>


        </div>
    )
}

export default WelcomeHeader