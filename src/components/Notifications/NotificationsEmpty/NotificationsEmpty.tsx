import styles from './NotificationsEmpty.module.css';
import BellIcon from '@assets/icons/bell.svg?react';
import { useTranslation } from 'react-i18next';

export default function NotificationsEmpty() {
    const { t } = useTranslation();

    return (
        <div className={styles.container}>
            <div className={styles.iconWrapper} aria-hidden="true">
                <BellIcon />
            </div>
            <h3 className={`${styles.title} h3`}>
                {t('notifications.empty_title', 'No notifications yet')}
            </h3>
            <p className={`bodyText ${styles.description}`}>
                {t(
                    'notifications.empty_description',
                    'We will notify you when something new arrives'
                )}
            </p>
        </div>
    );
}
