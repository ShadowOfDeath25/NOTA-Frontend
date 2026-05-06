 import styles from './Settings.module.css'
 import profile from "../../assets/image/imageProfile.png";
 import WorldIcon from "@assets/icons/world.svg?react";
 import DarkIcon from "@assets/icons/dark.svg?react";
 import LightIcon from "@assets/icons/light.svg?react";
 import ToggleButton from '../ToggleButton/ToggleButton';
 import NotificationIcon from "@assets/icons/notification.svg?react";
 import LockIcon from "@assets/icons/Lock.svg?react";
 import LogoutIcon from "@assets/icons/logout.svg?react";
 import {useAuth} from "@hooks/api/useAuth.ts";
 import { useTranslation } from "react-i18next";
 import { Switch } from '@mui/material';
 import { useState } from "react";
import { useSettings } from "../../context/SettingsContext.tsx";

function Settings() {
    const {logout} = useAuth();
    const handleLogout = () => {
        logout.mutate();
    };
    const { t } = useTranslation();
  
    const [isEmailNotificationsOn, setIsEmailNotificationsOn] = useState(true);
    const [isPushNotificationsOn, setIsPushNotificationsOn] = useState(true);
    const [isTwoFactorAuthenticationOn, setIsTwoFactorAuthenticationOn] = useState(false );
    const { lang, setLang, theme, setTheme } = useSettings();

    const toggleLang = (lang: string) => {
        setLang(lang);
    };
    return (
        <div className="container">
            {/* Header */}
            <h1>{t("settings", "Settings")}</h1>
           {/* Acconut Settings */}
           <div className={styles.section}>
            <h3 className={styles.title}>{t("account", "Account")}</h3>
            <div className={styles.row}>
                <div className={styles.basicInfo}>
                   <div className={styles.avatar}>
                    <img src={profile} alt="" />
                   </div>
                   <div className={styles.info}>
                   <h5>Mahmoud</h5>
                   <p className={styles.email}>mahmoud@gmail.com</p>
                    
                   </div>
                </div>
            </div>
        
            

            
           </div>
           {/* preferences section */}
           <div className={styles.section}>
            <h3 className={styles.title}>{t("preferences", "Preferences")}</h3>
            <div className={styles.row}>
                <div className={styles.language}>
                    <div className={styles.icon}>
                        <WorldIcon />
                    </div>
                    <div className={styles.info}>
                        <p>{t("language", "Language")}</p>
                        <p className={styles.email}>{lang=== 'en'?'English':'العربية'}</p>
                    </div>

                </div>
                    <div className={styles.toggleLang}>
                        <ToggleButton 
                        options={[
                            { label: "English", value: "en" },
                            { label: "العربية", value: "ar" },
                        ]} 
                        activeValue={lang} 
                        onChange={toggleLang} 
                        />
                    </div>
            </div>
            <div className={styles.divider}></div>
            <div className={styles.row}>
                <div className={styles.theme}>
                    <div className={styles.icon}>
                      {theme=== 'light'? <LightIcon /> : <DarkIcon />}
                       
                    </div>
                    <div className={styles.info}>
                        <p>{t("theme", "Theme")}</p>
                        <p className={styles.email}>{theme=== 'light'?t("light", "Light"):t("dark", "Dark")}</p>
                    </div>

                </div>
                     <div className={styles.themeToggle}>
                        <ToggleButton 
                        options={[
                            { label: t("dark", "Dark"), value: "dark" },
                            { label: t("light", "Light"), value: "light" },
                        ]} 
                        activeValue={theme} 
                        onChange={setTheme} 
                        />
                    </div>
            </div>




           </div>
           {/* notifications section */}
           <div className={styles.section}>
            <h3 className={styles.title}>{t("notifications", "Notifications")}</h3>
            <div className={styles.row}>
                <div className={styles.emailNotification}>
                    <div className={styles.icon}>
                        <NotificationIcon />
                    </div>
                    <div className={styles.info}>
                        <p>{t("email_notifications", "Email Notifications")}</p>
                        <p className={styles.description}>{t("notification_description", "Receive updates about your notes")}</p>
                    </div>
                </div>
                <Switch checked={isEmailNotificationsOn} onChange={(e) => setIsEmailNotificationsOn(e.target.checked) } className={styles.switch} />
                


               
                
            </div>
            <div className={styles.divider}></div>
            <div className={styles.row}>
                <div className={styles.emailNotification}>
                    <div className={styles.icon}>
                        <NotificationIcon />
                    </div>
                    <div className={styles.info}>
                        <p>{t("push_notifications", "Push Notifications")}</p>
                        <p className={styles.description}>{t("push_description", "Get notified about updates in real-time")}</p>
                    </div>
                </div>

               <Switch checked={isPushNotificationsOn} onChange={(e) => setIsPushNotificationsOn(e.target.checked)} className={styles.switch} />
                    
            </div>




           </div>
           {/* Security and Privacy section */}
           <div className={styles.section}>
            <h3 className={styles.title}>{t("security_privacy", "Security and Privacy")}</h3>
            <div className={styles.row }>
             <button className={`${styles.changePasswordBtn} bodyTextSm` }>
                <div className={styles.icon}>
                    <LockIcon />
                </div>
                <span>{t("change_password", "Change Password")}</span></button>
            </div>
           <div className={`${styles.row} ${styles.securityRow}`}>
                <div className={styles.twoFactorAuth}>
                    <div className={styles.icon}>
                        <LockIcon />
                    </div>
                    <div className={styles.info}>
                        <p>{t("two_factor_authentication", "Two-Factor Authentication")}</p>
                        <p className={styles.description}>{t("add_extra_layer", "Add an extra layer of security to your account")}</p>
                    </div>
                </div>

               <Switch checked={isTwoFactorAuthenticationOn} onChange={(e) => setIsTwoFactorAuthenticationOn(e.target.checked)} className={styles.switch} />
                    
            </div>




           </div>

          
            <button className={`${styles.logoutBtn} bodyTextSm` } onClick={handleLogout}>
                <div className={styles.icon}>
                    <LogoutIcon />
                </div>
                <span>{t("logout", "Logout")}</span>
            </button>
        </div>
       
    )
 }   

 export default Settings