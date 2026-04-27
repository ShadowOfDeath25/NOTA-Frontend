import styles from "./LoginForm.module.css";
import {InputForm} from "@components/Authentication/InputForm/InputForm";
import {useState} from "react";
import {useTranslation} from "react-i18next";
import * as React from "react";
import type {LoginCredentials} from '@customTypes/LoginCredentials'
import {useAuth} from "@hooks/api/useAuth.ts";

function LoginForm({handleForgotPassword}: { handleForgotPassword: () => void }) {

    const {t} = useTranslation();
    const {login} = useAuth()
    const [formData, setFormData] = useState<LoginCredentials>({
        email: "",
        password: "",
    });
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {id, value} = e.target;
        if (login.isError) {
            login.reset();
        }
        setFormData((prev) => ({...prev, [id]: value}));
    };
    const handleSubmit = (e: React.SubmitEvent) => {
        e.preventDefault();
        login.mutate(formData);
    };
    return (
        <>
            <div className={styles.container}>
                <form className={styles.authForm} onSubmit={handleSubmit}>
                    <InputForm
                        label={t("email", "Email")}
                        id="email"
                        type="email"
                        placeholder={t("user@example.com", "user@example.com")}
                        value={formData.email}
                        onChange={handleChange}
                        error={login.error?.response?.data?.errors?.email?.[0]}
                        helperText={login.error?.response?.data?.errors?.email?.[0]}
                    />
                    <InputForm
                        label={t("password", "Password")}
                        id="password"
                        type="password"
                        placeholder={t("Enter your password", "Enter your password")}
                        value={formData.password}
                        onChange={handleChange}
                        error={login.error?.response?.data?.errors?.password?.[0]}
                        helperText={login.error?.response?.data?.errors?.password?.[0]}
                    />
                    <div className={styles.forgotPasswordContainer}>
                        <a href="#" className={`${styles.forgotPassword} bodyTextSm`} onClick={handleForgotPassword}>
                            {t("forgot_password", "Forgot Password?")}
                        </a>
                    </div>
                    <button type="submit" className={`${styles.buttonSubmit} btn btnPrimary bodyText`}>
                        {t("sign_in", "Log In")}
                    </button>
                </form>
            </div>

        </>
    );
}

export default LoginForm;
