import Navbar from "../Components/NavBar";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from "../Pages/Home";
import LoginRegistration from "../Pages/LoginRegistration";
import Footer from "../Components/Footer";
import Usuarios from "../Pages/Gestionar/Usuarios";

function App() {
    return (
        <Router>
            <Navbar/>
            <Routes>
                <Route path="/" element={<Home/>}/>
            </Routes>
            <Routes>
                <Route path="/login" element={<LoginRegistration/>}/>
            </Routes>
            <Routes>
                <Route path="/gestionar/usuarios" element={<Usuarios/>}/>
            </Routes>
            <Footer/>
        </Router>
    );
}

export default App;
