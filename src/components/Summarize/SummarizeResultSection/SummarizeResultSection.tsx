import { useState } from 'react';
import styles from './SummarizeResultSection.module.css';
import AiIcon from '@assets/icons/ai.svg?react';
import FileIcon from '@assets/icons/file.svg?react';
import RestoreIcon from '@assets/icons/restore.svg?react';
import AddIcon from '@assets/icons/add.svg?react';
import { useTranslation } from 'react-i18next';

interface SummarizeResultSectionProps {
  summary: string;
  onNewAnalysis: () => void;
  onSaveAsNote?: (summary: string) => void;
}

export default function SummarizeResultSection({
  summary,
  onNewAnalysis,
  onSaveAsNote,
}: SummarizeResultSectionProps) {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(summary).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={styles.container}>

      {/* ── Toolbar: heading + action buttons ── */}
      <div className={styles.toolbar}>
        <div className={styles.heading}>
          <div className={styles.headingIcon}><AiIcon /></div>
          <h2 className={`${styles.headingText} h3`}>
            {t('summarizePage.ai_summary', 'AI Summary')}
          </h2>
        </div>

        <div className={styles.actions}>
          <button
            type="button"
            className={`${styles.actionBtn} bodyTextSm`}
            onClick={handleCopy}
          >
            <div className={styles.actionBtnIcon}><FileIcon /></div>
            <span>{copied ? t('summarizePage.copied', 'Copied!') : t('summarizePage.copy_to_clipboard', 'Copy to Clipboard')}</span>
          </button>

          <button
            type="button"
            className={`${styles.actionBtn} bodyTextSm`}
            onClick={onNewAnalysis}
          >
            <div className={styles.actionBtnIcon}><RestoreIcon /></div>
            <span>{t('summarizePage.new_analysis', 'New Analysis')}</span>
          </button>
        </div>
      </div>

      {/* ── Summary card ── */}
      <div className={styles.card}>
        <div className={styles.cardLabel}>
          <div className={styles.cardLabelIcon}><AiIcon /></div>
          <span className={`${styles.cardLabelText} bodyText`}>
            {t('summarizePage.summary', 'Summary')}
          </span>
        </div>

        <p className={`${styles.summaryText} bodyText`}>{summary}</p>
      </div>

      {/* ── Save as Note button ── */}
      <button
        type="button"
        className={`btn btnPrimary ${styles.saveBtn} bodyTextSm`}
        onClick={() => onSaveAsNote?.(summary)}
      >
        <div className={styles.saveBtnIcon}><AddIcon /></div>
        <span>{t('summarizePage.save_as_note', 'Save as Note')}</span>
      </button>

    </div>
  );
}
