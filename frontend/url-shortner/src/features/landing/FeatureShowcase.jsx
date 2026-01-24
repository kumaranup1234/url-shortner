import React from "react";
import { motion } from "framer-motion";
import { FaChartBar, FaGlobe, FaQrcode, FaCheckCircle, FaMobileAlt } from "react-icons/fa";

const FeatureShowcase = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(200px,auto)]">

                {/* 1. Smart Analytics (Wide Card) */}
                <motion.div
                    whileHover={{ y: -5 }}
                    className="md:col-span-2 bg-white dark:bg-gray-900 rounded-3xl p-8 border border-gray-100 dark:border-gray-800 shadow-xl shadow-blue-500/5 dark:shadow-blue-500/10 relative overflow-hidden group"
                >
                    <div className="relative z-10">
                        <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center text-2xl mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                            <FaChartBar />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Smart Analytics</h3>
                        <p className="text-gray-500 dark:text-gray-400 max-w-sm">Deep insights into your audience. Track clicks, geographic locations, and device types in real-time.</p>
                    </div>

                    {/* Visual: Animated Bar Chart */}
                    <div className="absolute bottom-0 right-0 w-1/2 h-3/4 flex items-end justify-around px-6 pb-6 opacity-80 group-hover:scale-105 transition-transform duration-500">
                        {[40, 70, 50, 90, 60].map((height, i) => (
                            <motion.div
                                key={i}
                                initial={{ height: 0 }}
                                whileInView={{ height: `${height}%` }}
                                transition={{ duration: 1, delay: i * 0.1 }}
                                className={`w-1/6 rounded-t-lg bg-gradient-to-t ${i % 2 === 0 ? 'from-blue-500 to-indigo-500' : 'from-blue-400 to-cyan-400'} opacity-30 group-hover:opacity-100 transition-opacity`}
                            />
                        ))}
                    </div>
                </motion.div>

                {/* 2. OneLink Bio (Tall Card) */}
                <motion.div
                    whileHover={{ y: -5 }}
                    className="md:row-span-2 bg-gray-900 dark:bg-gray-800 rounded-3xl p-8 border border-gray-800 dark:border-gray-700 shadow-2xl relative overflow-hidden group text-white"
                >
                    <div className="relative z-20">
                        <div className="w-12 h-12 rounded-xl bg-gray-800 dark:bg-gray-700 text-pink-500 flex items-center justify-center text-2xl mb-4">
                            <FaMobileAlt />
                        </div>
                        <h3 className="text-2xl font-bold mb-2">Link-in-Bio</h3>
                        <p className="text-gray-400 text-sm mb-6">One beautiful page for all your links. Customizable to match your brand.</p>
                    </div>

                    {/* Visual: Mini Phone Mockup */}
                    <div className="absolute bottom-[-20px] left-1/2 transform -translate-x-1/2 w-48 h-64 bg-white rounded-t-[2rem] p-3 shadow-2xl group-hover:translate-y-[-10px] transition-transform duration-500">
                        {/* Phone Notch */}
                        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-16 h-4 bg-gray-200 rounded-b-xl"></div>

                        {/* Phone Screen Content */}
                        <div className="mt-4 flex flex-col items-center space-y-2">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-yellow-400 to-pink-500"></div>
                            <div className="w-20 h-2 bg-gray-100 rounded-full"></div>
                            <div className="w-full space-y-1.5 mt-2">
                                <div className="w-full h-8 bg-blue-50 rounded-lg border border-blue-100 flex items-center justify-center text-[8px] text-blue-400 font-bold">LATEST VIDEO</div>
                                <div className="w-full h-8 bg-gray-50 rounded-lg flex items-center justify-center text-[8px] text-gray-400">INSTAGRAM</div>
                                <div className="w-full h-8 bg-gray-50 rounded-lg flex items-center justify-center text-[8px] text-gray-400">TWITTER</div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* 3. QR Code (Square Card) */}
                <motion.div
                    whileHover={{ y: -5 }}
                    className="bg-white dark:bg-gray-900 rounded-3xl p-8 border border-gray-100 dark:border-gray-800 shadow-xl shadow-purple-500/5 dark:shadow-purple-500/10 relative overflow-hidden group"
                >
                    <div className="relative z-10">
                        <div className="w-12 h-12 rounded-xl bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 flex items-center justify-center text-2xl mb-4 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                            <FaQrcode />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">QR Gen</h3>
                        <p className="text-gray-500 dark:text-gray-400 text-sm">Instant, trackable QR codes for offline marketing.</p>
                    </div>

                    {/* Visual: Floating QR */}
                    <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-purple-100/50 dark:bg-purple-900/20 rounded-full blur-2xl group-hover:bg-purple-200/50 transition-colors"></div>
                    <FaQrcode className="absolute bottom-4 right-4 text-6xl text-purple-100 dark:text-purple-900/40 group-hover:text-purple-200 transition-colors rotate-12 group-hover:rotate-0 transform duration-300" />
                </motion.div>

                {/* 4. Smart Targeting (Square Card) */}
                <motion.div
                    whileHover={{ y: -5 }}
                    className="bg-white dark:bg-gray-900 rounded-3xl p-8 border border-gray-100 dark:border-gray-800 shadow-xl shadow-cyan-500/5 dark:shadow-cyan-500/10 relative overflow-hidden group"
                >
                    <div className="relative z-10">
                        <div className="w-12 h-12 rounded-xl bg-cyan-50 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400 flex items-center justify-center text-2xl mb-4 group-hover:bg-cyan-600 group-hover:text-white transition-colors">
                            <FaGlobe />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">Smart Targeting</h3>
                        <p className="text-gray-500 dark:text-gray-400 text-sm">Redirect users to different URLs based on their <span className="text-gray-900 dark:text-white font-semibold">Device</span> or <span className="text-gray-900 dark:text-white font-semibold">Location</span>.</p>
                    </div>

                    {/* Visual: Split Path Animation */}
                    <div className="absolute top-4 right-4 flex gap-1 opacity-50">
                        <div className="w-2 h-2 rounded-full bg-cyan-500 animate-ping"></div>
                        <div className="w-2 h-2 rounded-full bg-blue-500 animate-ping delay-75"></div>
                    </div>
                </motion.div>

            </div>
        </div>
    );
};

export default FeatureShowcase;
