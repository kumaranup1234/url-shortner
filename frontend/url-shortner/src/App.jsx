import './App.css'
import HomePage from "./Pages/HomePage.jsx";
import Shortened from "./Pages/Shortened.jsx";
import {Route, Routes} from "react-router-dom";

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/shortened" element={<Shortened />} />
            </Routes>
        </>
  )
}

export default App
