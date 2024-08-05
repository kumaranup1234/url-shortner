import './App.css'
import Shortened from "./Pages/Shortened.jsx";
import Login from "./Pages/Login.jsx";
import {Route, Routes} from "react-router-dom";
import LandingPage from "./Pages/LandingPage.jsx";

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/shortened" element={<Shortened />} />
            </Routes>
        </>
  )
}

export default App
