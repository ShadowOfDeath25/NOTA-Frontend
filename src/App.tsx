
import {useAuth} from "@hooks/api/useAuth.ts";


function App() {
    const {logout} = useAuth()


    return (
        <>
            <button onClick={()=>logout.mutate()}>Logout</button>
        </>
    )
}

export default App
