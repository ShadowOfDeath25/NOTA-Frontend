import styles from "./NewPassword.module.css";
import { InputForm } from "../InputForm/InputForm";
import { useState } from "react";
import MessageCard from "../../MessageCard/MessageCard";
import {useTranslation} from "react-i18next";

export function NewPassword({handleBackToLogin}: {handleBackToLogin: () => void}) {
    const {t} = useTranslation();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showSuccess, setShowSuccess] = useState(false);
    const handleNewPassword = () => {
        console.log("New Password");
        setShowSuccess(true);
    };
    return (
        <div className={styles.container}>
        <h3 className={styles.title}>{t("reset_password", "Rest Password")}</h3>

        {showSuccess ? <MessageCard
        message="Enter your email address and we'll send you a link to reset your password."
        /> : (
            <>
            <form className={styles.authForm} onSubmit={(e) => e.preventDefault()}>
        <InputForm
        label={t("new_password", "New Password")}
        id="newPassword"
        type="password"
        placeholder={t("enter_new_password", "Enter your new password")}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        />
        <InputForm
        label={t("confirm_new_password", "Confirm New Password")}
        id="confirmNewPassword"
        type="password"
        placeholder={t("enter_confirm_new_password", "Enter your confirm new password")}
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button type="submit" className={` ${styles.buttonSubmit} btn btnPrimary bodyTextSm`}  onClick={() => {handleNewPassword()}}>
            {t("reset_password", "Reset Password")}
        </button>
        <button type="button" className={`${styles.backToLogin} bodyTextSm btn`} onClick={() => {handleBackToLogin()}}>
            {t("back_to_login", "Back to Login")}
        </button>
        </form>
        </>
        )}

        </div>
    );
}
export default NewPassword;
