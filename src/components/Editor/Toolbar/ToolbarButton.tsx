import type { ComponentType, SVGProps, MouseEvent } from "react";
import styles from "./styles.module.css";

export interface ToolbarButtonProps {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  label: string;
  shortcut?: string;
  isActive?: boolean;
  isDisabled?: boolean;
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
}

export default function ToolbarButton({
  icon: Icon,
  label,
  shortcut,
  isActive = false,
  isDisabled = false,
  onClick,
}: ToolbarButtonProps) {
  const classes = [
    styles.btn,
    isActive ? styles.active : "",
    isDisabled ? styles.disabled : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type="button"
      className={classes}
      
      onMouseDown={(e: MouseEvent<HTMLButtonElement>) => e.preventDefault()}
      onClick={onClick}
      disabled={isDisabled}
      aria-label={label}
      aria-pressed={isActive}
      title={shortcut ? `${label} (${shortcut})` : label}
    >
      <Icon aria-hidden="true" focusable="false" />
    </button>
  );
}
