import styles from "./NewPassword.module.css";
import {InputForm} from "../InputForm/InputForm";
import {useState} from "react";
import MessageCard from "../../MessageCard/MessageCard";
import {useTranslation} from "react-i18next";
import {useSearchParams} from "react-router-dom";
import validation from '@validators/auth.schema';
import {AxiosClientRaw, AxiosClientV1} from "../../../axiosClient.ts";
import {AxiosError} from "axios"
import type {APIValidationError} from "@customTypes/APIValidationError.ts";
import {z} from 'zod'
import * as React from "react";

export function NewPassword({handleBackToLogin}: { handleBackToLogin: () => void }) {
    const {t} = useTranslation();
    const [showSuccess, setShowSuccess] = useState(false);
    const [formData, setFormData] = useState<Record<string, string>>({
        password: "",
        password_confirmation: ""
    });
    const [searchParams] = useSearchParams()
    const [validationErrors, setValidationErrors] = useState<APIValidationError>({
        message: "",
        errors: {} as Record<string, string[]>,
    });
    const handleNewPassword = async () => {
        const result = validation.schemas.newPassword.safeParse(formData)
        if (result.success) {
            await AxiosClientRaw.get("/csrf-cookie");

            try {
                await AxiosClientV1.post("/reset-password", {
                    password: formData.password,
                    password_confirmation: formData.password_confirmation,
                    token: searchParams.get("token"),
                    email: searchParams.get("email")
                })
                setShowSuccess(true)
            } catch (e: unknown) {
                if (e instanceof AxiosError) {
                    setValidationErrors(e?.response?.data)
                } else {
                    setValidationErrors({message: [t("something_went_wrong", "Something went wrong")], errors: {}})
                }
            }
        } else {
            const error = z.flattenError(result.error)

            setValidationErrors({message: "", errors: error.fieldErrors})
        }

    };
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValidationErrors((prev) => ({...prev, errors: {...prev.errors, [e.target.name]: ""}}))

        setFormData((prev) => ({...prev, [e.target.name]: e.target.value}))
    }

    return (
        <div className={styles.container}>
            <h3 className={styles.title}>{t("reset_password", "Reset Password")}</h3>

            {showSuccess ? <MessageCard
                message={t("password_reset.success", "You have successfully reset your password")}
            /> : (
                <>
                    <form className={styles.authForm} onSubmit={(e) => e.preventDefault()}>
                        <InputForm
                            label={t("new_password", "New Password")}
                            id="password"
                            name={"password"}
                            type="password"
                            placeholder={t("enter_new_password", "Enter your new password")}
                            value={formData.password}
                            onChange={handleChange}
                            errors={validationErrors?.errors?.password}
                        />
                        <InputForm
                            label={t("confirm_new_password", "Confirm New Password")}
                            id="password_confirmation"
                            type="password"
                            name={"password_confirmation"}
                            placeholder={t("enter_confirm_new_password", "Enter your confirm new password")}
                            value={formData.password_confirmation}
                            onChange={handleChange}
                            errors={validationErrors?.errors?.password_confirmation}
                        />
                        <button type="submit" className={` ${styles.buttonSubmit} btn btnPrimary bodyTextSm`}
                                onClick={handleNewPassword}>
                            {t("reset_password", "Reset Password")}
                        </button>
                        <button type="button" className={`${styles.backToLogin} bodyTextSm btn`}
                                onClick={handleBackToLogin}>
                            {t("back_to_login", "Back to Login")}
                        </button>
                    </form>
                </>
            )}

        </div>
    );
}

export default NewPassword;
