const SkeletonLoader = () => {
    return (
        <div className="bg-gray-100 rounded-lg shadow-md p-6 flex justify-between items-center mb-4 md:ml-6 relative w-full animate-pulse">
            {/* left section */}
            <div className="grid space-y-2 w-full">
                <div className="grid">
                    <div className="flex items-center space-x-5">
                        {/* logo placeholder */}
                        <div className="bg-gray-200 h-12 w-12 rounded-full"></div>

                        {/* copy button placeholder */}
                        <div className="bg-gray-200 h-10 w-20 rounded"></div>

                        {/* qR code placeholder */}
                        <div className="bg-gray-200 h-12 w-12 rounded hidden md:block"></div>
                    </div>

                    {/* URLs section */}
                    <div className="flex flex-col mt-3 space-y-2">
                        <div className="bg-gray-200 h-5 w-60 rounded"></div>
                        <div className="bg-gray-200 h-5 w-80 rounded"></div>
                    </div>
                </div>

                {/* click data and date placeholders */}
                <div className="flex space-x-4">
                    {/* total clicks placeholder */}
                    <div className="flex items-center space-x-2">
                        <div className="bg-gray-200 h-5 w-5 rounded"></div>
                        <div className="bg-gray-200 h-4 w-24 rounded"></div>
                    </div>
                    {/* date placeholder */}
                    <div className="flex items-center space-x-2">
                        <div className="bg-gray-200 h-5 w-5 rounded"></div>
                        <div className="bg-gray-200 h-4 w-24 rounded"></div>
                    </div>
                </div>
            </div>

            {/* right section three dot menu placeholder */}
            <div className="relative">
                <div className="bg-gray-200 h-6 w-6 rounded"></div>
            </div>
        </div>
    );
};

export default SkeletonLoader;
