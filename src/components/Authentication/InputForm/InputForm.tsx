import {Activity, useState} from "react";
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
    error?: string;
}


export const InputForm = ({
                              label,
                              type = "text",
                              placeholder,
                              id,
                              value,
                              onChange,
                              helperText,
                              error
                          }: InputFieldProps) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === "password";


    const inputType = isPassword ? (showPassword ? "text" : "password") : type;
    const inputClassName = `${styles.input} bodyTextSm ${error ? styles.inputError : ""}`;

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
                <Activity mode={(helperText || error) ? "visible" : "hidden"}>

                    <span className={`${styles.helperText} ${error ? styles.helperTextError : ""}`}>
                        {helperText}
                        {error}
                    </span>

                </Activity>
            </div>

        </div>
    );
};