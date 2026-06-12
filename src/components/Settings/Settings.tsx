import { useState } from "react";
import styles from './Settings.module.css';
import profile from "../../assets/image/imageProfile.png";
import WorldIcon from "@assets/icons/world.svg?react";
import DarkIcon from "@assets/icons/dark.svg?react";
import LightIcon from "@assets/icons/light.svg?react";
import ToggleButton from '../ToggleButton/ToggleButton';
import NotificationIcon from "@assets/icons/notification.svg?react";
import LockIcon from "@assets/icons/Lock.svg?react";
import LogoutIcon from "@assets/icons/logout.svg?react";
import { useAuth } from "@hooks/api/useAuth.ts";
import { useTranslation } from "react-i18next";
import { Switch } from '@mui/material';
import { useSettings } from "@context/SettingsContext.tsx";
import { useUpdateSettings } from "@hooks/api/useUpdateSettings.ts";
import { useSnackbar } from "@components/Snackbar/SnackbarContext.tsx";
import type { UserSettings } from "@customTypes/User.ts";
import ChangePasswordModal from "./ChangePasswordModal/ChangePasswordModal";

function Settings() {
    const { t } = useTranslation();
    const { user, logout } = useAuth();
    const { lang, setLang, theme, setTheme } = useSettings();
    const { showSnackbar } = useSnackbar();
    const updateSettings = useUpdateSettings();
    const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);

    const settings = user.data?.settings;
    const emailNotificationsOn = settings?.email_notifications ?? false;
    const pushNotificationsOn  = settings?.push_notifications  ?? false;
    const twoFactorOn          = settings?.["2FA"]             ?? false;

    
    const handleSettingChange = (patch: Partial<UserSettings>) => {
        updateSettings.mutate(patch, {
            onSuccess: () => {
                showSnackbar({
                    type: "success",
                    message: t("settings_saved", "Settings saved"),
                });
            },
            onError: () => {
                showSnackbar({
                    type: "error",
                    message: t("settings_save_error", "Failed to save settings. Please try again."),
                });
            },
        });
    };

  
    const handleLangChange = (value: string) => {
        setLang(value);
        handleSettingChange({ language: value === "arabic" ? "arabic" : "english" });
    };

    // ── Theme ────────────────────────────────────────────────────────────
    const handleThemeChange = (value: string) => {
        setTheme(value);
        handleSettingChange({ theme: value as UserSettings["theme"] });
    };

    // ── Logout ───────────────────────────────────────────────────────────
    const handleLogout = () => logout.mutate();

    return (
        <div className="container">
            {/* Header */}
            <h1>{t("settings", "Settings")}</h1>

            {/* Account */}
            <div className={styles.section}>
                <h3 className={styles.title}>{t("account", "Account")}</h3>
                <div className={styles.row}>
                    <div className={styles.basicInfo}>
                        <div className={styles.avatar}>
                            <img src={profile} alt="" />
                        </div>
                        <div className={styles.info}>
                            <h5>{user.data?.name}</h5>
                            <p className={styles.email}>{user.data?.email}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Preferences */}
            <div className={styles.section}>
                <h3 className={styles.title}>{t("preferences", "Preferences")}</h3>

                {/* Language */}
                <div className={styles.row}>
                    <div className={styles.language}>
                        <div className={styles.icon}><WorldIcon /></div>
                        <div className={styles.info}>
                            <p>{t("language", "Language")}</p>
                            <p className={styles.email}>
                                {lang === "ar" ? "العربية" : "English"}
                            </p>
                        </div>
                    </div>
                    <div className={styles.toggleLang}>
                        <ToggleButton
                            options={[
                                { label: "English", value: "en" },
                                { label: "العربية", value: "ar" },
                            ]}
                            activeValue={lang}
                            onChange={handleLangChange}
                        />
                    </div>
                </div>

                <div className={styles.divider} />

                {/* Theme */}
                <div className={styles.row}>
                    <div className={styles.theme}>
                        <div className={styles.icon}>
                            {theme === "light" ? <LightIcon /> : <DarkIcon />}
                        </div>
                        <div className={styles.info}>
                            <p>{t("theme", "Theme")}</p>
                            <p className={styles.email}>
                                {theme === "light" ? t("light", "Light") : t("dark", "Dark")}
                            </p>
                        </div>
                    </div>
                    <div className={styles.themeToggle}>
                        <ToggleButton
                            options={[
                                { label: t("dark", "Dark"), value: "dark" },
                                { label: t("light", "Light"), value: "light" },
                            ]}
                            activeValue={theme}
                            onChange={handleThemeChange}
                        />
                    </div>
                </div>
            </div>

            {/* Notifications */}
            <div className={styles.section}>
                <h3 className={styles.title}>{t("notifications.title", "Notifications")}</h3>

                {/* Email notifications */}
                <div className={styles.row}>
                    <div className={styles.emailNotification}>
                        <div className={styles.icon}><NotificationIcon /></div>
                        <div className={styles.info}>
                            <p>{t("email_notifications", "Email Notifications")}</p>
                            <p className={styles.description}>
                                {t("notification_description", "Receive updates about your notes")}
                            </p>
                        </div>
                    </div>
                    <Switch
                        checked={emailNotificationsOn}
                        onChange={(e) =>
                            handleSettingChange({ email_notifications: e.target.checked })
                        }
                        className={styles.switch}
                        disabled={updateSettings.isPending}
                    />
                </div>

                <div className={styles.divider} />

                {/* Push notifications */}
                <div className={styles.row}>
                    <div className={styles.emailNotification}>
                        <div className={styles.icon}><NotificationIcon /></div>
                        <div className={styles.info}>
                            <p>{t("push_notifications", "Push Notifications")}</p>
                            <p className={styles.description}>
                                {t("push_description", "Get notified about updates in real-time")}
                            </p>
                        </div>
                    </div>
                    <Switch
                        checked={pushNotificationsOn}
                        onChange={(e) =>
                            handleSettingChange({ push_notifications: e.target.checked })
                        }
                        className={styles.switch}
                        disabled={updateSettings.isPending}
                    />
                </div>
            </div>

            {/* Security & Privacy */}
            <div className={styles.section}>
                <h3 className={styles.title}>{t("security_privacy", "Security and Privacy")}</h3>

                <div className={styles.row}>
                    <button
                        className={`${styles.changePasswordBtn} bodyTextSm`}
                        onClick={() => setIsChangePasswordOpen(true)}
                    >
                        <div className={styles.icon}><LockIcon /></div>
                        <span>{t("change_password", "Change Password")}</span>
                    </button>
                </div>

                <div className={`${styles.row} ${styles.securityRow}`}>
                    <div className={styles.twoFactorAuth}>
                        <div className={styles.icon}><LockIcon /></div>
                        <div className={styles.info}>
                            <p>{t("two_factor_authentication", "Two-Factor Authentication")}</p>
                            <p className={styles.description}>
                                {t("add_extra_layer", "Add an extra layer of security to your account")}
                            </p>
                        </div>
                    </div>
                    <Switch
                        checked={twoFactorOn}
                        onChange={(e) =>
                            handleSettingChange({ "2FA": e.target.checked })
                        }
                        className={styles.switch}
                        disabled={updateSettings.isPending}
                    />
                </div>
            </div>

            {/* Logout */}
            <button
                className={`${styles.logoutBtn} bodyTextSm`}
                onClick={handleLogout}
                disabled={logout.isPending}
            >
                <div className={styles.icon}><LogoutIcon /></div>
                <span>{t("logout", "Logout")}</span>
            </button>

            <ChangePasswordModal
                isOpen={isChangePasswordOpen}
                onClose={() => setIsChangePasswordOpen(false)}
                onSubmit={(data) => {
                    // TODO: Integrate actual password change API mutation here.
                    console.log("Change password submit:", data);
                    setIsChangePasswordOpen(false);
                    showSnackbar({
                        type: "success",
                        message: t("password_changed_success", "Password changed successfully"),
                    });
                }}
            />
        </div>
    );
}

export default Settings;
