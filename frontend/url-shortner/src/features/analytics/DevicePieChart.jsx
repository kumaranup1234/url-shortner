import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Sector, Tooltip } from 'recharts';
import axiosInstance from "../../shared/utils/axiosInstance.js";
import { InfinitySpin } from "react-loader-spinner";

const COLORS = ['#4f46e5', '#0ea5e9', '#f59e0b', '#ec4899', '#8b5cf6'];

const DevicePieChart = ({ apiUrl }) => {
    const [deviceData, setDeviceData] = useState([]);
    const [totalClicks, setTotalClicks] = useState(0);
    const [activeIndex, setActiveIndex] = useState(null);
    const [loading, setLoading] = useState(true);

    // Fetch the data from API
    const getDeviceData = async () => {
        try {
            const response = await axiosInstance.get(apiUrl);
            const deviceCounts = response.data.deviceTypeCounts;

            const formattedData = Object.keys(deviceCounts).map((device) => ({
                name: device,
                value: deviceCounts[device],
            }));
            setDeviceData(formattedData.filter(item => item.value > 0)); // Only show items with values

            const total = Object.values(deviceCounts).reduce((acc, count) => acc + count, 0);
            setTotalClicks(total);
        } catch (error) {
            console.error('Error fetching device data:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getDeviceData();
    }, []);

    const onPieEnter = (_, index) => {
        setActiveIndex(index);
    };

    const renderActiveShape = (props) => {
        const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload } = props;
        return (
            <g>
                <text x={cx} y={cy} dy={-5} textAnchor="middle" fill="#1f2937" className="text-xl font-bold">
                    {payload.value}
                </text>
                <text x={cx} y={cy} dy={15} textAnchor="middle" fill="#9ca3af" className="text-xs font-medium uppercase tracking-wide">
                    Avg
                </text>
                <Sector
                    cx={cx}
                    cy={cy}
                    innerRadius={innerRadius}
                    outerRadius={outerRadius + 6}
                    startAngle={startAngle}
                    endAngle={endAngle}
                    fill={fill}
                />
                <Sector
                    cx={cx}
                    cy={cy}
                    startAngle={startAngle}
                    endAngle={endAngle}
                    innerRadius={outerRadius + 8}
                    outerRadius={outerRadius + 10}
                    fill={fill}
                />
            </g>
        );
    };

    return (
        <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100 h-full flex flex-col">
            <h2 className="text-lg font-bold text-gray-800 mb-6 text-center lg:text-left">Device Distribution</h2>

            {loading ? (
                <div className="flex flex-col items-center justify-center flex-1 h-[300px]">
                    <InfinitySpin
                        visible={true}
                        width="120"
                        color="#4f46e5"
                        ariaLabel="infinity-spin-loading"
                    />
                </div>
            ) : deviceData.length > 0 ? (
                <div className="flex flex-col md:flex-row items-center justify-between gap-8 flex-1">
                    {/* Chart */}
                    <div className="w-full md:w-1/2 h-[250px] relative">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    activeIndex={activeIndex}
                                    activeShape={renderActiveShape}
                                    data={deviceData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                    onMouseEnter={onPieEnter}
                                    onMouseLeave={() => setActiveIndex(null)}
                                    animationDuration={1000}
                                >
                                    {deviceData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="none" />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                                    formatter={(value, name) => [`${value} Clicks`, name]}
                                />
                            </PieChart>
                        </ResponsiveContainer>

                        {/* Center Text (Absolute) - only visible when not hovering if desired, or always */}
                        {activeIndex === null && (
                            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                                <span className="text-3xl font-bold text-gray-800">{totalClicks}</span>
                                <span className="text-xs text-gray-400 uppercase tracking-widest font-semibold mt-1">Total</span>
                            </div>
                        )}
                    </div>

                    {/* Legend */}
                    <div className="w-full md:w-1/2 flex flex-col gap-3">
                        {deviceData.map((entry, index) => {
                            const percentage = ((entry.value / totalClicks) * 100).toFixed(1);
                            return (
                                <div key={index} className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors group cursor-default">
                                    <div className="flex items-center gap-3">
                                        <div
                                            className="w-3 h-3 rounded-full ring-2 ring-white shadow-sm"
                                            style={{ backgroundColor: COLORS[index % COLORS.length] }}
                                        />
                                        <span className="text-sm font-medium text-gray-700">{entry.name}</span>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-sm font-bold text-gray-900">{entry.value}</div>
                                        <div className="text-xs text-gray-400 font-medium">{percentage}%</div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center h-[300px] bg-gray-50 rounded-xl border border-dashed border-gray-200">
                    <div className="text-4xl mb-2">📱</div>
                    <p className="text-gray-900 font-semibold">No Device Data</p>
                    <p className="text-gray-500 text-sm">Waiting for clicks...</p>
                </div>
            )}
        </div>
    );
};

export default DevicePieChart;
