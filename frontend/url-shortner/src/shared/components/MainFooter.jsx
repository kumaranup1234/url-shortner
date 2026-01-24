import { Link } from "react-router-dom";

const MainFooter = () => {
    return (
        <footer className="bg-white border-t border-gray-100 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
                    {/* Brand Column */}
                    <div className="col-span-2 lg:col-span-2">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
                                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                                </svg>
                            </div>
                            <span className="text-xl font-bold text-gray-900">Trim.URL</span>
                        </div>
                        <p className="text-gray-500 text-sm leading-relaxed max-w-xs mb-6">
                            The most powerful URL shortener for modern creators. Track, manage, and grow your audience with ease.
                        </p>
                        <div className="flex space-x-4">
                            {/* Social Icons Placeholder */}
                            <a href="#" className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-blue-50 hover:text-blue-600 transition-colors">𝕏</a>
                            <a href="#" className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-blue-50 hover:text-blue-600 transition-colors">In</a>
                            <a href="https://github.com/kumaranup1234" target="_blank" className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-black hover:text-white transition-colors">Git</a>
                        </div>
                    </div>

                    {/* Links Columns */}
                    <div>
                        <h4 className="font-bold text-gray-900 mb-4">Product</h4>
                        <ul className="space-y-2 text-sm text-gray-500">
                            <li><Link to="/features" className="hover:text-blue-600 transition-colors">Features</Link></li>
                            <li><Link to="/pricing" className="hover:text-blue-600 transition-colors">Pricing</Link></li>
                            <li><Link to="/analytics" className="hover:text-blue-600 transition-colors">Analytics</Link></li>
                            <li><Link to="/api-docs" className="hover:text-blue-600 transition-colors">API</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-gray-900 mb-4">Company</h4>
                        <ul className="space-y-2 text-sm text-gray-500">
                            <li><Link to="/about" className="hover:text-blue-600 transition-colors">About</Link></li>
                            <li><Link to="/blog" className="hover:text-blue-600 transition-colors">Blog</Link></li>
                            <li><Link to="/careers" className="hover:text-blue-600 transition-colors">Careers</Link></li>
                            <li><Link to="/contact" className="hover:text-blue-600 transition-colors">Contact</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-gray-900 mb-4">Legal</h4>
                        <ul className="space-y-2 text-sm text-gray-500">
                            <li><Link to="/privacy-policy" className="hover:text-blue-600 transition-colors">Privacy Policy</Link></li>
                            <li><Link to="/terms-of-service" className="hover:text-blue-600 transition-colors">Terms of Service</Link></li>
                            <li><Link to="/cookies" className="hover:text-blue-600 transition-colors">Cookie Policy</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-gray-400">
                        © {new Date().getFullYear()} Trim.URL. Built by Anup Kumar. All rights reserved.
                    </p>
                    <div className="flex items-center gap-1 text-sm text-gray-400">
                        <span>Icons by</span>
                        <a href="https://icons8.com/" target="_blank" className="text-gray-500 hover:text-blue-600 transition-colors underline decoration-gray-300">Icons8</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default MainFooter;
