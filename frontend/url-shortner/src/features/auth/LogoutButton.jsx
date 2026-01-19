import { useDispatch } from 'react-redux';
import { logoutUser } from '../store/slices/authSlice';
import { addNotification } from '../store/slices/uiSlice';
import { FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const LogoutButton = ({ setShowDropdown }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const result = await dispatch(logoutUser());
            if (logoutUser.fulfilled.match(result)) {
                setShowDropdown?.(false);
                navigate("/");
                dispatch(addNotification({
                    type: 'success',
                    message: 'Logged out successfully'
                }));
            } else {
                dispatch(addNotification({
                    type: 'error',
                    message: 'Logout failed'
                }));
            }
        } catch (error) {
            dispatch(addNotification({
                type: 'error',
                message: 'Logout failed'
            }));
        }
    };

    return (
        <button
            className="flex items-center w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
            onClick={handleLogout}
        >
            <FaSignOutAlt className="mr-3 text-gray-400" /> 
            Logout
        </button>
    );
};

export default LogoutButton;
