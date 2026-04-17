import styles from "./NoteCard.module.css";
import starIcon from "@assets/icons/star.svg";
import starFilledIcon from "@assets/icons/star-filled.svg";
import clockIcon from "@assets/icons/clock.svg";
import { useState } from "react";

export  type NoteData ={
    id: string;
    title: string;
    summary?: string;
    date: string;
    tag?: string;
    starred: boolean;
    
}
export interface NoteCardProps extends NoteData {
    onNoteClick: (id: string, starred?: boolean) => void;
}

const NoteCard = ({ id, title, summary = " ", date, tag, starred, onNoteClick }: NoteCardProps) => {
    const [isStarred, setIsStarred] = useState(starred);

    function handleStarClick(e: React.MouseEvent) {
        e.stopPropagation(); 
        setIsStarred(!isStarred);
        onNoteClick(id, !isStarred);
       

    }

    function handleNoteClick() {
      
        onNoteClick(id);
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

            <p className={styles.summary}>{summary}</p>

            <div className={styles.footer}>
                <div className={styles.dateContainer}>
                    <img src={clockIcon} alt="clock" className={styles.clockIcon} />
                    <span className={styles.date}>{date}</span>
                </div>
                {tag && <span className={styles.tag}>{tag}</span>}
            </div>
        </div>
    );
};

export default NoteCard;