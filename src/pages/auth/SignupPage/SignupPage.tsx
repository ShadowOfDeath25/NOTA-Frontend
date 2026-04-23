import Authentication from "@components/Authentication/Authentication";
import styles from "./SignupPage.module.css";
function SignupPage() {
    return (
        <>
            <div className={styles.container}>
            <Authentication initialStep="signup"/>
            </div>
        </>
    );
}
export default SignupPage;