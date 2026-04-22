import styles from "./NewPassword.module.css";
import { InputForm } from "../InputForm/InputForm";
import { useState } from "react";
import MessageCard from "../../MessageCard/MessageCard";

export function NewPassword({handleBackToLogin}: {handleBackToLogin: () => void}) {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showSuccess, setShowSuccess] = useState(false);
    const handleNewPassword = () => {
        console.log("New Password");
        setShowSuccess(true);
    };
    return (
        <div className={styles.container}>
        <h3 className={styles.title}>Reset Password</h3>

        {showSuccess ? <MessageCard
        message="Enter your email address and we'll send you a link to reset your password."
        /> : (
            <>
            <form className={styles.authForm} onSubmit={(e) => e.preventDefault()}>
        <InputForm
        label="New Password"
        id="newPassword"
        type="password"
        placeholder="Enter your new password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        />
        <InputForm
        label="Confirm New Password"
        id="confirmNewPassword"
        type="password"
        placeholder="Enter your confirm new password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button type="submit" className={` ${styles.buttonSubmit} btn btnPrimary bodyTextSm`}  onClick={() => {handleNewPassword()}}>
            Reset Password
        </button>
        <button type="button" className={`${styles.backToLogin} bodyTextSm btn`} onClick={() => {handleBackToLogin()}}>
            Back to Login
        </button>
        </form>
        </>
        )}

        </div>
    );
}
export default NewPassword;
