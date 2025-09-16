import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import  UseContax  from "./UseContax";
import Page1 from "./Page1";
import Page2 from "./Page2";

const Appi=()=> {
    return (
        <UseContax>
            <Router>
                <nav>
                    <Link to="/">Page1</Link> | <Link to="/page2">Page2</Link>
                </nav>
                <Routes>
                    <Route path="/" element={<Page1 />} />
                    <Route path="/page2" element={<Page2 />} />
                </Routes>
            </Router>
        </UseContax>
    );
}

export default Appi;
