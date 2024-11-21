import './App.css';
import { Route, Routes } from "react-router-dom";
import React, {Suspense, useEffect, useState} from "react";
import axiosInstance from "./utils/axiosInstance.js";
import {useRecoilState} from "recoil";
import {authState} from "./recoil/atoms.js";
import {Toaster} from "react-hot-toast";
import { inject } from '@vercel/analytics';
import Shortened from "./Pages/Shortened.jsx";
import Login from "./Pages/Login.jsx";
import LandingPage from "./Pages/LandingPage.jsx";
import Links from "./Pages/Links.jsx";
const Analytics = React.lazy(() => import('./Pages/Analytics.jsx'));
import Navbar from "./Pages/Navbar.jsx";
import SignUp from "./Pages/SignUp.jsx";
const Settings = React.lazy(() => import('./Pages/Settings.jsx'));
import ForgotPassword from "./Pages/ForgotPassword.jsx";
import ResetPassword from "./Pages/ResetPassword.jsx";
import ApiDocs from "./Pages/ApiDocs.jsx";
import MainFooter from "./Components/MainFooter.jsx";
import TermsOfService from "./Components/TermsOfService.jsx";
import PrivacyPolicy from "./Components/PrivacyPolicy.jsx";
import ProtectedRoute from "./Components/ProtectedRoute.jsx";
const Dashboard = React.lazy(() => import('./Pages/Dashboard.jsx'));
import NotFound from "./Pages/NotFound.jsx";
import OneLink from "./Pages/OneLink.jsx";
import LoadingSpinner from "./Components/LoadingSpinner.jsx";

const App = () => {
    const [auth, setAuth] = useRecoilState(authState);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuthStatus = async () => {
            try {
                const response = await axiosInstance.get('/api/users/status');
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
       return <LoadingSpinner />;
    }

    return (
        <>
            <div><Toaster/></div>
            <Navbar/>
            <Suspense fallback={<LoadingSpinner />}>
            <Routes>
                <Route path="/" element={<ProtectedRoute element={<LandingPage/>} />}/>
                <Route path="/login" element={<ProtectedRoute element={<Login/>} />}/>
                <Route path="/signup" element={<ProtectedRoute element={<SignUp/>} />}/>
                <Route path="/shortened" element={<Shortened/>}/>
                <Route path="/links" element={<ProtectedRoute  element={<Links/>} />}/>
                <Route path="/dashboard" element={<ProtectedRoute  element={<Dashboard/>} />}/>
                <Route path="/onelinkPages" element={<ProtectedRoute element={<OneLink/>} />}/>
                <Route path="/settings" element={<ProtectedRoute element={<Settings/>} />} />
                <Route path="/reset" element={<ProtectedRoute element={<ForgotPassword />} />} />
                <Route path="/reset-password/:resetToken" element={<ProtectedRoute element={<ResetPassword />} />} />
                <Route path="/api-docs" element={<ApiDocs />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/terms-of-service" element={<TermsOfService />} />
                <Route path="/analytics/:shortenedUrl" element={<ProtectedRoute element={<Analytics/>} />}/>
                <Route path="*" element={<NotFound />} />
            </Routes>
            </Suspense>
        </>
    );
};

export default App;
