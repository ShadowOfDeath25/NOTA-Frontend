import { createContext, useContext, useState, type ReactNode } from "react";
import ImportModal from "../components/ImportModal/ImportModal";
import CreateSpaceModal from "@components/Spaces/CreateSpaceModal/CreateSpaceModal";
import InviteMemberModal from "@components/Spaces/InviteMemberModal/InviteMemberModal";
import AddNoteModal from "@components/Spaces/AddNoteModal/AddNoteModal";
import MoveToSpaceModal from "@components/Editor/MoveToSpaceModal/MoveToSpaceModal";
import NoteInfoModal from "@components/Editor/NoteInfoModal/NoteInfoModal";
import type { NoteInfo } from "@components/Editor/NoteInfoModal/NoteInfoModal";
import ShareNoteModal from "@components/Editor/ShareNoteModal/ShareNoteModal";
import type { Collaborator } from "@components/Editor/ShareNoteModal/ShareNoteModal";
import DeleteNoteModal from "@components/Editor/DeleteNoteModal/DeleteNoteModal";

// ── Mock spaces — replace with API data ──────────────────────────────────────
const MOCK_SPACES_FOR_MOVE = [
  { id: '1', name: 'Marketing Team' },
  { id: '2', name: 'Product Development' },
  { id: '3', name: 'Design Resources' },
  { id: '4', name: 'Engineering' },
];
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
    setNoteInfoModal:    (value: boolean) => void;
    noteInfo:            NoteInfo | null;
    setNoteInfo:         (info: NoteInfo | null) => void;
    isOpenShareNoteModal: boolean;
    setShareNoteModal:   (value: boolean) => void;
    isOpenDeleteNoteModal: boolean;
    setDeleteNoteModal:  (value: boolean) => void;
}

const ModalContext = createContext<ModalContextType | null>(null);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [isOpenImportModal,       setImportModal]       = useState<boolean>(false);
  const [isOpenCreateSpaceModal,  setCreateSpaceModal]  = useState<boolean>(false);
  const [isOpenInviteMemberModal, setInviteMemberModal] = useState<boolean>(false);
  const [isOpenAddNoteModal,      setAddNoteModal]      = useState<boolean>(false);
  const [isOpenMoveToSpaceModal,  setMoveToSpaceModal]  = useState<boolean>(false);
  const [isOpenNoteInfoModal,     setNoteInfoModal]     = useState<boolean>(false);
  const [noteInfo,                setNoteInfo]          = useState<NoteInfo | null>(null);
  const [isOpenShareNoteModal,    setShareNoteModal]    = useState<boolean>(false);
  const [isOpenDeleteNoteModal,   setDeleteNoteModal]   = useState<boolean>(false);

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
  // ─────────────────────────────────────────────────────────────────────────

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
          navigator.clipboard.writeText(window.location.href).catch(() => {});
        }}
      />

      <AddNoteModal
        isOpen={isOpenAddNoteModal}
        onClose={() => setAddNoteModal(false)}
        onSubmit={(data) => {
          // TODO: call API to create note in space
          console.log('Create note:', data);
          setAddNoteModal(false);
        }}
      />

      <MoveToSpaceModal
        isOpen={isOpenMoveToSpaceModal}
        spaces={MOCK_SPACES_FOR_MOVE}
        onClose={() => setMoveToSpaceModal(false)}
        onMove={(spaceId) => {
          // TODO: call API to move note to space
          console.log('Move note to space:', spaceId);
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
          // TODO: call API to delete note
          console.log('Delete note confirmed');
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
