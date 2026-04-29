import styles from "./EmptyTrash.module.css";
import EmptyIcon from "@assets/icons/empty.svg";
import {useTranslation} from "react-i18next";

function EmptyTrash() {
    const {t} = useTranslation();
    return (
        <div className={styles.container}>
            <img src={EmptyIcon} alt="emptyTrash" className={styles.emptyIcon}/>
            <h3 className={`${styles.title}`}>{t("no_notes_found_yet", "Your trash is empty")}</h3>
            <p className={`${styles.description} bodyText`}>{t("create_note_to_get_started", "Deleted notes will appear here")}</p>
            <button
                className={` btn btnPrimary bodyTextSm ${styles.exploreNotesBtn} `}>{t("create_note", "Explore Notes")}</button>
        </div>
    );
}

export default EmptyTrash;