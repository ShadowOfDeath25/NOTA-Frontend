import styles from './styles.module.css'
import logo from '@assets/logo.svg';
import Searchbar from "@components/Searchbar/Searchbar.tsx";
import {Activity, useState, useMemo} from "react";
import * as React from "react";
import AiIcon from "@assets/icons/ai.svg";
import HomeIcon from "@assets/icons/home.svg";
import SpacesIcon from '@assets/icons/files.svg';
import UploadIcon from '@assets/icons/upload.svg'
import SettingsIcon from '@assets/icons/settings.svg'
import TrashIcon from '@assets/icons/trash.svg'
import CloseIcon from '@assets/icons/close.svg?react'
import {useTranslation} from "react-i18next";
import {useNavigate, useLocation} from "react-router-dom";
import NoteLink from "@components/NoteLink/NoteLink.tsx";
import {useModal} from "@context/ModalContext.tsx";
import {useRead} from "@hooks/api/useRead.ts";
import type {UseQueryResult} from "@tanstack/react-query";
import type {Note} from "@customTypes/Note.ts";

interface SidebarProps {
    isSidebarOpen: boolean;
    onToggle: () => void;
}

export default function Sidebar({isSidebarOpen, onToggle}: SidebarProps) {
    const location = useLocation();
    const pathname = location.pathname.split("/")[1];
    const [active, setActive] = useState<string>(pathname)
    const {t} = useTranslation()
    const navigate = useNavigate();
    const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent> & { target: HTMLDivElement }) => {
        setActive(e.target.id);
        navigate(`/${e.target.id}`)
    }
    const {setImportModal} = useModal();
    const handleImportClick = () => {
        setImportModal(true);
    }
    const isEmpty: boolean = false;

    const {data: favoriteNotes, isLoading: favoritesLoading} = useRead<UseQueryResult<Note[]>>("notes/favorites");


    const {data: notes, isLoading: notesLoading} = useRead<UseQueryResult<Note[]>>('notes');

    const [searchQuery, setSearchQuery] = useState("");

    const filteredNotes = useMemo(() => {
        if (!searchQuery.trim()) return [];
        const q = searchQuery.toLowerCase();
        return notes?.data?.filter(note => note.title.toLowerCase().includes(q)) ?? [];
    }, [searchQuery, notes]);

    return (
        <>
        <div className={`${styles.overlay} ${isSidebarOpen ? styles.open : ""}`} onClick={onToggle} />
        <div className={`${styles.container} ${isSidebarOpen ? styles.open : ""}`}>
            <div className={styles.header}>
                <div className={styles.logoContainer}><img src={logo} className={styles.logo} alt="Logo"/>
                    <h4>Nota</h4></div>
                {isSidebarOpen && (
                    <div className={styles.closeIcon} onClick={onToggle}>
                        <CloseIcon/>
                    </div>)}
            </div>
            <Searchbar value={searchQuery} onChange={setSearchQuery}/>
            <div className={styles.navigation}>
                <div className={`${styles.navCard} ${active == "home" ? styles.active : ""}`} onClick={handleClick}
                     id={"home"}
                >
                    <img src={HomeIcon} alt={"home"}/>
                    {t("home", 'Home')}
                </div>
                <div className={`${styles.navCard} ${active == "spaces" ? styles.active : ""}`}
                     onClick={handleClick}
                     id={"spaces"}
                >
                    <img src={SpacesIcon} alt={"spaces"}/>
                    {t("spaces", 'Spaces')}
                </div>
                <div className={`${styles.navCard} ${active == "summarize" ? styles.active : ""}`}
                     onClick={handleClick}
                     id={"summarize"}
                >
                    <img src={AiIcon} alt={"summarize"}/>
                    {t("summarize", "Summarize & Analyze")}
                </div>
                <div className={`${styles.navCard} ${styles.importPDF}`} id={"import-pdf"} onClick={handleImportClick}>
                    <img src={UploadIcon} alt={"upload"}/>
                    {t("import_PDF", "Import PDF")}
                </div>
            </div>
            <Activity mode={isEmpty ? "hidden" : "visible"}>
                {searchQuery.trim() ? (
                    <>
                        <hr className={styles.separator}/>
                        <div className={styles.myNotes}>
                            <span className={`label ${styles.navTitle}`}>{t("search_results", "Search Results")}</span>
                            <Activity mode={filteredNotes.length === 0 ? "hidden" : "visible"}>
                                {filteredNotes.map((note: { title: string; id: string; }) => <NoteLink
                                    key={note.id} name={note.title} uuid={note.id}/>)}
                            </Activity>
                            {filteredNotes.length === 0 && !notesLoading && (
                                <span className={styles.noResults}>{t("no_results", "No results found")}</span>
                            )}
                        </div>
                        <hr className={styles.separator}/>
                    </>
                ) : (
                    <>
                        <hr className={styles.separator}/>
                        <Activity mode={isEmpty ? "hidden" : "visible"}>
                            <hr className={styles.separator}/>
                            <div className={styles.myNotes}>
                                <span className={`label ${styles.navTitle}`}>{t("favorites", "Favorites")}</span>
                                <Activity mode={favoritesLoading ? "hidden" : "visible"}>
                                    {favoriteNotes?.data?.map((note: { title: string; id: string; }) => <NoteLink
                                        key={note.id} name={note.title} uuid={note.id}/>)}
                                </Activity>
                            </div>
                        </Activity>
                        <div className={styles.myNotes}>
                            <span className={`label ${styles.navTitle}`}>{t("my_notes", "My Notes")}</span>
                            <Activity mode={notesLoading ? "hidden" : "visible"}>
                                {notes?.data?.map((note: { title: string; id: string; }) => <NoteLink key={note.id}
                                                                                                      name={note.title}
                                                                                                      uuid={note.id}/>)}
                            </Activity>
                        </div>
                        <hr className={styles.separator}/>
                    </>
                )}
                <div className={styles.bottomNav}>
                    <div className={`${styles.navCard} ${active == "settings" ? styles.active : ""}`} id={'settings'}
                         onClick={handleClick}>
                        <img src={SettingsIcon} alt={"settings"}/>
                        {t("settings", "Settings")}
                    </div>
                    <div className={`${styles.navCard} ${active == "trash" ? styles.active : ""}`} id={'trash'}
                         onClick={handleClick}>
                        <img src={TrashIcon} alt={"trash"}/>
                        {t("trash", "Trash")}
                    </div>
                </div>
            </Activity>
        </div>
        </>
    );
}

