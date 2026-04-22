import styles from "./LoginForm.module.css";
import { InputForm } from "@components/Authentication/InputForm/InputForm";
import { useState } from "react";
import { useTranslation } from "react-i18next";
function LoginForm({ handleForgotPassword }: { handleForgotPassword: () => void }) {
    interface LoginFormData {
        email: string;
        password: string;
    }
    const { t } = useTranslation();
    const [formData, setFormData] = useState<LoginFormData>({
        email: "",  
        password: "",
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
    <form className={styles.authForm} onSubmit={(e) => e.preventDefault()}>
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
            <div className={styles.forgotPasswordContainer}>
              <a href="#" className={`${styles.forgotPassword} bodyTextSm`} onClick={handleForgotPassword}>
                {t("forgot_password","Forgot Password?")}
              </a>
            </div>
        <button type="submit" onClick={handleSubmit} className={`${styles.buttonSubmit} btn btnPrimary bodyText`}>
              {t("sign_in","Log In")}
            </button>
            </form>
        </div>

  </>
    );
}

export default LoginForm;
