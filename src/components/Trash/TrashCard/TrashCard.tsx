import styles from './TrashCard.module.css';
import ClockIcon from "@assets/icons/clock.svg?react";
import TrashIcon from "@assets/icons/trash.svg?react";
import RestoreIcon from "@assets/icons/restore.svg?react";

interface TrashCardProps {
  title: string;
  deletedDate: string;
  onRestore: () => void;
  onPermanentDelete: () => void;
}

const TrashCard: React.FC<TrashCardProps> = ({ 
  title, 
  deletedDate, 
  onRestore, 
  onPermanentDelete 
}) => {
  return (
    <div className={styles.card}>
      <h3 className={styles.title}>{title}</h3>
      
      <div className={styles.info}>
        <ClockIcon />
        <span className={`${styles.dateText} bodyTextSm`}>Deleted on: {deletedDate}</span>
      </div>

      <div className={styles.divider}></div>

      <div className={styles.actions}>
        <button className={`${styles.btn} ${styles.restoreBtn}`} onClick={onRestore}>
          <RestoreIcon />
          <span>Restore</span>
        </button>
        
        <button className={`${styles.btn} ${styles.deleteBtn}`} onClick={onPermanentDelete}>
          <TrashIcon />
          <span>Delete Permanently</span>
        </button>
      </div>
    </div>
  );
};

export default TrashCard;