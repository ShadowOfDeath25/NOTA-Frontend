import { useParams } from "react-router-dom";
import Editor from "@components/Editor/Editor";

export default function NotePage() {
  const { noteId } = useParams<{ noteId: string }>();
  if (!noteId) return null;
  return <Editor noteId={noteId} />;
}
