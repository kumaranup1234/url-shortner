import { FaLink, FaChartLine } from "react-icons/fa";

const SummaryCard = ({ totalUrls = 0, totalClicks = 0, loading = false, limitUrls = 1000, limitClicks = 50000 }) => {
    const linksPercentage = Math.min((totalUrls / limitUrls) * 100, 100);
    const clicksPercentage = Math.min((totalClicks / limitClicks) * 100, 100);

    if (loading) {
        return (
            <div className="grid md:grid-cols-2 gap-6 w-full mb-8">
                {/* Skeleton Cards */}
                {[1, 2].map(i => (
                    <div key={i} className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col justify-between h-40 animate-pulse transition-colors">
                        <div className="flex justify-between items-start">
                            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
                            <div className="h-10 w-10 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
                        </div>
                        <div className="space-y-2">
                            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                            <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full w-full"></div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className="grid md:grid-cols-2 gap-6 w-full mb-8">

            {/* Short Links Card */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-md transition-all duration-300 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50/50 dark:bg-blue-900/10 rounded-bl-full -mr-6 -mt-6 z-0 pointer-events-none group-hover:scale-110 transition-transform"></div>

                <div className="relative z-10 flex justify-between items-start mb-4">
                    <div>
                        <p className="text-gray-500 dark:text-gray-400 text-xs font-semibold uppercase tracking-wider">Total Short Links</p>
                        <h3 className="text-3xl font-bold text-gray-800 dark:text-white mt-1">{totalUrls}</h3>
                    </div>
                    <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/30 rounded-xl flex items-center justify-center text-blue-600 dark:text-blue-400 transition-colors">
                        <FaLink className="w-6 h-6" />
                    </div>
                </div>

                <div className="relative z-10 space-y-2 mt-4">
                    <div className="flex justify-between items-end">
                        <span className="text-sm font-bold text-gray-600 dark:text-gray-300">
                            {totalUrls} <span className="text-gray-400 dark:text-gray-500 font-medium text-xs">/ {limitUrls}</span>
                        </span>
                        <span className="text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-2 py-1 rounded-md transition-colors">{linksPercentage.toFixed(0)}%</span>
                    </div>
                    <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-1.5 overflow-hidden transition-colors">
                        <div
                            className="bg-blue-600 dark:bg-blue-500 h-full rounded-full transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(37,99,235,0.3)] dark:shadow-[0_0_10px_rgba(59,130,246,0.3)]"
                            style={{ width: `${linksPercentage}%` }}
                        ></div>
                    </div>
                </div>
            </div>

            {/* Total Clicks Card */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-md transition-all duration-300 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-purple-50/50 dark:bg-purple-900/10 rounded-bl-full -mr-6 -mt-6 z-0 pointer-events-none group-hover:scale-110 transition-transform"></div>

                <div className="relative z-10 flex justify-between items-start mb-2">
                    <div>
                        <p className="text-gray-500 dark:text-gray-400 text-xs font-semibold uppercase tracking-wider">Total Clicks</p>
                        <h3 className="text-3xl font-bold text-gray-800 dark:text-white mt-1">{totalClicks.toLocaleString()}</h3>
                    </div>
                    <div className="w-12 h-12 bg-purple-50 dark:bg-purple-900/30 rounded-xl flex items-center justify-center text-purple-600 dark:text-purple-400 transition-colors">
                        <FaChartLine className="w-6 h-6" />
                    </div>
                </div>

                <div className="relative z-10 space-y-2 mt-4">
                    <div className="flex justify-between items-end">
                        <span className="text-sm font-bold text-gray-600 dark:text-gray-300">
                            {totalClicks.toLocaleString()} <span className="text-gray-400 dark:text-gray-500 font-medium text-xs">/ {limitClicks.toLocaleString()}</span>
                        </span>
                        <span className="text-xs font-bold text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/30 px-2 py-1 rounded-md transition-colors">{clicksPercentage.toFixed(0)}%</span>
                    </div>
                    <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-1.5 overflow-hidden transition-colors">
                        <div
                            className="bg-purple-600 dark:bg-purple-500 h-full rounded-full transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(147,51,234,0.3)] dark:shadow-[0_0_10px_rgba(168,85,247,0.3)]"
                            style={{ width: `${clicksPercentage}%` }}
                        ></div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default SummaryCard;