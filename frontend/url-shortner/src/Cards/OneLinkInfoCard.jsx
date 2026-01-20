import { FaGlobeAmericas, FaBolt } from "react-icons/fa";

const OneLinkInfoCard = () => {
    return (
        <div className="w-full bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden relative group hover:shadow-md transition-all duration-300">
            {/* Decorative Background */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50/50 rounded-full blur-2xl -mr-16 -mt-16 pointer-events-none"></div>

            <div className="p-6 relative z-10">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl">
                        <FaGlobeAmericas className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-gray-900 text-lg tracking-tight">
                        About OneLinks
                    </h3>
                </div>

                <p className="text-gray-600 leading-relaxed text-sm">
                    OneLinks give you the ability to connect audiences to all of your content with <span className="text-indigo-600 font-semibold">one simple link</span>.
                </p>

                <div className="mt-6 space-y-4">
                    <div className="flex items-start gap-3">
                        <div className="mt-1 p-1 bg-green-50 text-green-600 rounded-lg">
                            <FaBolt className="w-3 h-3" />
                        </div>
                        <div>
                            <h4 className="text-sm font-semibold text-gray-800">Unified Presence</h4>
                            <p className="text-xs text-gray-500 mt-0.5">Manage multiple social profiles from a single dashboard.</p>
                        </div>
                    </div>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-100">
                    <p className="text-xs text-gray-400 text-center italic">
                        More customization features coming soon.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default OneLinkInfoCard;