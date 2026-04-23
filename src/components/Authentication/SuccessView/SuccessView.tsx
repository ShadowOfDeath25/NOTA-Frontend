import styles from "./SuccessView.module.css";
// @ts-ignore
import SuccessIcon from "@assets/icons/success.svg?react";
import { useTranslation } from "react-i18next";

const SuccessView = () => {
    const { t } = useTranslation();
    return (
    <div className={styles.container}>
        <div className={styles.iconContainer}>
            <SuccessIcon className={styles.icon} />
        </div>
        <h3 className={` ${styles.title}`}>{t("Account_Created_Successfully","Account Created Successfully!")}</h3>
        <p className={`bodyText ${styles.description}`}>{t("success_description","Your account has been created. You can now start taking notes.")}</p>
        <button className={`btn btnPrimary bodyTextSm ${styles.button}`}>{t("Get_Started","Get Started")}</button>
    </div>
    );
}

export default SuccessView;