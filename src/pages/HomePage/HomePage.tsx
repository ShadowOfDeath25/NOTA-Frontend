import WelcomeHeader from "@components/Home/WelcomeHeader/WelcomeHeader"
import ActionList from "@components/Home/ActionList/ActionList"
import NotesList from "@components/Home/NotesList/NotesList"
import {useRead} from "@hooks/api/useRead.ts";
import type {Note} from "@customTypes/Note.ts";
import type {UseQueryResult} from "@tanstack/react-query";

const HomePage = () => {
    const {data: notes} = useRead<UseQueryResult<Note[]>>("notes")
    return (
        <main>
            <WelcomeHeader/>
            <ActionList/>
            <NotesList recentNotes={notes?.data}/>
        </main>
    )
}

export default HomePage