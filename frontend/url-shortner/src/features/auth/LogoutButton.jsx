import { useDispatch } from 'react-redux';
import { logoutUser } from '../../store/slices/authSlice';
import { addNotification } from '../../store/slices/uiSlice';
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
            className="flex items-center w-full text-left px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-red-600 dark:hover:text-red-400 transition-colors group"
            onClick={handleLogout}
        >
            <FaSignOutAlt className="mr-3 text-gray-400 group-hover:text-red-500 dark:group-hover:text-red-400 transition-colors" />
            Logout
        </button>
    );
};

export default LogoutButton;
