import {useState} from "react";
import styles from "./InputForm.module.css";
// @ts-ignore
import EyeIcon from "@assets/icons/eye.svg?react";
// @ts-ignore
import EyeOffIcon from "@assets/icons/eyeoff.svg?react";

interface InputFieldProps {
    label: string;
    type?: string;
    placeholder?: string;
    id: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    helperText?: string;
    isError?: boolean;
}


export const InputForm = ({
                              label,
                              type = "text",
                              placeholder,
                              id,
                              value,
                              onChange,
                              helperText,
                              isError
                          }: InputFieldProps) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === "password";


    const inputType = isPassword ? (showPassword ? "text" : "password") : type;
    const inputClassName = `${styles.input} bodyTextSm ${isError ? styles.inputError : ""}`;

    return (
        <div className={styles.container}>
            <label htmlFor={id} className={`${styles.label} bodyTextSm`}>
                {label}
            </label>

            <div className={isPassword ? styles.passwordContainer : ""}>
                <div className={`${styles.inputContainer}`}>
                    <input
                        id={id}
                        type={inputType}
                        placeholder={placeholder}
                        value={value}
                        onChange={onChange}
                        className={inputClassName}
                    />
                </div>

                {isPassword && (
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className={styles.passwordToggle}
                    >

                        {showPassword ? <EyeOffIcon className={styles.icon}/> : <EyeIcon className={styles.icon}/>}
                    </button>
                )}
                {helperText && (
                    <span className={`${styles.helperText} ${isError ? styles.helperTextError : ""}`}>
                        {helperText}
                    </span>
                )}
            </div>

        </div>
    );
};