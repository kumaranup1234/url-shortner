import {useState} from "react";
import {useSetRecoilState} from "recoil";
import {authState} from "../recoil/atoms.js";
import {Link, useNavigate} from "react-router-dom";
import {validateEmail} from "../utils/helper.js";
import axiosInstance from "../utils/axiosInstance.js";
import PasswordInput from "../Components/PasswordInput.jsx";
import tickIcon from "../assets/icons8-checkmark.svg"
import toast from "react-hot-toast";

const SignUp = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const setAuth = useSetRecoilState(authState);
    const navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault();

        if (!username){
            toast.error("Please enter a valid username!");
            return;
        }

        if (!validateEmail(email)) {
            toast.error("Please enter a valid email")
            return;
        }
        if (!password) {
            toast.error("Please enter a valid password!");
            return;
        }


        const toastId = toast.loading("Creating Account...");
        try {
            const response = await axiosInstance.post('/api/users/signup', {
                username: username,
                email: email,
                password: password
            })

            if (response.data.success){
                setAuth({ isLoggedIn: true, user: response.data.user });
            }
            toast.dismiss(toastId);
            navigate("/links")
        } catch (error){
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
            <div className="flex items-center justify-center">
                <div className="w-96 border rounded-lg bg-white px-7 py-10 shadow-lg">
                    <form onSubmit={handleSignUp}>
                        <h4 className="text-2xl font-semibold mb-7 text-gray-800 text-center">Create Account</h4>
                        <input
                            type="text"
                            placeholder="Username"
                            className="w-full text-sm bg-gray-50 border-2 border-gray-300 px-5 py-3 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
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
                        <button
                            type="submit"
                            className="w-full text-sm bg-teal-900 text-white py-2 rounded-lg hover:bg-blue-800 transition-colors duration-300"
                        >
                            Signup
                        </button>

                        <p className="text-sm text-center text-gray-600 mt-4">
                            All ready have an account?{" "}
                            <Link to="/login" className="font-medium text-teal-900 underline hover:text-blue-800">
                                Login
                            </Link>
                        </p>
                    </form>
                </div>
                <div className="flex flex-col space-x-6 space-y-3">
                    <p className="ml-6">
                        <span className="font-bold text-xl">Trim.URL</span> is the best link management service to
                        track, brand, and share short URLs
                    </p>
                    <div className="flex">
                        <img src={tickIcon} alt="Tick Icon"/>
                        <p>Track your Short Links with Detailed Analytics</p>
                    </div>
                    <div className="flex">
                        <img src={tickIcon} alt="Tick Icon"/>
                        <p>Customizable and Trackable QR Codes</p>
                    </div>
                    <div className="flex">
                        <img src={tickIcon} alt="Tick Icon"/>
                        <p>Update URLs whenever you need to change their Destination</p>
                    </div>
                    <div className="flex">
                        <img src={tickIcon} alt="Tick Icon"/>
                        <p>Manage with ease</p>
                    </div>
                    <div className="flex">
                        <img src={tickIcon} alt="Tick Icon"/>
                        <p>API Access</p>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default SignUp;