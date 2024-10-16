import './App.css';
import Shortened from "./Pages/Shortened.jsx";
import Login from "./Pages/Login.jsx";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./Pages/LandingPage.jsx";
import Links from "./Pages/Links.jsx";
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
import ApiDocs from "./Pages/ApiDocs.jsx";
import MainFooter from "./Components/MainFooter.jsx";
import TermsOfService from "./Components/TermsOfService.jsx";
import PrivacyPolicy from "./Components/PrivacyPolicy.jsx";
import ProtectedRoute from "./Components/ProtectedRoute.jsx";
import { inject } from '@vercel/analytics';
import protectedRoute from "./Components/ProtectedRoute.jsx";
import NotFound from "./Pages/NotFound.jsx";

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

    inject();
    if (loading) {
        return <div className="h-screen w-screen"></div>; // Blank full-screen div
    }

    return (
        <>
            <div><Toaster/></div>
            <Navbar/>
            <Routes>
                <Route path="/" element={<LandingPage/>}/>
                <Route path="/login" element={<ProtectedRoute element={<Login/>} />}/>
                <Route path="/signup" element={<ProtectedRoute element={<SignUp/>} />}/>
                <Route path="/shortened" element={<Shortened/>}/>
                <Route path="/links" element={<ProtectedRoute  element={<Links/>} />}/>
                <Route path="/settings" element={<ProtectedRoute element={<Settings/>} />} />
                <Route path="/reset" element={<ProtectedRoute element={<ForgotPassword />} />} />
                <Route path="/reset-password/:resetToken" element={<ProtectedRoute element={<ResetPassword />} />} />
                <Route path="/api-docs" element={<ApiDocs />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/terms-of-service" element={<TermsOfService />} />
                <Route path="/analytics/:shortenedUrl" element={<ProtectedRoute element={<Analytics/>} />}/>
                <Route path="*" element={<NotFound />} />
            </Routes>
            <MainFooter />
        </>
    );
};

export default App;
