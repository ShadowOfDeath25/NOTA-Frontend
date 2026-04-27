import styles from "./WelcomeHeader.module.css"
import CloudIcon from "@assets/icons/cloud.svg?react"
import BellIcon from "@assets/icons/bell.svg?react"

const WelcomeHeader = () => {
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
            <div className={styles.notification} onClick={()=>alert("hello")}>
                <BellIcon/>
                <span className={styles.badge}>3</span>
            </div>


        </div>
    )
}

export default WelcomeHeader