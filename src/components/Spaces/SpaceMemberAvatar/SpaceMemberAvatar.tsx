import styles from './SpaceMemberAvatar.module.css';

interface SpaceMemberAvatarProps {
  initials: string;
  gradient: string;
  isOnline?: boolean;
  size?: number;
}

export default function SpaceMemberAvatar({
  initials,
  gradient,
  isOnline = false,
  size = 48,
}: SpaceMemberAvatarProps) {
  return (
    <div
      className={styles.wrapper}
      style={{ width: size, height: size, flexShrink: 0 }}
      aria-hidden="true"
    >
      <div
        className={styles.avatar}
        style={{ backgroundImage: gradient }}
      >
        <span className={styles.initials} style={{ fontSize: size * 0.33 }}>
          {initials}
        </span>
      </div>
      {isOnline && <span className={styles.onlineDot} aria-label="Online" />}
    </div>
  );
}
