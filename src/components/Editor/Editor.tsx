import {useRef, useEffect, useState, useMemo} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {useSettings} from "@context/SettingsContext.tsx";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import QuillCursors from "quill-cursors";
import {useCollaboration} from "@hooks/useCollaboration";
import {useAwareness} from "@hooks/useAwareness";
import {useAuth} from "@hooks/api/useAuth";
import styles from "./Editor.module.css";
import CloseIcon from "@assets/icons/close.svg?react";
import SparklesIcon from "@assets/icons/collaborate.svg?react";
import Toolbar from "./Toolbar/Toolbar";
import AISummaryPanel from "./AISummaryPanel/AISummaryPanel";
import {useUpdate} from "@hooks/api/useUpdate.ts";

Quill.register("modules/cursors", QuillCursors);

interface EditorProps {
    noteId: string;
}

export default function Editor({noteId}: EditorProps) {
    const quillRef = useRef<HTMLDivElement>(null);
    const [quill, setQuill] = useState<Quill | null>(null);
    const [showAIPanel, setShowAIPanel] = useState(false);
    const {user: authUser} = useAuth();
    const {lang} = useSettings();
    const {t} = useTranslation();
    const [titleEmpty, setTitleEmpty] = useState(true);
    const {state} = useLocation()
    const [title, setTitle] = useState(state?.note_title ?? "");
    const {mutate: updateNote} = useUpdate("notes");
    const initialTitleRef = useRef(title);

    const navigate = useNavigate();

    console.log(state);
    useEffect(() => {
        if (title === initialTitleRef.current) return;

        const timeout = setTimeout(() => {
            // @ts-expect-error IDK WTF is wrong with this shit
            updateNote({id: noteId, title});
        }, 2000);

        return () => clearTimeout(timeout);
    }, [title, noteId, updateNote]);

    useEffect(() => {
        if (!quillRef.current || quill) return;
        // Prevent double-initialization in React StrictMode
        if (quillRef.current.classList.contains("ql-container")) return;

        const editor = new Quill(quillRef.current, {
            theme: "snow",
            modules: {

                toolbar: false,
                cursors: {
                    transformOnTextChange: true,
                },
            },
        });

        // Set initial direction synchronously on initialization
        const isEmpty = editor.getText().trim() === "";
        const currentDir = isEmpty ? (lang === "ar" ? "rtl" : "ltr") : "auto";
        editor.root.setAttribute("dir", currentDir);

        setQuill(editor);
    }, [quill, lang]);

    // Update editor direction and placeholder dynamically
    useEffect(() => {
        if (!quill) return;

        const updateEditorDir = () => {
            const isEmpty = quill.getText().trim() === "";
            const currentDir = isEmpty ? (lang === "ar" ? "rtl" : "ltr") : "auto";
            quill.root.setAttribute("dir", currentDir);
        };

        // Set initial direction
        updateEditorDir();

        // Set placeholder
        quill.root.setAttribute(
            "data-placeholder",
            t("editor.write_your_thoughts", "Write your thoughts here...")
        );

        quill.on("text-change", updateEditorDir);
        return () => {
            quill.off("text-change", updateEditorDir);
        };
    }, [quill, lang, t]);

    const currentUser = useMemo(
        () =>
            authUser?.data
                ? {id: authUser.data.id, name: authUser.data.name}
                : null,
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [authUser?.data?.id, authUser?.data?.name]
    );

    const {provider} = useCollaboration(noteId, quill, currentUser);
    const {activeUsers} = useAwareness(provider);



    return (
        <div className={styles.container}>
            {/* ── Top padding to avoid overlap with fixed header ──────── */}
            <div className={styles.containerMain}>

                {/* ── Header ─────────────────────────────────────────────── */}
                <div className={styles.header}>
                    <div className={styles.headerLeft}>
                        <input
                            type="text"
                            placeholder={t("editor.untitled_note", "Untitled Note")}
                            value={title}
                            className={styles.titleInput}
                            dir={titleEmpty ? (lang === "ar" ? "rtl" : "ltr") : "auto"}
                            onChange={(e) => {
                                setTitle(e.target.value);
                                setTitleEmpty(e.target.value === "");
                            }}
                        />
                    </div>

                    <div className={styles.headerRight}>
                        <div className={styles.statusIndicator}>{t("editor.saved", "Saved")}</div>

                        {activeUsers.length > 0 && (
                            <div className={styles.collaborators}>
                                <SparklesIcon className={styles.collaboratorIcon}/>
                                <div className={styles.avatarStack}>
                                    {activeUsers.map((u) => (
                                        <div
                                            key={u.id}
                                            title={u.name}
                                            className={styles.avatarItem}
                                            style={{backgroundColor: u.color || "#007acc"}}
                                        >
                                            {u.name.charAt(0).toUpperCase()}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        <button
                            className={styles.closeButton}
                            title={t("editor.close_note", "Close")}
                            // Go back to the previous page in the browser history
                            onClick={() => navigate(-1)}
                        >
                            <CloseIcon/>
                        </button>
                    </div>
                </div>

                {/* ── Custom React Toolbar ────────────────────────────────── */}
                <Toolbar
                    quill={quill}
                    onAISummarize={() => setShowAIPanel(true)}
                />

                {/* ── Split: Quill editor + AI Summary Panel ──────────────── */}
                <div className={styles.editorWrapper}>
                    {/* Editor area — shrinks when panel is open */}
                    <div className={styles.editorContent}>
                        <div ref={quillRef} className={styles.quillContainer}/>
                    </div>

                    {/* AI Summary panel — slides in from the right */}
                    {showAIPanel && (
                        <AISummaryPanel
                            noteId={noteId}
                            onClose={() => setShowAIPanel(false)}
                            onInsertIntoNote={(text) => {
                                // Insert the summary text at the current cursor position safely
                                if (quill) {
                                    const range = quill.getSelection(true);
                                    const index = range ? range.index : quill.getLength() - 1;
                                    quill.insertText(index, '\n' + text, 'user');
                                }
                                setShowAIPanel(false);
                            }}
                            onSaveSummary={() => {
                                // TODO: allow user to edit the summary
                            }}
                        />
                    )}
                </div>


            </div>
        </div>
    );
}