import { useRef, useEffect, useState, useMemo } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import QuillCursors from "quill-cursors";
import { useCollaboration } from "@hooks/useCollaboration";
import { useAwareness } from "@hooks/useAwareness";
import { useAuth } from "@hooks/api/useAuth";
import styles from "./styles.module.css";

Quill.register("modules/cursors", QuillCursors);

interface EditorProps {
  noteId: string;
}

export default function Editor({ noteId }: EditorProps) {
  const quillRef = useRef<HTMLDivElement>(null);
  const [quill, setQuill] = useState<Quill | null>(null);
  const { user: authUser } = useAuth();

  useEffect(() => {
    if (!quillRef.current || quill) return;

    const editor = new Quill(quillRef.current, {
      theme: "snow",
      modules: {
        toolbar: [
          [{ header: [1, 2, 3, false] }],
          ["bold", "italic", "underline", "strike"],
          [{ list: "ordered" }, { list: "bullet" }],
          ["blockquote", "code-block"],
          ["link", "image"],
          ["clean"],
        ],
        cursors: {
          transformOnTextChange: true,
        },
      },
    });

    setQuill(editor);
  }, [quill]);

  const currentUser = useMemo(() => 
    authUser?.data
      ? { id: authUser.data.id, name: authUser.data.name }
      : null
  , [authUser?.data?.id, authUser?.data?.name]);

  const { provider } = useCollaboration(noteId, quill, currentUser);
  const { activeUsers } = useAwareness(provider);

  return (
    <div className={styles.quillWrapper}>
      {activeUsers.length > 0 && (

        <div style={{ display: "flex", gap: 4, padding: 8, flexWrap: "wrap" }}>
          {activeUsers.map((u) => (
            <div
              key={u.id}
              title={u.name}
              style={{
                width: 28,
                height: 28,
                borderRadius: "50%",
                backgroundColor: u.color,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontSize: 12,
                fontWeight: 600,
              }}
            >
              {u.name.charAt(0).toUpperCase()}
            </div>
          ))}
        </div>
      )}
      <div ref={quillRef} />
    </div>
  );
}