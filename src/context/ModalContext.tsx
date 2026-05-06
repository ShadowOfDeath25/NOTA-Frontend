import { createContext, useContext, useState, type ReactNode } from "react";
import ImportModal from "../components/ImportModal/ImportModal";

interface ModalContextType {
    isOpenImportModal: boolean;
    setImportModal: (value: boolean) => void;
}

const ModalContext = createContext<ModalContextType | null>(null);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [isOpenImportModal, setImportModal] = useState<boolean>(false);

  return (
    <ModalContext.Provider value={{ isOpenImportModal, setImportModal }}>
      {children}
        {isOpenImportModal && <ImportModal
            isOpen={isOpenImportModal}
            onCancel={() => setImportModal(false)}
        />}

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