export  type NoteProps ={
    id: string;
    title: string;
    summary?: string;
    date: string;
    tag?: string;
    starred: boolean;
    onNoteClick: (id: string, starred: boolean) => void;
}
