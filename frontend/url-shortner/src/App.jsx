import './App.css'
import Shortened from "./Pages/Shortened.jsx";
import Login from "./Pages/Login.jsx";
import {Route, Routes} from "react-router-dom";
import LandingPage from "./Pages/LandingPage.jsx";
import Links from "./Pages/Links.jsx";
import ClicksLineChart from "./Components/ClicksLineChart.jsx";
import DevicePieChart from "./Components/DevicePieChart.jsx";
import ReferrerBarChart from "./Components/ReferrerBarChart.jsx";
import BrowserBarChart from "./Components/BrowserBarChart.jsx";
import LocationList from "./Components/LocationList.jsx";
import TopPerformance from "./Cards/TopPerformance.jsx";

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/shortened" element={<Shortened />} />
                <Route path="/links" element={<Links />} />
                <Route path="/charts" element={<ClicksLineChart shortUrl="lu9yK_QGi" />} />
                <Route path="/pie" element={<DevicePieChart shortUrl="lu9yK_QGi" />} />
                <Route path="/bar" element={<ReferrerBarChart shortUrl="lu9yK_QGi" />} />
                <Route path="/barBrowser" element={<BrowserBarChart shortUrl="lu9yK_QGi" />} />
                <Route path="/location" element={<LocationList shortUrl="lu9yK_QGi" />} />
                <Route path="/top" element={<TopPerformance startingDate="Sep 6" endingDate="Sep 12, 2024" clicks={205} bestDay="Sep 05, 2024" place=""/>} />
            </Routes>
        </>
    )
}

export default App