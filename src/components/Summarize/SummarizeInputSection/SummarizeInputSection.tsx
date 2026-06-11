import {useState, useRef, useEffect} from 'react';
import styles from './SummarizeInputSection.module.css';
import AiIcon from '@assets/icons/ai.svg?react';
import ChevronIcon from '@assets/icons/chevron.svg?react';
import {useTranslation} from 'react-i18next';
import {useRead} from "@hooks/api/useRead.ts";
import type {Note} from "@customTypes/Note.ts";
import type {UseQueryResult} from "@tanstack/react-query";


interface SummarizeInputSectionProps {
    onGenerate: (payload: { text: string; noteId: string | null }) => void;
    disabled?: boolean;
}

export default function SummarizeInputSection({onGenerate, disabled = false}: SummarizeInputSectionProps) {
    const {t} = useTranslation();

    const [text, setText] = useState('');
    const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const {data: notes} = useRead<UseQueryResult<Note[]>>('notes')


    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setDropdownOpen(false);
            }
        };
        if (dropdownOpen) document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [dropdownOpen]);

    const selectedNote = notes?.data?.find((n) => n.id === selectedNoteId);
    const canGenerate = text.trim().length > 0 || selectedNoteId !== null;

    const handleGenerate = () => {
        if (!canGenerate) return;
        onGenerate({text: text.trim(), noteId: selectedNoteId});
    };

    return (
        <div className={styles.card}>

            {/* Section label */}
            <div className={styles.sectionLabel}>
                <div className={styles.sectionLabelIcon}><AiIcon/></div>
                <span className={`${styles.sectionLabelText} bodyText`}>
          {t('summarizePage.text_to_analyze', 'Text to analyze')}
        </span>
            </div>

            {/* Textarea */}
            <textarea
                className={`${styles.textarea} bodyTextSm`}
                placeholder={t('summarizePage.paste_or_type', 'Paste or type your text')}
                value={text}
                onChange={(e) => {
                    setText(e.target.value);
                    if (e.target.value.trim()) setSelectedNoteId(null);
                }}

            />

            {/* OR divider */}
            <div className={styles.orDivider} aria-hidden="true">
                <span className={`${styles.orText} bodyTextSm`}>— {t('summarizePage.or', 'OR')} —</span>
            </div>

            {/* Note selector */}
            <div className={styles.field}>
                <label className={`${styles.fieldLabel} bodyTextSm`}>
                    {t('summarizePage.select_a_note', 'Select a note')}
                </label>

                <div className={styles.selectWrapper} ref={dropdownRef}>
                    <button
                        type="button"
                        className={`${styles.selectTrigger} bodyTextSm`}
                        onClick={() => setDropdownOpen((o) => !o)}
                        aria-haspopup="listbox"
                        aria-expanded={dropdownOpen}
                    >
            <span className={selectedNote ? styles.selectValueActive : styles.selectPlaceholder}>
              {selectedNote
                  ? selectedNote.title
                  : t('summarizePage.choose_note', 'Choose a note to analyze')}
            </span>
                        <div className={`${styles.chevron} ${dropdownOpen ? styles.chevronOpen : ''}`}>
                            <ChevronIcon/>
                        </div>
                    </button>

                    {dropdownOpen && (
                        <ul
                            className={styles.dropdown}
                            role="listbox"

                        >
                            {notes?.data?.map((note) => (
                                <li
                                    key={note.id}
                                    role="option"
                                    aria-selected={selectedNoteId === note.id}
                                    className={`${styles.dropdownItem} ${selectedNoteId === note.id ? styles.dropdownItemActive : ''} bodyTextSm`}
                                    onClick={() => {
                                        setSelectedNoteId(note.id);
                                        setText('');
                                        setDropdownOpen(false);
                                    }}
                                >
                                    {note.title}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>

            {/* Generate button */}
            <button
                type="button"
                className={`${styles.generateBtn} bodyTextSm`}
                onClick={handleGenerate}
                disabled={!canGenerate || disabled}
                aria-disabled={!canGenerate}
            >
                <div className={styles.generateBtnIcon}><AiIcon/></div>
                <span>{t('summarizePage.generate_ai_summary', 'Generate AI Summary')}</span>
            </button>

        </div>
    );
}
