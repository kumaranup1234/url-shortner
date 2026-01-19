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
    
    const chartData = data[apiUrl];
    const isLoading = loading[apiUrl];

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
                <div className="bg-white border border-gray-300 p-3 rounded-lg shadow-lg">
                    <p className="font-semibold text-gray-800">{label}</p>
                    <p className="text-blue-600">{`Clicks: ${payload[0].value}`}</p>
                </div>
            );
        }
        return null;
    };

    if (isLoading) {
        return (
            <div className="rounded-lg p-4 h-96 flex flex-col items-center justify-center">
                <InfinitySpin
                    visible={true}
                    width="80"
                    color="#0d9488"
                    ariaLabel="Loading browser analytics"
                />
                <p className="mt-4 text-gray-600">Loading browser data...</p>
            </div>
        );
    }

    if (!browserData.length) {
        return (
            <div className="bg-gray-50 rounded-lg p-8 h-96 flex flex-col items-center justify-center">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                </div>
                <p className="text-lg font-medium text-gray-600">No browser data available</p>
                <p className="text-sm text-gray-500 mt-1">Data will appear here once you have clicks</p>
            </div>
        );
    }

    return (
        <div className="w-full h-96">
            <h2 className="text-xl font-bold text-center mb-6 text-gray-800">
                Clicks by Browser
            </h2>
            <ResponsiveContainer width="100%" height="85%">
                <BarChart
                    data={browserData}
                    margin={{ top: 10, right: 5, left: -18, bottom: 25 }}
                    barGap={5}
                    barSize={60}
                >
                    <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                    <XAxis
                        dataKey="name"
                        tickFormatter={(value) => 
                            value.length > 8 && window.innerWidth < 768 
                                ? `${value.substring(0, 6)}..` 
                                : value
                        }
                        tick={{
                            fontSize: window.innerWidth < 768 ? 10 : 12,
                            dy: 6,
                        }}
                        interval={0}
                    />
                    <YAxis axisLine={false} tickLine={false} tickCount={6} />
                    <Tooltip content={<CustomTooltip />} cursor={false} />
                    <Bar
                        dataKey="value"
                        onMouseEnter={(data, index) => setHoveredBarIndex(index)}
                        onMouseLeave={() => setHoveredBarIndex(null)}
                        radius={[4, 4, 0, 0]}
                    >
                        {browserData.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={index === hoveredBarIndex ? "#0d9488" : "#3b82f6"}
                            />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default BrowserBarChart;
