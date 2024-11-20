import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import PasswordInput from "../Components/PasswordInput.jsx";
import { useSetRecoilState } from "recoil";
import { validateEmail } from "../utils/helper.js";
import axiosInstance from "../utils/axiosInstance.js";
import { authState } from "../recoil/atoms.js";
import toast from "react-hot-toast";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const setAuth = useSetRecoilState(authState);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!validateEmail(email)) {
            toast.error("Please enter a valid email");
            return;
        }
        if (!password) {
            toast.error("Please enter a valid password!");
            return;
        }
        const toastId = toast.loading("Logging in...");
        try {
            const response = await axiosInstance.post('/api/users/login', {
                email: email,
                password: password
            })
            if (response.data.success) {
                setAuth({ isLoggedIn: true, user: response.data.user });
            }
            toast.dismiss(toastId);
            navigate("/links");
        } catch (error) {
            toast.dismiss(toastId);
            if (error.response && error.response.data && error.response.data.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error("An unexpected error occurred. Please try again");
            }
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="flex items-center justify-center w-full px-4 sm:px-6 md:px-8 lg:px-12">
                <div className="w-full max-w-md border rounded-lg bg-white px-7 py-10 shadow-lg">
                    <form onSubmit={handleLogin}>
                        <h4 className="text-2xl font-semibold mb-7 text-gray-800 text-center">Login</h4>
                        <input
                            type="text"
                            placeholder="Email"
                            className="w-full text-sm bg-gray-50 border-2 border-gray-300 px-5 py-3 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <PasswordInput
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <div className="text-right mb-4">
                            <Link to="/reset" className="font-medium text-xs text-blue-600 hover:text-blue-800">
                                Forgot password?
                            </Link>
                        </div>
                        <button
                            type="submit"
                            className="w-full text-sm bg-teal-900 text-white py-2 rounded-lg hover:bg-blue-800 transition-colors duration-300"
                        >
                            Login
                        </button>

                        <p className="text-sm text-center text-gray-600 mt-4">
                            Not registered yet?{" "}
                            <Link to="/signup" className="font-medium text-blue-600 underline hover:text-blue-800">
                                Create an Account
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};
export default Login;
