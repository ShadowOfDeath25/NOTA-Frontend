import styles from "./Authentication.module.css";
import { useState } from "react";
import SocialButtons from "@components/SocialButtons/SocialButtons.tsx";
import HeaderAuthentication from "@components/HeaderAuthentication/HeaderAuthentication.tsx";
import LoginForm from "@components/LoginForm/LoginForm.tsx";
import SignupForm from "@components/SignupForm/SignupForm.tsx";

type AuthTab = "login" | "signup";

interface AuthenticationProps {
  initialTab?: AuthTab;
}

function Authentication({ initialTab = "login" }: AuthenticationProps) {
  const [activeTab, setActiveTab] = useState<AuthTab>(initialTab);

  return (
    <div className={styles.container}>
      <HeaderAuthentication />

      <div className={styles.slidebar}>
        <div
          className={`${styles.tabButton} ${activeTab === "login" ? styles.activeTab : ""} bodyText`}
          role="button"
          onClick={() => setActiveTab("login")}
        >
          Log In
        </div>
        <div
          className={`${styles.tabButton} ${activeTab === "signup" ? styles.activeTab : ""} bodyText`}
          role="button"
          onClick={() => setActiveTab("signup")}
        >
          Sign Up
        </div>
      </div>

      <div className={styles.formContainer}>
        <form className={styles.authForm} onSubmit={(e) => e.preventDefault()}>
         
          {activeTab === "login" ? <LoginForm /> : <SignupForm />}

            <SocialButtons />
        </form>
      </div>
    </div>
  );
}

export default Authentication;