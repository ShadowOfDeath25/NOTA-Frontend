import { useEffect } from 'react';
import styles from './NoteInfoModal.module.css';
import CloseIcon from '@assets/icons/close.svg?react';
import ClockIcon  from '@assets/icons/clock.svg?react';
import { useTranslation } from 'react-i18next';

// ── Types ────────────────────────────────────────────────────────────────────

export interface NoteInfo {
  createdAt:    string;   // e.g. "November 25, 2025 at 10:42 PM"
  lastEditedAt: string;
}

interface NoteInfoModalProps {
  isOpen:  boolean;
  info?:   NoteInfo;
  onClose: () => void;
}

// ── Component ────────────────────────────────────────────────────────────────

export default function NoteInfoModal({
  isOpen,
  info,
  onClose,
}: NoteInfoModalProps) {
  const { t } = useTranslation();

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (isOpen && e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className={styles.overlay}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="note-info-title"
    >
      <div className={styles.dialog}>

        {/* ── Header ── */}
        <div className={styles.header}>
          <h2 id="note-info-title" className={`${styles.title} h5`}>
            {t('editor.info_modal.note_information', 'Note Information')}
          </h2>
          <button
            className={styles.closeBtn}
            onClick={onClose}
            aria-label={t('editor.close_note', 'Close')}
          >
            <CloseIcon />
          </button>
        </div>

        {/* ── Body: Created + Last Edited rows ── */}
        <div className={styles.body}>

          <div className={styles.row}>
            <div className={styles.rowIcon}><ClockIcon /></div>
            <div className={styles.rowText}>
              <span className={`${styles.rowLabel} bodyTextSm`}>
                {t('editor.info_modal.created', 'Created')}
              </span>
              <span className={`${styles.rowValue} caption`}>
                {info?.createdAt ?? '—'}
              </span>
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.rowIcon}><ClockIcon /></div>
            <div className={styles.rowText}>
              <span className={`${styles.rowLabel} bodyTextSm`}>
                {t('editor.info_modal.last_edited', 'Last Edited')}
              </span>
              <span className={`${styles.rowValue} caption`}>
                {info?.lastEditedAt ?? '—'}
              </span>
            </div>
          </div>

        </div>

        {/* ── Footer ── */}
        <div className={styles.footer}>
          <button
            type="button"
            className={`${styles.cancelBtn} bodyTextSm`}
            onClick={onClose}
          >
            {t('editor.info_modal.cancel', 'Cancel')}
          </button>
        </div>

      </div>
    </div>
  );
}
