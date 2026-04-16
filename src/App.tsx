import Sidebar from "@components/Sidebar/Sidebar.tsx";
import i18n from "i18next";

function App() {

    function switchLanguage(lang: string = "ar") {
        i18n.changeLanguage(lang).then();
        console.log(i18n.language)
    }

    return (
        <>
            <Sidebar/>
            {/* This button is for testing purposes*/}
            <button onClick={() => switchLanguage("ar")}>change language</button>
        </>
    )
}

export default App
