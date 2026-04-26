import styles from "./NoNotesFound.module.css";
import fileIcon from "@assets/icons/file.svg";
import {useTranslation} from "react-i18next";

function NoNotesFound() {
    const {t} = useTranslation();
    return (
        <div className={styles.container}>
            <img src={fileIcon} alt="file" className={styles.fileIcon}/>
            <h3 className={`${styles.title} h3`}>{t("no_notes_found_yet", "No notes yet")}</h3>
            <p className={`${styles.description} bodyText`}>{t("create_note_to_get_started", "Create your first note to get started")}</p>
            <button
                className={` btn btnPrimary bodyTextSm ${styles.createNoteBtn} `}>{t("create_note", "Create New Note")}</button>
        </div>
    );
}

export default NoNotesFound;