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


const ROLE_LABELS: Record<SpaceRole, { labelEn: string; labelAr: string }> = {
  admin: { labelEn: 'Admin', labelAr: 'مسؤول' },
  contributor: { labelEn: 'Contributor', labelAr: 'محرر' },
  viewer: { labelEn: 'Viewer', labelAr: 'مراقب' },
};

export default function SpaceBadge({ role }: SpaceBadgeProps) {
  const { i18n } = useTranslation();
  const roleLabel = ROLE_LABELS[role];
  const displayLabel = i18n.language === 'en' ? roleLabel.labelEn : roleLabel.labelAr;

  return (
    <span className={`${styles.badge} ${styles[role]} caption`}>
      {ROLE_ICONS[role]}
      {displayLabel}
    </span>
  );
}
