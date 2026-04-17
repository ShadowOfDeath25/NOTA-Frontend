import styles from "./SignupForm.module.css";
import { InputForm } from "@components/InputForm/InputForm.tsx";
import { useState } from "react";

function SignupForm() {
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
                label="Name"
                id="name"
                type="text"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
            />
            <InputForm
                label="Email"
                id="email"
                type="email"
                placeholder="Enter your email"
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
            <InputForm
                label="Confirm Password"
                id="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
            />
        </div>
        <button type="submit" onClick={handleSubmit} className={`${styles.buttonSubmit} btn btnPrimary bodyText`}>
              Sign Up
            </button>
        </>
    );
}

export default SignupForm;
