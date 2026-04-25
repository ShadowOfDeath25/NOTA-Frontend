import styles from "./ResetPassword.module.css";
import {InputForm} from "../InputForm/InputForm";
import {useState} from "react";
import MessageCard from "../../MessageCard/MessageCard";
import {useTranslation} from "react-i18next";

export function ResetPassword({handleBackToLogin}: { handleBackToLogin: () => void }) {
    const {t} = useTranslation();
    const handleSendResetLink = () => {
        setEmailSend(true);
    };
    const [email, setEmail] = useState("");
    const [emailSend, setEmailSend] = useState(false);

    return (
        <div className={styles.container}>
            <h3 className={styles.title}>{t("reset_password", "Rest Password")}</h3>
            {emailSend && <MessageCard message={t("password_reset_link_sent", "Password reset link sent to your email")}/>}
            {!emailSend && (<>
                <form className={styles.authForm} onSubmit={(e) => e.preventDefault()}>
                    <InputForm
                        label={t("email", "Email")}
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <div className={styles.buttonContainer}>
                        <button type="submit" className={`${styles.buttonSubmit} btn btnPrimary bodyTextSm`}
                                onClick={() => {
                                    handleSendResetLink()
                                }}>
                            {t("send_reset_link", "Send Reset Link")}
                        </button>
                        <button className={`${styles.backToLogin} bodyTextSm btn`} onClick={() => {
                            handleBackToLogin()
                        }}>
                            {t("back_to_login", "Back to Login")}
                        </button>
                    </div>
                </form>
            </>)}
        </div>
    );
}

export default ResetPassword;