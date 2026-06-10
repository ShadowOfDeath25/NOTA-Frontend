import type { ComponentType, SVGProps } from 'react';
import styles from './NoteOptionsMenu.module.css';

interface NoteOptionsMenuItemProps {
  icon:    ComponentType<SVGProps<SVGSVGElement>>;
  label:   string;
  danger?: boolean;
  onClick: () => void;
}

export default function NoteOptionsMenuItem({
  icon: Icon,
  label,
  danger = false,
  onClick,
}: NoteOptionsMenuItemProps) {
  return (
    <button
      type="button"
      role="menuitem"
      className={`${styles.item} ${danger ? styles.itemDanger : ''}`}
      /* Prevent editor focus loss on click — same pattern as ToolbarButton */
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
    >
      <span className={styles.itemIcon}>
        <Icon aria-hidden="true" focusable="false" />
      </span>
      <span className={styles.itemLabel}>{label}</span>
    </button>
  );
}
