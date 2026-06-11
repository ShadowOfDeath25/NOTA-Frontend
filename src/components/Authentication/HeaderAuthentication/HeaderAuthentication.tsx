import styles from "./HeaderAuthentication.module.css";
// @ts-ignore
import WorldIcon from "@assets/icons/world.svg?react";
// @ts-ignore
import LightIcon from "@assets/icons/light.svg?react";
// @ts-ignore
import DarkIcon from "@assets/icons/dark.svg?react";
import { useSettings } from "../../../context/SettingsContext";
import { useTranslation } from "react-i18next";

function HeaderAuthentication() {
    const { t } = useTranslation();
    const { setLang, lang, theme, setTheme } = useSettings();

    const handleLanguageChange = () => {
        const newLang = lang === "ar" ? "en" : "ar";
        setLang(newLang);
    };

    const handleThemeChange = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    };

    return (
        <div className={styles.header}>
            <div className={styles.logoContainer}>
                <h1 className={styles.logo}>Nota</h1>
                <p className={`${styles.logoDescription} bodyText`}>
                    {t("AI_Powered_Note_Taking_Platform", "AI-Powered Note-Taking Platform")}
                </p>
            </div>
            <div className={styles.containerButtonIcon}>
                <button className={styles.iconButton} onClick={handleLanguageChange} aria-label="Change language">
                    <WorldIcon className={styles.icon} />
                </button>
                <button className={styles.iconButton} onClick={handleThemeChange} aria-label="Toggle theme">
                    {theme === "dark"
                        ? <LightIcon className={styles.icon} />
                        : <DarkIcon className={styles.icon} />
                    }
                </button>
            </div>
        </div>
    );
}

export default HeaderAuthentication;