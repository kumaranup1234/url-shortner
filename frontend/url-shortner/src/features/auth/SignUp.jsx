import { useState } from "react";
import { useDispatch } from 'react-redux';
import { signupUser } from '../../store/slices/authSlice';
import { addNotification } from '../../store/slices/uiSlice';
import { Link, useNavigate } from "react-router-dom";
import { validateEmail } from "../../shared/utils/helper.js";
import PasswordInput from "../../shared/components/ui/PasswordInput.jsx";
import Button from "../../shared/components/ui/Button.jsx";
import Input from "../../shared/components/ui/Input.jsx";
import tickIcon from "../../assets/icons8-checkmark.svg";

const SignUp = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault();

        if (!username.trim()) {
            dispatch(addNotification({
                type: 'error',
                message: 'Please enter a valid username!'
            }));
            return;
        }

        if (!validateEmail(email)) {
            dispatch(addNotification({
                type: 'error',
                message: 'Please enter a valid email'
            }));
            return;
        }

        if (!password || password.length < 6) {
            dispatch(addNotification({
                type: 'error',
                message: 'Password must be at least 6 characters!'
            }));
            return;
        }

        setLoading(true);
        try {
            const result = await dispatch(signupUser({ username, email, password }));
            if (signupUser.fulfilled.match(result)) {
                dispatch(addNotification({
                    type: 'success',
                    message: 'Account created successfully!'
                }));
                navigate("/dashboard");
            } else {
                dispatch(addNotification({
                    type: 'error',
                    message: result.payload || 'Signup failed'
                }));
            }
        } catch (error) {
            dispatch(addNotification({
                type: 'error',
                message: 'An unexpected error occurred'
            }));
        } finally {
            setLoading(false);
        }
    };

    const features = [
        "Track your Short Links with Detailed Analytics",
        "Customizable and Trackable QR Codes",
        "Update URLs whenever you need to change their Destination",
        "Manage with ease",
        "API Access"
    ];

    return (
        <div className="flex flex-col lg:flex-row items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 px-4 sm:px-8 lg:px-16">
            <div className="w-full max-w-md bg-white rounded-xl shadow-xl p-8 mb-8 lg:mb-0">
                <form onSubmit={handleSignUp}>
                    <h4 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        Join Trim.URL
                    </h4>

                    <Input
                        type="text"
                        placeholder="Choose a username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        fullWidth
                        className="mb-4"
                        leftIcon={
                            <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                            </svg>
                        }
                    />

                    <Input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        fullWidth
                        className="mb-4"
                        leftIcon={
                            <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                            </svg>
                        }
                    />

                    <PasswordInput
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="mb-6"
                        placeholder="Create a password (min 6 chars)"
                    />

                    <Button
                        type="submit"
                        loading={loading}
                        fullWidth
                        size="lg"
                        className="mb-6"
                    >
                        Create Account
                    </Button>

                    <p className="text-sm text-center text-gray-600">
                        Already have an account?{" "}
                        <Link to="/login" className="font-medium text-blue-600 hover:text-blue-800 transition-colors">
                            Sign In
                        </Link>
                    </p>
                </form>
            </div>

            <div className="w-full max-w-md lg:ml-12 mt-8 lg:mt-0">
                <div className="text-center lg:text-left mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                        <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            Trim.URL
                        </span> Features
                    </h2>
                    <p className="text-gray-600">
                        The best link management service to track, brand, and share short URLs
                    </p>
                </div>

                <div className="space-y-4">
                    {features.map((feature, index) => (
                        <div key={index} className="flex items-start space-x-3">
                            <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                                <img src={tickIcon} alt="✓" className="w-4 h-4" />
                            </div>
                            <p className="text-gray-700 leading-relaxed">{feature}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SignUp;
