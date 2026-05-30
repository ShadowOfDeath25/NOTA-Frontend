import styles from "./SignupForm.module.css";
import {InputForm} from "@components/Authentication/InputForm/InputForm";
import {useState} from "react";
import {useTranslation} from "react-i18next";
import * as React from "react";
import validation from "@validators/auth.schema"
import type {APIValidationError} from "@customTypes/APIValidationError.ts";
import {useAuth} from "@hooks/api/useAuth.ts";
import {z} from "zod";
import {useNavigate} from "react-router-dom";
import {AxiosError} from 'axios'

function SignupForm() {
    const {t} = useTranslation();
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });
    const {signup} = useAuth()
    const [validationErrors, setValidationErrors] = useState<APIValidationError>({
        message: "",
        errors: {} as Record<string, string[]>
    });
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData((prev) => ({...prev, [name]: value}));
        setValidationErrors((prev) => ({...prev, errors: {...prev.errors, [name]: ""}}))
    };
    const handleSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault();
        const result = validation.schemas.signup.safeParse(formData);
        if (result.success) {
            signup.mutate(formData, {
                onSuccess: () => {
                    navigate("/getting-started")
                },
                onError: (error: unknown) => {
                    if (error instanceof AxiosError) {
                        setValidationErrors(error?.response?.data)
                    } else {
                        setValidationErrors({message: [t("something_went_wrong", "Something went wrong")], errors: {}})
                    }
                }
            })

        } else {
            const errors = z.flattenError(result.error)
            setValidationErrors({message: "", errors: errors.fieldErrors})
        }
    };
    return (

        <>
            <div className={styles.container}>
                <form className={styles.authForm} onSubmit={handleSubmit}>
                    <InputForm
                        label={t("name", "Name")}
                        id="name"
                        name={"name"}
                        type="text"
                        placeholder={t("e.g. John Doe", "e.g. John Doe")}
                        value={formData.name}
                        errors={validationErrors?.errors?.name}
                        onChange={handleChange}
                    />
                    <InputForm
                        label={t("email", "Email")}
                        id="email"
                        type="text"
                        name={"email"}
                        placeholder={t("user@example.com", "user@example.com")}
                        value={formData.email}
                        onChange={handleChange}
                        errors={validationErrors?.errors?.email}
                    />
                    <InputForm
                        label={t("password", "Password")}
                        id="password"
                        name={"password"}
                        type="password"
                        placeholder={t("Enter your password", "Enter your password")}
                        value={formData.password}
                        onChange={handleChange}
                        errors={validationErrors?.errors?.password}
                    />
                    <InputForm
                        label={t("confirm_password", "Confirm Password")}
                        id="password_confirmation"
                        name="password_confirmation"
                        type="password"
                        placeholder={t("Confirm your password", "Confirm your password")}
                        value={formData.password_confirmation}
                        errors={validationErrors?.errors?.password_confirmation}
                        onChange={handleChange}
                    />
                    <button type="submit"
                            className={`${styles.buttonSubmit} btn btnPrimary bodyTextSm`}>
                        {t("create_account", "Create Account")}
                    </button>
                </form>
            </div>
        </>


    );
}

export default SignupForm;
