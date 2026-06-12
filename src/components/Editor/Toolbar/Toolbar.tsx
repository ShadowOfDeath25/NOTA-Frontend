import { useCallback, useRef, useState } from "react";
import type Quill from "quill";
import { useTranslation } from "react-i18next";

import ToolbarButton from "./ToolbarButton";
import { useToolbarFormats } from "@hooks/useToolbarFormats";
import NoteOptionsMenu from "./NoteOptionsMenu/NoteOptionsMenu";
import type { NoteOptionsCallbacks } from "./NoteOptionsMenu/NoteOptionsMenu";
import styles from "./styles.module.css";

// ── Icon imports ────────────────────────────────────────────────────────────
import AI from "@assets/icons/ai.svg?react";
import BoldIcon from "@assets/icons/bold.svg?react";
import ItalicIcon from "@assets/icons/italic.svg?react";
import UnderlineIcon from "@assets/icons/underline.svg?react";
import H1Icon from "@assets/icons/h1.svg?react";
import H2Icon from "@assets/icons/h2.svg?react";
import H3Icon from "@assets/icons/h3.svg?react";
import UnOrderListIcon from "@assets/icons/unorderlist.svg?react";
import OrderlistIcon from "@assets/icons/orderlist.svg?react";
import ChecklistIcon from "@assets/icons/checklist.svg?react";
import ImageIcon from "@assets/icons/image.svg?react";
import AttachfileIcon from "@assets/icons/attachfile.svg?react";
import LinkIcon from "@assets/icons/link.svg?react";
import QuoteIcon from "@assets/icons/quote.svg?react";
import TagIcon from "@assets/icons/tag.svg?react";

// ── Props ────────────────────────────────────────────────────────────────────
interface ToolbarProps {
  
  quill: Quill | null;

  onAISummarize?: () => void;

  noteOptions?: NoteOptionsCallbacks;

  noteId?: string;
}


