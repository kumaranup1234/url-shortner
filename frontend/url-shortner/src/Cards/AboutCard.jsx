const AboutCard = () => {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-gray-900 to-gray-800 px-6 py-4">
                <h3 className="text-white font-semibold flex items-center gap-2">
                    <svg className="w-5 h-5 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    About Trim.URL
                </h3>
            </div>

            <div className="p-6">
                <p className="text-gray-600 leading-relaxed mb-4">
                    Creating, sharing, and monitoring your short links is effortless with <span className="font-bold text-gray-900">Trim.URL</span>.
                </p>
                <p className="text-gray-600 leading-relaxed">
                    Work smarter with features like branded links, detailed analytics, and the ability to update destination URLs instantly at any time.
                </p>

                <div className="mt-6 pt-6 border-t border-gray-100">
                    <a href="/api-docs" className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1 group">
                        View API Documentation
                        <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default AboutCard;