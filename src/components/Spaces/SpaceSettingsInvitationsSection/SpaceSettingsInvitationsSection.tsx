import { useState } from 'react';
import styles from './SpaceSettingsInvitationsSection.module.css';
import MailIcon from '@assets/icons/mail.svg?react';
import AddIcon from '@assets/icons/add.svg?react';
import { useTranslation } from 'react-i18next';

interface SpaceSettingsInvitationsSectionProps {
  spaceId: string;
  onSendInvite?: (email: string) => void;
  onGenerateLink?: () => void;
}

export default function SpaceSettingsInvitationsSection({
  spaceId,
  onSendInvite,
  onGenerateLink,
}: SpaceSettingsInvitationsSectionProps) {
  const { t } = useTranslation();

  const [email,      setEmail]      = useState('');
  const [linkCopied, setLinkCopied] = useState(false);

  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  const handleSendInvite = () => {
    if (!isValidEmail) return;
    onSendInvite?.(email.trim());
    setEmail('');
  };

  const handleGenerateLink = () => {
    onGenerateLink?.();
    navigator.clipboard
      .writeText(`${window.location.origin}/spaces/${spaceId}/join`)
      .catch(() => {});
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2000);
  };

  return (
    <div className={styles.container}>
      <h2 className={`${styles.sectionTitle} bodyText`}>
        {t('invitations', 'Invitations')}
      </h2>

      <div className={styles.card}>

        {/* Invite by email */}
        <div className={styles.group}>
          <h3 className={`${styles.groupTitle} bodyText`}>
            {t('space.invite_by_email', 'Invite by Email')}
          </h3>
          <div className={styles.emailRow}>
            <input
              type="email"
              className={`${styles.input} bodyTextSm`}
              placeholder={t('space.enter_email_address', 'Enter email address')}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendInvite()}
              autoComplete="email"
            />
            <button
              type="button"
              className={`btn btnPrimary ${styles.sendBtn} bodyTextSm`}
              onClick={handleSendInvite}
              disabled={!isValidEmail}
              aria-disabled={!isValidEmail}
            >
              <div className={styles.sendBtnIcon}><MailIcon /></div>
              <span>{t('space.send_invite', 'Send Invite')}</span>
            </button>
          </div>
        </div>

        <div className={styles.divider} />

        {/* Invite by link */}
        <div className={styles.group}>
          <h3 className={`${styles.groupTitle} bodyText`}>
            {t('space.invite_by_link', 'Invite by Link')}
          </h3>
          <button
            type="button"
            className={`${styles.ghostBtn} bodyTextSm`}
            onClick={handleGenerateLink}
          >
            <div className={styles.ghostBtnIcon}><AddIcon /></div>
            <span>
              {linkCopied
                ? t('space.link_copied', 'Link Copied!')
                : t('space.generate_invite_link', 'Generate Invite Link')}
            </span>
          </button>
        </div>

      </div>
    </div>
  );
}
