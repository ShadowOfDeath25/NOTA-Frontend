import {useTranslation} from "react-i18next";
import ActionCard from "@components/Home/ActionCard/ActionCard.tsx";
import styles from "./ActionList.module.css";
import addIcon from "@assets/icons/add.svg?react";
import uploadIcon from "@assets/icons/upload.svg?react";
import collaborateIcon from "@assets/icons/collaborate.svg?react";

import type {Action} from "@customTypes/Action.ts";
import {useModal} from "@context/ModalContext.tsx";
import {useNavigate} from "react-router-dom";

const ActionList = () => {
    const {t} = useTranslation();

    const {setAddNoteModal, setImportModal} = useModal();
    const onCreate = () => {
        setAddNoteModal(true);
    }
    const navigate = useNavigate()


    const actions: Action[] = [
        {
            id: "note",
            titleAr: "create_note",
            titleEn: "Create New Note",
            descAr: "create_note_description",
            descEn: "Start a new note",
            icon: addIcon,
            color: "purpleIcon",
            onClick: onCreate
        },
        {
            id: "pdf",
            titleAr: "import_pdf",
            titleEn: "Import PDF",
            descAr: "import_pdf_description",
            descEn: "Convert PDF to note",
            icon: uploadIcon,
            color: "blueIcon",
            onClick: () => setImportModal(true)
        },
        {
            id: "team",
            titleAr: "collaborate",
            titleEn: "Collaborate",
            descAr: "collaborate_description",
            descEn: "Share with team",
            icon: collaborateIcon,
            color: "greenIcon",
            onClick: () => {
                navigate("/spaces")
            }
        },
    ];

    return (
        <div className={styles.container}>
            {actions.map((item) => (

                <ActionCard
                    key={item.id}
                    title={t(item.titleAr, item.titleEn)}
                    description={t(item.descAr, item.descEn)}
                    icon={item.icon}
                    iconColorClass={item.color}
                    onClick={item.onClick}
                />
            ))}
        </div>
    );
};

export default ActionList;