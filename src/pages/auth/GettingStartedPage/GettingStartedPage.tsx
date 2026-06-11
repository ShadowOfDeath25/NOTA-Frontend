import HeaderAuthentication from "@components/Authentication/HeaderAuthentication/HeaderAuthentication.tsx";
import authStyles from '@components/Authentication/Authentication.module.css';
import pageStyles from './GettingStartedPage.module.css';
import SuccessView from "@components/Authentication/SuccessView/SuccessView.tsx";

export default function GettingStartedPage() {
    return (
        <div className={pageStyles.page}>
            <div className={authStyles.container}>
                <HeaderAuthentication/>
                <SuccessView/>
            </div>
        </div>
    );
}

