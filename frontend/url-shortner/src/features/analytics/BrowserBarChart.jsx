import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { fetchAnalyticsData } from '../../store/slices/analyticsSlice';
import {
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import { InfinitySpin } from "react-loader-spinner";

const BrowserBarChart = ({ apiUrl }) => {
    const dispatch = useDispatch();
    const { data, loading } = useSelector(state => state.analytics);
    const [hoveredBarIndex, setHoveredBarIndex] = useState(null);

    // Normalize data structure handling
    const rawData = data[apiUrl];
    const isLoading = loading[apiUrl];
    const chartData = rawData;

    useEffect(() => {
        if (apiUrl) {
            dispatch(fetchAnalyticsData(apiUrl));
        }
    }, [dispatch, apiUrl]);

    const browserData = chartData?.browserTypeCounts ?
        Object.keys(chartData.browserTypeCounts).map((browser) => ({
            name: browser,
            value: chartData.browserTypeCounts[browser],
        })) : [];

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white/90 backdrop-blur-md border border-gray-100 p-3 rounded-xl shadow-xl">
                    <p className="font-semibold text-gray-700 mb-1">{label}</p>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-teal-500"></div>
                        <p className="text-gray-900 font-bold">
                            {payload[0].value} <span className="text-xs font-normal text-gray-500">clicks</span>
                        </p>
                    </div>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100 h-full flex flex-col">
            <h2 className="text-lg font-bold text-gray-800 mb-6 text-center lg:text-left">
                Browser Usage
            </h2>

            {isLoading ? (
                <div className="flex flex-col items-center justify-center flex-1 h-[300px]">
                    <InfinitySpin
                        visible={true}
                        width="100"
                        color="#0d9488"
                        ariaLabel="Loading browser analytics"
                    />
                </div>
            ) : browserData.length > 0 ? (
                <div className="flex-1 w-full h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={browserData}
                            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                            barSize={50}
                        >
                            <defs>
                                <linearGradient id="colorBrowser" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#0d9488" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#0d9488" stopOpacity={0.4} />
                                </linearGradient>
                                <linearGradient id="colorBrowserHover" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#14b8a6" stopOpacity={1} />
                                    <stop offset="95%" stopColor="#14b8a6" stopOpacity={0.6} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                            <XAxis
                                dataKey="name"
                                tickFormatter={(value) =>
                                    value.length > 8 && window.innerWidth < 768
                                        ? `${value.substring(0, 6)}..`
                                        : value
                                }
                                tick={{ fontSize: 11, fill: '#94a3b8', fontWeight: 500 }}
                                axisLine={false}
                                tickLine={false}
                                dy={10}
                            />
                            <YAxis
                                axisLine={false}
                                tickLine={false}
                                tickCount={5}
                                tick={{ fontSize: 11, fill: '#94a3b8', fontWeight: 500 }}
                                allowDecimals={false}
                            />
                            <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f8fafc' }} />
                            <Bar
                                dataKey="value"
                                radius={[8, 8, 0, 0]}
                                onMouseEnter={(data, index) => setHoveredBarIndex(index)}
                                onMouseLeave={() => setHoveredBarIndex(null)}
                            >
                                {browserData.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={index === hoveredBarIndex ? "url(#colorBrowserHover)" : "url(#colorBrowser)"}
                                    />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center flex-1 h-[300px] bg-gray-50 rounded-xl border border-dashed border-gray-200">
                    <div className="text-4xl mb-2">🌍</div>
                    <p className="text-gray-900 font-semibold text-sm">No Browser Data</p>
                    <p className="text-gray-500 text-xs text-center mt-1">Visit links to generate data</p>
                </div>
            )}
        </div>
    );
};

export default BrowserBarChart;
