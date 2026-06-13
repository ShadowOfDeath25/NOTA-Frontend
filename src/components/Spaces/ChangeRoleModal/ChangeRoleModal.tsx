import { useState, useEffect } from 'react';
import styles from './ChangeRoleModal.module.css';
import CloseIcon from '@assets/icons/close.svg?react';
import AdminIcon from '@assets/icons/admin.svg?react';
import ContributorIcon from '@assets/icons/contributor.svg?react';
import EyeIcon from '@assets/icons/eye.svg?react';
import type { SpaceRole } from '@customTypes/Space';
import { useUpdateSpaceUserRole } from '@hooks/api/useUpdateSpaceUserRole';
import { useTranslation } from 'react-i18next';

interface ChangeRoleModalProps {
  isOpen: boolean;
  spaceId: string;
  memberId: string;
  memberName: string;
  currentRole: SpaceRole;
  onClose: () => void;
}

interface RoleOption {
  value: Exclude<SpaceRole, 'owner'>;
  icon: React.ReactNode;
  labelKey: string;
  descKey: string;
}

export default function ChangeRoleModal({
  isOpen,
  spaceId,
  memberId,
  memberName,
  currentRole,
  onClose,
}: ChangeRoleModalProps) {
  const { t } = useTranslation();
  const { mutate: updateRole, isPending } = useUpdateSpaceUserRole();
  const [selectedRole, setSelectedRole] = useState<Exclude<SpaceRole, 'owner'>>(
    currentRole === 'owner' ? 'admin' : currentRole,
  );

  useEffect(() => {
    if (isOpen) {
      setSelectedRole(currentRole === 'owner' ? 'admin' : currentRole);
    }
  }, [isOpen, currentRole]);

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

  const handleSave = () => {
    updateRole(
      { spaceId, userId: memberId, role: selectedRole },
      { onSuccess: () => onClose() },
    );
  };

  const roles: RoleOption[] = [
    {
      value: 'admin',
      icon: <AdminIcon />,
      labelKey: t('space.role_admin_label', 'Admin'),
      descKey: t('space.role_admin_desc', 'Can manage the space, members, and notes'),
    },
    {
      value: 'editor',
      icon: <ContributorIcon />,
      labelKey: t('space.role_editor_label', 'Editor'),
      descKey: t('space.role_editor_desc', 'Can create and edit notes'),
    },
    {
      value: 'viewer',
      icon: <EyeIcon />,
      labelKey: t('space.role_viewer_label', 'Viewer'),
      descKey: t('space.role_viewer_desc', 'Can only view notes'),
    },
  ];

  if (!isOpen) return null;

  return (
    <div
      className={styles.overlay}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="change-role-title"
    >
      <div className={styles.dialog}>
        <div className={styles.header}>
          <div>
            <h2 id="change-role-title" className={`${styles.title} h5`}>
              {t('space.change_role_title', 'Change Role')}
            </h2>
            <p className={`${styles.subtitle} bodyTextSm`}>
              {t('space.change_role_subtitle', 'Select a new role for {{name}}', { name: memberName })}
            </p>
          </div>
          <button className={styles.closeBtn} onClick={onClose}>
            <CloseIcon />
          </button>
        </div>

        <div className={styles.body}>
          <div className={styles.roleLabel}>
            {t('space.roles', 'Roles')}
          </div>
          <div className={styles.roleList}>
            {roles.map((role) => (
              <button
                key={role.value}
                type="button"
                className={`${styles.roleOption} ${
                  selectedRole === role.value ? styles.roleOptionSelected : ''
                }`}
                onClick={() => setSelectedRole(role.value)}
              >
                <div className={`${styles.radio} ${selectedRole === role.value ? styles.radioSelected : ''}`} />
                <div className={styles.roleText}>
                  <span className={styles.roleName}>{role.labelKey}</span>
                  <span className={styles.roleDesc}>{role.descKey}</span>
                </div>
              </button>
            ))}
          </div>
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
            className={`${styles.saveBtn} bodyTextSm`}
            onClick={handleSave}
            disabled={isPending || selectedRole === currentRole}
          >
            {isPending && <div className={styles.spinner} />}
            {t('space.save', 'Save')}
          </button>
        </div>
      </div>
    </div>
  );
}
