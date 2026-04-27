import styles from "./ResetPassword.module.css";
import {InputForm} from "../InputForm/InputForm";
import {useState} from "react";
import MessageCard from "../../MessageCard/MessageCard";
import {useTranslation} from "react-i18next";
import validation from "@validators/auth.schema";
import * as React from "react";
import {AxiosClientRaw, AxiosClientV1} from "../../../axiosClient.ts";
import {AxiosError} from "axios"

export function ResetPassword({handleBackToLogin}: { handleBackToLogin: () => void }) {
    const {t} = useTranslation();
    const handleSendResetLink = async () => {
        if (validation.fields.email.safeParse(email).success) {
            await AxiosClientRaw.get("/csrf-cookie")
            try {

                const response = await AxiosClientV1.post("/forgot-password", {email: email})
                if (response.status === 200) {
                    setEmailSend(true)
                }
            } catch (error: unknown) {
                if (error instanceof AxiosError) {
                    setErrorMessage(
                        error.response?.data?.errors?.email || error.response?.data?.message
                    )
                } else {
                    setErrorMessage(t("something_went_wrong", "Something went wrong"))
                }
            }

        } else {
            setErrorMessage(t("invalid_email_address", "Invalid Email Address"))

        }
    };
    const [errorMessage, setErrorMessage] = useState("");
    const [email, setEmail] = useState("");
    const [emailSend, setEmailSend] = useState(false);
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setErrorMessage("")
        setEmail(e.target.value)
    }
    return (
        <div className={styles.container}>
            <h3 className={styles.title}>{t("reset_password", "Reset Password")}</h3>
            {emailSend &&
                <MessageCard message={t("password_reset_link_sent", "Password reset link sent to your email")}/>}
            {!emailSend && (<>
                <form className={styles.authForm} onSubmit={(e) => e.preventDefault()}>
                    <InputForm
                        label={t("email", "Email")}
                        id="email"
                        type="text"
                        placeholder="Enter your email"
                        value={email}
                        onChange={onChange}
                        error={errorMessage}

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