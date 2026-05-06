import styles from "./HeaderAuthentication.module.css";
// @ts-ignore
import WorldIcon from "@assets/icons/world.svg?react";
// @ts-ignore
import LightIcon from "@assets/icons/light.svg?react";
import { useSettings } from "../../../context/SettingsContext";
import { useTranslation } from "react-i18next";
function HeaderAuthentication() {
    const { t } = useTranslation();
    const { setLang, lang } = useSettings();
    const handleLanguageChange = () => {
        const newLang = lang === "ar" ? "en" : "ar";
        setLang(newLang);
    }
    return (
        <div className={styles.header}>
        <div className={styles.logoContainer}>
          <h1 className={styles.logo}>Nota</h1>
          <p className={`${styles.logoDescription} bodyText`}>
            {t("AI_Powered_Note_Taking_Platform","AI-Powered Note-Taking Platform")}
          </p>
        </div>
        <div className={styles.containerButtonIcon}>
          <button className={styles.iconButton}>
            <WorldIcon className={styles.icon} onClick={handleLanguageChange}/>
          </button>
          <button className={styles.iconButton} >
            <LightIcon className={styles.icon}/>
          </button>
        </div>
      </div>
    );
}
export default HeaderAuthentication;