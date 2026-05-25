import { useState } from 'react';
import styles from './SpaceNotesTab.module.css';
import SpaceNoteRow from '@components/Spaces/SpaceNoteRow/SpaceNoteRow';
import MagnifierIcon from '@assets/icons/magnifier.svg?react';
import AddIcon from '@assets/icons/add.svg?react';
import { useTranslation } from 'react-i18next';
import type { NoteData } from '@customTypes/NoteData';

interface SpaceNote extends NoteData {
  tags?: string[];
}

interface SpaceNotesTabProps {
  notes: SpaceNote[];
  onAddNote?: () => void;
}

export default function SpaceNotesTab({ notes, onAddNote }: SpaceNotesTabProps) {
  const { t } = useTranslation();
  const [search, setSearch] = useState('');

  const filtered = notes.filter((n) =>
    n.title.toLowerCase().includes(search.toLowerCase()) ||
    (n.summary ?? '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={styles.container}>
      {/* Toolbar: search + add */}
      <div className={styles.toolbar}>
        <div className={styles.searchWrapper}>
          <div className={styles.searchIcon}>
            <MagnifierIcon/>
          </div>
          <input
            type="search"
            className={`${styles.searchInput} bodyTextSm`}
            placeholder={t('space.search_notes', 'Search notes...')}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
        
          />
        </div>

        <button
          className={`btn btnPrimary ${styles.addBtn} bodyTextSm`}
          onClick={onAddNote}
        
        >
          <div className={styles.addIcon}>
            <AddIcon/>
          </div>
          <span>{t('space.add_note', 'Add Note')}</span>
        </button>
      </div>

      {/* Notes list */}
      <div className={styles.list} role="list">
        {filtered.length === 0 ? (
          <p className={`${styles.empty} bodyText`}>
            {search
              ? t('space.no_notes_match', 'No notes match your search.')
              : t('space.no_notes_in_space', 'No notes in this space yet.')}
          </p>
        ) : (
          filtered.map((note) => (
            <div key={note.id} role="listitem">
              <SpaceNoteRow {...note} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
