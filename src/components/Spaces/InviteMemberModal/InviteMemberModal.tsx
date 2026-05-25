import { useState, useEffect, useRef } from 'react';
import styles from './InviteMemberModal.module.css';
import CloseIcon from '@assets/icons/close.svg?react';
import CollaborateIcon from '@assets/icons/collaborate.svg?react';
import ChevronIcon from '@assets/icons/chevron.svg?react';
import AddIcon from '@assets/icons/add.svg?react';
import SendIcon from '@assets/icons/mail.svg?react';
import type { SpaceRole } from '@customTypes/Space';
import { useTranslation } from 'react-i18next';
import i18n from '../../../i18n';

interface InviteMemberModalProps {
  isOpen: boolean;
  spaceName?: string;
  onClose: () => void;
  onSubmit?: (data: { email: string; role: SpaceRole }) => void;
  onCopyLink?: () => void;
}

const ROLES: { value: SpaceRole; labelEn: string;labelAr:string }[] = [
  { value: 'contributor', labelEn: 'Contributor',labelAr:"محرر" },
  { value: 'viewer', labelEn: 'Viewer',labelAr:"مراقب" },
  { value: 'admin', labelEn: 'Admin',labelAr:"مسؤول" },
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

  const selectedRoleLabel = (i18n.language === 'en' ? ROLES.find((r) => r.value === role)?.labelEn : ROLES.find((r) => r.value === role)?.labelAr) ?? 'Contributor';

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
              {t('space.invite_members', 'Invite Members')}
            </h2>
            <p className={`${styles.subtitle} bodyTextSm`}>
              {t('space.invite_members_subtitle', 'Add new members to this space')}
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

          {/* Email */}
          <div className={styles.field}>
            <label htmlFor="invite-email" className={`${styles.label} bodyTextSm`}>
              {t('space.email_address', 'Email Address')}
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
              {t('space.assign_role', 'Assign Role')}
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
                  <div className={styles.iconWrapper}>

                 <CollaborateIcon />
                  </div>
                  <span>{selectedRoleLabel}</span>
                </div>
                <div className={styles.iconWrapper}>

               <ChevronIcon/>
                </div>
              </button>

              {roleOpen && (
                <ul className={styles.dropdown} role="listbox" >
                  {ROLES.map((r) => (
                    <li
                      key={r.value}
                      role="option"
                      aria-selected={role === r.value}
                      className={`${styles.dropdownItem} ${role === r.value ? styles.dropdownItemActive : ''} bodyTextSm`}
                      onClick={() => { setRole(r.value); setRoleOpen(false); }}
                    >
                      {i18n.language === 'en' ? r.labelEn : r.labelAr}
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
           <div className={styles.copyLinkIcon}><AddIcon/></div>
            <span>{copied ? t('space.link_copied', 'Link Copied!') : t('space.copy_invite_link', 'Copy Invite Link')}</span>
          </button>

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
            className={`btn btnPrimary ${styles.sendBtn} bodyTextSm`}
            onClick={handleSubmit}
            disabled={!isValid}
            aria-disabled={!isValid}
          >
            <div className={styles.sendIcon}>
                <SendIcon />

            </div>
            <span>{t('space.send_invite', 'Send Invite')}</span>
          </button>
        </div>

      </div>
    </div>
  );
}
