import styles from "./NotesList.module.css";
import NoteCard from "@components/Home/NoteCard/NoteCard";
import NoNotesFound from "@components/Home/NoNotesFound/NoNotesFound";
import type { NoteData } from "@customTypes/NoteData.ts";
import { useTranslation } from "react-i18next";
const NotesList = ({ recentNotes }: {recentNotes: NoteData[]}) => {
    const { t } = useTranslation();
    const handleNoteSelection = (id: string, starred?: boolean) => {
        console.log("ID:", id);
        console.log("Starred:", starred);
    };
    return (
        
        <div className={styles.container}>
            {recentNotes.length === 0 ? (
                
                <NoNotesFound />
            ) : (
                <>
            <div className={styles.header}>
                <h3>{t("recent_notes", "Recent Notes")}</h3>
                <button className={`${styles.viewAllButton} bodyTextSm`}>{t("view_all", "View All")}</button>
            </div>
            <div className={styles.recentNotes}>
                {recentNotes.slice(0, 6).map((note) => (
                    <NoteCard key={note.id} {...note} onNoteClick={handleNoteSelection}/>
                ))}
            </div>
            </>
            )}
        </div>
    );
};

export default NotesList;
