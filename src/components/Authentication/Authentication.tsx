import styles from "./Authentication.module.css";
import { useState } from "react";
import SocialButtons from "@components/Authentication/SocialButtons/SocialButtons";
import HeaderAuthentication from "@components/Authentication/HeaderAuthentication/HeaderAuthentication";
import LoginForm from "@components/Authentication/LoginForm/LoginForm";
import SignupForm from "@components/Authentication/SignupForm/SignupForm";
import { useTranslation } from "react-i18next";
type AuthTab = "login" | "signup";

interface AuthenticationProps {
  initialTab?: AuthTab;
}

function Authentication({ initialTab = "login" }: AuthenticationProps) {
  const [activeTab, setActiveTab] = useState<AuthTab>(initialTab);
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      <HeaderAuthentication />

      <div className={styles.slidebar}>
        <div
          className={`${styles.tabButton} ${activeTab === "login" ? styles.activeTab : ""} bodyText`}
          role="button"
          onClick={() => setActiveTab("login")}
        >
          {t("sign_in","Log In")}
        </div>
        <div
          className={`${styles.tabButton} ${activeTab === "signup" ? styles.activeTab : ""} bodyText`}
          role="button"
          onClick={() => setActiveTab("signup")}
        >
          {t("create_account","Sign Up")}
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