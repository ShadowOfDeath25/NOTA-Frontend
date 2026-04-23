import styles from "./RestPassword.module.css";
import { InputForm } from "../InputForm/InputForm";
import { useState,useEffect } from "react";
import MessageCard from "../../MessageCard/MessageCard";
export  function RestPassword({handleBackToLogin}: {handleBackToLogin: () => void}) {
  
    const handleSendResetLink = () => {
        setEmailSend(true);
    };
    const [email, setEmail] = useState("");
    const [emailSend, setEmailSend] = useState(false);

    return (
        <div className={styles.container}>
        <h3 className={styles.title}>Rest Password</h3>
        {emailSend && <MessageCard message="Password reset link sent to your email" />}
        {!emailSend && (<>
        <form className={styles.authForm} onSubmit={(e) => e.preventDefault()}>
        <InputForm
        label="Email"
        id="email"
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        />
         <div className={styles.buttonContainer}>
        <button type="submit" className={`${styles.buttonSubmit} btn btnPrimary bodyTextSm`} onClick={() => {handleSendResetLink()}}>
              {"Send Reset Link"}
            </button>
           <button className={`${styles.backToLogin} bodyTextSm btn`} onClick={() => {handleBackToLogin()}}>
            Back to Login
           </button>
        </div>
        </form>
        </>)}
        </div>
    );
}
 export default RestPassword;