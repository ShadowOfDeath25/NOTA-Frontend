import styles from "./SocialButtons.module.css";
import googleIcon from "@assets/icons/google.svg";
import appleIcon from "@assets/icons/apple.svg";
import microsoftIcon from "@assets/icons/microsoft.svg";
import {useTranslation} from "react-i18next";
import * as React from "react";


const SocialButtons = () => {
    const {t} = useTranslation();

    const redirect = (e: React.MouseEvent<HTMLButtonElement>) => {

        window.location.href = `${import.meta.env.VITE_API_BASE_URL}/auth/social/${e.currentTarget.id}/redirect`
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
                <button id={"apple"} onClick={redirect} className={styles.socialButton}>
                    <img src={appleIcon} alt="Apple"/>
                </button>
                <button id={"microsoft"} onClick={redirect} className={styles.socialButton}>
                    <img src={microsoftIcon} alt="Microsoft"/>
                </button>
            </div>
        </>
    );
}

export default SocialButtons;
