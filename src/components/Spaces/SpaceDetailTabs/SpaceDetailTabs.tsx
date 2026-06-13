import styles from './SpaceDetailTabs.module.css';
import FileIcon from '@assets/icons/file.svg?react';
import CollaborateIcon from '@assets/icons/collaborate.svg?react';
import { useTranslation } from 'react-i18next';

export type SpaceTab = 'notes' | 'members' | 'settings';

interface SpaceDetailTabsProps {
  activeTab: SpaceTab;
  onTabChange: (tab: SpaceTab) => void;
}

export default function SpaceDetailTabs({ activeTab, onTabChange }: SpaceDetailTabsProps) {
  const { t } = useTranslation();

  return (
    <div className={styles.container} role="tablist" >
      <button
        role="tab"
        aria-selected={activeTab === 'notes'}
        className={`${styles.tab} ${activeTab === 'notes' ? styles.active : ''} bodyTextSm`}
        onClick={() => onTabChange('notes')}
      >
        <FileIcon className={styles.tabIcon} aria-hidden="true" />
        <span>{t('space.notes', 'Notes')}</span>
      </button>

      <button
        role="tab"
        aria-selected={activeTab === 'members'}
        className={`${styles.tab} ${activeTab === 'members' ? styles.active : ''} bodyTextSm`}
        onClick={() => onTabChange('members')}
      >
        <CollaborateIcon className={styles.tabIcon} aria-hidden="true" />
        <span>{t('space.members', 'Members')}</span>
      </button>
    </div>
  );
}
