import styles from './SpaceSettingsDangerSection.module.css';
import LogoutIcon from '@assets/icons/logout.svg?react';
import TrashIcon from '@assets/icons/trash.svg?react';
import { useTranslation } from 'react-i18next';
import type { SpaceRole } from '@customTypes/Space';

interface SpaceSettingsDangerSectionProps {
  viewerRole: SpaceRole;
  onLeave?: () => void;
  onDelete?: () => void;
}

export default function SpaceSettingsDangerSection({
  viewerRole,
  onLeave,
  onDelete,
}: SpaceSettingsDangerSectionProps) {
  const { t } = useTranslation();

  const canDelete = viewerRole === 'owner';

  return (
    <div className={styles.container}>
      <h2 className={`${styles.sectionTitle} bodyText`}>
        {t('space.danger_zone', 'Danger Zone')}
      </h2>

      <div className={styles.card}>

        {/* Leave Space */}
        <div className={styles.dangerRow}>
          <div className={styles.dangerInfo}>
            <span className={`${styles.dangerTitle} bodyText`}>
              {t('space.leave_space', 'Leave Space')}
            </span>
            <span className={`${styles.dangerDesc} bodyTextSm`}>
              {t('space.leave_space_desc', 'You will no longer have access to this space')}
            </span>
          </div>
          <button
            type="button"
            className={`${styles.actionBtn} bodyTextSm`}
            onClick={onLeave}
          >
            <div className={styles.actionBtnIcon}><LogoutIcon /></div>
            <span>{t('space.leave', 'Leave')}</span>
          </button>
        </div>

        {canDelete && (
          <>
            <div className={styles.divider} />

            {/* Delete Space */}
            <div className={styles.dangerRow}>
              <div className={styles.dangerInfo}>
                <span className={`${styles.dangerTitle} bodyText`}>
                  {t('space.delete_space', 'Delete Space')}
                </span>
                <span className={`${styles.dangerDesc} bodyTextSm`}>
                  {t('space.delete_space_desc', 'Permanently delete this space and all its contents')}
                </span>
              </div>
              <button
                type="button"
                className={`${styles.actionBtnRed} bodyTextSm`}
                onClick={onDelete}
              >
                <div className={styles.actionBtnIcon}><TrashIcon /></div>
                <span>{t('space.delete', 'Delete')}</span>
              </button>
            </div>
          </>
        )}

      </div>
    </div>
  );
}
