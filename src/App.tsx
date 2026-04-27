
import {useAuth} from "@hooks/api/useAuth.ts";
import HomePage from "@pages/HomePage/HomePage.tsx";


function App() {
    const {logout} = useAuth()


    return (
        <>
            {/* <button onClick={()=>logout.mutate()}>Logout</button> */}
            <HomePage/>
        </>
    )
}

export default App
