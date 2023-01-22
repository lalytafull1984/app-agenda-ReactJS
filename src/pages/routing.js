import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import HomePage from "../pages/HomePage"
import LoginPage from "../pages/LoginPage"
import MyAgendaPage from "../pages/MyAgendaPage"

function Routing() {
    return(
        <Router>
            <Routes>
                <Route exact path="/" element={ <HomePage/>}></Route>
                <Route exact path="/login" element={<LoginPage/>}></Route>
                <Route exact path="/agenda" element={<MyAgendaPage/>}></Route>
            </Routes>
        </Router>
    )
}

export default Routing;