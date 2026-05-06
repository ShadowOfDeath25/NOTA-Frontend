import styles from "./ImportModal.module.css";
import SuccessPDFIcon from "@assets/icons/successPDF.svg?react";

interface StepProps {
  active: boolean;
  done?: boolean;
  label: string;
}

export default function Step({ active, done, label }: StepProps) {
  return (
    <div className={`${styles.step} ${active ? styles.activeStep : ""}`}>
      {done ? (
        <span className={styles.check}><SuccessPDFIcon/></span>
      ) : active ? (
        <span className={styles.loader}></span>
      ) : (
        <span className={styles.pending}></span> 
      )}
      <span>{label}</span>
    </div>
  );
}