import {useTranslation} from "react-i18next";
import ActionCard from "@components/ActionCard/ActionCard.tsx";
import styles from "./ActionList.module.css";
import addIcon from "@assets/icons/add.svg";
import uploadIcon from "@assets/icons/upload.svg";
import collaborateIcon from "@assets/icons/collaborate.svg";
// @ts-ignore
import type {Action} from "@types/Action.ts";

const ActionList = () => {
    const {t} = useTranslation();

    const actions: Action[] = [
        {
            id: "note",
            titleAr: "create_note",
            titleEn: "Create New Note",
            descAr: "create_note_description",
            descEn: "Start a new note",
            icon: addIcon,
            color: "purpleIcon",
        },
        {
            id: "pdf",
            titleAr: "import_pdf",
            titleEn: "Import PDF",
            descAr: "import_pdf_description",
            descEn: "Convert PDF to note",
            icon: uploadIcon,
            color: "blueIcon",
        },
        {
            id: "team",
            titleAr: "collaborate",
            titleEn: "Collaborate",
            descAr: "collaborate_description",
            descEn: "Share with team",
            icon: collaborateIcon,
            color: "greenIcon",
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
                />
            ))}
        </div>
    );
};

export default ActionList;