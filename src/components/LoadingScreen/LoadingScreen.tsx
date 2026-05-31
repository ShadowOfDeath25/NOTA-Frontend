import styles from './LoadingScreen.module.css';
import logo from '@assets/logo.svg';
import { useTranslation } from 'react-i18next';

export default function LoadingScreen() {
  const { t } = useTranslation();

  return (
    <div className={styles.screen} role="status" aria-label={t('loading', 'Loading')}>
      <div className={styles.content}>

        {/* Logo */}
        <div className={styles.logoWrapper}>
          <img src={logo} alt="Nota logo" className={styles.logo} />
        </div>

        {/* Brand row: line — NOTA — line */}
        <div className={styles.brandRow}>
          <span className={styles.line} aria-hidden="true" />
          <span className={styles.brandName}>NOTA</span>
          <span className={styles.line} aria-hidden="true" />
        </div>

        {/* Tagline */}
        <p className={styles.tagline}>
          {t('AI_Powered_Note_Taking_Platform', 'AI-Powered Note-Taking Platform')}
        </p>

        {/* Animated loading dots */}
        <div className={styles.dots} aria-hidden="true">
          <span className={styles.dot} />
          <span className={styles.dot} />
          <span className={styles.dot} />
        </div>

      </div>
    </div>
  );
}
