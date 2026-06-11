import styles from './NotificationItem.module.css';
import AiIcon from '@assets/icons/ai.svg?react';
import CollaborateIcon from '@assets/icons/collaborate.svg?react';
import BellIcon from '@assets/icons/bell.svg?react';
import { useTranslation } from 'react-i18next';
import type { Notification } from '@customTypes/Notification';

interface NotificationItemProps {
    notification: Notification;
    onMarkAsRead?: (id: string) => void;
    onClick?: (notification: Notification) => void;
}

const typeIcon = {
    summarize: AiIcon,
    invitation: CollaborateIcon,
    system: BellIcon,
};

export default function NotificationItem({
    notification,
    onMarkAsRead,
    onClick,
}: NotificationItemProps) {
    const { t } = useTranslation();
    const Icon = typeIcon[notification.type];

    const date = new Date(notification.createdAt).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit',
    });

    const handleClick = () => onClick?.(notification);

    const handleMarkAsRead = (e: React.MouseEvent) => {
        e.stopPropagation();
        onMarkAsRead?.(notification.id);
    };

    return (
        <article
            className={`${styles.card} ${!notification.isRead ? styles.unread : ''}`}
            onClick={handleClick}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && handleClick()}
            aria-label={`${notification.title} — ${notification.message}`}
        >
            <div className={styles.inner}>
                <div
                    className={`${styles.iconWrapper} ${styles[notification.type]}`}
                    aria-hidden="true"
                >
                    <Icon />
                </div>

                <div className={styles.textGroup}>
                    <div className={styles.titleRow}>
                        <span className={`${styles.title} bodyText`}>
                            {notification.title}
                        </span>
                        {!notification.isRead && (
                            <span className={styles.unreadDot} aria-label="Unread" />
                        )}
                    </div>

                    <p className={`${styles.message} bodyTextSm`}>
                        {notification.message}
                    </p>

                    <div className={styles.metaRow}>
                        <span className={`${styles.time} caption`}>{date}</span>
                        {!notification.isRead && onMarkAsRead && (
                            <button
                                className={`${styles.markReadBtn} caption`}
                                onClick={handleMarkAsRead}
                            >
                                {t('notifications.mark_as_read', 'Mark as read')}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </article>
    );
}
