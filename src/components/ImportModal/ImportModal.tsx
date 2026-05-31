import styles from "./ImportModal.module.css";
import FileIcon from "@assets/icons/file.svg?react";
import StorageIcon from "@assets/icons/storge.svg?react";
import UploadIcon from "@assets/icons/upload.svg?react";
import FilesIcon from "@assets/icons/files.svg?react";

import Step from "./StepModal";
import ImportResult from "./ImportResult"; 

import { useImportProgress } from "../../hooks/useImportProgress";
import { useFileHandler } from "../../hooks/useFileHandler";
import { t } from "i18next";

interface ImportModalProps {
  isOpen: boolean;
  onCancel: () => void;
}

export default function ImportModal({ isOpen, onCancel }: ImportModalProps) {
  const {
    file,
    fileInputRef,   
    handleDrop,
    handleFileSelect, 
    openFileDialog,
  } = useFileHandler();

  const { progress, step, isCompleted } = useImportProgress(file);

  if (!isOpen) return null;

  const status = !file ? "idle" : isCompleted ? "done" : "processing";

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

      
        {status === "idle" && (
          <>
            <div className={styles.tabs}>
              <div className={`${styles.tab} ${styles.active}`}>
                <button className={`${styles.tabBtn} ${styles.active}`}>
                  <span className={styles.iconTab}>
                    <StorageIcon />
                  </span>
                  <span className={styles.tabText}>
                    {t("ImportModal.Upload_from_Device", "Upload from Device")}
                  </span>
                </button>
              </div>
            </div>

            <div
              className={styles.uploadArea}
              onDrop={handleDrop}
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
                <span className={styles.browseIcon}>
                  <FilesIcon />
                </span>
                <span>{t("ImportModal.browse_files", "Browse Files")}</span>
              </button>

              <input
                type="file"
                accept="application/pdf"
                ref={fileInputRef}
                onChange={handleFileSelect}
                hidden
              />
            </div>
          </>
        )}

   
        {status === "processing" && (
          <div className={styles.processingContainer}>
          
            <div className={styles.fileCard}>
              <div>
                <p>{file?.name}</p>
              </div>

              <div className={styles.fileStatus}>
                <span className={styles.loader}></span>
                <span>{step}</span>
              </div>
            </div>

            
            <div className={styles.progressBar}>
              <div
                className={styles.progressFill}
                style={{ width: `${progress}%` }}
              />
            </div>

          
            <div className={styles.steps}>
              <Step
                active={true}
                label={t("ImportModal.analyzing_pages", "Analyzing pages")}
                done={progress > 30}
              />
              <Step
                active={progress > 30}
                label={t("ImportModal.recognizing_text", "Recognizing text")}
                done={progress > 60}
              />
              <Step
                active={progress > 60}
                label={t("ImportModal.formatting_content", "Formatting content")}
                done={false}
              />
            </div>
          </div>
        )}

       
        {status === "done" && file && (
          <ImportResult file={file} />
        )}



        <div className={styles.footer}>
          <button className={styles.cancelBtn} onClick={onCancel}>
            {t("ImportModal.cancel", "Cancel")}
          </button>

          {status === "done" && <button className={`${styles.saveNoteBtn} btn btnPrimary`}>{t("ImportModal.save_as_note", "Save as Note")}</button>}
        </div>
      </div>
    </div>
  );
}