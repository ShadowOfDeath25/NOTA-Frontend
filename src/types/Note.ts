export interface NoteResponse {
    id: string,
    title: string,
    content: string | null
}

export interface CurrentUser {
    id: string,
    name: string
}

export interface EditorProps {
    noteId: string,
    // currentUser: CurrentUser
}

export interface NoteUpdatePayload {
    id: string,
    content: string
}

export interface Note {
    id: string,
    content: object,
    preview: string,
    user_id: string,
    title: string,
    space_id: string,
    created_at: string,
    starred: boolean,
}

export interface NoteSummarizedEvent {
    note_id: string;
    summary: string;
}