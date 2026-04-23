import styles from "./SocialButtons.module.css";
import googleIcon from "@assets/icons/google.svg";
import appleIcon from "@assets/icons/apple.svg";
import microsoftIcon from "@assets/icons/microsoft.svg";
import { useTranslation } from "react-i18next";

const SocialButtons = () => {
    const { t } = useTranslation();
    return (
    <>
    <div className={styles.divider}>
        <span>{t("or_continue_with","OR CONTINUE WITH")}</span>
        </div>
    <div className={styles.socialContainer}>
        <button className={styles.socialButton}><img src={googleIcon} alt="Google" /></button>
        <button className={styles.socialButton}><img src={appleIcon} alt="Apple" /></button>
        <button className={styles.socialButton}><img src={microsoftIcon} alt="Microsoft" /></button>
    </div>
    </>
);
}

export default SocialButtons;
