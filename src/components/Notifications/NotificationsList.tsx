import styles from './NotificationsList.module.css';
import NotificationItem from './NotificationItem/NotificationItem';
import NotificationsEmpty from './NotificationsEmpty/NotificationsEmpty';
import NotificationsLoading from './NotificationsLoading/NotificationsLoading';
import NotificationsError from './NotificationsError/NotificationsError';
import { useTranslation } from 'react-i18next';
import type { Notification } from '@customTypes/Notification';
import CloseIcon from '@assets/icons/close.svg?react';

interface NotificationsListProps {
    notifications?: Notification[];
    isLoading?: boolean;
    isError?: boolean;
    errorMessage?: string;
    onRetry?: () => void;
    onMarkAsRead?: (id: string) => void;
    onMarkAllAsRead?: () => void;
    onNotificationClick?: (notification: Notification) => void;
    onClose?: () => void;
}

export default function NotificationsList({
    notifications,
    isLoading = false,
    isError = false,
    errorMessage,
    onRetry,
    onMarkAsRead,
    onMarkAllAsRead,
    onNotificationClick,
    onClose,
}: NotificationsListProps) {
    const { t } = useTranslation();

    if (isLoading) return <NotificationsLoading />;
    if (isError) return <NotificationsError message={errorMessage} onRetry={onRetry} />;

    const unreadCount = notifications?.filter((n) => !n.isRead).length ?? 0;

    return (
        <div className={styles.container} role="region" aria-label={t('notifications.notifications', 'Notifications')}>
            <div className={styles.header}>
                <div className={styles.headerLeft}>
                    <h2 className={`${styles.title} bodyText`}>
                        {t('notifications.notifications', 'Notifications')}
                    </h2>
                    {unreadCount > 0 && (
                        <span className={`${styles.countBadge} caption`}>
                            {unreadCount}
                        </span>
                    )}
                </div>
                <div className={styles.headerRight}>
                    {unreadCount > 0 && onMarkAllAsRead && (
                        <button
                            className={`${styles.markAllBtn} bodyTextSm`}
                            onClick={onMarkAllAsRead}
                        >
                            {t('notifications.mark_all_read', 'Mark all as read')}
                        </button>
                    )}
                    {onClose && (
                        <button
                            className={styles.closeBtn}
                            onClick={onClose}
                           
                        >
                            <CloseIcon />
                        </button>
                    )}
                </div>
            </div>

            {(!notifications || notifications.length === 0) ? (
                <NotificationsEmpty />
            ) : (
                <div className={styles.list} role="list">
                    {notifications.map((notification) => (
                        <div key={notification.id} role="listitem">
                            <NotificationItem
                                notification={notification}
                                onMarkAsRead={onMarkAsRead}
                                onClick={onNotificationClick}
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
