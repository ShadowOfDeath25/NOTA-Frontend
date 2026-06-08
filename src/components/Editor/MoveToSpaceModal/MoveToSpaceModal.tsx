import { useState, useEffect, useRef } from 'react';
import styles from './MoveToSpaceModal.module.css';
import CloseIcon from '@assets/icons/close.svg?react';
import ChevronIcon from '@assets/icons/chevron.svg?react';
import { useTranslation } from 'react-i18next';

// ── Types ────────────────────────────────────────────────────────────────────

export interface SpaceOption {
  id: string;
  name: string;
}

interface MoveToSpaceModalProps {
  isOpen: boolean;
  spaces: SpaceOption[];
  onClose: () => void;
  onMove: (spaceId: string) => void;
}

// ── Component ────────────────────────────────────────────────────────────────

export default function MoveToSpaceModal({
  isOpen,
  spaces,
  onClose,
  onMove,
}: MoveToSpaceModalProps) {
  const { t } = useTranslation();
  const [selectedId, setSelectedId] = useState<string | null>(
    spaces[0]?.id ?? null
  );
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Reset selection when modal opens
  useEffect(() => {
    if (isOpen) {
      setSelectedId(spaces[0]?.id ?? null);
      setDropdownOpen(false);
    }
  }, [isOpen, spaces]);

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

  const selectedSpace = spaces.find((s) => s.id === selectedId);

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  const handleMove = () => {
    if (!selectedId) return;
    onMove(selectedId);
    onClose();
  };

  return (
    <div
      className={styles.overlay}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="move-to-space-title"
    >
      <div className={styles.dialog}>

        {/* ── Header ── */}
        <div className={styles.header}>
          <div>
            <h2 id="move-to-space-title" className={`${styles.title} h5`}>
              {t('editor.move_modal.move_to_space', 'Move to Space')}
            </h2>
            <p className={`${styles.subtitle} bodyTextSm`}>
              {t('editor.move_modal.select_space', 'Select Space')}
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
          <div className={styles.selectWrapper} ref={dropdownRef}>
            <button
              type="button"
              className={`${styles.selectTrigger} bodyTextSm`}
              onClick={() => setDropdownOpen((o) => !o)}
              aria-haspopup="listbox"
              aria-expanded={dropdownOpen}
            >
              <span className={styles.selectValue}>
                {selectedSpace?.name ?? t('editor.move_modal.choose_space', 'Choose a space')}
              </span>
              <div className={`${styles.chevron} ${dropdownOpen ? styles.chevronOpen : ''}`}>
                <ChevronIcon />
              </div>
            </button>

            {dropdownOpen && (
              <ul
                className={styles.dropdown}
                role="listbox"
                aria-label={t('editor.move_modal.select_space', 'Select Space')}
              >
                {spaces.length === 0 ? (
                  <li className={`${styles.dropdownEmpty} bodyTextSm`}>
                    {t('editor.move_modal.no_spaces_yet', 'No spaces available')}
                  </li>
                ) : (
                  spaces.map((space) => (
                    <li
                      key={space.id}
                      role="option"
                      aria-selected={selectedId === space.id}
                      className={`${styles.dropdownItem} ${
                        selectedId === space.id ? styles.dropdownItemActive : ''
                      } bodyTextSm`}
                      onClick={() => {
                        setSelectedId(space.id);
                        setDropdownOpen(false);
                      }}
                    >
                      {space.name}
                    </li>
                  ))
                )}
              </ul>
            )}
          </div>
        </div>

        {/* ── Footer ── */}
        <div className={styles.footer}>
          <button
            type="button"
            className={`${styles.cancelBtn} bodyTextSm`}
            onClick={onClose}
          >
            {t('editor.move_modal.cancel', 'Cancel')}
          </button>
          <button
            type="button"
            className={`btn btnPrimary ${styles.moveBtn} bodyTextSm`}
            onClick={handleMove}
            disabled={!selectedId}
            aria-disabled={!selectedId}
          >
            {t('editor.move_modal.move', 'Move')}
          </button>
        </div>

      </div>
    </div>
  );
}
