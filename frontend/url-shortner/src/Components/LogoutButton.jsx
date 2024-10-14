import {useRecoilState, useSetRecoilState} from 'recoil';
import {authState, topDateState, topLocationState, totalClicksState} from '../recoil/atoms';
import axiosInstance from '../utils/axiosInstance.js';
import {FaSignOutAlt} from "react-icons/fa";
import {useNavigate} from "react-router-dom";

const LogoutButton = ({ setShowDropdown }) => {
    const [auth, setAuth] = useRecoilState(authState);
    const setAuthState = useSetRecoilState(authState);
    const setTopLocation = useSetRecoilState(topLocationState);
    const setTopDate = useSetRecoilState(topDateState)
    const setTotalClicks = useSetRecoilState(totalClicksState)
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const response = await axiosInstance.post('/api/users/logout');

            if (response.data.success) {
                // Update the auth state
                setAuthState((prevState) => ({
                    ...prevState,
                    isLoggedIn: false
                }));
                setTotalClicks(0);
                setTopLocation({
                    name: "",
                    clicks: 0
                })
                setTopDate({
                    date: "",
                    clicks: 0
                })
                setShowDropdown(false);
                navigate("/")
            }
        } catch (error) {
            console.error('Logout failed', error);
        }
    };

    return (
        <button
            className="flex items-center w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
            onClick={() => handleLogout()}
        >
            <FaSignOutAlt className="mr-2"/> Logout
        </button>
    );
};

export default LogoutButton;
