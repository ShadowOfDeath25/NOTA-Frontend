import Authentication from "@components/Authentication/Authentication";
import styles from "./NewPasswordPage.module.css";
function NewPasswordPage() {
    return (
        <>
        <div className={styles.container}>
            <Authentication initialStep="new-password"/>
        </div>
        </>
    );
}
export default NewPasswordPage;