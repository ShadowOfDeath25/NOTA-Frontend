import i18n from "i18next";
// import AddIcon from '@assets/icons/add.svg?react'
// import type {NoteData} from "@components/NoteCard/NoteCard.tsx";
import Authentication from "@components/Authentication/Authentication";
function App() {
    // const Notes: NoteData[] = [
    //     {
    //       id: "1",
    //       title: "Untitled Note",
    //       summary: "",
    //       date: "11/30/2025",
    //       starred: false,
    //     },
    //     {
    //       id: "2",
    //       title: "Meeting Notes - Q4",
    //       summary: "Discussed quarterly objectives and key results...",
    //       date: "11/18/2024",
    //       tag: "work",
    //       starred: true,
    //     },
    //     {
    //       id: "3",
    //       title: "Project Ideas",
    //       summary: "Collection of innovative project concepts...",
    //       date: "11/19/2024",
    //       tag: "ideas",
    //       starred: false,
    //     },
    //     {
    //       id: "4",
    //       title: "Reading Notes - AI Researc",
    //       summary: "Key insights from recent AI papers and articles...",
    //       date: "11/20/2024",
    //       starred: false,
    //     },{

    //       id: "5",
    //       title: "Untitled Note",
    //       summary: "",
    //       date: "11/30/2025",
    //       starred: false,
    //     },
    //     {
    //       id: "6",
    //       title: "Meeting Notes - Q4",
    //       summary: "Discussed quarterly objectives and key results...",
    //       date: "11/18/2024",
    //       tag: "work",
    //       starred: true,
    //     },
    //     {
    //       id: "7",
    //       title: "Project Ideas",
    //       summary: "Collection of innovative project concepts...",
    //       date: "11/19/2024",
    //       tag: "ideas",
    //       starred: false,
    //     },
    //     {
    //       id: "8",
    //       title: "Reading Notes - AI Researc",
    //       summary: "Key insights from recent AI papers and articles...",
    //       date: "11/20/2024",
    //       starred: false,
    //     }
    // ];

    function switchLanguage(lang: string = "ar") {
        i18n.changeLanguage(lang).then();
        console.log(i18n.language)
    }


    return (
        <>
            {/*/!* <Sidebar/> *!/*/}
            {/*/!* This button is for testing purposes*!/*/}
            {/*<Sidebar/>*/}
            {/*<button onClick={() => switchLanguage("ar")}>change language</button>*/}
            {/*/!* <ActionList/> *!/*/}
            {/*<NotesList recentNotes={Notes}/>*/}

            {/*<Icon svgPath={AddIcon}/>*/}
            {/*<AddIcon className={"test"}/>*/}
            <Authentication initialTab="signup"/>
        </>
    )
}

export default App
