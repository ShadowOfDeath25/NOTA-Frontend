import styles from "./LoginForm.module.css";
import { InputForm } from "@components/InputForm/InputForm.tsx";
import { useState } from "react";

function LoginForm() {
    interface LoginFormData {
        email: string;
        password: string;
    }
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
            <InputForm
                label="Email"
                id="email"
                type="email"
                placeholder="user@example.com"
                value={formData.email}
                onChange={handleChange}
            />
            <InputForm
                label="Password"
                id="password"
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
            />
            <div className={styles.forgotPasswordContainer}>
              <a href="#" className={`${styles.forgotPassword} bodyTextSm`}>
                Forgot Password?
              </a>
            </div>
        </div>
        <button type="submit" onClick={handleSubmit} className={`${styles.buttonSubmit} btn btnPrimary bodyText`}>
              Log In
            </button>
  </>
    );
}

export default LoginForm;
