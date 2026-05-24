import { useState } from 'react';
import styles from './SpaceMembersTab.module.css';
import SpaceMemberRow from '@components/Spaces/SpaceMemberRow/SpaceMemberRow';
import magnifierIcon from '@assets/icons/magnifier.svg';
import collaborateIcon from '@assets/icons/collaborate.svg';
import type { SpaceMember, SpaceRole } from '@customTypes/Space';
import { useTranslation } from 'react-i18next';
import { useModal } from '../../../context/ModalContext';

interface SpaceMembersTabProps {
  members: SpaceMember[];
  viewerRole: SpaceRole;
  onRemoveMember?: (memberId: string) => void;
}

export default function SpaceMembersTab({
  members,
  viewerRole,
  onRemoveMember,
}: SpaceMembersTabProps) {
  const { t } = useTranslation();
  const [search, setSearch] = useState('');
  const { setInviteMemberModal } = useModal();

  const viewerIsAdmin = viewerRole === 'admin';

  const filtered = members.filter(
    (m) =>
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={styles.container}>
      {/* Toolbar */}
      <div className={styles.toolbar}>
        <div className={styles.searchWrapper}>
          <img src={magnifierIcon} alt="" className={styles.searchIcon} aria-hidden="true" />
          <input
            type="search"
            className={`${styles.searchInput} bodyTextSm`}
            placeholder={t('search_members', 'Search members...')}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label={t('search_members', 'Search members')}
          />
        </div>

        {viewerIsAdmin && (
          <button
            className={`btn btnPrimary ${styles.inviteBtn} bodyTextSm`}
            onClick={() => setInviteMemberModal(true)}
            aria-label={t('invite_member', 'Invite Member')}
          >
            <img src={collaborateIcon} alt="" className={styles.inviteIcon} aria-hidden="true" />
            <span>{t('invite_member', 'Invite Member')}</span>
          </button>
        )}
      </div>

      {/* Member list */}
      <div className={styles.list} role="list">
        {filtered.length === 0 ? (
          <p className={`${styles.empty} bodyText`}>
            {search
              ? t('no_members_match', 'No members match your search.')
              : t('no_members', 'No members yet.')}
          </p>
        ) : (
          filtered.map((member) => (
            <div key={member.id} role="listitem">
              <SpaceMemberRow
                member={member}
                viewerIsAdmin={viewerIsAdmin}
                onRemove={onRemoveMember}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
