import { useEffect } from 'react';
import styles from './RemoveMemberModal.module.css';
import CloseIcon from '@assets/icons/close.svg?react';
import { useTranslation } from 'react-i18next';

interface RemoveMemberModalProps {
  isOpen:      boolean;
  memberName:  string;
  onClose:     () => void;
  onConfirm:   () => void;
}

export default function RemoveMemberModal({
  isOpen,
  memberName,
  onClose,
  onConfirm,
}: RemoveMemberModalProps) {
  const { t } = useTranslation();

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
      aria-labelledby="remove-member-title"
      aria-describedby="remove-member-desc"
    >
      <div className={styles.dialog}>

        <div className={styles.header}>
          <div>
            <h2 id="remove-member-title" className={`${styles.title} h5`}>
              {t('space.remove_member_title', 'Remove member?')}
            </h2>
            <p id="remove-member-desc" className={`${styles.subtitle} bodyTextSm`}>
              {t('space.remove_member_confirm', 'Are you sure you want to remove {{name}} from this space?', { name: memberName })}
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

        <div className={styles.footer}>
          <button
            type="button"
            className={`${styles.cancelBtn} bodyTextSm`}
            onClick={onClose}
          >
            {t('space.cancel', 'Cancel')}
          </button>
          <button
            type="button"
            className={`btn btnDanger ${styles.removeBtn} bodyTextSm`}
            onClick={handleConfirm}
          >
            {t('space.remove_member', 'Remove Member')}
          </button>
        </div>

      </div>
    </div>
  );
}
