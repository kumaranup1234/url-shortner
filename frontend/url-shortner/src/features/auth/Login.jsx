import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from 'react-redux';
import { loginUser } from '../../store/slices/authSlice';
import { addNotification } from '../../store/slices/uiSlice';
import PasswordInput from "../../Components/PasswordInput.jsx";
import Button from "../../shared/components/ui/Button.jsx";
import Input from "../../shared/components/ui/Input.jsx";
import { validateEmail } from "../../shared/utils/helper.js";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!validateEmail(email)) {
            dispatch(addNotification({
                type: 'error',
                message: 'Please enter a valid email'
            }));
            return;
        }
        if (!password) {
            dispatch(addNotification({
                type: 'error', 
                message: 'Please enter a valid password!'
            }));
            return;
        }

        setLoading(true);
        try {
            const result = await dispatch(loginUser({ email, password }));
            if (loginUser.fulfilled.match(result)) {
                dispatch(addNotification({
                    type: 'success',
                    message: 'Login successful!'
                }));
                navigate("/links");
            } else {
                dispatch(addNotification({
                    type: 'error',
                    message: result.payload || 'Login failed'
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
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
            <div className="flex items-center justify-center w-full px-4 sm:px-6 md:px-8 lg:px-12">
                <div className="w-full max-w-md bg-white rounded-xl shadow-xl p-8">
                    <form onSubmit={handleLogin}>
                        <h4 className="text-3xl font-bold mb-8 text-gray-800 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            Welcome Back
                        </h4>
                        
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
                            className="mb-4"
                        />
                        
                        <div className="text-right mb-6">
                            <Link to="/reset" className="text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors">
                                Forgot password?
                            </Link>
                        </div>
                        
                        <Button
                            type="submit"
                            loading={loading}
                            fullWidth
                            size="lg"
                            className="mb-6"
                        >
                            Sign In
                        </Button>

                        <p className="text-sm text-center text-gray-600">
                            Don't have an account?{" "}
                            <Link to="/signup" className="font-medium text-blue-600 hover:text-blue-800 transition-colors">
                                Create Account
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
