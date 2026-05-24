import styles from './SpaceBadge.module.css';
import type { SpaceRole } from '@customTypes/Space';
import { useTranslation } from 'react-i18next';
import AdminIcon from "@assets/icons/admin.svg?react"
import ContributorIcon from "@assets/icons/contributor.svg?react"
import EyeIcon from  "@assets/icons/eye.svg?react"

interface SpaceBadgeProps {
  role: SpaceRole;
}

const ROLE_ICONS: Record<SpaceRole, React.ReactNode> = {
  admin: <AdminIcon />,
  contributor: <ContributorIcon />,
  viewer: <EyeIcon />,
};


const ROLE_LABELS: Record<SpaceRole, string> = {
  admin: 'Admin',
  contributor: 'Contributor',
  viewer: 'Viewer',
};

export default function SpaceBadge({ role }: SpaceBadgeProps) {
  const { t } = useTranslation();

  return (
    <span className={`${styles.badge} ${styles[role]} caption`}>
      <span className={styles.icon}></span>
        {ROLE_ICONS[role]}
      {t(`role_${role}`, ROLE_LABELS[role])}
    </span>
  );
}
