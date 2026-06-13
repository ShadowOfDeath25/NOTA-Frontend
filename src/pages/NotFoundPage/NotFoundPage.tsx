import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import styles from './NotFoundPage.module.css';
import EmptyIcon from '@assets/icons/empty.svg?react';

export default function NotFoundPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.iconWrapper} aria-hidden="true">
          <div className={styles.icon}>
            <EmptyIcon />
          </div>
        </div>
        <h3 className={`${styles.title} h3`}>
          {t('not_found.title', 'Page not found')}
        </h3>
        <p className={`bodyText ${styles.description}`}>
          {t('not_found.description', 'The page you\'re looking for doesn\'t exist or has been moved.')}
        </p>
        <button
          className={`btn btnPrimary bodyTextSm ${styles.action}`}
          onClick={() => navigate('/home')}
        >
          {t('not_found.go_home', 'Go Home')}
        </button>
      </div>
    </div>
  );
}
