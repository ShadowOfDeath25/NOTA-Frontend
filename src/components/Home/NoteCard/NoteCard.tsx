import styles from "./NoteCard.module.css";
import starIcon from "@assets/icons/star.svg";
import starFilledIcon from "@assets/icons/star-filled.svg";
import clockIcon from "@assets/icons/clock.svg";
import {useState} from "react";

import {useNavigate} from "react-router-dom";
import type {Note} from "@customTypes/Note.ts";

export interface NoteCardProps extends Note {
    onNoteClick: (id: string, starred?: boolean) => void;
}

const NoteCard = ({id, title, preview = "", created_at, starred, onNoteClick}: NoteCardProps) => {
    const navigate = useNavigate();
    const [isStarred, setIsStarred] = useState(starred);
    const date = new Date(created_at.split('T')[0]).toLocaleDateString('en-GB');


    function handleStarClick(e: React.MouseEvent) {
        e.stopPropagation();
        setIsStarred(!isStarred);
        onNoteClick(id, !isStarred);


    }

    function handleNoteClick() {

        navigate(`/notes/${id}`, {state: {note_title: title}});
    }

    return (
        <div className={styles.container} onClick={handleNoteClick} role="button">
            <div className={styles.header}>
                <h4 className={`${styles.title} bodyText`}>{title}</h4>
                <button className={styles.starButton} onClick={handleStarClick}>
                    <img
                        src={isStarred ? starFilledIcon : starIcon}
                        alt="star"
                        className={styles.starIcon}
                    />
                </button>
            </div>

            <p className={styles.summary}>{preview}</p>

            <div className={styles.footer}>
                <div className={styles.dateContainer}>
                    <img src={clockIcon} alt="clock" className={styles.clockIcon}/>
                    <span className={styles.date}>{date}</span>
                </div>
                {/* {tag && <span className={styles.tag}>{tag}</span>} */}
            </div>
        </div>
    );
};

export default NoteCard;