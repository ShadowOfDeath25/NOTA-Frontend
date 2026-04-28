import styles from "./Authentication.module.css";
import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
import SocialButtons from "@components/Authentication/SocialButtons/SocialButtons";
import HeaderAuthentication from "@components/Authentication/HeaderAuthentication/HeaderAuthentication";
import LoginForm from "@components/Authentication/LoginForm/LoginForm";
import SignupForm from "@components/Authentication/SignupForm/SignupForm";

import ForgotPassword from "@components/Authentication/ResetPassword/ResetPassword.tsx";
import NewPassword from "@components/Authentication/NewPassword/NewPassword";

type AuthStep = "login" | "signup" | "forgot-password" | "new-password";

interface AuthenticationProps {
    initialStep?: AuthStep;
}

function Authentication({initialStep = "login"}: AuthenticationProps) {
    const [activeStep, setActiveStep] = useState<AuthStep>(initialStep);
    const {t} = useTranslation();
    const navigate = useNavigate();


    useEffect(() => {
        setActiveStep(initialStep);

    }, [initialStep]);


    const handleBackToLogin = (): void => {
        navigate("/login");
    };


    const renderForm = () => {
        switch (activeStep) {
            case "login":
                return <LoginForm/>;
            case "signup":
                return <SignupForm/>;
            case "forgot-password":
                return <ForgotPassword handleBackToLogin={handleBackToLogin}/>;
            case "new-password":
                return <NewPassword handleBackToLogin={handleBackToLogin}/>;
            default:
                return <LoginForm/>;
        }
    };

    return (
        <div className={styles.container}>
            <HeaderAuthentication/>


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
                        activeStep !== "new-password" && <SocialButtons/>}
                </div>
            </>

        </div>
    );
}

export default Authentication;