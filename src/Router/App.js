import Navbar from "../Components/NavBar";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "../Pages/Home";
import LoginRegistration from "../Pages/LoginRegistration";

function App() {
  return (
      <Router>
          <Navbar />
          <Routes>
              <Route path="/" element={<Home />} />
          </Routes>
          <Routes>
              <Route path="/login" element={<LoginRegistration />} />
          </Routes>
      </Router>
  );
}

export default App;
