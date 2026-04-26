import styles from './styles.module.css'
import logo from '@assets/logo.svg';
import Searchbar from "@components/Searchbar/Searchbar.tsx";
import {Activity, useState} from "react";
import * as React from "react";
import AiIcon from "@assets/icons/ai.svg";
import HomeIcon from "@assets/icons/home.svg";
import SpacesIcon from '@assets/icons/files.svg';
import UploadIcon from '@assets/icons/upload.svg'
import SettingsIcon from '@assets/icons/settings.svg'
import TrashIcon from '@assets/icons/trash.svg'
import MenuIcon from '@assets/icons/menu.svg?react'
import CloseIcon from '@assets/icons/close.svg?react'
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";
import NoteLink from "@components/NoteLink/NoteLink.tsx";

export default function Sidebar() {
    const [active, setActive] = useState<string>("home")
    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
    const {t} = useTranslation()
    const navigate = useNavigate();

    const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent> & { target: HTMLDivElement }) => {
        setActive(e.target.id);
        navigate(`/${e.target.id}`)
    }
    const handleMenuClick = () => {
        setIsSidebarOpen(!isSidebarOpen);
    }
    const handleCloseClick = () => {
        setIsSidebarOpen(!isSidebarOpen);
    }
    const isEmpty: boolean = false;
    return (
        <>
            {!isSidebarOpen && (
                <div className={styles.menuIcon} onClick={handleMenuClick}>
                    <MenuIcon/>
                </div>
            )}
        <div className={`${styles.container} ${isSidebarOpen ? styles.open : ""}`}>
            <div className={styles.header}>
                <div className={styles.logoContainer}><img src={logo} className={styles.logo} alt="Logo"/>
                <h4>Nota</h4></div>
                {isSidebarOpen && (
                <div className={styles.closeIcon} onClick={handleCloseClick}>
                    <CloseIcon/>
                </div>)}
            </div>
            <Searchbar/>
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
                <div className={`${styles.navCard} ${styles.importPDF}`} id={"import-pdf"}>
                    <img src={UploadIcon} alt={"upload"}/>
                    {t("import_PDF", "Import PDF")}
                </div>
            </div>
            <Activity mode={isEmpty ? "hidden" : "visible"}>
                <hr className={styles.separator}/>
                <Activity mode={isEmpty ? "hidden" : "visible"}>
                    <hr className={styles.separator}/>
                    <div className={styles.myNotes}>
                        <span className={`label ${styles.navTitle}`}>{t("favorites", "Favorites")}</span>
                        {/*Dummy Notes for testing purposes*/}
                        <NoteLink name={"test"} uuid={"test"}/>
                        <NoteLink name={"test"} uuid={"test"}/>
                        <NoteLink name={"test"} uuid={"test"}/>
                        <NoteLink name={"test"} uuid={"test"}/>
                        <NoteLink name={"test"} uuid={"test"}/>
                        <NoteLink name={"test"} uuid={"test"}/>
                        <NoteLink name={"test"} uuid={"test"}/>
                        <NoteLink name={"test"} uuid={"test"}/>
                    </div>
                </Activity>
                <div className={styles.myNotes}>
                    <span className={`label ${styles.navTitle}`}>{t("my_notes", "My Notes")}</span>
                    {/*Dummy Notes for testing purposes*/}
                    <NoteLink name={"test"} uuid={"test"}/>
                    <NoteLink name={"test"} uuid={"test"}/>
                    <NoteLink name={"test"} uuid={"test"}/>
                    <NoteLink name={"test"} uuid={"test"}/>
                    <NoteLink name={"test"} uuid={"test"}/>
                    <NoteLink name={"test"} uuid={"test"}/>
                    <NoteLink name={"test"} uuid={"test"}/>
                    <NoteLink name={"test"} uuid={"test"}/>
                    <NoteLink name={"test"} uuid={"test"}/>
                </div>
                <hr className={styles.separator}/>
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

