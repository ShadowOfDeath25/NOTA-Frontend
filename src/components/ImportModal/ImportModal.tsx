import styles from "./ImportModal.module.css";
import FileIcon from "@assets/icons/file.svg?react";
import StorageIcon from "@assets/icons/storge.svg?react";
import UploadIcon from "@assets/icons/upload.svg?react";
import FilesIcon from "@assets/icons/files.svg?react";

import { useFileHandler } from "../../hooks/useFileHandler";
import { useCreate } from "@hooks/api/useCreate";
import { useSnackbar } from "@components/Snackbar/SnackbarContext";
import { t } from "i18next";

interface ImportModalProps {
  isOpen: boolean;
  onCancel: () => void;
}

export default function ImportModal({ isOpen, onCancel }: ImportModalProps) {
  const {
    fileInputRef,
    openFileDialog,
  } = useFileHandler();

  const importPdfMutation = useCreate("notes/read-pdf");
  const { showSnackbar } = useSnackbar();

  const onFileSelected = (selectedFile: File) => {
    if (selectedFile.type !== "application/pdf") {
      showSnackbar({
        type: "error",
        message: t("ImportModal.only_pdf_allowed", "Only PDF files are allowed"),
      });
      return;
    }

    if (selectedFile.size > 100 * 1024 * 1024) {
      showSnackbar({
        type: "error",
        message: t("ImportModal.max_size_error", "Maximum file size is 100MB"),
      });
      return;
    }

    onCancel();

    showSnackbar({
      type: "info",
      message: t("ImportModal.import_in_progress", "Importing in progress…"),
    });

    const formData = new FormData();
    formData.append("file", selectedFile);

    importPdfMutation.mutate(formData, {
      onSuccess: () => {
        showSnackbar({
          type: "success",
          message: t("ImportModal.import_success", "PDF imported successfully"),
        });
      },
      onError: () => {
        showSnackbar({
          type: "error",
          message: t("ImportModal.import_error", "Failed to import PDF"),
          action: {
            label: t("ImportModal.retry", "Retry"),
            onClick: () => onFileSelected(selectedFile),
          },
        });
      },
    });
  };

  const handleFileSelectWrapper = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      onFileSelected(selectedFile);
    }
    event.target.value = "";
  };

  const handleDropWrapper = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      onFileSelected(droppedFile);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        
        <div className={styles.header}>
          <div className={styles.iconTitleContainer}>
            <div className={styles.icon}>
              <FileIcon />
            </div>
            <h5 className={styles.title}>{t("ImportModal.import_PDF", "Import PDF")}</h5>
          </div>
          <p className={`${styles.subtitle} bodyTextSm`}>
            {t("import_pdf_description", "Upload a PDF file to convert into a note")}
          </p>
        </div>

        <>
          <div className={styles.tabs}>
            <div className={styles.tab}>
              <button className={styles.active}>
                <StorageIcon />
                <span className={styles.tabText}>
                  {t("ImportModal.Upload_from_Device", "Upload from Device")}
                </span>
              </button>
            </div>
          </div>

          <div
            className={styles.uploadArea}
            onDrop={handleDropWrapper}
            onDragOver={(e) => e.preventDefault()}
          >
            <div className={styles.uploadIcon}>
              <UploadIcon />
            </div>

            <h5>{t("ImportModal.Drag_and_drop_your_PDF_here", "Drag and drop your PDF here")}</h5>
            <div className={`${styles.or} bodyTextSm`}>{t("ImportModal.or", "or")}</div>

            <button
              className={`${styles.browseBtn} btn btnPrimary`}
              onClick={openFileDialog}
            >
              <FilesIcon />
              <span>{t("ImportModal.browse_files", "Browse Files")}</span>
            </button>

            <div className={styles.uploadHints}>
              <p className={styles.hintText}>{t("ImportModal.supported_formats", "Supported: PDF files only")}</p>
              <p className={styles.hintText}>{t("ImportModal.max_size", "Max size: 50MB")}</p>
            </div>

            <input
              type="file"
              accept="application/pdf"
              ref={fileInputRef}
              onChange={handleFileSelectWrapper}
              hidden
            />
          </div>
        </>

        <div className={styles.footer}>
          <button className={styles.cancelBtn} onClick={onCancel}>
            {t("ImportModal.cancel", "Cancel")}
          </button>
        </div>
      </div>
    </div>
  );
}
