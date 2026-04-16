import styles from './styles.module.css'
import magnifier from '@assets/icons/magnifier.svg'

import IconButton from '@mui/material/IconButton';
import {useTranslation} from "react-i18next";

export default function Searchbar() {
    const {t} = useTranslation();
    return (
        <div className={styles.container}>
            <IconButton
                sx={
                    {
                        position: "absolute",
                        top: "50%",
                        transform: "translateY(-50%)"
                    }
                }
            >
                <img src={magnifier} alt="magnifier"/>
            </IconButton>
            <input type={"text"} className={`${styles.searchbar} focus-outline`} placeholder={t("search","Search")}/>
        </div>
    );
}

