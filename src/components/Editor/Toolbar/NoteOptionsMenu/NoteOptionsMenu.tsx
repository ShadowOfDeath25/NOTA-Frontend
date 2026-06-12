import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './NoteOptionsMenu.module.css';
import NoteOptionsMenuItem from './NoteOptionsMenuItem.tsx';
import { useModal } from '@context/ModalContext.tsx';
import { useQueryClient } from '@tanstack/react-query';
import { useCreate } from '@hooks/api/useCreate.ts';

import StarIcon          from '@assets/icons/star.svg?react';
import FileIcon          from '@assets/icons/file.svg?react';
import CollaborateIcon   from '@assets/icons/collaborate.svg?react';
import FilesIcon         from '@assets/icons/files.svg?react';
import StorgeIcon        from '@assets/icons/storge.svg?react';
import RestoreIcon       from '@assets/icons/restore.svg?react';
import CloudIcon         from '@assets/icons/cloud.svg?react';
import TrashIcon         from '@assets/icons/trash.svg?react';

export interface NoteOptionsCallbacks {
  onAddToFavorites?:  () => void;
  onNoteInformation?: () => void;
  onShare?:           () => void;
  onMoveToSpace?:     () => void;
  onPrint?:           () => void;
  onVersionHistory?:  () => void;
  onArchive?:         () => void;
  onMoveToTrash?:     () => void;
}

interface NoteOptionsMenuProps extends NoteOptionsCallbacks {
  onClose: () => void;
  noteId?: string;
}

export default function NoteOptionsMenu({
  onClose,
  noteId,
  onAddToFavorites,
  onNoteInformation,
  onShare,
  onMoveToSpace,
  onPrint,
  onVersionHistory,
  onArchive,
  onMoveToTrash,
}: NoteOptionsMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();
  const { setMoveToSpaceModal, setNoteInfoModal, setNoteInfo, setShareNoteModal, setDeleteNoteModal, setDeleteNoteId, setMoveToSpaceNoteId } = useModal();
  const queryClient = useQueryClient();
  const createFavoriteMutation = useCreate(`notes/${noteId}/favorites`, {
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["notes"]});
      queryClient.invalidateQueries({queryKey: ["notes/favorites"]});
    },
  });

  /* Close on outside click */
  useEffect(() => {
    const handlePointerDown = (e: PointerEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('pointerdown', handlePointerDown);
    return () => document.removeEventListener('pointerdown', handlePointerDown);
  }, [onClose]);

  /* Close on Escape */
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onClose]);

  const wrap = (cb?: () => void) => () => { cb?.(); onClose(); };

  const handleAddToFavorites = () => {
    onAddToFavorites?.();
    onClose();
    if (noteId) {
      createFavoriteMutation.mutate({});
    }
  };

  const handleMoveToSpace = () => {
    onMoveToSpace?.();
    onClose();
    setMoveToSpaceNoteId(noteId ?? null);
    setMoveToSpaceModal(true);
  };

  const handleShare = () => {
    onShare?.();
    onClose();
    setShareNoteModal(true);
  };

  const handleMoveToTrash = () => {
    onMoveToTrash?.();
    onClose();
    setDeleteNoteId(noteId ?? null);
    setDeleteNoteModal(true);
  };

  const handleNoteInformation = () => {
    onNoteInformation?.();
    onClose();
    // Pass mock timestamps — replace with real note data when API is wired
    setNoteInfo({
      createdAt:    'November 25, 2025 at 10:42 PM',
      lastEditedAt: 'November 25, 2025 at 10:42 PM',
    });
    setNoteInfoModal(true);
  };

  return (
    <div
      ref={menuRef}
      className={styles.menu}
      role="menu"
      aria-label="Note options"
    >
      {/* ── Group 1: Utility ── */}
      <NoteOptionsMenuItem icon={StarIcon}        label={t('editor.options.add_to_favorites', 'Add to Favorites')}  onClick={handleAddToFavorites}   />
      <NoteOptionsMenuItem icon={FileIcon}        label={t('editor.options.note_information', 'Note Information')}   onClick={handleNoteInformation}    />

      <div className={styles.separator} role="separator" />

      {/* ── Group 2: Collaboration ── */}
      <NoteOptionsMenuItem icon={CollaborateIcon} label={t('editor.options.share', 'Share')}         onClick={handleShare}       />
      <NoteOptionsMenuItem icon={FilesIcon}       label={t('editor.options.move_to_space', 'Move to Space')} onClick={handleMoveToSpace} />

      <div className={styles.separator} role="separator" />

      {/* ── Group 4: Actions ── */}
      <NoteOptionsMenuItem icon={StorgeIcon}      label={t('editor.options.print', 'Print')}             onClick={wrap(onPrint)}          />
      <NoteOptionsMenuItem icon={RestoreIcon}     label={t('editor.options.version_history', 'Version History')}   onClick={wrap(onVersionHistory)} />

      <div className={styles.separator} role="separator" />

      {/* ── Group 5: Archive ── */}
      <NoteOptionsMenuItem icon={CloudIcon}       label={t('editor.options.archive', 'Archive')}           onClick={wrap(onArchive)} />

      <div className={styles.separator} role="separator" />

      {/* ── Group 6: Danger ── */}
      <NoteOptionsMenuItem icon={TrashIcon} label={t('editor.options.move_to_trash', 'Move to Trash')} onClick={handleMoveToTrash} danger />
    </div>
  );
}
