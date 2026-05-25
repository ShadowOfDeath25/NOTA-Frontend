import styles from './SpacesHeader.module.css';
import addIcon from '@assets/icons/add.svg';
import { useTranslation } from 'react-i18next';

interface SpacesHeaderProps {
  onCreateSpace: () => void;
}

export default function SpacesHeader({ onCreateSpace }: SpacesHeaderProps) {
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      <div className={styles.textGroup}>
        <h3 className={styles.title}>{t('spaces', 'Spaces')}</h3>
        <p className={`bodyText ${styles.subtitle}`}>
          {t('space.Organize_your_notes_with_collaborative_workspaces', 'Organize your notes with collaborative workspaces')}
        </p>
      </div>
      <button
        className={`btn btnPrimary ${styles.createBtn}`}
        onClick={onCreateSpace}
      >
        <img src={addIcon} alt="" className={styles.btnIcon} aria-hidden="true" />
        <span>{t('space.create_space', 'Create Space')}</span>
      </button>
    </div>
  );
}
