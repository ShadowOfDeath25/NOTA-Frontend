import { useState } from 'react';
import styles from './SummarizePage.module.css';
import SummarizeInputSection from '@components/Summarize/SummarizeInputSection/SummarizeInputSection';
import SummarizeResultSection from '@components/Summarize/SummarizeResultSection/SummarizeResultSection';
import { useTranslation } from 'react-i18next';

type SummarizeView = 'input' | 'result';

// ── Mock AI response — replace with real API call ────────────────────────────
const MOCK_SUMMARY =
  'This text discusses External and internal threats refer to the paths, known as... ' +
  'The main focus appears to be on the key concepts and ideas presented in the content. ' +
  'The text provides comprehensive information on the topic with a positive overall tone.';
// ────────────────────────────────────────────────────────────────────────────

export default function SummarizePage() {
  const { t } = useTranslation();

  const [view,    setView]    = useState<SummarizeView>('input');
  const [summary, setSummary] = useState('');

  const handleGenerate = (_payload: { text: string; noteId: string | null }) => {
    // TODO: call AI summary API with payload, then set result
    setSummary(MOCK_SUMMARY);
    setView('result');
  };

  const handleNewAnalysis = () => {
    setSummary('');
    setView('input');
  };

  const handleSaveAsNote = (_summary: string) => {
    // TODO: call API to create note from summary
    console.log('Save as note:', _summary);
  };

  return (
    <main className={styles.container}>

      {/* ── Page header ── */}
      <div className={styles.topBar}>
        <div className={styles.textGroup}>
          <h1 className={styles.title}>
            {t('summarizePage.summarize_analyze', 'Summarize & Analyze')}
          </h1>
          <p className={`${styles.subtitle} bodyTextSm`}>
            {t('summarizePage.summarize_subtitle', 'Upload a document or select a note to analyze')}
          </p>
        </div>
      </div>

      {/* ── Content ── */}
      <div className={styles.content}>
        {view === 'input' && (
          <SummarizeInputSection onGenerate={handleGenerate} />
        )}
        {view === 'result' && (
          <SummarizeResultSection
            summary={summary}
            onNewAnalysis={handleNewAnalysis}
            onSaveAsNote={handleSaveAsNote}
          />
        )}
      </div>

    </main>
  );
}
