import { useState } from 'react';
import styles from './SpaceSettingsRolesSection.module.css';
import ContributorIcon from '@assets/icons/contributor.svg?react';
import EyeIcon from '@assets/icons/eye.svg?react';
import { useTranslation } from 'react-i18next';

export interface RolePermissions {
  contributorCanCreate: boolean;
  contributorCanEdit: boolean;
  contributorCanDelete: boolean;
  contributorCanInvite: boolean;
  viewerCanCreate: boolean;
  viewerCanEdit: boolean;
}

interface SpaceSettingsRolesSectionProps {
  initialPermissions?: Partial<RolePermissions>;
  onSave?: (permissions: RolePermissions) => void;
}

const DEFAULT_PERMISSIONS: RolePermissions = {
  contributorCanCreate: true,
  contributorCanEdit:   true,
  contributorCanDelete: false,
  contributorCanInvite: false,
  viewerCanCreate:      false,
  viewerCanEdit:        false,
};

interface PermissionRowProps {
  label: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}

function PermissionRow({ label, checked, onChange }: PermissionRowProps) {
  return (
    <div className={styles.permRow}>
      <span className={`${styles.permLabel} bodyTextSm`}>{label}</span>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        className={`${styles.toggle} ${checked ? styles.toggleOn : ''}`}
        onClick={() => onChange(!checked)}
      >
        <span className={styles.toggleThumb} />
      </button>
    </div>
  );
}

export default function SpaceSettingsRolesSection({
  initialPermissions = {},
  onSave,
}: SpaceSettingsRolesSectionProps) {
  const { t } = useTranslation();

  const merged = { ...DEFAULT_PERMISSIONS, ...initialPermissions };

  const [contribCreate, setContribCreate] = useState(merged.contributorCanCreate);
  const [contribEdit,   setContribEdit]   = useState(merged.contributorCanEdit);
  const [contribDelete, setContribDelete] = useState(merged.contributorCanDelete);
  const [contribInvite, setContribInvite] = useState(merged.contributorCanInvite);
  const [viewerCreate,  setViewerCreate]  = useState(merged.viewerCanCreate);
  const [viewerEdit,    setViewerEdit]    = useState(merged.viewerCanEdit);

  const handleSave = () => {
    onSave?.({
      contributorCanCreate: contribCreate,
      contributorCanEdit:   contribEdit,
      contributorCanDelete: contribDelete,
      contributorCanInvite: contribInvite,
      viewerCanCreate:      viewerCreate,
      viewerCanEdit:        viewerEdit,
    });
  };

  return (
    <div className={styles.container}>
      <h2 className={`${styles.sectionTitle} bodyText`}>
        {t('space.roles_permissions', 'Roles & Permissions')}
      </h2>
      <p className={`${styles.sectionSubtitle} bodyTextSm`}>
        {t('space.roles_permissions_desc', 'Manage what each role can do')}
      </p>

      <div className={styles.card}>

        {/* Contributor */}
        <div className={styles.roleGroup}>
          <div className={styles.roleHeader}>
            <div className={styles.roleIcon}><ContributorIcon /></div>
            <span className={`${styles.roleTitle} bodyText`}>
              {t('space.role_contributor', 'Contributor')}
            </span>
          </div>
          <div className={styles.permList}>
            <PermissionRow
              label={t('space.can_create_notes', 'Can create notes')}
              checked={contribCreate}
              onChange={setContribCreate}
            />
            <PermissionRow
              label={t('space.can_edit_notes', 'Can edit notes')}
              checked={contribEdit}
              onChange={setContribEdit}
            />
            <PermissionRow
              label={t('space.can_delete_notes', 'Can delete notes')}
              checked={contribDelete}
              onChange={setContribDelete}
            />
            <PermissionRow
              label={t('space.can_invite_members', 'Can invite members')}
              checked={contribInvite}
              onChange={setContribInvite}
            />
          </div>
        </div>

        <div className={styles.divider} />

        {/* Viewer */}
        <div className={styles.roleGroup}>
          <div className={styles.roleHeader}>
            <div className={styles.roleIcon}><EyeIcon /></div>
            <span className={`${styles.roleTitle} bodyText`}>
              {t('space.role_viewer', 'Viewer')}
            </span>
          </div>
          <div className={styles.permList}>
            <PermissionRow
              label={t('space.can_create_notes', 'Can create notes')}
              checked={viewerCreate}
              onChange={setViewerCreate}
            />
            <PermissionRow
              label={t('space.can_edit_notes', 'Can edit notes')}
              checked={viewerEdit}
              onChange={setViewerEdit}
            />
          </div>
        </div>

        {/* Save button */}
        <div className={styles.footer}>
          <button
            type="button"
            className={`btn btnPrimary ${styles.saveBtn} bodyTextSm`}
            onClick={handleSave}
          >
            {t('space.save_changes', 'Save Changes')}
          </button>
        </div>

      </div>
    </div>
  );
}
