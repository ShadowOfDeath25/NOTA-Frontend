import { useState, useEffect, useRef } from 'react';
import styles from './AddNoteModal.module.css';
import CloseIcon from '@assets/icons/close.svg?react';
import AddIcon from '@assets/icons/add.svg?react';
import { useTranslation } from 'react-i18next';

interface AddNoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (data: { title: string; tags: string[] }) => void;
}

export default function AddNoteModal({ isOpen, onClose, onSubmit }: AddNoteModalProps) {
  const { t } = useTranslation();

  const [title, setTitle]   = useState('');
  const [tags,  setTags]    = useState('');
  const titleRef            = useRef<HTMLInputElement>(null);

  // Focus title on open, reset on close
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => titleRef.current?.focus(), 50);
    } else {
      setTitle('');
      setTags('');
    }
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const isValid = title.trim().length > 0;

  const parseTags = (raw: string): string[] =>
    raw
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

  const handleSubmit = () => {
    if (!isValid) return;
    onSubmit?.({ title: title.trim(), tags: parseTags(tags) });
    onClose();
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className={styles.overlay}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="add-note-title"
    >
      <div className={styles.dialog}>

        {/* Header */}
        <div className={styles.header}>
          <div>
            <h2 id="add-note-title" className={`${styles.title} h5`}>
              {t('space.add_note', 'Add Note')}
            </h2>
            <p className={`${styles.subtitle} bodyTextSm`}>
              {t('space.add_note_subtitle', 'Give your note a name to get started')}
            </p>
          </div>
          <button
            className={styles.closeBtn}
            onClick={onClose}
          
          >
            <CloseIcon />
          </button>
        </div>

        {/* Body */}
        <div className={styles.body}>

          {/* Note Name */}
          <div className={styles.field}>
            <label htmlFor="note-title" className={`${styles.label} bodyTextSm`}>
              {t('space.note_name', 'Note Name')}
            </label>
            <input
              ref={titleRef}
              id="note-title"
              type="text"
              className={`${styles.input} bodyTextSm`}
              placeholder={t('space.note_name_placeholder', 'Enter note name...')}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
              maxLength={200}
            />
          </div>

          {/* Tags */}
          <div className={styles.field}>
            <label htmlFor="note-tags" className={`${styles.label} bodyTextSm`}>
              {t('space.tags', 'Tags (optional)')}
            </label>
            <input
              id="note-tags"
              type="text"
              className={`${styles.input} bodyTextSm`}
              placeholder={t('space.tags_placeholder', 'marketing, ideas, planning...')}
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
            />
          </div>

        </div>

        {/* Footer */}
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
            className={`btn btnPrimary ${styles.createBtn} bodyTextSm`}
            onClick={handleSubmit}
            disabled={!isValid}
            aria-disabled={!isValid}
          >
            <div className={styles.createBtnIcon}><AddIcon /></div>
            <span>{t('space.create_note', 'Create Note')}</span>
          </button>
        </div>

      </div>
    </div>
  );
}
