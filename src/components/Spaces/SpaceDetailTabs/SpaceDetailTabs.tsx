import styles from './SpaceDetailTabs.module.css';
import fileIcon from '@assets/icons/file.svg';
import collaborateIcon from '@assets/icons/collaborate.svg';
import { useTranslation } from 'react-i18next';

export type SpaceTab = 'notes' | 'members';

interface SpaceDetailTabsProps {
  activeTab: SpaceTab;
  onTabChange: (tab: SpaceTab) => void;
}

export default function SpaceDetailTabs({ activeTab, onTabChange }: SpaceDetailTabsProps) {
  const { t } = useTranslation();

  return (
    <div className={styles.container} role="tablist" aria-label={t('space_tabs', 'Space sections')}>
      <button
        role="tab"
        aria-selected={activeTab === 'notes'}
        className={`${styles.tab} ${activeTab === 'notes' ? styles.active : ''} bodyTextSm`}
        onClick={() => onTabChange('notes')}
      >
        <img src={fileIcon} alt="" className={styles.tabIcon} aria-hidden="true" />
        <span>{t('notes', 'Notes')}</span>
      </button>

      <button
        role="tab"
        aria-selected={activeTab === 'members'}
        className={`${styles.tab} ${activeTab === 'members' ? styles.active : ''} bodyTextSm`}
        onClick={() => onTabChange('members')}
      >
        <img src={collaborateIcon} alt="" className={styles.tabIcon} aria-hidden="true" />
        <span>{t('members', 'Members')}</span>
      </button>
    </div>
  );
}
