import {useState} from "react";
import {useRecoilValue, useSetRecoilState} from "recoil";
import {authState} from "../recoil/atoms.js";
import {Link, useNavigate} from "react-router-dom";
import {validateEmail} from "../utils/helper.js";
import axiosInstance from "../utils/axiosInstance.js";
import PasswordInput from "../Components/PasswordInput.jsx";

const SignUp = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const setAuth = useSetRecoilState(authState);
    const { isLoggedIn } = useRecoilValue(authState);
    const navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault();

        if (!username){
            setError("Please enter a username")
        }

        if (!validateEmail(email)) {
            setError("Please enter a valid email");
            return;
        }
        if (!password) {
            setError("Please enter a valid password!");
        }


        setError("");
        try {
            const response = await axiosInstance.post('/api/users/signup', {
                username: username,
                email: email,
                password: password
            })

            if (response.data.success){
                setAuth({ isLoggedIn: true, user: response.data.user });
            }
            console.log(isLoggedIn)
            navigate("/links")
        } catch (error){
            if (error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message);
            } else {
                setError("An unexpected error occurred. Please try again");
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
                    <form onSubmit={handleSignUp}>
                        <h4 className="text-2xl font-semibold mb-7 text-gray-800 text-center">SignUp</h4>
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
                        {error && <p className="text-red-500 text-xs pb-1">{error}</p>}
                        <button
                            type="submit"
                            className="w-full text-sm bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-800 transition-colors duration-300"
                        >
                            Signup
                        </button>

                        <p className="text-sm text-center text-gray-600 mt-4">
                            All ready have an account?{" "}
                            <Link to="/login" className="font-medium text-blue-600 underline hover:text-blue-800">
                                Login
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SignUp;