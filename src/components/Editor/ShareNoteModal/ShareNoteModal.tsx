import { useState, useEffect, useRef } from 'react';
import styles from './ShareNoteModal.module.css';
import CloseIcon from '@assets/icons/close.svg?react';
import ChevronIcon from '@assets/icons/chevron.svg?react';
import { useTranslation } from 'react-i18next';

// ── Types ────────────────────────────────────────────────────────────────────

export type SharePermission = 'can_edit' | 'can_view';

export interface Collaborator {
  id: string;
  name: string;
  initials: string;
  avatarGradient: string;
  isCurrentUser?: boolean;
  permission: SharePermission;
}

interface ShareNoteModalProps {
  isOpen: boolean;
  collaborators?: Collaborator[];
  onClose: () => void;
  onSendInvite?: (email: string, permission: SharePermission) => void;
}

const PERMISSION_OPTIONS: { value: SharePermission; labelKey: string; defaultLabel: string }[] = [
  { value: 'can_edit', labelKey: 'editor.share_modal.can_edit', defaultLabel: 'Can Edit' },
  { value: 'can_view', labelKey: 'editor.share_modal.can_view', defaultLabel: 'Can View' },
];

// ── Collaborator row ─────────────────────────────────────────────────────────

function CollaboratorRow({ collaborator }: { collaborator: Collaborator }) {
  const { t } = useTranslation();
  const permOption = PERMISSION_OPTIONS.find(
    (p) => p.value === collaborator.permission
  );
  const permLabel = permOption ? t(permOption.labelKey, permOption.defaultLabel) : t('editor.share_modal.can_edit', 'Can Edit');

  return (
    <div className={styles.collaboratorRow}>
      <div className={styles.collaboratorInfo}>
        <div
          className={styles.avatar}
          style={{ backgroundImage: collaborator.avatarGradient }}
          aria-hidden="true"
        >
          {collaborator.initials}
        </div>
        <span className={`${styles.collaboratorName} bodyTextSm`}>
          {collaborator.isCurrentUser ? t('you', 'You') : collaborator.name}
        </span>
      </div>
      <span className={`${styles.permBadge} caption`}>{permLabel}</span>
    </div>
  );
}

// ── Main component ───────────────────────────────────────────────────────────

export default function ShareNoteModal({
  isOpen,
  collaborators = [],
  onClose,
  onSendInvite,
}: ShareNoteModalProps) {
  const { t } = useTranslation();

  const [email,          setEmail]          = useState('');
  const [permission,     setPermission]     = useState<SharePermission>('can_edit');
  const [dropdownOpen,   setDropdownOpen]   = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const emailRef    = useRef<HTMLInputElement>(null);

  // Reset on open, focus email
  useEffect(() => {
    if (isOpen) {
      setEmail('');
      setPermission('can_edit');
      setDropdownOpen(false);
      setTimeout(() => emailRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') {
        if (dropdownOpen) setDropdownOpen(false);
        else onClose();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isOpen, dropdownOpen, onClose]);

  // Close dropdown on outside click
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    if (dropdownOpen) document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, [dropdownOpen]);

  if (!isOpen) return null;

  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  const handleSend = () => {
    if (!isValidEmail) return;
    onSendInvite?.(email.trim(), permission);
    onClose();
  };

  const selectedOption = PERMISSION_OPTIONS.find((p) => p.value === permission);
  const selectedLabel = selectedOption ? t(selectedOption.labelKey, selectedOption.defaultLabel) : t('editor.share_modal.can_edit', 'Can Edit');

  return (
    <div
      className={styles.overlay}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="share-note-title"
    >
      <div className={styles.dialog}>

        {/* ── Header ── */}
        <div className={styles.header}>
          <div>
            <h2 id="share-note-title" className={`${styles.title} h5`}>
              {t('editor.share_modal.share_note', 'Share Note')}
            </h2>
            <p className={`${styles.subtitle} bodyTextSm`}>
              {t('editor.share_modal.share_note_subtitle', 'Share this note with your team')}
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

        {/* ── Body ── */}
        <div className={styles.body}>

          {/* Email + permission row */}
          <div className={styles.inviteRow}>
            <input
              ref={emailRef}
              type="email"
              className={`${styles.emailInput} bodyTextSm`}
              placeholder={t('editor.share_modal.enter_email_address', 'Enter email address')}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              autoComplete="email"
            />

            {/* Permission dropdown */}
            <div className={styles.permWrapper} ref={dropdownRef}>
              <button
                type="button"
                className={`${styles.permTrigger} bodyTextSm`}
                onClick={() => setDropdownOpen((o) => !o)}
                aria-haspopup="listbox"
                aria-expanded={dropdownOpen}
              >
                <span>{selectedLabel}</span>
                <div className={`${styles.chevron} ${dropdownOpen ? styles.chevronOpen : ''}`}>
                  <ChevronIcon />
                </div>
              </button>

              {dropdownOpen && (
                <ul
                  className={styles.dropdown}
                  role="listbox"
                  aria-label={t('editor.share_modal.select_permission', 'Select permission')}
                >
                  {PERMISSION_OPTIONS.map((opt) => (
                    <li
                      key={opt.value}
                      role="option"
                      aria-selected={permission === opt.value}
                      className={`${styles.dropdownItem} ${permission === opt.value ? styles.dropdownItemActive : ''} bodyTextSm`}
                      onClick={() => { setPermission(opt.value); setDropdownOpen(false); }}
                    >
                      {t(opt.labelKey, opt.defaultLabel)}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Current collaborators */}
          {collaborators.length > 0 && (
            <div className={styles.collaboratorsSection}>
              <p className={`${styles.collaboratorsLabel} bodyTextSm`}>
                {t('editor.share_modal.current_collaborators', 'Current Collaborators')}
              </p>
              <div className={styles.collaboratorsList}>
                {collaborators.map((c) => (
                  <CollaboratorRow key={c.id} collaborator={c} />
                ))}
              </div>
            </div>
          )}

        </div>

        {/* ── Footer ── */}
        <div className={styles.footer}>
          <button
            type="button"
            className={`${styles.cancelBtn} bodyTextSm`}
            onClick={onClose}
          >
            {t('editor.share_modal.cancel', 'Cancel')}
          </button>
          <button
            type="button"
            className={`btn btnPrimary ${styles.sendBtn} bodyTextSm`}
            onClick={handleSend}
            disabled={!isValidEmail}
            aria-disabled={!isValidEmail}
          >
            {t('editor.share_modal.send_invite', 'Send Invite')}
          </button>
        </div>

      </div>
    </div>
  );
}
