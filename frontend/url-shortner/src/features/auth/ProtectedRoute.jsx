import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ element }) => {
    const { isLoggedIn } = useSelector(state => state.auth);
    const location = useLocation();

    // Get the current pathname
    const currentPath = location.pathname;

    // Check if the current path is a reset-related route
    const isResetRoute = currentPath === "/reset" || currentPath.startsWith("/reset-password/");
    const isLoginRoute = currentPath === "/login";
    const isSignUpRoute = currentPath === "/signup";
    const isHomeRoute = currentPath === "/";

    // Handle routes that should be accessible only for non-logged-in users (login, signup, reset)
    if (isLoggedIn && (isResetRoute || isLoginRoute || isSignUpRoute || isHomeRoute)) {
        return <Navigate to="/dashboard" replace />; // Redirect logged-in users to the dashboard
    }

    // Handle routes that should only be accessible for logged-in users
    if (!isLoggedIn && !isResetRoute && !isLoginRoute && !isSignUpRoute && !isHomeRoute) {
        return <Navigate to="/login" state={{ from: currentPath }} replace />; // Redirect non-logged-in users to login
    }

    // Allow access if conditions are met
    return element;
};

export default ProtectedRoute;
