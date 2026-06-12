import styles from './SummarizePage.module.css';
import SummarizeInputSection from '@components/Summarize/SummarizeInputSection/SummarizeInputSection';
import {useTranslation} from 'react-i18next';
import {useNavigate} from 'react-router-dom';
import {useSnackbar} from '@components/Snackbar/SnackbarContext';
import {useCreate} from "@hooks/api/useCreate.ts";
import {useSummarizeNote} from "@hooks/api/useSummarizeNote.ts";

export default function SummarizePage() {
    const {t} = useTranslation();
    const navigate = useNavigate();
    const {showSnackbar} = useSnackbar();

    const textMutation = useCreate("summarize");
    const summarizeNoteMutation = useSummarizeNote();
    const handleGenerate = (_payload: { text: string; noteId: string | null }) => {
        showSnackbar({
            type: 'info',
            message: t('summarizePage.generating', 'Generating summary...'),
        });
        if (_payload.noteId) {
            summarizeNoteMutation.mutate(_payload.noteId);
        } else {
            textMutation.mutate({content: _payload.text})
        }
        navigate('/');
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
                <SummarizeInputSection onGenerate={handleGenerate}/>
            </div>

        </main>
    );
}
