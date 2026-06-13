import { useState, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import styles from './InviteMemberModal.module.css';
import CloseIcon from '@assets/icons/close.svg?react';
import CollaborateIcon from '@assets/icons/collaborate.svg?react';
import CopyIcon from '@assets/icons/add.svg?react';
import { useTranslation } from 'react-i18next';
import { AxiosClientV1 } from '../../../axiosClient';

interface InviteMemberModalProps {
  isOpen: boolean;
  spaceId: string;
  onClose: () => void;
}

export default function InviteMemberModal({
  isOpen,
  spaceId,
  onClose,
}: InviteMemberModalProps) {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);

  const {
    mutate: generateLink,
    data: response,
    isPending,
    error,
    reset,
  } = useMutation({
    mutationFn: () => AxiosClientV1.post(`/spaces/${spaceId}/invites`),
  });

  useEffect(() => {
    if (isOpen) {
      setCopied(false);
      reset();
      generateLink();
    }
  }, [isOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  const inviteLink =
    (response?.data as { data?: { invite_url?: string } })?.data?.invite_url ??
    '';

  const handleCopy = () => {
    if (!inviteLink) return;
    navigator.clipboard.writeText(inviteLink).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isOpen) return null;

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
              {t(
                'space.invite_members_subtitle',
                'Share this link to invite people to this space',
              )}
            </p>
          </div>
          <button className={styles.closeBtn} onClick={onClose}>
            <CloseIcon />
          </button>
        </div>

        {/* Body */}
        <div className={styles.body}>
          {isPending && (
            <div className={styles.statusWrap}>
              <div className={styles.spinner} />
              <span className={`${styles.statusText} bodyTextSm`}>
                {t('space.generating_link', 'Generating invite link...')}
              </span>
            </div>
          )}

          {error && (
            <div className={styles.statusWrap}>
              <span className={`${styles.errorText} bodyTextSm`}>
                {t(
                  'space.failed_generate_link',
                  'Failed to generate invite link.',
                )}
              </span>
              <button
                type="button"
                className={`${styles.retryBtn} bodyTextSm`}
                onClick={() => generateLink()}
              >
                {t('space.retry', 'Retry')}
              </button>
            </div>
          )}

          {!isPending && !error && inviteLink && (
            <div className={styles.linkSection}>
              <div className={styles.linkDisplay}>
                <div className={styles.linkIcon}>
                  <CollaborateIcon />
                </div>
                <input
                  type="text"
                  className={`${styles.linkInput} bodyTextSm`}
                  value={inviteLink}
                  readOnly
                  onFocus={(e) => e.target.select()}
                />
              </div>

              <button
                type="button"
                className={`${styles.copyBtn} bodyTextSm`}
                onClick={handleCopy}
              >
                <div className={styles.copyBtnIcon}>
                  <CopyIcon />
                </div>
                <span>
                  {copied
                    ? t('space.link_copied', 'Link Copied!')
                    : t('space.copy_link', 'Copy Link')}
                </span>
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className={styles.footer}>
          <button
            type="button"
            className={`${styles.closeFooterBtn} bodyTextSm`}
            onClick={onClose}
          >
            {t('space.close', 'Close')}
          </button>
        </div>
      </div>
    </div>
  );
}