export default function Toolbar({ quill, onAISummarize, noteOptions = {}, noteId }: ToolbarProps) {
  const { t } = useTranslation();
  const { formats, syncNow } = useToolbarFormats(quill);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);


  const off = quill === null;

 
  const applyFmt = useCallback(
    (name: string, value: unknown) => {
      if (!quill) return;
      quill.format(name, value, "user");
     
      syncNow();
    },
    [quill, syncNow]
  );

  
  const toggle = useCallback(
    (name: string, current: boolean | undefined) =>
      applyFmt(name, !current),
    [applyFmt]
  );

  const toggleEnum = useCallback(
    (name: string, value: string | number, current: unknown) =>
      applyFmt(name, current === value ? false : value),
    [applyFmt]
  );


  const handleImageChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file || !quill) return;
      const reader = new FileReader();
      reader.onload = () => {
        const range = quill.getSelection(true);
        quill.insertEmbed(range.index, "image", reader.result, "user");
      };
      reader.readAsDataURL(file);
    
      e.target.value = "";
    },
    [quill]
  );

 
  const handleLink = useCallback(() => {
    if (!quill) return;
    if (formats.link) {
   
      applyFmt("link", false);
    } else {
      // const url = window.prompt("Enter URL:");
      // if (url?.trim()) applyFmt("link", url.trim());
    }
  }, [quill, formats.link, applyFmt]);

  // ─────────────────────────────────────────────────────────────────────────
  return (
    <div
      className={styles.row}
      role="toolbar"
      aria-label={t("editor.toolbar.label", "Text formatting toolbar")}
    >
      {/* ── Left: formatting groups ──────────────────────────────────── */}
      <div className={styles.groups}>

        {/* Group 1 — Inline formatting */}
        <div className={styles.group} role="group" aria-label="Inline formatting">
          <ToolbarButton
            icon={BoldIcon}
            label={t("editor.toolbar.bold", "Bold")}
            shortcut="Ctrl+B"
            isActive={!!formats.bold}
            isDisabled={off}
            onClick={() => toggle("bold", formats.bold)}
          />
          <ToolbarButton
            icon={ItalicIcon}
            label={t("editor.toolbar.italic", "Italic")}
            shortcut="Ctrl+I"
            isActive={!!formats.italic}
            isDisabled={off}
            onClick={() => toggle("italic", formats.italic)}
          />
          <ToolbarButton
            icon={UnderlineIcon}
            label={t("editor.toolbar.underline", "Underline")}
            shortcut="Ctrl+U"
            isActive={!!formats.underline}
            isDisabled={off}
            onClick={() => toggle("underline", formats.underline)}
          />
        </div>

        <span className={styles.sep} role="separator" aria-orientation="vertical" />

        {/* Group 2 — Headings */}
        <div className={styles.group} role="group" aria-label="Headings">
          <ToolbarButton
            icon={H1Icon}
            label={t("editor.toolbar.heading_1", "Heading 1")}
            isActive={formats.header === 1}
            isDisabled={off}
            onClick={() => toggleEnum("header", 1, formats.header)}
          />
          <ToolbarButton
            icon={H2Icon}
            label={t("editor.toolbar.heading_2", "Heading 2")}
            isActive={formats.header === 2}
            isDisabled={off}
            onClick={() => toggleEnum("header", 2, formats.header)}
          />
          <ToolbarButton
            icon={H3Icon}
            label={t("editor.toolbar.heading_3", "Heading 3")}
            isActive={formats.header === 3}
            isDisabled={off}
            onClick={() => toggleEnum("header", 3, formats.header)}
          />
        </div>

        <span className={styles.sep} role="separator" aria-orientation="vertical" />

        {/* Group 3 — Lists */}
        <div className={styles.group} role="group" aria-label="Lists">
          <ToolbarButton
            icon={UnOrderListIcon}
            label={t("editor.toolbar.bullet_list", "Bullet list")}
            isActive={formats.list === "bullet"}
            isDisabled={off}
            onClick={() => toggleEnum("list", "bullet", formats.list)}
          />
          <ToolbarButton
            icon={OrderlistIcon}
            label={t("editor.toolbar.ordered_list", "Ordered list")}
            isActive={formats.list === "ordered"}
            isDisabled={off}
            onClick={() => toggleEnum("list", "ordered", formats.list)}
          />
          {/* Quill v2 uses 'unchecked' (unchecked) and 'checked' (checked) */}
          <ToolbarButton
            icon={ChecklistIcon}
            label={t("editor.toolbar.checklist", "Checklist")}
            isActive={formats.list === "unchecked" || formats.list === "checked"}
            isDisabled={off}
            onClick={() => toggleEnum("list", "unchecked", formats.list)}
          />
        </div>

        <span className={styles.sep} role="separator" aria-orientation="vertical" />

        {/* Group 4 — Insert */}
        <div className={styles.group} role="group" aria-label="Insert">
          <ToolbarButton
            icon={ImageIcon}
            label={t("editor.toolbar.insert_image", "Insert image")}
            isDisabled={off}
            onClick={() => imageInputRef.current?.click()}
          />
          <ToolbarButton
            icon={AttachfileIcon}
            label={t("editor.toolbar.attach_file", "Attach file")}
            isDisabled={off}
            onClick={() => {
              /* TODO: wire up file-attachment feature */
            }}
          />
          <ToolbarButton
            icon={LinkIcon}
            label={t("editor.toolbar.insert_link", "Insert link")}
            shortcut="Ctrl+K"
            isActive={!!formats.link}
            isDisabled={off}
            onClick={handleLink}
          />
        </div>

        <span className={styles.sep} role="separator" aria-orientation="vertical" />

        {/* Group 5 — Block */}
        <div className={styles.group} role="group" aria-label="Block formatting">
          <ToolbarButton
            icon={QuoteIcon}
            label={t("editor.toolbar.blockquote", "Blockquote")}
            isActive={!!formats.blockquote}
            isDisabled={off}
            onClick={() => toggle("blockquote", formats.blockquote)}
          />
          <ToolbarButton
            icon={TagIcon}
            label={t("editor.toolbar.code_block", "Code block")}
            isActive={!!formats["code-block"]}
            isDisabled={off}
            onClick={() => toggle("code-block", formats["code-block"])}
          />
        </div>
      </div>

      {/* ── Right: AI + More ────────────────────────────────────────── */}
      <div className={styles.right}>
        <button
          type="button"
          className={styles.aiBtn}
          // Prevent editor focus loss on click (same pattern as ToolbarButton)
          onMouseDown={(e) => e.preventDefault()}
          onClick={onAISummarize}
          aria-label={t("editor.toolbar.ai_summarize", "Summarise note with AI")}
          title={t("editor.toolbar.ai_summarize", "AI Summarize")}
        >
          <AI aria-hidden="true" focusable="false" />
          {t("editor.toolbar.ai_summarize", "AI Summarize")}
        </button>

        <div className={styles.moreBtnWrapper}>
          <button
            type="button"
            className={styles.moreBtn}
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={t("editor.toolbar.more_options", "More options")}
            aria-haspopup="menu"
            aria-expanded={menuOpen}
            title={t("editor.toolbar.more_options", "More options")}
          >
            ⋮
          </button>

          {menuOpen && (
            <NoteOptionsMenu
              onClose={() => setMenuOpen(false)}
              noteId={noteId}
              {...noteOptions}
            />
          )}
        </div>
      </div>

      {/* Hidden image file picker — triggered by the image button above */}
      <input
        ref={imageInputRef}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleImageChange}
        aria-hidden="true"
        tabIndex={-1}
      />
    </div>
  );
}
