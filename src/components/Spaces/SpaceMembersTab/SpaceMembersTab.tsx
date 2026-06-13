import {useState} from 'react';
import styles from './SpaceMembersTab.module.css';
import SpaceMemberRow from '@components/Spaces/SpaceMemberRow/SpaceMemberRow';
import MagnifierIcon from '@assets/icons/magnifier.svg?react';
import CollaborateIcon from '@assets/icons/collaborate.svg?react';
import type {SpaceMember, SpaceRole} from '@customTypes/Space';
import {useTranslation} from 'react-i18next';
import {useModal} from '../../../context/ModalContext';

interface SpaceMembersTabProps {
    spaceId: string;
    members: SpaceMember[];
    viewerRole: SpaceRole;
    onRemoveMember?: (memberId: string) => void;
}

export default function SpaceMembersTab({
                                            spaceId,
                                            members,
                                            viewerRole,
                                            onRemoveMember,
                                        }: SpaceMembersTabProps) {
    const {t} = useTranslation();
    const [search, setSearch] = useState('');
    const {setInviteMemberModal} = useModal();

    const viewerIsAdmin = viewerRole === 'admin' || viewerRole === "owner";

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
                    <div className={styles.searchIcon}>
                        <MagnifierIcon/>
                    </div>
                    <input
                        type="search"
                        className={`${styles.searchInput} bodyTextSm`}
                        placeholder={t('space.search_members', 'Search members...')}
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                {viewerIsAdmin && (
                    <button
                        className={`btn btnPrimary ${styles.inviteBtn} bodyTextSm`}
                        onClick={() => setInviteMemberModal(true, spaceId)}

                    >
                        <div className={styles.inviteIcon}>
                            <CollaborateIcon/>
                        </div>
                        <span>{t('space.invite_member', 'Invite Member')}</span>
                    </button>
                )}
            </div>

            {/* Member list */}
            <div className={styles.list} role="list">
                {filtered.length === 0 ? (
                    <p className={`${styles.empty} bodyText`}>
                        {search
                            ? t('space.no_members_match', 'No members match your search.')
                            : t('space.no_members', 'No members yet.')}
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
