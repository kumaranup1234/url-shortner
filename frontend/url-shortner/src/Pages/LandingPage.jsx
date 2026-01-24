import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { FaChartBar, FaPalette, FaStar, FaQrcode } from "react-icons/fa";
import MainFooter from "../shared/components/MainFooter.jsx";
import { shortenPublicUrl, clearShortenedUrl } from "../store/slices/urlSlice";
import MeshGradient from "../shared/components/ui/MeshGradient.jsx";
import BentoGrid from "../shared/components/ui/BentoGrid.jsx";
import FeatureShowcase from "../features/landing/FeatureShowcase.jsx";

const LandingPage = () => {
    const [link, setLink] = useState("");
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const { loading, shortenedUrl, error } = useSelector((state) => state.urls);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Determine API route based on auth status
    let route = "/api/urls/manage/shorten";
    if (!isLoggedIn) {
        route = "/api/urls/manage/anon/shorten";
    }

    // Effect to handle navigation on successful shortening
    useEffect(() => {
        if (shortenedUrl) {
            toast.dismiss();
            toast.success("URL trimmed successfully!");
            navigate("/shortened", {
                state: {
                    link: link,
                    shortId: shortenedUrl.shortUrl
                }
            });
            dispatch(clearShortenedUrl());
        }
    }, [shortenedUrl, navigate, link, dispatch]);

    // Effect to handle errors
    useEffect(() => {
        if (error) {
            toast.dismiss();
            toast.error(error);
        }
    }, [error]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!link) {
            toast.error("Please enter a valid link")
            return;
        }

        // Basic URL validation
        if (!/^(http|https):\/\/[^ "]+$/.test(link)) {
            toast.error("Please enter a valid URL (http/https)");
            return;
        }

        toast.loading("Trimming your URL...");
        dispatch(shortenPublicUrl({ url: link, route }));
    }

    const handleCreateAccount = () => {
        navigate("/signup")
    }

    return (
        <div className="min-h-screen bg-white dark:bg-gray-950 flex flex-col font-sans text-gray-900 dark:text-gray-100 selection:bg-blue-100 selection:text-blue-900 relative">
            {/* Global Background Gradient for seamless flow */}
            <MeshGradient />

            {/* Hero Section */}
            <div className="relative z-10 min-h-screen flex flex-col justify-center overflow-hidden pt-20">
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20 flex flex-col items-center text-center">

                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/60 dark:bg-gray-800/60 backdrop-blur-md border border-blue-100 dark:border-gray-700 text-blue-700 dark:text-blue-300 text-sm font-semibold mb-10 animate-fadeIn hover:bg-white/80 dark:hover:bg-gray-800/80 transition-colors cursor-default shadow-sm">
                        <span className="flex h-2 w-2 rounded-full bg-blue-500 animate-pulse"></span>
                        New: OneLink templates are here!
                    </div>

                    <h1 className="text-6xl md:text-8xl font-black text-gray-900 dark:text-white tracking-tighter leading-[1.05] mb-8 drop-shadow-sm">
                        Shorten Links, <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Expand Reach</span>
                    </h1>

                    <p className="max-w-2xl text-xl text-gray-500 dark:text-gray-400 mb-12 leading-relaxed font-normal">
                        Trim.URL provides <span className="text-gray-900 dark:text-white font-semibold">powerful analytics</span>, <span className="text-gray-900 dark:text-white font-semibold">custom branding</span>, and <span className="text-gray-900 dark:text-white font-semibold">QR codes</span> to help you manage your links like a pro.
                    </p>

                    {/* Glassmorphism Shortener Box */}
                    <div className="w-full max-w-4xl transform transition-all hover:scale-[1.01] duration-500 z-20">
                        <div className="relative group">
                            {/* Glow effect behind the box */}
                            <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 rounded-3xl blur opacity-30 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>

                            <div className="relative bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl p-4 border border-white/50 dark:border-gray-700 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)]">
                                <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-3">
                                    <div className="flex-1 relative">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
                                        </div>
                                        <input
                                            type="text"
                                            placeholder="Paste your long URL here..."
                                            value={link}
                                            onChange={(e) => setLink(e.target.value)}
                                            className="w-full pl-12 pr-6 py-5 text-lg text-gray-900 dark:text-white placeholder-gray-400 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:outline-none rounded-xl transition-all font-medium shadow-inner"
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="bg-gray-900 hover:bg-black text-white px-10 py-5 text-lg font-bold rounded-xl transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 whitespace-nowrap shadow-lg shadow-gray-900/20 hover:shadow-xl hover:-translate-y-0.5"
                                    >
                                        {loading ? (
                                            <span className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                                        ) : (
                                            <>
                                                Trim Now
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                                </svg>
                                            </>
                                        )}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>

                    {/* Stats or Social Proof Mockup */}
                    <div className="mt-20 grid grid-cols-2 md:grid-cols-3 gap-12 text-center">
                        <div className="p-6">
                            <h4 className="text-4xl font-extrabold text-gray-900 mb-1">10M+</h4>
                            <p className="text-gray-500 font-medium text-sm uppercase tracking-wide">Links Shortened</p>
                        </div>
                        <div className="p-6">
                            <h4 className="text-4xl font-extrabold text-gray-900 mb-1">50M+</h4>
                            <p className="text-gray-500 font-medium text-sm uppercase tracking-wide">Clicks Tracked</p>
                        </div>
                        <div className="p-6 hidden md:block">
                            <h4 className="text-4xl font-extrabold text-gray-900 mb-1">99.9%</h4>
                            <p className="text-gray-500 font-medium text-sm uppercase tracking-wide">Uptime</p>
                        </div>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce text-gray-300 hover:text-gray-900 transition-colors cursor-pointer">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
                </div>
            </div>

            {/* Features Section - transparent background to show MeshGradient */}
            <div className="relative z-10 py-24 overflow-hidden">
                {/* Subtle Grid Pattern - Darker in dark mode */}
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#1f2937_1px,transparent_1px)] [background-size:24px_24px] opacity-70"></div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-24 max-w-3xl mx-auto">
                        <h2 className="text-5xl font-bold text-gray-900 dark:text-white mb-8 tracking-tight">Everything you need to grow</h2>
                        <p className="text-xl text-gray-500 dark:text-gray-400 leading-relaxed">
                            Stop using basic link shorteners. Upgrade to a platform designed for <span className="text-blue-600 dark:text-blue-400 font-semibold">creators</span>, <span className="text-indigo-600 dark:text-indigo-400 font-semibold">marketers</span>, and <span className="text-purple-600 dark:text-purple-400 font-semibold">businesses</span>.
                        </p>
                    </div>

                    <FeatureShowcase />

                    {!isLoggedIn && (
                        <div className="mt-32 relative max-w-4xl mx-auto">
                            {/* Sleek CTA Card - Non-bulky */}
                            <div className="relative rounded-3xl overflow-hidden border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-xl shadow-indigo-500/10">
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 via-indigo-50/50 to-purple-50/50 dark:from-blue-900/10 dark:via-indigo-900/10 dark:to-purple-900/10 opacity-100"></div>

                                <div className="relative py-12 px-6 md:px-12 text-center flex flex-col md:flex-row items-center justify-between gap-8">
                                    <div className="text-left max-w-lg">
                                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 tracking-tight">
                                            Start Growing Today
                                        </h2>
                                        <p className="text-lg text-gray-500 dark:text-gray-400 font-medium">
                                            Join thousands of creators who use Trim.URL.
                                        </p>
                                    </div>

                                    <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                                        <button
                                            onClick={handleCreateAccount}
                                            className="px-6 py-3 rounded-xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold hover:scale-105 transition-all shadow-lg hover:shadow-xl whitespace-nowrap"
                                        >
                                            Get Started Free
                                        </button>
                                        <button
                                            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                                            className="px-6 py-3 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 font-bold hover:bg-gray-50 dark:hover:bg-gray-700 transition-all whitespace-nowrap"
                                        >
                                            Explore
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <p className="mt-4 text-center text-sm text-gray-400 dark:text-gray-500 font-medium">
                                No credit card required · Free plan forever
                            </p>
                        </div>
                    )}
                </div>
            </div>

            <div className="relative z-10">
                <MainFooter />
            </div>
        </div>
    );
}

export default LandingPage;
