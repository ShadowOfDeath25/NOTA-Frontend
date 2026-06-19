import {useState} from 'react';
import {useParams, Navigate} from 'react-router-dom';
import styles from './SpaceDetailPage.module.css';
import SpaceDetailHeader from '@components/Spaces/SpaceDetailHeader/SpaceDetailHeader';
import SpaceDetailTabs, {type SpaceTab} from '@components/Spaces/SpaceDetailTabs/SpaceDetailTabs';
import SpaceNotesTab from '@components/Spaces/SpaceNotesTab/SpaceNotesTab';
import SpaceMembersTab from '@components/Spaces/SpaceMembersTab/SpaceMembersTab';
import ChangeRoleModal from '@components/Spaces/ChangeRoleModal/ChangeRoleModal';
import RemoveMemberModal from '@components/Spaces/RemoveMemberModal/RemoveMemberModal';
import type {Space, SpaceMember, SpaceUser, SpaceRole} from '@customTypes/Space';
import {useModal} from '@context/ModalContext.tsx';
import {useRead} from '@hooks/api/useRead.ts';
import {useSpaceNotes} from '@hooks/api/useSpaceNotes.ts';
import LoadingScreen from '@components/LoadingScreen/LoadingScreen';
import {useSpaceUsers} from '@hooks/api/useSpaceUsers.ts';
import {useAuth} from "@hooks/api/useAuth.ts";
import {useRemoveSpaceUser} from "@hooks/api/useRemoveSpaceUser.ts";


interface ChangeRoleTarget {
    memberId: string;
    memberName: string;
    currentRole: SpaceRole;
}

export default function SpaceDetailPage() {
    const {spaceId} = useParams<{ spaceId: string }>();
    const [activeTab, setActiveTab] = useState<SpaceTab>('notes');
    const [changeRoleTarget, setChangeRoleTarget] = useState<ChangeRoleTarget | null>(null);
    const [removeMemberTarget, setRemoveMemberTarget] = useState<{ id: string; name: string } | null>(null);
    const {setAddNoteModal} = useModal();
    const {user} = useAuth()
    const removeMemberMutation = useRemoveSpaceUser();
    const {data: spaceResponse, isLoading: spaceLoading, isError: spaceError} = useRead<{
        data: Space
    }>('spaces', spaceId);
    const {data: notesResponse, isLoading: notesLoading} = useSpaceNotes(spaceId);
    const {data: usersResponse} = useSpaceUsers<{ data: SpaceUser[] }>(spaceId);


    if (spaceLoading || notesLoading) {
        return <LoadingScreen/>;
    }

    const space = spaceResponse?.data;
    if (spaceError || !space) return <Navigate to="/spaces" replace/>;

    const adaptedMembers: SpaceMember[] = (usersResponse?.data ?? []).map((u) => ({
        id: u.pivot.user_id,
        name: u.name,
        email: u.email,
        initials: u.name
            .split(" ")
            .map((part) => part[0])
            .join("")
            .toUpperCase(),
        avatarGradient: "linear-gradient(135deg, #51a2ff 0%, #00d3f2 100%)",
        role: u.pivot.role,
        joinedDate: new Date(u.pivot.joined_at).toLocaleDateString(),
        isOnline: false,
        isCurrentUser: user?.data?.id === u.pivot.user_id
    }));

    const adaptedNotes = (notesResponse?.data ?? []).map((note) => ({
        id: note.id,
        title: note.title,
        preview: note.preview || '',
        date: new Date(note.created_at).toLocaleString(),
        starred: note.is_favorite
    }));


    return (
        <main className={styles.container}>
            <SpaceDetailHeader space={space}/>
            <SpaceDetailTabs activeTab={activeTab} onTabChange={setActiveTab}/>

            <div className={styles.tabContent} role="tabpanel">
                {activeTab === 'notes' && (
                    <SpaceNotesTab
                        notes={adaptedNotes}
                        onAddNote={() => setAddNoteModal(true, spaceId)}
                    />
                )}
                {activeTab === 'members' && (
                    <SpaceMembersTab
                        spaceId={spaceId!}
                        members={adaptedMembers}
                        viewerRole={user?.data?.roles[space.id] ?? "viewer"}
                        onOpenChangeRole={(memberId, memberName, currentRole) =>
                            setChangeRoleTarget({memberId, memberName, currentRole})
                        }
                        onRemoveMember={(memberId) => {
                            const member = adaptedMembers.find(m => m.id === memberId);
                            if (member) setRemoveMemberTarget({id: memberId, name: member.name});
                        }}
                    />
                )}

                {changeRoleTarget && (
                    <ChangeRoleModal
                        isOpen={!!changeRoleTarget}
                        spaceId={spaceId!}
                        memberId={changeRoleTarget.memberId}
                        memberName={changeRoleTarget.memberName}
                        currentRole={changeRoleTarget.currentRole}
                        onClose={() => setChangeRoleTarget(null)}
                    />
                )}

                {removeMemberTarget && (
                    <RemoveMemberModal
                        isOpen={!!removeMemberTarget}
                        memberName={removeMemberTarget.name}
                        onClose={() => setRemoveMemberTarget(null)}
                        onConfirm={() => {
                            removeMemberMutation.mutate({spaceId: spaceId!, userId: removeMemberTarget.id});
                            setRemoveMemberTarget(null);
                        }}
                    />
                )}
            </div>
        </main>
    );
}
