import { createContext, useContext, useState, type ReactNode } from "react";
import ImportModal from "../components/ImportModal/ImportModal";
import CreateSpaceModal from "@components/Spaces/CreateSpaceModal/CreateSpaceModal";
import InviteMemberModal from "@components/Spaces/InviteMemberModal/InviteMemberModal";
import AddNoteModal from "@components/Spaces/AddNoteModal/AddNoteModal";

interface ModalContextType {
    isOpenImportModal: boolean;
    setImportModal: (value: boolean) => void;
    isOpenCreateSpaceModal: boolean;
    setCreateSpaceModal: (value: boolean) => void;
    isOpenInviteMemberModal: boolean;
    setInviteMemberModal: (value: boolean) => void;
    isOpenAddNoteModal: boolean;
    setAddNoteModal: (value: boolean) => void;
}

const ModalContext = createContext<ModalContextType | null>(null);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [isOpenImportModal,      setImportModal]      = useState<boolean>(false);
  const [isOpenCreateSpaceModal, setCreateSpaceModal] = useState<boolean>(false);
  const [isOpenInviteMemberModal,setInviteMemberModal]= useState<boolean>(false);
  const [isOpenAddNoteModal,     setAddNoteModal]     = useState<boolean>(false);

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
