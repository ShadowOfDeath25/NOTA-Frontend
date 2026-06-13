import styles from "./NoNotesFound.module.css";
import FileIcon from "@assets/icons/file.svg?react";
import {useTranslation} from "react-i18next";
import {useModal} from "@context/ModalContext.tsx";

function NoNotesFound() {
    const {t} = useTranslation();
    const {setAddNoteModal} = useModal();

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <FileIcon className={styles.fileIcon}/>
                <h3 className={`${styles.title} h3`}>{t("no_notes_found_yet", "No notes yet")}</h3>
                <p className={`${styles.description} bodyText`}>{t("create_note_to_get_started", "Create your first note to get started")}</p>
            </div>
            <button
                onClick={() => setAddNoteModal(true)}
                className={` btn btnPrimary bodyTextSm ${styles.createNoteBtn} `}
            >
                {t("create_note", "Create New Note")}
            </button>
        </div>
    );
}

export default NoNotesFound;