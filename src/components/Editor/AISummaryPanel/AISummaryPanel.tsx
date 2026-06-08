import styles from './AISummaryPanel.module.css';
import AiIcon    from '@assets/icons/ai.svg?react';
import CloseIcon from '@assets/icons/close.svg?react';
import FullScreenIcon  from '@assets/icons/fullscreen.svg?react';
import AddIcon   from '@assets/icons/add.svg?react';
import CopyIcon   from '@assets/icons/copy.svg?react';
import SaveIcon   from '@assets/icons/save.svg?react';
import { useTranslation } from 'react-i18next';

// ── Types ─────────────────────────────────────────────────────────────────────

export interface KeyPoint {
  id:    string;
  text:  string;
  color: string;   // dot color, e.g. '#ad46ff'
}

export interface AISummaryPanelProps {
  /** The markdown / plain-text summary returned by the AI */
  summary?:    string;
  /** Bullet-point key takeaways */
  keyPoints?: KeyPoint[];
  onClose?:           () => void;
  onInsertIntoNote?:  (text: string) => void;
  onSaveSummary?:     () => void;
  onCopyResult?:      () => void;
  noteId?:            string;
}

// ── Mock data (used when no real data is passed) ───────────────────────────────

const MOCK_SUMMARY = `# Project Overview

This note discusses the key aspects of the NOTA project, an AI-powered note-taking platform designed for bilingual users (Arabic and English).

## Main Points:
- **Target Audience**: Arabic and English speaking users who need efficient note-taking solutions
- **Core Features**: AI summarization, PDF conversion, real-time collaboration
- **Technology Stack**: React, TypeScript, CSS Modules
- **Design Philosophy**: Modern dark theme with RTL support for Arabic

## Key Insights:
The platform aims to bridge the gap in the market for bilingual note-taking applications with advanced AI capabilities.

## Next Steps:
1. Complete the authentication flow
2. Implement real-time collaboration features
3. Integrate AI summarization API
4. Test RTL layout extensively`;

const MOCK_KEY_POINTS: KeyPoint[] = [
  { id: '1', text: 'AI-powered note-taking platform for Arabic and English users',          color: '#ad46ff' },
  { id: '2', text: 'Features include summarization, PDF conversion, and real-time collaboration', color: '#f6339a' },
  { id: '3', text: 'Built with modern tech stack and bilingual support',                    color: '#2b7fff' },
];

// ── Component ─────────────────────────────────────────────────────────────────

export default function AISummaryPanel({
  summary,
  keyPoints,
  onClose,
  onInsertIntoNote,
  onSaveSummary,
  onCopyResult,
  noteId,
}: AISummaryPanelProps) {
  const { t } = useTranslation();

  const resolvedSummary = summary ?? t('editor.ai_panel.mock_summary', MOCK_SUMMARY);

  const resolvedKeyPoints = keyPoints ?? [
    { id: '1', text: t('editor.ai_panel.mock_key_point_1', 'AI-powered note-taking platform for Arabic and English users'),          color: '#ad46ff' },
    { id: '2', text: t('editor.ai_panel.mock_key_point_2', 'Features include summarization, PDF conversion, and real-time collaboration'), color: '#f6339a' },
    { id: '3', text: t('editor.ai_panel.mock_key_point_3', 'Built with modern tech stack and bilingual support'),                    color: '#2b7fff' },
  ];

  const handleCopy = () => {
    navigator.clipboard.writeText(resolvedSummary).catch(() => {});
    onCopyResult?.();
  };

  return (
    <aside className={styles.panel} aria-label={t('editor.ai_panel.ai_summary', 'AI Summary')}>

      {/* ── Panel header ── */}
      <div className={styles.panelHeader}>
        <div className={styles.panelHeaderLeft}>
          {/* Gradient icon container — purple-pink gradient */}
          <div className={styles.panelIcon} aria-hidden="true">
            <AiIcon />
          </div>
          <div className={styles.panelTitleGroup}>
            <h2 className={`${styles.panelTitle} bodyText`}>
              {t('editor.ai_panel.ai_summary', 'AI Summary')}
            </h2>
            <p className={`${styles.panelSubtitle} caption`}>
              {t('editor.ai_panel.ai_summary_subtitle', 'AI-generated summary of your note')}
            </p>
          </div>
        </div>

        <div className={styles.panelHeaderActions}>
          <button
            type="button"
            className={styles.headerBtn}
            onClick={handleCopy}
            aria-label={t('editor.ai_panel.copy_result', 'Copy Result')}
            title={t('editor.ai_panel.copy_result', 'Copy Result')}
          >
            <CopyIcon />
          </button>
          <button
            type="button"
            className={styles.headerBtn}
            onClick={onClose}
            aria-label={t('editor.close_note', 'Close')}
            title={t('editor.close_note', 'Close')}
          >
            <CloseIcon />
          </button>
        </div>
      </div>

      {/* ── Scrollable content ── */}
      <div className={styles.panelBody}>

        {/* Summary card */}
        <div className={styles.summaryCard}>
          <pre className={`${styles.summaryText} bodyTextSm`}>{resolvedSummary}</pre>
        </div>

        {/* Action buttons */}
        <div className={styles.actions}>
          <button
            type="button"
            className={`btn btnPrimary ${styles.actionBtnPrimary} bodyTextSm`}
            onClick={() => onInsertIntoNote?.(resolvedSummary)}
          >
            <span className={styles.actionBtnIcon}><AddIcon /></span>
            <span>{t('editor.ai_panel.insert_into_note', 'Insert into Note')}</span>
          </button>

          <button
            type="button"
            className={`${styles.actionBtnGhost} bodyTextSm`}
            onClick={onSaveSummary}
          >
            <span className={styles.actionBtnIcon}><SaveIcon/></span>
            <span>{t('editor.ai_panel.save_summary', 'save Summary')}</span>
          </button>

          <button
            type="button"
            className={`${styles.actionBtnGhost} bodyTextSm`}
            onClick={handleCopy}
          >
            <span className={styles.actionBtnIcon}><CopyIcon /></span>
            <span>{t('editor.ai_panel.copy_result', 'Copy Result')}</span>
          </button>
        </div>

        {/* Key Points section */}
        {resolvedKeyPoints.length > 0 && (
          <div className={styles.keyPointsSection}>
            <h3 className={`${styles.keyPointsTitle} bodyText`}>
              {t('editor.ai_panel.key_points', 'Key Points')}
            </h3>
            <div className={styles.keyPointsList}>
              {resolvedKeyPoints.map((point) => (
                <div key={point.id} className={styles.keyPointCard}>
                  <span
                    className={styles.keyPointDot}
                    style={{ backgroundColor: point.color }}
                    aria-hidden="true"
                  />
                  <p className={`${styles.keyPointText} bodyTextSm`}>{point.text}</p>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </aside>
  );
}
