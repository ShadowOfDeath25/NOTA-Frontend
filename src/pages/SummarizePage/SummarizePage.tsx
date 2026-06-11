import {useState} from 'react';
import styles from './SummarizePage.module.css';
import SummarizeInputSection from '@components/Summarize/SummarizeInputSection/SummarizeInputSection';
import {useTranslation} from 'react-i18next';

export default function SummarizePage() {
    const {t} = useTranslation();
    const [generating, setGenerating] = useState(false);

    const handleGenerate = (_payload: { text: string; noteId: string | null }) => {
        setGenerating(true);
        // TODO: call AI summary API with payload
        console.log('Generating summary for:', _payload);
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
                <SummarizeInputSection
                    onGenerate={handleGenerate}
                    disabled={generating}
                />
                {generating && (
                    <div className={styles.generatingNotice}>
                        {t('summarizePage.generating', 'Generating summary...')}
                    </div>
                )}
            </div>

        </main>
    );
}
