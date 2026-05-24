import styles from "./DotsMenu.module.css";
import CalendarIcon from "@assets/icons/clock.svg?react";
import TrashIcon from "@assets/icons/trash.svg?react";

interface DotsMenuProps {
  date:string;
  onDelete:()=>void;
}

export default function DotsMenu({
  date,
  onDelete
}:DotsMenuProps) {

  return (
    <div
      className={styles.menu}
      onClick={(e)=>e.stopPropagation()}
    >

      <div className={styles.info}>
        <CalendarIcon />
        <span>Created: {date}</span>
      </div>

      <button
        className={`${styles.item} ${styles.danger}`}
        onClick={onDelete}
      >
        <TrashIcon />
        Delete Note
      </button>

    </div>
  );
}