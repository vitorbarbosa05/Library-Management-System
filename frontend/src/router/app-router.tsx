import {Route, Routes} from "react-router";
import Page from "../page.tsx";

const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<Page/>}/>
        </Routes>
    )
}
export default AppRouter
