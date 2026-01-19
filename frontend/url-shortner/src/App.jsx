import './App.css';
import { Route, Routes } from "react-router-dom";
import React, { Suspense, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { checkAuthStatus } from './store/slices/authSlice';
import { inject } from '@vercel/analytics';
import ErrorBoundary from './shared/components/ErrorBoundary';
import NotificationContainer from './shared/components/ui/NotificationContainer';

import Shortened from "./Pages/Shortened.jsx";
import Login from "./features/auth/Login.jsx";
import LandingPage from "./Pages/LandingPage.jsx";
import Links from "./features/links/Links.jsx";
const Analytics = React.lazy(() => import('./Pages/Analytics.jsx'));
import Navbar from "./Pages/Navbar.jsx";
import SignUp from "./features/auth/SignUp.jsx";
const Settings = React.lazy(() => import('./Pages/Settings.jsx'));
import ForgotPassword from "./Pages/ForgotPassword.jsx";
import ResetPassword from "./Pages/ResetPassword.jsx";
import ApiDocs from "./Pages/ApiDocs.jsx";
import TermsOfService from "./shared/components/TermsOfService.jsx";
import PrivacyPolicy from "./shared/components/PrivacyPolicy.jsx";
import ProtectedRoute from "./features/auth/ProtectedRoute.jsx";
const Dashboard = React.lazy(() => import('./features/dashboard/Dashboard.jsx'));
import NotFound from "./Pages/NotFound.jsx";
import OneLink from "./Pages/OneLink.jsx";
import LoadingSpinner from "./shared/components/ui/LoadingSpinner.jsx";
import CreatePage from "./features/onelink/CreatePage.jsx";
import TemplateSelection from "./features/onelink/TemplateSelection.jsx";
import TemplateEditor from "./Pages/TemplateEditor.jsx";
import PublicProfilePage from "./Pages/PublicProfilePage.jsx";

const App = () => {
    const dispatch = useDispatch();
    const { loading } = useSelector(state => state.auth);

    useEffect(() => {
        dispatch(checkAuthStatus());
    }, [dispatch]);

    inject();
    
    if (loading) {
       return <LoadingSpinner />;
    }
    
    const isPublicProfilePage = location.pathname.startsWith("/onelink/");

    return (
        <ErrorBoundary>
            <NotificationContainer />
            {!isPublicProfilePage && <Navbar />}
            <Suspense fallback={<LoadingSpinner />}>
                <Routes>
                    <Route path="/" element={<ProtectedRoute element={<LandingPage/>} />}/>
                    <Route path="/login" element={<ProtectedRoute element={<Login/>} />}/>
                    <Route path="/signup" element={<ProtectedRoute element={<SignUp/>} />}/>
                    <Route path="/shortened" element={<Shortened/>}/>
                    <Route path="/links" element={<ProtectedRoute element={<Links/>} />}/>
                    <Route path="/createOneLink" element={<ProtectedRoute element={<CreatePage/>} />}/>
                    <Route path="/templates" element={<ProtectedRoute element={<TemplateSelection />} />} />
                    <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard/>} />}/>
                    <Route path="/onelinkPages" element={<ProtectedRoute element={<OneLink/>} />}/>
                    <Route path="/customize-template" element={<ProtectedRoute element={<TemplateEditor />} />} />
                    <Route path="/settings" element={<ProtectedRoute element={<Settings/>} />} />
                    <Route path="/reset" element={<ProtectedRoute element={<ForgotPassword />} />} />
                    <Route path="/reset-password/:resetToken" element={<ProtectedRoute element={<ResetPassword />} />} />
                    <Route path="/api-docs" element={<ApiDocs />} />
                    <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                    <Route path="/terms-of-service" element={<TermsOfService />} />
                    <Route path="/analytics/:shortenedUrl" element={<ProtectedRoute element={<Analytics/>} />}/>
                    <Route path="/onelink/:username" element={<PublicProfilePage />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Suspense>
        </ErrorBoundary>
    );
};

export default App;
