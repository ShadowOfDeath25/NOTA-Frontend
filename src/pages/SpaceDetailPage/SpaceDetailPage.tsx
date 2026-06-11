import {useState} from 'react';
import {useParams, Navigate} from 'react-router-dom';
import styles from './SpaceDetailPage.module.css';
import SpaceDetailHeader from '@components/Spaces/SpaceDetailHeader/SpaceDetailHeader';
import SpaceDetailTabs from '@components/Spaces/SpaceDetailTabs/SpaceDetailTabs';
import SpaceNotesTab from '@components/Spaces/SpaceNotesTab/SpaceNotesTab';
import SpaceMembersTab from '@components/Spaces/SpaceMembersTab/SpaceMembersTab';
import type {SpaceTab} from '@components/Spaces/SpaceDetailTabs/SpaceDetailTabs';
import type {Space, SpaceMember} from '@customTypes/Space';
import {useModal} from '../../context/ModalContext';

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
        role: 'editor',
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

const MOCK_NOTES = [
    {
        id: 'n1',
        title: 'Q4 Marketing Strategy',
        summary: 'Detailed strategy for Q4 campaigns...',
        date: 'Nov 20, 02:00 AM',
        starred: false,
        tags: ['strategy', 'marketing']
    },
    {
        id: 'n2',
        title: 'Campaign Ideas Brainstorm',
        summary: 'Collection of creative campaign concepts...',
        date: 'Nov 18, 02:00 AM',
        starred: false,
        tags: ['ideas', 'brainstorm']
    },
    {
        id: 'n3',
        title: 'Budget Planning 2025',
        summary: 'Annual budget allocations and projections...',
        date: 'Nov 15, 02:00 AM',
        starred: false,
        tags: ['budget', 'planning']
    },
];

const MOCK_MEMBERS: SpaceMember[] = [
    {
        id: 'm0',
        name: 'You',
        email: 'you@example.com',
        initials: 'ME',
        avatarGradient: 'linear-gradient(135deg, #c27aff 0%, #fb64b6 100%)',
        role: 'admin',
        joinedDate: 'Oct 1, 2024',
        isOnline: true,
        isCurrentUser: true,
    },
    {
        id: 'm1',
        name: 'Sarah Khan',
        email: 'sarah@example.com',
        initials: 'SK',
        avatarGradient: 'linear-gradient(135deg, #51a2ff 0%, #00d3f2 100%)',
        role: 'editor',
        joinedDate: 'Oct 5, 2024',
        isOnline: true,
    },
    {
        id: 'm2',
        name: 'Ahmed Ali',
        email: 'ahmed@example.com',
        initials: 'AA',
        avatarGradient: 'linear-gradient(135deg, #05df72 0%, #00d492 100%)',
        role: 'editor',
        joinedDate: 'Oct 12, 2024',
        isOnline: false,
    },
    {
        id: 'm3',
        name: 'Maria Garcia',
        email: 'maria@example.com',
        initials: 'MG',
        avatarGradient: 'linear-gradient(135deg, #ff8904 0%, #ff6467 100%)',
        role: 'viewer',
        joinedDate: 'Oct 18, 2024',
        isOnline: true,
    },
];
// ────────────────────────────────────────────────────────────────────────────

export default function SpaceDetailPage() {
    const {spaceId} = useParams<{ spaceId: string }>();
    const [activeTab, setActiveTab] = useState<SpaceTab>('notes');
    const {setAddNoteModal} = useModal();

    const space = MOCK_SPACES.find((s) => s.id === spaceId);
    if (!space) return <Navigate to="/spaces" replace/>;

    return (
        <main className={styles.container}>
            <SpaceDetailHeader space={space}/>
            <SpaceDetailTabs activeTab={activeTab} onTabChange={setActiveTab}/>

            <div className={styles.tabContent} role="tabpanel">
                {activeTab === 'notes' && (
                    <SpaceNotesTab
                        notes={MOCK_NOTES}
                        onAddNote={() => setAddNoteModal(true)}
                    />
                )}
                {activeTab === 'members' && (
                    <SpaceMembersTab
                        members={MOCK_MEMBERS}
                        viewerRole={space.role}
                        onRemoveMember={() => {
                            // TODO: call API to remove member
                        }}
                    />
                )}
            </div>
        </main>
    );
}
