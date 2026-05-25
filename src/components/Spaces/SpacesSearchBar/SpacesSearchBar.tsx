import styles from './SpacesSearchBar.module.css';
import MagnifierIcon from "@assets/icons/magnifier.svg?react";
import { useTranslation } from 'react-i18next';

interface SpacesSearchBarProps {
  value?: string;
  onChange?: (value: string) => void;
}

export default function SpacesSearchBar({ value = '', onChange }: SpacesSearchBarProps) {
  const { t } = useTranslation();

  return (
    <div className={styles.wrapper}>
      <div className={styles.icon}>
        <MagnifierIcon/>
      </div>
      
      <input
        type="search"
        className={`bodyTextSm ${styles.input}`}
        placeholder={t('space.search_spaces', 'Search spaces...')}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
      />
    </div>
  );
}
