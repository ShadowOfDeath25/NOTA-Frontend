import { useState } from "react";
import styles from "./InputForm.module.css";
import eyeIcon from "@assets/icons/eye.svg";
import eyeOffIcon from "@assets/icons/eyeoff.svg";

interface InputFieldProps {
  label: string;
  type?: string;
  placeholder?: string;
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}


export const InputForm = ({ label, type = "text", placeholder, id, value, onChange }: InputFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";


  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  return (
    <div className={styles.emailInputContainer}>
      <label htmlFor={id} className={`${styles.label} bodyTextSm`}>
        {label}
      </label>
      
      <div className={isPassword ? styles.passwordContainer : ""}>
        <div className={styles.passwordInputContainer}>
          <input
            id={id}
            type={inputType}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className={`${styles.input} bodyTextSm`}
          />
        </div>

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className={styles.passwordToggle}
          >
           
            {showPassword ? <img src={eyeOffIcon} alt="Hide" /> : <img src={eyeIcon} alt="Show" />}
          </button>
        )}
      </div>
    </div>
  );
};