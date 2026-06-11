import type { SnackbarItem } from "./SnackbarContext";
import Snackbar from "./Snackbar";
import styles from "./SnackbarContainer.module.css";

interface SnackbarContainerProps {
  items: SnackbarItem[];
  onDismiss: (id: string) => void;
  onAnimationEnd: (id: string) => void;
  onPause: (id: string) => void;
  onResume: (id: string) => void;
}

export default function SnackbarContainer({
  items,
  onDismiss,
  onAnimationEnd,
  onPause,
  onResume,
}: SnackbarContainerProps) {
  return (
    <div className={styles.container}>
      {items.map((item) => (
        <Snackbar
          key={item.id}
          item={item}
          onDismiss={onDismiss}
          onAnimationEnd={onAnimationEnd}
          onMouseEnter={() => onPause(item.id)}
          onMouseLeave={() => onResume(item.id)}
        />
      ))}
    </div>
  );
}
