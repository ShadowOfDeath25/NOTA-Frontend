import { useState, useEffect, useRef } from 'react';
import styles from './InviteMemberModal.module.css';
import CloseIcon from '@assets/icons/close.svg?react';
import collaborateIcon from '@assets/icons/collaborate.svg';
import addIcon from '@assets/icons/add.svg';
import type { SpaceRole } from '@customTypes/Space';
import { useTranslation } from 'react-i18next';

interface InviteMemberModalProps {
  isOpen: boolean;
  spaceName?: string;
  onClose: () => void;
  onSubmit?: (data: { email: string; role: SpaceRole }) => void;
  onCopyLink?: () => void;
}

const ROLES: { value: SpaceRole; label: string }[] = [
  { value: 'contributor', label: 'Contributor' },
  { value: 'viewer', label: 'Viewer' },
  { value: 'admin', label: 'Admin' },
];

export default function InviteMemberModal({
  isOpen,
  onClose,
  onSubmit,
  onCopyLink,
}: InviteMemberModalProps) {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<SpaceRole>('contributor');
  const [roleOpen, setRoleOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const emailRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Focus email on open, reset on close
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => emailRef.current?.focus(), 50);
    } else {
      setEmail('');
      setRole('contributor');
      setRoleOpen(false);
      setCopied(false);
    }
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (roleOpen) setRoleOpen(false);
        else onClose();
      }
    };
    if (isOpen) document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isOpen, roleOpen, onClose]);

  // Close dropdown on outside click
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setRoleOpen(false);
      }
    };
    if (roleOpen) document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, [roleOpen]);

  if (!isOpen) return null;

  const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  const handleSubmit = () => {
    if (!isValid) return;
    onSubmit?.({ email: email.trim(), role });
    onClose();
  };

  const handleCopyLink = () => {
    onCopyLink?.();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  const selectedRoleLabel = ROLES.find((r) => r.value === role)?.label ?? 'Contributor';

  return (
    <div
      className={styles.overlay}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="invite-member-title"
    >
      <div className={styles.dialog}>

        {/* Header */}
        <div className={styles.header}>
          <div>
            <h2 id="invite-member-title" className={`${styles.title} h5`}>
              {t('invite_members', 'Invite Members')}
            </h2>
            <p className={`${styles.subtitle} bodyTextSm`}>
              {t('invite_members_subtitle', 'Add new members to this space')}
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

          {/* Email */}
          <div className={styles.field}>
            <label htmlFor="invite-email" className={`${styles.label} bodyTextSm`}>
              {t('email_address', 'Email Address')}
            </label>
            <input
              ref={emailRef}
              id="invite-email"
              type="email"
              className={`${styles.input} bodyTextSm`}
              placeholder="email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
              autoComplete="email"
            />
          </div>

          {/* Role selector */}
          <div className={styles.field}>
            <span className={`${styles.label} bodyTextSm`}>
              {t('assign_role', 'Assign Role')}
            </span>
            <div className={styles.selectWrapper} ref={dropdownRef}>
              <button
                type="button"
                className={`${styles.selectTrigger} bodyTextSm`}
                onClick={() => setRoleOpen((o) => !o)}
                aria-haspopup="listbox"
                aria-expanded={roleOpen}
              >
                <div className={styles.selectLeft}>
                  <img src={collaborateIcon} alt="" className={styles.selectIcon} aria-hidden="true" />
                  <span>{selectedRoleLabel}</span>
                </div>
                {/* chevron */}
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" className={`${styles.chevron} ${roleOpen ? styles.chevronOpen : ''}`}>
                  <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>

              {roleOpen && (
                <ul className={styles.dropdown} role="listbox" aria-label={t('select_role', 'Select role')}>
                  {ROLES.map((r) => (
                    <li
                      key={r.value}
                      role="option"
                      aria-selected={role === r.value}
                      className={`${styles.dropdownItem} ${role === r.value ? styles.dropdownItemActive : ''} bodyTextSm`}
                      onClick={() => { setRole(r.value); setRoleOpen(false); }}
                    >
                      {r.label}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Copy invite link */}
          <button
            type="button"
            className={`${styles.copyLinkBtn} bodyTextSm`}
            onClick={handleCopyLink}
          >
            <img src={addIcon} alt="" className={styles.copyLinkIcon} aria-hidden="true" />
            <span>{copied ? t('link_copied', 'Link Copied!') : t('copy_invite_link', 'Copy Invite Link')}</span>
          </button>

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
            className={`btn btnPrimary ${styles.sendBtn} bodyTextSm`}
            onClick={handleSubmit}
            disabled={!isValid}
            aria-disabled={!isValid}
          >
            <img src={collaborateIcon} alt="" className={styles.sendIcon} aria-hidden="true" />
            <span>{t('send_invite', 'Send Invite')}</span>
          </button>
        </div>

      </div>
    </div>
  );
}
