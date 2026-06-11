import {useParams, Navigate, useNavigate} from 'react-router-dom';
import styles from './SpaceSettingsPage.module.css';
import type {Space} from '@customTypes/Space';
import SettingsIcon from '@assets/icons/settings.svg?react';
import BackIcon from "@assets/icons/back.svg?react";
import SpaceBadge from '@components/Spaces/SpaceBadge/SpaceBadge';
import SpaceSettingsGeneralSection from '@components/Spaces/SpaceSettingsGeneralSection/SpaceSettingsGeneralSection';
import SpaceSettingsRolesSection from '@components/Spaces/SpaceSettingsRolesSection/SpaceSettingsRolesSection';
import SpaceSettingsInvitationsSection
    from '@components/Spaces/SpaceSettingsInvitationsSection/SpaceSettingsInvitationsSection';
import SpaceSettingsDangerSection from '@components/Spaces/SpaceSettingsDangerSection/SpaceSettingsDangerSection';
import {useTranslation} from 'react-i18next';

// ── Mock data — replace with API calls ──────────────────────────────────────
const MOCK_SPACES: Space[] = [
    {
        id: '1',
        name: 'Marketing Team',
        description: 'Marketing campaigns and strategy',
        role: 'admin',
        users_count: 12,
        notes_count: 45,
        gradient: 'purple-pink',
        access: 'private',
        pivot: {space_id: "1", role: 'admin', "joined_at": "asdasd", user_id: "123"}
    },
    {
        id: '2',
        name: 'Product Development',
        description: 'Product roadmap and features',
        role: 'owner',
        users_count: 8,
        notes_count: 67,
        gradient: 'blue-cyan',
        access: 'public',
        pivot: {space_id: "1", role: 'admin', "joined_at": "asdasd", user_id: "123"}
    },
    {
        id: '3',
        name: 'Design Resources',
        description: 'Shared design assets and guidelines',
        role: 'viewer',
        users_count: 25,
        notes_count: 123,
        gradient: 'green',
        access: 'public',
        pivot: {space_id: "1", role: 'admin', "joined_at": "asdasd", user_id: "123"}
    },
    {
        id: '4',
        name: 'Engineering',
        description: 'Technical documentation and architecture',
        role: 'admin',
        users_count: 15,
        notes_count: 89,
        gradient: 'green',
        access: 'private',
        pivot: {space_id: "1", role: 'admin', "joined_at": "asdasd", user_id: "123"}
    },
];
// ────────────────────────────────────────────────────────────────────────────

const GRADIENT_MAP: Record<Space['gradient'], string> = {
    'purple-pink': 'var(--gradient-purple-pink)',
    'blue-cyan': 'var(--gradient-blue-cyan)',
    'green': 'var(--gradient-green)',
};

export default function SpaceSettingsPage() {
    const {spaceId} = useParams<{ spaceId: string }>();
    const navigate = useNavigate();
    const {t} = useTranslation();

    const space = MOCK_SPACES.find((s) => s.id === spaceId);
    if (!space) return <Navigate to="/spaces" replace/>;

    const isAdmin = space.role === 'admin';

    return (
        <main className={styles.page}>

            {/* ── Page header ── */}
            <div className={styles.pageHeader}>
                <button
                    className={styles.backBtn}
                    onClick={() => navigate(`/spaces/${spaceId}`)}

                >
                    <div className={styles.backIcon}>
                        <BackIcon/>
                    </div>


                </button>

                <div
                    className={styles.spaceIcon}
                    style={{backgroundImage: GRADIENT_MAP[space.gradient]}}

                    aria-hidden="true"
                >
                    <SettingsIcon/>

                </div>

                <div className={styles.titleGroup}>
                    <div className={styles.titleRow}>


                        <h1 className={`${styles.pageTitle} h3`}>
                            {t('space.space_settings', 'Space Settings')}
                        </h1>
                    </div>
                    <p className={`${styles.pageSubtitle} bodyText`}>{space.name}</p>
                </div>

                <SpaceBadge role={space.role}/>
            </div>

            {/* ── Scrollable content ── */}
            <div className={styles.content}>

                {/* General — visible to all, editable only by admin */}
                <SpaceSettingsGeneralSection
                    initialName={space.name}
                    initialDescription={space.description}
                    initialPrivacy={space.access}
                    readOnly={!isAdmin}
                    onSave={(data) => {
                        // TODO: call API to update space
                        console.log('Update space:', data);
                    }}
                />

                {isAdmin && (
                    <SpaceSettingsRolesSection
                        onSave={(permissions) => {
                            // TODO: call API to update role permissions
                            console.log('Update permissions:', permissions);
                        }}
                    />
                )}

                {isAdmin && (
                    <SpaceSettingsInvitationsSection
                        spaceId={space.id}
                        onSendInvite={(email) => {
                            // TODO: call API to send invite
                            console.log('Send invite to:', email);
                        }}
                        onGenerateLink={() => {
                            // TODO: call API to generate invite link
                            console.log('Generate invite link for space:', space.id);
                        }}
                    />
                )}

                <SpaceSettingsDangerSection
                    viewerRole={space.role}
                    onLeave={() => {
                        // TODO: call API to leave space
                        console.log('Leave space:', space.id);
                        navigate('/spaces');
                    }}
                    onArchive={() => {
                        // TODO: call API to archive space
                        console.log('Archive space:', space.id);
                        navigate('/spaces');
                    }}
                    onDelete={() => {
                        // TODO: call API to delete space
                        console.log('Delete space:', space.id);
                        navigate('/spaces');
                    }}
                />

            </div>
        </main>
    );
}
