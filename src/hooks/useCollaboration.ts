import {useEffect, useRef, useState} from "react";
import * as Y from "yjs";
import {HocuspocusProvider} from "@hocuspocus/provider";
import {QuillBinding} from "y-quill";
import type Quill from "quill";

const WS_URL = '/ws'

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
    const providerRef = useRef<HocuspocusProvider | null>(null);
    const ydocRef = useRef<Y.Doc | null>(null);
    const bindingRef = useRef<QuillBinding | null>(null);
    const [, forceRender] = useState(0);

    useEffect(() => {
        if (!quill || !noteId || !user) return;

        const ydoc = new Y.Doc();
        ydocRef.current = ydoc;

        const p = new HocuspocusProvider({
            url: WS_URL,
            name: noteId,
            document: ydoc,

        });
        providerRef.current = p;
        forceRender(n => n + 1);

        const yText = ydoc.getText();

        bindingRef.current = new QuillBinding(yText, quill, p?.awareness ?? undefined);


        const color =
            user.color || COLORS[Math.floor(Math.random() * COLORS.length)];

        p.awareness?.setLocalStateField("user", {
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
            p.awareness?.setLocalStateField("user", null);
            bindingRef.current?.destroy();
            p.destroy();
            ydoc.destroy();
            providerRef.current = null;
        };
    }, [quill, noteId, user]);

    return {provider: providerRef.current};
}
