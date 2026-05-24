import styles from './SpaceMemberRow.module.css';
import type { SpaceMember } from '@customTypes/Space';
import SpaceMemberAvatar from '@components/Spaces/SpaceMemberAvatar/SpaceMemberAvatar';
import SpaceBadge from '@components/Spaces/SpaceBadge/SpaceBadge';
import DotsIcon from "@assets/icons/dots.svg?react"
import { useTranslation } from 'react-i18next';

interface SpaceMemberRowProps {
  member: SpaceMember;
  /** Whether the current viewer is an admin (shows remove button for non-self members) */
  viewerIsAdmin?: boolean;
  onRemove?: (memberId: string) => void;
}

export default function SpaceMemberRow({ member, viewerIsAdmin = false, onRemove }: SpaceMemberRowProps) {
  const { t } = useTranslation();
  const showRemoveBtn = viewerIsAdmin && !member.isCurrentUser;

  return (
    <article className={styles.card}>
      <div className={styles.inner}>

        {/* Left: avatar + info */}
        <div className={styles.memberInfo}>
          <SpaceMemberAvatar
            initials={member.initials}
            gradient={member.avatarGradient}
            isOnline={member.isOnline}
          />

          <div className={styles.textGroup}>
            {/* Name row */}
            <div className={styles.nameRow}>
              <span className={`${styles.name} bodyText`}>{member.name}</span>

              {member.isCurrentUser && (
                <span className={`${styles.youBadge} caption`}>
                  {t('you', 'You')}
                </span>
              )}

              {member.isOnline && (
                <span className={styles.onlineDotInline} aria-label={t('online', 'Online')} />
              )}
            </div>

            <span className={`${styles.email} bodyTextSm`}>{member.email}</span>
            <span className={`${styles.joined} caption`}>
              {t('joined_date', 'Joined {{date}}', { date: member.joinedDate })}
            </span>
          </div>
        </div>

        {/* Right: role badge + optional remove button */}
        <div className={styles.actions}>
          <SpaceBadge role={member.role} />

          {showRemoveBtn && (
            <button
              className={styles.removeBtn}
              onClick={() => onRemove?.(member.id)}
              aria-label={t('remove_member', 'Remove {{name}}', { name: member.name })}
            >
              {/* vertical dots / more options icon */}
              <span className={styles.dotsIcon}>
                <DotsIcon/>
              </span>
             
            </button>
          )}
        </div>

      </div>
    </article>
  );
}
