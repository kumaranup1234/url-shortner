import { FaCalendarAlt, FaMapMarkerAlt, FaGlobeAmericas, FaCalendarCheck } from "react-icons/fa";

const TopPerformance = ({ heading, name, clicks, location }) => {
    const endingDate = new Date();
    const startingDate = new Date(endingDate);
    startingDate.setDate(endingDate.getDate() - 10);

    const isData = clicks > 0;

    return (
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-800 h-full flex flex-col justify-between hover:shadow-md transition-all duration-300 relative overflow-hidden group">
            {/* Massive Background Watermark */}
            <div className={`absolute -right-4 -bottom-8 w-32 h-32 opacity-[0.07] dark:opacity-[0.05] pointer-events-none transform -rotate-12 transition-transform group-hover:scale-110 duration-500 ease-out ${location ? 'text-indigo-600 dark:text-indigo-400' : 'text-orange-500 dark:text-orange-400'}`}>
                {location ? <FaGlobeAmericas className="w-full h-full" /> : <FaCalendarAlt className="w-full h-full" />}
            </div>

            <div className="relative z-10 w-full">
                {/* Header */}
                <div className="flex items-center gap-3 mb-2">
                    <div className={`p-2 rounded-lg ${location ? 'bg-indigo-50 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400' : 'bg-orange-50 dark:bg-orange-900/40 text-orange-600 dark:text-orange-400'} transition-colors`}>
                        {location ? <FaMapMarkerAlt className="w-4 h-4" /> : <FaCalendarCheck className="w-4 h-4" />}
                    </div>
                    <h3 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">{heading}</h3>
                </div>

                {/* Hero Content */}
                {isData ? (
                    <div className="mt-2">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 dark:text-gray-100 tracking-tight leading-tight truncate transition-colors" title={name}>
                            {name}
                        </h2>

                        <div className="flex items-center gap-3 mt-3">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-bold bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-100 dark:border-gray-700 transition-colors">
                                <span className="relative flex h-2.5 w-2.5">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                                </span>
                                {clicks} clicks
                            </span>
                            {!location && (
                                <span className="text-xs text-gray-400 dark:text-gray-500 font-medium bg-white/50 dark:bg-gray-800/50 px-2 py-1 rounded transition-colors">
                                    Last 10 days
                                </span>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="mt-4 flex flex-col items-start gap-2 opacity-60">
                        <div className="text-4xl font-bold text-gray-300 dark:text-gray-700">--</div>
                        <p className="text-sm text-gray-400 dark:text-gray-600 font-medium">No activity recorded yet</p>
                    </div>
                )}
            </div>

            {/* Bottom Decoration Bar */}
            <div className={`absolute bottom-0 left-0 h-1 w-full transition-all duration-1000 ${location ? 'bg-gradient-to-r from-indigo-500 to-indigo-100 dark:from-indigo-600 dark:to-indigo-900 w-[70%]' : 'bg-gradient-to-r from-orange-500 to-orange-100 dark:from-orange-600 dark:to-orange-900 w-[70%]'}`}></div>
        </div>
    );
};

export default TopPerformance;
