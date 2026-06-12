import {createContext, useContext, useState, useMemo, type ReactNode} from "react";
import ImportModal from "../components/ImportModal/ImportModal";
import CreateSpaceModal from "@components/Spaces/CreateSpaceModal/CreateSpaceModal";
import InviteMemberModal from "@components/Spaces/InviteMemberModal/InviteMemberModal";
import AddNoteModal from "../components/AddNoteModal/AddNoteModal";
import MoveToSpaceModal from "@components/Editor/MoveToSpaceModal/MoveToSpaceModal";
import NoteInfoModal from "@components/Editor/NoteInfoModal/NoteInfoModal";
import type {NoteInfo} from "@components/Editor/NoteInfoModal/NoteInfoModal";
import ShareNoteModal from "@components/Editor/ShareNoteModal/ShareNoteModal";
import type {Collaborator} from "@components/Editor/ShareNoteModal/ShareNoteModal";
import DeleteNoteModal from "@components/Editor/DeleteNoteModal/DeleteNoteModal";
import {useCreate} from "@hooks/api/useCreate.ts";
import type {UseMutationResult, UseQueryResult} from "@tanstack/react-query";
import type {Note} from "@customTypes/Note.ts";
import {useDelete} from "@hooks/api/useDelete.ts";
import {useRead} from "@hooks/api/useRead.ts";
import {useUpdate} from "@hooks/api/useUpdate.ts";
import type {Space} from "@customTypes/Space.ts";

// ─────────────────────────────────────────────────────────────────────────────

interface ModalContextType {
    isOpenImportModal: boolean;
    setImportModal: (value: boolean) => void;
    isOpenCreateSpaceModal: boolean;
    setCreateSpaceModal: (value: boolean) => void;
    isOpenInviteMemberModal: boolean;
    setInviteMemberModal: (value: boolean) => void;
    isOpenAddNoteModal: boolean;
    setAddNoteModal: (value: boolean) => void;
    isOpenMoveToSpaceModal: boolean;
    setMoveToSpaceModal: (value: boolean) => void;
    isOpenNoteInfoModal: boolean;
    setNoteInfoModal: (value: boolean) => void;
    noteInfo: NoteInfo | null;
    setNoteInfo: (info: NoteInfo | null) => void;
    isOpenShareNoteModal: boolean;
    setShareNoteModal: (value: boolean) => void;
    isOpenDeleteNoteModal: boolean;
    setDeleteNoteModal: (value: boolean) => void;
    deleteNoteId: string | null;
    setDeleteNoteId: (id: string | null) => void;
    moveToSpaceNoteId: string | null;
    setMoveToSpaceNoteId: (id: string | null) => void;
}

const ModalContext = createContext<ModalContextType | null>(null);

