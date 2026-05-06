import styles from "./ImportModal.module.css";
import SuccessPDFIcon from "@assets/icons/successPDF.svg?react";
import PenIcon from "@assets/icons/pen.svg?react";
import EyeIcon from "@assets/icons/eye.svg?react";
interface Props {
  file: File;
}

export default function ImportResult({ file }: Props) {
  return (
    <div className={styles.resultContainer}>
      
      <div className={styles.fileCard}>
        <div>
          <p>{file.name}</p>
          <span className={styles.size}>{Math.ceil(file.size/(1024*1024))}MB</span>
        </div>

        <div className={styles.completeBadge}>
          <SuccessPDFIcon />
          <span>Complete</span>
        </div>
      </div>
      <div className={`textBodySm ${styles.reviewText}`}>
        Review and edit the extracted content below
      </div>
      <div className={styles.actions}>
         <button className={`${styles.previewBtn} `}>
                  <span className={styles.iconTab}>
                    <EyeIcon />
                  </span>
                  <span className={styles.tabText}>
                    Preview Content
                  </span>
                </button>

        <button className={`${styles.editBtn} `}>
                  <span className={styles.iconTab}>
                    <PenIcon />
                  </span>
                  <span className={styles.tabText}>
                    Edit Content
                  </span>
                </button>
      </div>

   
      <div className={styles.previewBox}>
        <h4># Scope</h4>

        <h5>## Document Summary</h5>
        <p>
          This document has been automatically extracted from a PDF
          file using OCR technology...
        </p>

        <h5>## Introduction</h5>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit...
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit...
        </p><p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit...
        </p><p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit...
        </p><p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit...
        </p><p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit...
        </p><p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit...
        </p><p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit...
        </p>
        <h5>## Introduction</h5>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit...
        </p>
      </div>

    </div>
  );
}