import Authentication from "@components/Authentication/Authentication";
import styles from "./ResetPasswordPage.module.css";
function ResetPasswordPage() {
    return (
        <>
        <div className={styles.container}>
            <Authentication initialStep="forgot-password"/>
        </div>
        </>
    );
}
export default ResetPasswordPage;