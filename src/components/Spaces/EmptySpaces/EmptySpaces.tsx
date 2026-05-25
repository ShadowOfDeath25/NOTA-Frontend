import styles from './EmptySpaces.module.css';
import CollaborateIcon from '@assets/icons/collaborate.svg?react';
import AddIcon from '@assets/icons/add.svg?react';
import { useTranslation } from 'react-i18next';

interface EmptySpacesProps {
  onCreateSpace: () => void;
}

export default function EmptySpaces({ onCreateSpace }: EmptySpacesProps) {
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      <div className={styles.iconWrapper} aria-hidden="true">
        <div className={styles.icon}>
          <CollaborateIcon/>
        </div>
        
      </div>

      <h3 className={`${styles.title} h3`}>
        {t('space.no_spaces_yet', 'No spaces yet')}
      </h3>

      <p className={`bodyText ${styles.description}`}>
        {t('space.spaces_empty_description', 'Create a space to organize your notes and collaborate')}
      </p>

      <button
        className={`btn btnPrimary ${styles.createBtn}`}
        onClick={onCreateSpace}
        aria-label={t('space.create_space', 'Create Space')}
      >
         <div className={styles.iconbtn}>
          <AddIcon/>
        </div>
        <span>{t('space.create_space', 'Create Space')}</span>
      </button>
    </div>
  );
}
