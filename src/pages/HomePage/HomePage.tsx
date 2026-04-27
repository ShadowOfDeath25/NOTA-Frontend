import styles from "./HomePage.module.css"
import Sidebar from "@components/Sidebar/Sidebar"
import WelcomeHeader from "@components/Home/WelcomeHeader/WelcomeHeader"
import ActionList from "@components/Home/ActionList/ActionList"
import NotesList from "@components/Home/NotesList/NotesList"


const HomePage = () => {
    const NoteData = [
        {
            id:"1",
            title: "Note 1",
            summary: "Summary 1",
            date: "Date 1",
            tag: "Tag 1",
            starred: false,
        },
        {
            id:"2",
            title: "Note 2",
            summary: "Summary 2",
            date: "Date 2",
            tag: "Tag 2",
            starred: false,
        },
        {
            id:"3",
            title: "Note 3",
            summary: "Summary 3",
            date: "Date 3",
            tag: "Tag 3",
            starred: false,
        },
        {
            id:"4",
            title: "Note 4",
            summary: "Summary 4",
            date: "Date 4",
            tag: "Tag 4",
            starred: false,
        },
        {
            id:"5",
            title: "Note 5",
            summary: "Collection of innovative project concepts and ideas.",
            date: "Date 5",
            tag: "Tag 5",
            starred: false,
        },
        {
            id:"6",
            title: "Note 6",
            summary: "Discussed quarterly objectives and key results with the team.We set clear targets and aligned our strategies for the upcoming quarter",
            date: "Date 6",
            tag: "Tag 6",
            starred: false,
        },
        {
            id:"7",
            title: "Note 7",
            summary: "Summary 7",
            date: "Date 7",
            tag: "Tag 7",
            starred: false,
        },
    ]
    return (
        <>
        <div className={styles.container}>
            <Sidebar/>
            <main className={styles.main}>
                <WelcomeHeader/>
                <ActionList/>
                <NotesList recentNotes={NoteData} />
            </main>
        </div>
        </>
    )
}

export default HomePage