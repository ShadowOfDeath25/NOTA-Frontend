import styles from "./Authentication.module.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";


import SocialButtons from "@components/Authentication/SocialButtons/SocialButtons";
import HeaderAuthentication from "@components/Authentication/HeaderAuthentication/HeaderAuthentication";
import LoginForm from "@components/Authentication/LoginForm/LoginForm";
import SignupForm from "@components/Authentication/SignupForm/SignupForm";
import SuccessView from "@components/Authentication/SuccessView/SuccessView";
import ForgotPassword from "@components/Authentication/RestPassword/RestPassword";
import NewPassword from "@components/Authentication/NewPassword/NewPassword";

type AuthStep = "login" | "signup" | "forgot-password" | "new-password";

interface AuthenticationProps {
  initialStep?: AuthStep;
}

function Authentication({ initialStep = "login" }: AuthenticationProps) {
  const [activeStep, setActiveStep] = useState<AuthStep>(initialStep);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const { t } = useTranslation();
  const navigate = useNavigate();

 
  useEffect(() => {
    setActiveStep(initialStep);
  
    setShowSuccess(false);
  }, [initialStep]);

 
  const handleBackToLogin = (): void => {
    navigate("/login");
  };

  const handleForgotPassword = (): void => {
    navigate("/forgot-password");
  };

  const handleSuccess = (): void => {
    setShowSuccess(true);
  };

  const renderForm = () => {
    switch (activeStep) {
      case "login":
        return <LoginForm handleForgotPassword={handleForgotPassword} />;
      case "signup":
        return <SignupForm handleSuccessA={handleSuccess} />;
      case "forgot-password":
        return <ForgotPassword handleBackToLogin={handleBackToLogin} />;
      case "new-password":
        return <NewPassword handleBackToLogin={handleBackToLogin} />;
      default:
        return <LoginForm handleForgotPassword={handleForgotPassword} />;
    }
  };

  return (
    <div className={styles.container}>
      <HeaderAuthentication />

      {showSuccess ? (
        <SuccessView />
      ) : (
        <>
       
          {activeStep !== "forgot-password" && activeStep !== "new-password" && (
            <div className={styles.slidebar}>
              <div
                className={`${styles.tabButton} ${
                  activeStep === "login" ? styles.activeTab : ""
                } bodyText`}
                role="button"
                onClick={() => navigate("/login")}
              >
                {t("sign_in", "Log In")}
              </div>
              <div
                className={`${styles.tabButton} ${
                  activeStep === "signup" ? styles.activeTab : ""
                } bodyText`}
                role="button"
                onClick={() => navigate("/signup")}
              >
                {t("create_account", "Sign Up")}
              </div>
            </div>
          )}

          <div className={styles.formContainer}>
         
            {renderForm()}

         
            {activeStep !== "forgot-password" &&
              activeStep !== "new-password" && <SocialButtons />}
          </div>
        </>
      )}
    </div>
  );
}

export default Authentication;