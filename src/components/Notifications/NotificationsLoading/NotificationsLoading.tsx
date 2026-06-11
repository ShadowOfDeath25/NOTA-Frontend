import styles from './NotificationsLoading.module.css';

export default function NotificationsLoading() {
    return (
        <div className={styles.container} aria-label="Loading notifications" role="status">
            {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className={styles.card}>
                    <div className={styles.inner}>
                        <div className={styles.iconSkeleton} />
                        <div className={styles.textGroup}>
                            <div className={styles.titleSkeleton} />
                            <div className={styles.messageSkeleton} />
                            <div className={styles.timeSkeleton} />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
