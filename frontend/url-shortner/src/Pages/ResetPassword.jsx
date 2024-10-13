import {useNavigate, useParams} from "react-router-dom";
import { useState } from "react";
import PasswordInput from "../Components/PasswordInput.jsx";
import toast from "react-hot-toast";
import axiosInstance from "../utils/axiosInstance.js";

const Login = () => {
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const { resetToken } = useParams();

    const handleReset = async (e) => {
        e.preventDefault();


        try {
            const response = await axiosInstance.post(`/api/users/reset/${resetToken}`, {
                password: password,
            })

            if (response.data.success) {
                toast.success(response.data.message);
                setTimeout(() => {
                    toast.success("Redirecting to login Page");

                    // Redirect to the login page after 2 seconds
                    setTimeout(() => {
                       navigate("/login");
                    }, 2000);  // Delay redirect by 2 seconds
                }, 2000);
            }

        } catch (error) {
            if (error.response && error.response.data.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error("Error occurred. Please try again!");
            }
        }
    }







    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="flex items-center justify-center mb-10">
                <p className="text-4xl text-blue-700 font-extrabold tracking-widest border-b-4 border-blue-700 pb-2">
                    Short URL
                </p>
            </div>
            <div className="flex items-center justify-center">
                <div className="w-96 border rounded-lg bg-white px-7 py-10 shadow-lg">
                    <form onSubmit={handleReset}>
                        <h4 className="text-2xl font-semibold mb-7 text-gray-800 text-center">Reset Password</h4>
                        <PasswordInput
                            value={password}
                            placeholder="Enter new Password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button
                            type="submit"
                            className="w-full text-sm bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-800 transition-colors duration-300"
                        >
                            Reset
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};
export default Login;
