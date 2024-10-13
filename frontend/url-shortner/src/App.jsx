import './App.css';
import Shortened from "./Pages/Shortened.jsx";
import Login from "./Pages/Login.jsx";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./Pages/LandingPage.jsx";
import Links from "./Pages/Links.jsx";
import ClicksLineChart from "./Components/ClicksLineChart.jsx";
import DevicePieChart from "./Components/DevicePieChart.jsx";
import ReferrerBarChart from "./Components/ReferrerBarChart.jsx";
import BrowserBarChart from "./Components/BrowserBarChart.jsx";
import LocationList from "./Components/LocationList.jsx";
import TopPerformance from "./Cards/TopPerformance.jsx";
import Analytics from "./Pages/Analytics.jsx";
import Navbar from "./Pages/Navbar.jsx";
import SignUp from "./Pages/SignUp.jsx";
import { useEffect, useState } from "react";
import axiosInstance from "./utils/axiosInstance.js";
import {useRecoilState} from "recoil";
import {authState} from "./recoil/atoms.js";
import {Toaster} from "react-hot-toast";
import Settings from "./Pages/Settings.jsx";
import ForgotPassword from "./Pages/ForgotPassword.jsx";
import ResetPassword from "./Pages/ResetPassword.jsx";

const App = () => {
    // Set default state to indicate not logged in
    const [auth, setAuth] = useRecoilState(authState);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuthStatus = async () => {
            try {
                const response = await axiosInstance.get('/api/users/status');
                console.log(response.data);
                setAuth({ isLoggedIn: response.data.isLoggedIn, user: response.data.user });
            } catch (error) {
                console.error('Error verifying authentication:', error);
                setAuth({ isLoggedIn: false, user: null });
            } finally {
                setLoading(false)
            }
        };
        checkAuthStatus();
    }, [setAuth]);

    if (loading) {
        return <div className="h-screen w-screen"></div>; // Blank full-screen div
    }

    return (
        <>
            <div><Toaster/></div>
            <Navbar/>
            <Routes>
                <Route path="/" element={<LandingPage/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/signup" element={<SignUp/>}/>
                <Route path="/shortened" element={<Shortened/>}/>
                <Route path="/links" element={<Links/>}/>
                <Route path="/settings" element={<Settings/>} />
                <Route path="/reset" element={<ForgotPassword />} />
                <Route path="/reset-password/:resetToken" element={<ResetPassword />} />
                <Route path="/analytics/:shortenedUrl" element={<Analytics/>}/>
                <Route path="/charts" element={<ClicksLineChart shortUrl="lu9yK_QGi"/>}/>
                <Route path="/pie" element={<DevicePieChart shortUrl="lu9yK_QGi"/>}/>
                <Route path="/bar" element={<ReferrerBarChart shortUrl="lu9yK_QGi"/>}/>
                <Route path="/barBrowser" element={<BrowserBarChart shortUrl="lu9yK_QGi"/>}/>
                <Route path="/location" element={<LocationList shortUrl="lu9yK_QGi"/>}/>
                <Route path="/top" element={<TopPerformance startingDate="Sep 6" endingDate="Sep 12, 2024" clicks={205}
                                                            bestDay="Sep 05, 2024" place=""/>}/>
            </Routes>
        </>
    );
};

export default App;
