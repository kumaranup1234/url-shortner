import { useNavigate } from 'react-router-dom';
import MainFooter from '../shared/components/MainFooter';

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <div className="flex-grow flex flex-col items-center justify-center p-4 text-center relative overflow-hidden">
                {/* Background decorative elements */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
                    <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-blue-200 rounded-full blur-[100px] opacity-30 animate-pulse"></div>
                    <div className="absolute top-[40%] -right-[10%] w-[40%] h-[40%] bg-purple-200 rounded-full blur-[100px] opacity-30 animate-pulse delay-1000"></div>
                </div>

                <div className="relative z-10 bg-white/70 backdrop-blur-xl p-10 rounded-3xl shadow-2xl max-w-lg w-full border border-white/50 flex flex-col items-center transition-all hover:shadow-3xl transform hover:-translate-y-1">
                    <div className="text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-2 drop-shadow-sm">
                        404
                    </div>
                    <div className="h-1.5 w-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-8"></div>

                    <h2 className="text-2xl font-bold text-gray-800 mb-3">Page Not Found</h2>
                    <p className="text-gray-600 mb-10 max-w-sm mx-auto leading-relaxed">
                        Oops! The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
                    </p>

                    <button
                        onClick={() => navigate('/')}
                        className="group relative px-8 py-4 bg-gray-900 text-white font-bold rounded-xl overflow-hidden transition-all shadow-lg hover:shadow-blue-500/30"
                    >
                        <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <span className="relative flex items-center gap-2">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                            Back to Home
                        </span>
                    </button>
                </div>
            </div>
            <MainFooter />
        </div>
    );
};

export default NotFound;
