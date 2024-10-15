import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";
import {validateEmail} from "../utils/helper.js";
import axiosInstance from "../utils/axiosInstance.js";
import toast from "react-hot-toast";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();


    const handleReset = (e) => {
        e.preventDefault();

        if (!email || !validateEmail(email)) {
            setError("Please enter a valid email");
            return;
        }

        setError("");
        try {
            const myPromise = axiosInstance.post('/api/users/reset', {
                email: email,
            })
            toast.promise(myPromise ,{
                loading: "Sending email. please wait...",
                success: "Email sent successfully.",
                error: (err) => err.response?.data?.message || "Error occurred. Please try again!"
            })
                .then(() => {
                    setTimeout(() => {
                        navigate("/login")
                    }, 2000);
                })
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
            <div className="flex items-center justify-center">
                <div className="w-96 border rounded-lg bg-white px-7 py-10 shadow-lg">
                    <form onSubmit={handleReset}>
                        <h4 className="text-2xl font-semibold mb-7 text-gray-800 text-center">Reset Password</h4>
                        <input
                            type="text"
                            placeholder="Email"
                            className="w-full text-sm bg-gray-50 border-2 border-gray-300 px-5 py-3 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {error && <p className="text-red-500 text-xs pb-1">{error}</p>}
                        <button
                            type="submit"
                            className="w-full text-sm bg-teal-900 text-white py-2 rounded-lg hover:bg-blue-800 transition-colors duration-300"
                        >
                            Send
                        </button>

                        <p className="text-sm text-center text-gray-600 mt-4">
                            Back to login?{" "}
                            <Link to="/login" className="font-medium text-blue-600 underline hover:text-blue-800">
                                Login
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword;