import styles from "./SocialButtons.module.css";
import googleIcon from "@assets/icons/google.svg";
import {useTranslation} from "react-i18next";
import * as React from "react";


const SocialButtons = () => {
    const {t} = useTranslation();

    const redirect = (e: React.MouseEvent<HTMLButtonElement>) => {

        window.location.href = `${import.meta.env.VITE_API_BASE_URL}/api/auth/social/${e.currentTarget.id}/redirect`
    }
    return (
        <>
            <div className={styles.divider}>
                <span>{t("or_continue_with", "OR CONTINUE WITH")}</span>
            </div>
            <div className={styles.socialContainer}>
                <button id={"google"} onClick={redirect} className={styles.socialButton}>
                    <img src={googleIcon} alt="Google"/>
                </button>

            </div>
        </>
    );
}

export default SocialButtons;
