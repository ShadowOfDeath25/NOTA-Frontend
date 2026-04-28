import {Outlet} from "react-router";
import styles from './styles.module.css'

export default function GuestLayout() {
    return (
        <div className={styles.container}>
            <Outlet/>
        </div>
    );
}

