import {useEffect, useRef, useState} from "react";
import * as Y from "yjs";
import {HocuspocusProvider} from "@hocuspocus/provider";
import {QuillBinding} from "y-quill";
import type Quill from "quill";

const WS_URL = import.meta.env.VITE_WS_PROVIDER_URL as string;

const COLORS = ["#f97316", "#3b82f6", "#10b981", "#a855f7", "#ef4444", "#eab308"];

interface UseCollaborationUser {
    id: string;
    name: string;
    color?: string;
}

export function useCollaboration(
    noteId: string,
    quill: Quill | null,
    user: UseCollaborationUser | null,
) {
    const [provider, setProvider] = useState<HocuspocusProvider | null>(null);
    const ydocRef = useRef<Y.Doc | null>(null);
    const bindingRef = useRef<QuillBinding | null>(null);

    useEffect(() => {
        if (!quill || !noteId || !user) return;

        const ydoc = new Y.Doc();
        ydocRef.current = ydoc;

        const provider = new HocuspocusProvider({
            url: WS_URL,
            name: noteId,
            document: ydoc,

        });
        setProvider(provider);

        const yText = ydoc.getText();


        bindingRef.current = new QuillBinding(yText, quill, provider?.awareness ?? undefined);


        const color =
            user.color || COLORS[Math.floor(Math.random() * COLORS.length)];

        provider.awareness?.setLocalStateField("user", {
            id: user.id,
            name: user.name,
            color,
        });

        setTimeout(() => {
            const yText = ydoc.getText("content");

            console.log("YTEXT STRING:", yText.toString());
            console.log("YDOC KEYS:", [...ydoc.share.keys()]);
        }, 1000);
        return () => {

            provider.awareness?.setLocalStateField("user", null);
            bindingRef.current?.destroy();
            provider.destroy();
            ydoc.destroy();
            setProvider(null);
        };
    }, [quill, noteId, user]);

    return {provider};
}
