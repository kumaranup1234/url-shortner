import axiosInstance from "../../shared/utils/axiosInstance.js";
import React, { useEffect, useState } from "react";
import {
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from "recharts";
import { InfinitySpin } from "react-loader-spinner";

const ReferrerBarChart = ({ apiUrl }) => {
    const [referrerData, setReferrerData] = useState([]);
    const [hoveredBarIndex, setHoveredBarIndex] = useState(null);
    const [loading, setLoading] = useState(true);

    // Fetch the data from API
    const getReferrerData = async () => {
        try {
            const response = await axiosInstance.get(apiUrl);
            const referrerCounts = response.data.referrerCounts;
            // Format the data for the BarChart
            const formattedData = Object.keys(referrerCounts).map((referrer) => ({
                name: referrer,
                value: referrerCounts[referrer],
            }));

            setReferrerData(formattedData);
        } catch (error) {
            console.error('Error fetching referrer data:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getReferrerData();
    }, []);

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md border border-gray-100 dark:border-gray-700 p-3 rounded-xl shadow-xl">
                    <p className="font-semibold text-gray-700 dark:text-gray-200 mb-1">{label}</p>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                        <p className="text-gray-900 dark:text-white font-bold">
                            {payload[0].value} <span className="text-xs font-normal text-gray-500 dark:text-gray-400">clicks</span>
                        </p>
                    </div>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="rounded-2xl bg-white dark:bg-gray-900 p-6 shadow-sm border border-gray-100 dark:border-gray-800 h-full flex flex-col transition-colors">
            <h2 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-6 text-center lg:text-left">
                Referrer Source
            </h2>

            {loading ? (
                <div className="flex flex-col items-center justify-center flex-1 h-[300px]">
                    <InfinitySpin
                        visible={true}
                        width="100"
                        color="#3b82f6"
                        ariaLabel="infinity-spin-loading"
                    />
                </div>
            ) : referrerData.length > 0 ? (
                <div className="flex-1 w-full h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={referrerData}
                            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                            barSize={50}
                        >
                            <defs>
                                <linearGradient id="colorReferrer" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.4} />
                                </linearGradient>
                                <linearGradient id="colorReferrerHover" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#60a5fa" stopOpacity={1} />
                                    <stop offset="95%" stopColor="#60a5fa" stopOpacity={0.6} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" className="dark:stroke-gray-800" />
                            <XAxis
                                dataKey="name"
                                tick={{ fontSize: 11, fill: '#94a3b8', fontWeight: 500 }}
                                axisLine={false}
                                tickLine={false}
                                tickMargin={4}
                                dy={10}
                            />
                            <YAxis
                                axisLine={false}
                                tickLine={false}
                                tickCount={5}
                                tick={{ fontSize: 11, fill: '#94a3b8', fontWeight: 500 }}
                                allowDecimals={false}
                            />
                            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'transparent' }} />
                            <Bar
                                dataKey="value"
                                radius={[8, 8, 0, 0]}
                                onMouseEnter={(data, index) => setHoveredBarIndex(index)}
                                onMouseLeave={() => setHoveredBarIndex(null)}
                            >
                                {referrerData.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={index === hoveredBarIndex ? "url(#colorReferrerHover)" : "url(#colorReferrer)"}
                                    />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center flex-1 h-[300px] bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-dashed border-gray-200 dark:border-gray-700 transition-colors">
                    <div className="text-4xl mb-2">🔗</div>
                    <p className="text-gray-900 dark:text-white font-semibold text-sm">No Referrer Data</p>
                    <p className="text-gray-500 dark:text-gray-400 text-xs text-center mt-1">Clicks from websites will appear here</p>
                </div>
            )}
        </div>
    );
}

export default ReferrerBarChart;
