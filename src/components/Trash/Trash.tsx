import EmptyTrash from "./EmptyTrash/EmptyTrash";
import styles from "./Trash.module.css";
import WarningIcon from "@assets/icons/warning.svg?react";
import TrashCard from "./TrashCard/TrashCard";
import { useTranslation } from "react-i18next";
const dummyNotes = [
    { id: 1, title: "Note 1", content: "Content 1", createdAt: "2022-01-01", updatedAt: "2022-01-01",deletedAt: "2022-01-01" },

    { id: 2, title: "Note 2", content: "Content 2", createdAt: "2022-01-01", updatedAt: "2022-01-01",deletedAt: "2022-01-01" },
    { id: 3, title: "Note 3", content: "Content 3", createdAt: "2022-01-01", updatedAt: "2022-01-01",deletedAt: "2022-01-01" },

];

export default function Trash() {
    const { t } = useTranslation();
    return (
        <div className={`${styles.container} `}>
            <div className={`${styles.header} `}>
                <h1 >{t("Trash.Trash", "Trash")}</h1>
                <div className={`${styles.description}`}>
                    <div className={`${styles.icon}`}>
                        <WarningIcon />
                    </div>  
                    <p className={`${styles.descriptionText} bodyTextSm`}>{t("Trash.Items_in_trash_are_automatically_deleted_after_30_days", "Items in trash are automatically deleted after 30 days")}</p>
                    
                </div>
            </div>
            <>
            <div className={`${styles.deletedNotesContainer}`}>
           {dummyNotes.length == 0 ? <div className={`${styles.emptyTrashContainer}`}>
             <EmptyTrash />
             </div>
             : dummyNotes.map((note) => (
                <div className={styles.cardContainer}>
                <TrashCard key={note.id} title={note.title} deletedDate={note.deletedAt} onRestore={()=> {}} onPermanentDelete={() => {}} />
                </div>
            ))}
          
            </div>

            </>
        </div>
    );
}