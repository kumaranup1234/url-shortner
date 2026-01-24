import React, { useEffect, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import axiosInstance from "../../shared/utils/axiosInstance.js";
import { useDispatch, useSelector } from "react-redux";
import { setTopPerformingDate, setTotalClicks } from "../../store/slices/analyticsSlice.js";
import { InfinitySpin } from "react-loader-spinner";

// Custom Premium Tooltip removed (defined inside component now to access theme)

// Function to format date as "MMM DD"
const formatXAxis = (tickItem) => {
    const date = new Date(tickItem);
    const options = { month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
};

const ClicksLineChart = ({ apiUrl }) => {
    const dispatch = useDispatch();
    const { theme } = useSelector(state => state.ui);
    const [clickData, setClickData] = useState([]);
    const [loading, setLoading] = useState(true);

    const isDark = theme === 'dark';

    const getClickData = async () => {
        try {
            const response = await axiosInstance.get(apiUrl);
            setClickData(response.data.clicksByDate);

            // Dispatch to Redux
            dispatch(setTopPerformingDate({
                date: response.data.maxClicksDate,
                clicks: response.data.maxClick
            }));
            dispatch(setTotalClicks(response.data.totalClicks));

        } catch (e) {
            console.error('Error fetching click data:', e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getClickData();
    }, []);

    // Check if all data points are zero
    const allZeroClicks = clickData.every(item => item.count === 0);

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md border border-gray-100 dark:border-gray-700 p-4 rounded-xl shadow-xl">
                    <p className="text-gray-500 dark:text-gray-400 text-xs font-semibold uppercase tracking-wider mb-1">{label}</p>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400"></div>
                        <p className="text-gray-900 dark:text-white font-bold text-lg">
                            {payload[0].value} <span className="text-sm font-normal text-gray-400">clicks</span>
                        </p>
                    </div>
                </div>
            );
        }
        return null;
    };

    return (
        <>
            {loading ?
                <div className="rounded-2xl p-4 h-[400px] flex flex-col items-center justify-center bg-gray-50/50 dark:bg-gray-800/50">
                    <InfinitySpin
                        visible={true}
                        width="150"
                        color={isDark ? "#818cf8" : "#4f46e5"}
                        ariaLabel="infinity-spin-loading"
                    />
                    <p className="text-gray-400 font-medium text-sm mt-4 animate-pulse">Analyzing traffic data...</p>
                </div>
                : !allZeroClicks ? (
                    <div className="rounded-2xl bg-white dark:bg-gray-900 p-6 shadow-sm border border-gray-100 dark:border-gray-800 h-[400px] w-full relative overflow-hidden group transition-colors">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50/50 dark:bg-indigo-900/20 rounded-bl-full -mr-10 -mt-10 z-0 pointer-events-none"></div>

                        <div className="flex justify-between items-center mb-6 relative z-10">
                            <div>
                                <h2 className="text-lg font-bold text-gray-800 dark:text-white">Performance Over Time</h2>
                                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Daily clicks & scans</p>
                            </div>
                        </div>

                        <ResponsiveContainer width="100%" height="85%">
                            <AreaChart
                                data={clickData}
                                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                            >
                                <defs>
                                    <linearGradient id="colorClicks" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor={isDark ? "#818cf8" : "#4f46e5"} stopOpacity={0.3} />
                                        <stop offset="95%" stopColor={isDark ? "#818cf8" : "#4f46e5"} stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDark ? "#374151" : "#f1f5f9"} />
                                <XAxis
                                    dataKey="date"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: isDark ? '#9ca3af' : '#94a3b8', fontSize: 11, fontWeight: 500 }}
                                    tickFormatter={formatXAxis}
                                    dy={10}
                                    minTickGap={30}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: isDark ? '#9ca3af' : '#94a3b8', fontSize: 11, fontWeight: 500 }}
                                    tickCount={5}
                                    allowDecimals={false}
                                />
                                <Tooltip content={<CustomTooltip />} cursor={{ stroke: isDark ? '#818cf8' : '#4f46e5', strokeWidth: 1, strokeDasharray: '4 4' }} />
                                <Area
                                    type="monotone"
                                    dataKey="count"
                                    stroke={isDark ? "#818cf8" : "#4f46e5"}
                                    strokeWidth={3}
                                    fillOpacity={1}
                                    fill="url(#colorClicks)"
                                    activeDot={{ r: 6, strokeWidth: 0, fill: isDark ? "#818cf8" : "#4f46e5" }}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                ) : (
                    <div className="rounded-2xl bg-gray-50 dark:bg-gray-800 p-4 h-[400px] flex flex-col items-center justify-center border border-dashed border-gray-200 dark:border-gray-700">
                        <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
                            <span className="text-2xl">📉</span>
                        </div>
                        <p className="text-gray-900 dark:text-white font-semibold mb-1">No Activity Yet</p>
                        <p className="text-gray-500 dark:text-gray-400 text-sm">Share your links to start seeing data here.</p>
                    </div>
                )}
        </>
    );
};

export default ClicksLineChart;
