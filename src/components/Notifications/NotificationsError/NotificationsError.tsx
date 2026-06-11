import styles from './NotificationsError.module.css';
import WarningIcon from '@assets/icons/warning.svg?react';
import { useTranslation } from 'react-i18next';

interface NotificationsErrorProps {
    message?: string;
    onRetry?: () => void;
}

export default function NotificationsError({
    message,
    onRetry,
}: NotificationsErrorProps) {
    const { t } = useTranslation();

    return (
        <div className={styles.container} role="alert">
            <div className={styles.iconWrapper} aria-hidden="true">
                <WarningIcon />
            </div>
            <p className={`bodyTextSm ${styles.message}`}>
                {message ?? t('notifications.error_loading', 'Failed to load notifications')}
            </p>
            {onRetry && (
                <button
                    className={`btn btnPrimary bodyTextSm ${styles.retryBtn}`}
                    onClick={onRetry}
                >
                    {t('notifications.retry', 'Try Again')}
                </button>
            )}
        </div>
    );
}
