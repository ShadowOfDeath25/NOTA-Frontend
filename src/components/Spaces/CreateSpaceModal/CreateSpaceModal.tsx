import { useState, useEffect, useRef } from 'react';
import styles from './CreateSpaceModal.module.css';
import LockIcon from '@assets/icons/Lock.svg?react';
import WorldIcon from '@assets/icons/world.svg?react';
import CloseIcon from '@assets/icons/close.svg?react';
import { useTranslation } from 'react-i18next';

type PrivacyType = 'private' | 'public';

interface CreateSpaceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (data: { name: string; description: string; privacy: PrivacyType }) => void;
}

export default function CreateSpaceModal({ isOpen, onClose, onSubmit }: CreateSpaceModalProps) {
  const { t } = useTranslation();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [privacy, setPrivacy] = useState<PrivacyType>('private');
  const nameInputRef = useRef<HTMLInputElement>(null);

  // Focus name input when modal opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => nameInputRef.current?.focus(), 50);
    } else {
      setName('');
      setDescription('');
      setPrivacy('private');
    }
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const isValid = name.trim().length > 0;

  const handleSubmit = () => {
    if (!isValid) return;
    onSubmit?.({ name: name.trim(), description: description.trim(), privacy });
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
      aria-labelledby="create-space-title"
    >
      <div className={styles.dialog}>

        {/* Header */}
        <div className={styles.header}>
          <div>
            <h2 id="create-space-title" className={`${styles.title} h5`}>
              {t('create_new_space', 'Create New Space')}
            </h2>
            <p className={`${styles.subtitle} bodyTextSm`}>
              {t('create_space_subtitle', 'Create a new space to organize your notes')}
            </p>
          </div>
          <button
            className={styles.closeBtn}
            onClick={onClose}
            aria-label={t('close', 'Close')}
          >
            <CloseIcon />
          </button>
        </div>

        {/* Body */}
        <div className={styles.body}>

          {/* Space Name */}
          <div className={styles.field}>
            <label htmlFor="space-name" className={`${styles.label} bodyTextSm`}>
              {t('space_name', 'Space Name')}
            </label>
            <input
              ref={nameInputRef}
              id="space-name"
              type="text"
              className={`${styles.input} bodyTextSm`}
              placeholder={t('space_name_placeholder', 'Enter space name')}
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
              maxLength={100}
            />
          </div>

          {/* Description */}
          <div className={styles.field}>
            <label htmlFor="space-description" className={`${styles.label} bodyTextSm`}>
              {t('description', 'Description')}
            </label>
            <input
              id="space-description"
              type="text"
              className={`${styles.input} bodyTextSm`}
              placeholder={t('space_description_placeholder', 'Enter space description')}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              maxLength={200}
            />
          </div>

          {/* Privacy */}
          <div className={styles.field}>
            <span className={`${styles.label} bodyTextSm`}>
              {t('privacy', 'Privacy')}
            </span>
            <div className={styles.privacyOptions}>

              {/* Private option */}
              <button
                type="button"
                className={`${styles.privacyCard} ${privacy === 'private' ? styles.selected : ''}`}
                onClick={() => setPrivacy('private')}
                aria-pressed={privacy === 'private'}
              >
                <div className={styles.privacyIcon}>
                  <LockIcon />
                </div>
                <div className={styles.privacyText}>
                  <span className={`${styles.privacyTitle} bodyText`}>
                    {t('private', 'Private')}
                  </span>
                  <span className={`${styles.privacyDesc} caption`}>
                    {t('private_desc', 'Only invited members can access')}
                  </span>
                </div>
                <div className={`${styles.radio} ${privacy === 'private' ? styles.radioSelected : ''}`}>
                  {privacy === 'private' && <div className={styles.radioDot} />}
                </div>
              </button>

              {/* Public option */}
              <button
                type="button"
                className={`${styles.privacyCard} ${privacy === 'public' ? styles.selected : ''}`}
                onClick={() => setPrivacy('public')}
                aria-pressed={privacy === 'public'}
              >
                <div className={styles.privacyIcon}>
                  <WorldIcon />
                </div>
                <div className={styles.privacyText}>
                  <span className={`${styles.privacyTitle} bodyText`}>
                    {t('public', 'Public')}
                  </span>
                  <span className={`${styles.privacyDesc} caption`}>
                    {t('public_desc', 'Anyone can join')}
                  </span>
                </div>
                <div className={`${styles.radio} ${privacy === 'public' ? styles.radioSelected : ''}`}>
                  {privacy === 'public' && <div className={styles.radioDot} />}
                </div>
              </button>

            </div>
          </div>
        </div>

        {/* Footer */}
        <div className={styles.footer}>
          <button
            type="button"
            className={`${styles.cancelBtn} bodyTextSm`}
            onClick={onClose}
          >
            {t('cancel', 'Cancel')}
          </button>
          <button
            type="button"
            className={`${styles.createBtn} btn btnPrimary bodyTextSm`}
            onClick={handleSubmit}
            disabled={!isValid}
            aria-disabled={!isValid}
          >
            {t('create', 'Create')}
          </button>
        </div>

      </div>
    </div>
  );
}
