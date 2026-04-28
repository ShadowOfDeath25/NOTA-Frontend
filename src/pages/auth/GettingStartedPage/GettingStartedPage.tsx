import HeaderAuthentication from "@components/Authentication/HeaderAuthentication/HeaderAuthentication.tsx";
import styles from '@components/Authentication/Authentication.module.css'
import SuccessView from "@components/Authentication/SuccessView/SuccessView.tsx";

export default function GettingStartedPage() {
    return (
        <div className={styles.container}>
            <HeaderAuthentication/>
            <SuccessView/>
        </div>
    );
}