export const ModalProvider = ({children}: { children: ReactNode }) => {
    const [isOpenImportModal, setImportModal] = useState<boolean>(false);
    const [isOpenCreateSpaceModal, setCreateSpaceModal] = useState<boolean>(false);
    const [isOpenInviteMemberModal, setInviteMemberModal] = useState<boolean>(false);
    const [isOpenAddNoteModal, setAddNoteModal] = useState<boolean>(false);
    const [isOpenMoveToSpaceModal, setMoveToSpaceModal] = useState<boolean>(false);
    const [isOpenNoteInfoModal, setNoteInfoModal] = useState<boolean>(false);
    const [noteInfo, setNoteInfo] = useState<NoteInfo | null>(null);
    const [isOpenShareNoteModal, setShareNoteModal] = useState<boolean>(false);
    const [isOpenDeleteNoteModal, setDeleteNoteModal] = useState<boolean>(false);
    const [deleteNoteId, setDeleteNoteId] = useState<string | null>(null);
    const [moveToSpaceNoteId, setMoveToSpaceNoteId] = useState<string | null>(null);


    const creatNoteMutation = useCreate<UseMutationResult<Note>>("notes");
    const deleteNoteMutation = useDelete('notes', {
        onSuccess: () => {
            window.location.href = '/home';
        },
    });
    const updateNoteMutation = useUpdate("notes");

    const {data: spacesData} = useRead<UseQueryResult<Space[]>>("spaces");
    const spaceOptions = useMemo(
        () => (spacesData?.data ?? []).map((s) => ({id: s.id, name: s.name})),
        [spacesData],
    );

    // ── Mock collaborators — replace with real note data ──────────────────────
    const MOCK_COLLABORATORS: Collaborator[] = [
        {
            id: 'me',
            name: 'You',
            initials: 'ME',
            avatarGradient: 'linear-gradient(135deg, #c27aff 0%, #fb64b6 100%)',
            isCurrentUser: true,
            permission: 'can_edit',
        },
        {
            id: 'sk',
            name: 'Sarah Khan',
            initials: 'SK',
            avatarGradient: 'linear-gradient(135deg, #51a2ff 0%, #00d3f2 100%)',
            permission: 'can_edit',
        },
        {
            id: 'jd',
            name: 'John Doe',
            initials: 'JD',
            avatarGradient: 'linear-gradient(135deg, #05df72 0%, #00d492 100%)',
            permission: 'can_edit',
        },
    ];


    return (
        <ModalContext.Provider value={{
            isOpenImportModal,
            setImportModal,
            isOpenCreateSpaceModal,
            setCreateSpaceModal,
            isOpenInviteMemberModal,
            setInviteMemberModal,
            isOpenAddNoteModal,
            setAddNoteModal,
            isOpenMoveToSpaceModal,
            setMoveToSpaceModal,
            isOpenNoteInfoModal,
            setNoteInfoModal,
            noteInfo,
            setNoteInfo,
            isOpenShareNoteModal,
            setShareNoteModal,
            isOpenDeleteNoteModal,
            setDeleteNoteModal,
            deleteNoteId,
            setDeleteNoteId,
            moveToSpaceNoteId,
            setMoveToSpaceNoteId,
        }}>
            {children}

            {isOpenImportModal && (
                <ImportModal
                    isOpen={isOpenImportModal}
                    onCancel={() => setImportModal(false)}
                />
            )}


            <CreateSpaceModal
                isOpen={isOpenCreateSpaceModal}
                onClose={() => setCreateSpaceModal(false)}
                onSubmit={(data) => {
                    // TODO: call API to create space
                    console.log('Create space:', data);
                    setCreateSpaceModal(false);
                }}
            />

            <InviteMemberModal
                isOpen={isOpenInviteMemberModal}
                onClose={() => setInviteMemberModal(false)}
                onSubmit={(data) => {
                    // TODO: call API to invite member
                    console.log('Invite member:', data);
                    setInviteMemberModal(false);
                }}
                onCopyLink={() => {
                    navigator.clipboard.writeText(window.location.href).catch(() => {
                    });
                }}
            />

            <AddNoteModal
                isOpen={isOpenAddNoteModal}
                onClose={() => setAddNoteModal(false)}
                onSubmit={(data) => {
                    creatNoteMutation.mutate(data)
                    setAddNoteModal(false);
                }}
            />

            <MoveToSpaceModal
                isOpen={isOpenMoveToSpaceModal}
                spaces={spaceOptions}
                onClose={() => setMoveToSpaceModal(false)}
                onMove={(spaceId) => {
                    if (moveToSpaceNoteId) {
                        // @ts-expect-error — TVariables defaults to BasePayload, but we need extra fields
                        updateNoteMutation.mutate({id: moveToSpaceNoteId, space_id: spaceId});
                    }
                    setMoveToSpaceModal(false);
                }}
            />

            <NoteInfoModal
                isOpen={isOpenNoteInfoModal}
                info={noteInfo ?? undefined}
                onClose={() => setNoteInfoModal(false)}
            />

            <ShareNoteModal
                isOpen={isOpenShareNoteModal}
                collaborators={MOCK_COLLABORATORS}
                onClose={() => setShareNoteModal(false)}
                onSendInvite={(email, permission) => {
                    // TODO: call API to share note
                    console.log('Share note with:', email, permission);
                    setShareNoteModal(false);
                }}
            />
            <DeleteNoteModal
                isOpen={isOpenDeleteNoteModal}
                onClose={() => setDeleteNoteModal(false)}
                onConfirm={() => {
                    if (deleteNoteId) {
                        deleteNoteMutation.mutate(deleteNoteId);
                    }
                    setDeleteNoteModal(false);
                }}
            />
        </ModalContext.Provider>
    );
};

export const useModal = () => {
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error("useModal must be used within a ModalProvider");
    }
    return context;
};
