import styles from "./SignupForm.module.css";
import { InputForm } from "@components/Authentication/InputForm/InputForm";
import { useState } from "react";
import { useTranslation } from "react-i18next";

function SignupForm() {
    const { t } = useTranslation();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Data Submitted:", formData);
    };
    return (
        <>
        <div className={styles.container}>
            <InputForm
                label={t("name","Name")}
                id="name"
                type="text"
                placeholder={t("e.g. John Doe","e.g. John Doe")}
                value={formData.name}
                onChange={handleChange}
            />
            <InputForm
                label={t("email","Email")}
                id="email"
                type="email"
                placeholder={t("user@example.com","user@example.com")}
                value={formData.email}
                onChange={handleChange}
            />
            <InputForm
                label={t("password","Password")}
                id="password"
                type="password"
                placeholder={t("Enter your password","Enter your password")}
                value={formData.password}
                onChange={handleChange}
            />
            <InputForm
                label={t("confirm_password","Confirm Password")}
                id="confirmPassword"
                type="password"
                placeholder={t("Confirm your password","Confirm your password")}
                value={formData.confirmPassword}
                onChange={handleChange}
            />
        </div>
        <button type="submit" onClick={handleSubmit} className={`${styles.buttonSubmit} btn btnPrimary bodyTextSm`}>
              {t("create_account","Create Account")}
            </button>
        </>
    );
}

export default SignupForm;
