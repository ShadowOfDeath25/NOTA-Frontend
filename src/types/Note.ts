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