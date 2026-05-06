import styles from "./ImportModal.module.css";
import FileIcon from "@assets/icons/file.svg?react";
import StorageIcon from "@assets/icons/storge.svg?react";
import UploadIcon from "@assets/icons/upload.svg?react";
import FilesIcon from "@assets/icons/files.svg?react";

import Step from "./StepModal";
import ImportResult from "./ImportResult"; 

import { useImportProgress } from "../../hooks/useImportProgress";
import { useFileHandler } from "../../hooks/useFileHandler";

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
            <h5 className={styles.title}>Import PDF</h5>
          </div>
          <p className={`${styles.subtitle} bodyTextSm`}>
            Upload a PDF file to convert into a note
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
                    Upload from Device
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

              <h5>Drag and drop your PDF here</h5>
              <div className={`${styles.or} bodyTextSm`}>or</div>

              <button
                className={`${styles.browseBtn} btn btnPrimary`}
                onClick={openFileDialog}
              >
                <span className={styles.browseIcon}>
                  <FilesIcon />
                </span>
                <span>Browse Files</span>
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
                label="Analyzing pages"
                done={progress > 30}
              />
              <Step
                active={progress > 30}
                label="Recognizing text"
                done={progress > 60}
              />
              <Step
                active={progress > 60}
                label="Formatting content"
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
            Cancel
          </button>

          {status === "done" && <button className={`${styles.saveNoteBtn} btn btnPrimary`}>Save as Note</button>}
        </div>
      </div>
    </div>
  );
}