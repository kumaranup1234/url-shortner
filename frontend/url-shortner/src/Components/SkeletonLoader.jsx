const SkeletonLoader = () => {
    return (
        <div className="bg-gray-100 rounded-lg shadow-md p-4 flex justify-between items-center mb-4 ml-2 md:ml-6 mr-3 relative animate-pulse">
            {/* Left Section */}
            <div className="grid space-y-2">
                <div className="grid">
                    <div className="flex">
                        {/* QR Code Placeholder */}
                        <div className="absolute top-4 left-4 bg-gray-200 h-9 w-9 rounded"></div>

                        {/* Shortened URL Placeholder */}
                        <div className="ml-12 bg-gray-200 h-6 w-32 rounded"></div>

                        {/* Copy Icon Placeholder */}
                        <div className="ml-6 bg-gray-200 h-5 w-5 rounded mt-1.5"></div>
                    </div>

                    {/* Original URL Placeholder */}
                    <div className="mt-3 bg-gray-200 h-6 w-48 rounded ml-1"></div>
                </div>

                {/* Click Data and Date Placeholders */}
                <div className="flex space-x-4 mt-2">
                    <div className="flex items-center space-x-1">
                        <div className="bg-gray-200 h-5 w-5 rounded"></div>
                        <div className="bg-gray-200 h-4 w-24 rounded"></div>
                    </div>
                    <div className="flex items-center space-x-1">
                        <div className="bg-gray-200 h-5 w-5 rounded"></div>
                        <div className="bg-gray-200 h-4 w-20 rounded"></div>
                    </div>
                </div>
            </div>

            {/* Right Section - Three Dot Menu Placeholder */}
            <div className="relative sm:ml-2">
                <div className="bg-gray-200 h-6 w-6 rounded"></div>
            </div>
        </div>
    );
};

export default SkeletonLoader;