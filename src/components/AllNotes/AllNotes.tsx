import {useState, useMemo} from "react";
import {useTranslation} from "react-i18next";
import {useRead} from "@hooks/api/useRead.ts";
import {useModal} from "@context/ModalContext.tsx";
import type {UseQueryResult} from "@tanstack/react-query";
import type {Note} from "@customTypes/Note.ts";
import NoteCard from "@components/Home/NoteCard/NoteCard";
import styles from "./AllNotes.module.css";
import magnifierIcon from "@assets/icons/magnifier.svg";
import fileIcon from "@assets/icons/file.svg";

function SkeletonGrid() {
    return (
        <div className={styles.skeletonGrid} aria-hidden="true">
            {Array.from({length: 6}).map((_, i) => (
                <div key={i} className={styles.skeletonCard}>
                    <div className={styles.skeletonTitle}/>
                    <div className={styles.skeletonLine}/>
                    <div className={styles.skeletonLineShort}/>
                    <div className={styles.skeletonFooter}/>
                </div>
            ))}
        </div>
    );
}

function EmptyState({onCreate}: { onCreate: () => void }) {
    const {t} = useTranslation();
    return (
        <div className={styles.emptyState}>
            <img src={fileIcon} alt="" className={styles.emptyIcon}/>
            <h3 className={`${styles.emptyTitle} h3`}>{t("all_notes_no_notes", "No notes yet")}</h3>
            <p className={`${styles.emptyDescription} bodyText`}>
                {t("all_notes_create_first", "Create your first note to get started")}
            </p>
            <button
                className={`btn btnPrimary bodyTextSm ${styles.createNoteBtn}`}
                onClick={onCreate}
            >
                {t("create_note", "Create New Note")}
            </button>
        </div>
    );
}

function EmptySearchState() {
    const {t} = useTranslation();
    return (
        <div className={styles.emptyState}>
            <img src={fileIcon} alt="" className={styles.emptyIcon}/>
            <h3 className={`${styles.emptyTitle} h3`}>{t("all_notes_no_results", "No notes match your search")}</h3>
            <p className={`${styles.emptyDescription} bodyText`}>
                {t("all_notes_try_different_search", "Try a different search term")}
            </p>
        </div>
    );
}

function ErrorState({onRetry}: { onRetry: () => void }) {
    const {t} = useTranslation();
    return (
        <div className={styles.errorState}>
            <h3 className={`${styles.errorTitle} h3`}>{t("all_notes_error", "Something went wrong")}</h3>
            <p className={`${styles.errorDescription} bodyText`}>
                {t("all_notes_error_description", "Could not load your notes. Please try again.")}
            </p>
            <button
                className={`btn btnPrimary bodyTextSm ${styles.retryBtn}`}
                onClick={onRetry}
            >
                {t("retry", "Try Again")}
            </button>
        </div>
    );
}

const AllNotes = () => {
    const {t} = useTranslation();
    const {setAddNoteModal} = useModal();
    const [search, setSearch] = useState("");

    const {data: notes, isLoading, isError, refetch} = useRead<UseQueryResult<Note[]>>("notes");

    const filteredNotes = useMemo(() => {
        if (!notes?.data) return [];
        if (!search.trim()) return notes.data;
        const q = search.toLowerCase();
        return notes.data.filter(
            (note) =>
                note.title.toLowerCase().includes(q) ||
                (note.preview && note.preview.toLowerCase().includes(q))
        );
    }, [notes, search]);

    const handleNoteClick = (id: string, starred?: boolean) => {
        console.log("ID:", id);
        console.log("Starred:", starred);
    };

    if (isLoading) {
        return (
            <div className={styles.container} role="status" aria-label={t("loading_notes", "Loading notes")}>
                <div className={styles.header}>
                    <h1>{t("all_notes", "All Notes")}</h1>
                </div>
                <SkeletonGrid/>
            </div>
        );
    }

    if (isError) {
        return (
            <div className={styles.container}>
                <div className={styles.header}>
                    <h1>{t("all_notes", "All Notes")}</h1>
                </div>
                <ErrorState onRetry={() => refetch()}/>
            </div>
        );
    }

    const hasNotes = (notes?.data?.length ?? 0) > 0;

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1>{t("all_notes", "All Notes")}</h1>
                {hasNotes && (
                    <div className={styles.searchContainer}>
                        <img src={magnifierIcon} alt="" className={styles.searchIcon}/>
                        <input
                            type="text"
                            className={`${styles.searchInput} focus-outline`}
                            placeholder={t("search_notes", "Search notes...")}
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            aria-label={t("search_notes", "Search notes")}
                        />
                    </div>
                )}
            </div>

            {filteredNotes.length === 0 && search.trim() ? (
                <EmptySearchState/>
            ) : filteredNotes.length === 0 ? (
                <EmptyState onCreate={() => setAddNoteModal(true)}/>
            ) : (
                <div className={styles.notesGrid}>
                    {filteredNotes.map((note) => (
                        <NoteCard
                            key={note.id}
                            {...note}
                            onNoteClick={handleNoteClick}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default AllNotes;
