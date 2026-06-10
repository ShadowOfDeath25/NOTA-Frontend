import { useEffect, useState, useCallback } from "react";
import type Quill from "quill";


export interface ToolbarFormats {
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strike?: boolean;
  header?: 1 | 2 | 3;
  list?: "ordered" | "bullet" | "unchecked" | "checked";
  blockquote?: boolean;
  "code-block"?: boolean;
  link?: string;
  [key: string]: unknown;
}


export function useToolbarFormats(quill: Quill | null): {
  formats: ToolbarFormats;

  syncNow: () => void;
} {
  const [formats, setFormats] = useState<ToolbarFormats>({});


  const syncNow = useCallback(() => {
    if (!quill) {
      setFormats({});
      return;
    }
  
    const range = quill.getSelection(true);
    setFormats(quill.getFormat(range) as ToolbarFormats);
  }, [quill]);

  const syncPassive = useCallback(() => {
    if (!quill) {
      setFormats({});
      return;
    }
    const range = quill.getSelection();
    if (range !== null) {
      setFormats(quill.getFormat(range) as ToolbarFormats);
    }
  }, [quill]);

  useEffect(() => {
    if (!quill) return;


    syncNow();

    quill.on("text-change", syncPassive);
    quill.on("selection-change", syncPassive);

    return () => {
      quill.off("text-change", syncPassive);
      quill.off("selection-change", syncPassive);
    };
  }, [quill, syncNow, syncPassive]);

  return { formats, syncNow };
}
