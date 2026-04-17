import styles from "./NotesList.module.css";
import NoteCard from "@components/NoteCard/NoteCard.tsx";
import type { NoteData } from "@components/NoteCard/NoteCard.tsx";
import { useTranslation } from "react-i18next";

const NotesList = ({ recentNotes }: {recentNotes: NoteData[]}) => {
    const { t } = useTranslation();
    const handleNoteSelection = (id: string, starred?: boolean) => {
        console.log("ID:", id);
        console.log("Starred:", starred);

    };
    return (
        <div className={styles.recentNotes}>
            <div className={styles.header}>
                <h3>{t("recent_notes", "Recent Notes")}</h3>
                <button className={`${styles.viewAllButton} bodyTextSm`}>{t("view_all", "View All")}</button>
            </div>
            <div className={styles.container}>
                {recentNotes.slice(0, 6).map((note) => (
                    <NoteCard key={note.id} {...note} onNoteClick={handleNoteSelection}/>
                ))}
            </div>
        </div>
    );
};

export default NotesList;
