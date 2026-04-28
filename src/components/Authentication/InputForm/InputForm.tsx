import {Activity, useState} from "react";
import styles from "./InputForm.module.css";

import EyeIcon from "@assets/icons/eye.svg?react";

import EyeOffIcon from "@assets/icons/eyeoff.svg?react";

interface InputFieldProps {
    label: string,
    type?: string,
    name?: string,
    placeholder?: string
    id: string,
    value: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    helperText?: string,
    errors?: string | string[]
}


export const InputForm = ({
                              label,
                              name,
                              type = "text",
                              placeholder,
                              id,
                              value,
                              onChange,
                              helperText,
                              errors,
                              ...rest
                          }: InputFieldProps) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === "password";
    const normalizedErrors = Array.isArray(errors) ? errors : errors ? [errors] : [];
    const hasErrors = normalizedErrors.length > 0;

    const inputType = isPassword ? (showPassword ? "text" : "password") : type;
    const inputClassName = `${styles.input} bodyTextSm ${hasErrors ? styles.inputError : ""}`;

    return (
        <div className={styles.container}>
            <label htmlFor={id} className={`${styles.label} bodyTextSm`}>
                {label}
            </label>

            <div className={isPassword ? styles.passwordContainer : ""}>
                <div className={`${styles.inputContainer}`}>
                    <input
                        id={id}
                        name={name ?? id}
                        type={inputType}
                        placeholder={placeholder}
                        value={value}
                        onChange={onChange}
                        className={inputClassName}
                        {...{rest}}
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
            </div>
                <Activity mode={(helperText || hasErrors) ? "visible" : "hidden"}>

                    {helperText && (
                        <span className={styles.helperText}>{helperText}</span>
                    )}
                    {normalizedErrors.map((error, index) => (
                        <span key={index} className={`${styles.helperText} ${styles.helperTextError}`}>
                            {error}
                        </span>
                    ))}

                </Activity>

        </div>
    );
};