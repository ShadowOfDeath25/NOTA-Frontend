import type { SnackbarItem } from "./SnackbarContext";
import styles from "./Snackbar.module.css";
import CloseIcon from "@assets/icons/close.svg?react";
import SuccessIcon from "@assets/icons/success.svg?react";
import WarningIcon from "@assets/icons/warning.svg?react";
import BellIcon from "@assets/icons/bell.svg?react";

interface SnackbarProps {
  item: SnackbarItem;
  onDismiss: (id: string) => void;
  onAnimationEnd: (id: string) => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

const variantIcon = {
  success: SuccessIcon,
  error: WarningIcon,
  warning: WarningIcon,
  info: BellIcon,
};

export default function Snackbar({
  item,
  onDismiss,
  onAnimationEnd,
  onMouseEnter,
  onMouseLeave,
}: SnackbarProps) {
  const { id, type, title, message, action, isExiting } = item;
  const Icon = variantIcon[type];

  const role = type === "error" || type === "warning" ? "alert" : "status";
  const live =
    type === "error" || type === "warning" ? "assertive" : "polite";

  return (
    <div
      className={`${styles.snackbar} ${styles[type]} ${isExiting ? styles.exit : styles.enter}`}
      role={role}
      aria-live={live}
      aria-atomic="true"
      onAnimationEnd={() => {
        if (isExiting) onAnimationEnd(id);
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className={styles.accent} aria-hidden="true" />

      <div className={styles.iconWrapper} aria-hidden="true">
        <Icon />
      </div>

      <div className={styles.content}>
        {title && <span className={styles.title}>{title}</span>}
        <p className={styles.message}>{message}</p>
      </div>

      {action && (
        <button
          type="button"
          className={styles.actionBtn}
          onClick={(e) => {
            e.stopPropagation();
            action.onClick();
          }}
        >
          {action.label}
        </button>
      )}

      <button
        type="button"
        className={styles.closeBtn}
        onClick={() => onDismiss(id)}
        aria-label="Dismiss notification"
      >
        <CloseIcon />
      </button>
    </div>
  );
}
