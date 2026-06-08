import { useEffect } from 'react';
import styles from './DeleteNoteModal.module.css';
import CloseIcon from '@assets/icons/close.svg?react';
import { useTranslation } from 'react-i18next';

interface DeleteNoteModalProps {
  isOpen:    boolean;
  noteTitle?: string;
  onClose:   () => void;
  onConfirm: () => void;
}

export default function DeleteNoteModal({
  isOpen,
  onClose,
  onConfirm,
}: DeleteNoteModalProps) {
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

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <div
      className={styles.overlay}
      onClick={handleOverlayClick}
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="delete-note-title"
      aria-describedby="delete-note-desc"
    >
      <div className={styles.dialog}>

        {/* ── Header ── */}
        <div className={styles.header}>
          <div>
            <h2 id="delete-note-title" className={`${styles.title} h5`}>
              {t('editor.delete_modal.are_you_sure', 'Are you sure?')}
            </h2>
            <p id="delete-note-desc" className={`${styles.subtitle} bodyTextSm`}>
              {t('editor.delete_modal.delete_note_confirm', 'Are you sure you want to delete this note? It will be moved to trash.')}
            </p>
          </div>
          <button
            className={styles.closeBtn}
            onClick={onClose}
            aria-label={t('editor.close_note', 'Close')}
          >
            <CloseIcon />
          </button>
        </div>

        {/* ── Footer ── */}
        <div className={styles.footer}>
          <button
            type="button"
            className={`${styles.cancelBtn} bodyTextSm`}
            onClick={onClose}
          >
            {t('editor.delete_modal.cancel', 'Cancel')}
          </button>
          <button
            type="button"
            className={`btn btnDanger ${styles.deleteBtn} bodyTextSm`}
            onClick={handleConfirm}
          >
            {t('editor.delete_modal.delete', 'Delete')}
          </button>
        </div>

      </div>
    </div>
  );
}
