import Authentication from "@components/Authentication/Authentication";
import styles from "./LoginPage.module.css";
function LoginPage() {
    return (
        <>
        <div className={styles.container}>
            <Authentication initialStep="login"/>
        </div>
        </>
    );
}
export default LoginPage;