import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Sector } from 'recharts';
import axiosInstance from "../utils/axiosInstance.js";
import {InfinitySpin} from "react-loader-spinner";

const OsPieChart = ({ apiUrl }) => {
    const [osData, setOsData] = useState([]);
    const [totalClicks, setTotalClicks] = useState(0);
    const [activeIndex, setActiveIndex] = useState(null);
    const [centerText, setCenterText] = useState('Total: 0');
    const [loading, setLoading] = useState(true);

    // Fetch the data from API
    const getOsData = async () => {
        try {
            const response = await axiosInstance.get(apiUrl);
            const OsCounts = response.data.osCounts;

            const formattedData = Object.keys(OsCounts).map((device) => ({
                name: device,
                value: OsCounts[device],
            }));
            setOsData(formattedData);
            const total = Object.values(OsCounts).reduce((acc, count) => acc + count, 0);
            setTotalClicks(total);
            setCenterText(`Total: ${total}`);
        } catch (error) {
            console.error('Error fetching device data:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getOsData();
    }, []);

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    // Custom function to "lift" the hovered pie slice
    const renderActiveShape = (props) => {
        const {cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill} = props;
        return (
            <g>
                <Sector
                    cx={cx}
                    cy={cy}
                    innerRadius={innerRadius}
                    outerRadius={outerRadius + 10} // Lift the hovered segment
                    startAngle={startAngle}
                    endAngle={endAngle}
                    fill={fill}
                />
            </g>
        );
    };

    const onPieEnter = (_, index) => {
        if (osData[index]) {
            const {name, value} = osData[index];
            setActiveIndex(index)
            setCenterText(`${name}: ${value}`);
        }
    };

    const onPieLeave = () => {
        setActiveIndex(null);
        setCenterText(`Total: ${totalClicks}`);
    };

    return (
        <div className="shadow-lg rounded-lg">
            {loading ?
                <div className="bg-gray-200 rounded-lg p-4 h-96 flex items-center justify-center">
                    <InfinitySpin
                        visible={true}
                        width="200"
                        color="#4fa94d"
                        ariaLabel="infinity-spin-loading"
                    />
                    <p>Preparing your graph data...</p>
                </div>
                : osData.length > 0 ? <div className="bg-gray-200 rounded-lg p-4">
                    <h2 className="text-xl text-center font-bold mb-4">Clicks + scans by OS</h2>
                    <div className="flex items-center space-x-6">
                        {/* Pie Chart */}
                        <div className="relative w-96 flex items-center justify-center">
                            <ResponsiveContainer width="100%" height={345}>
                                <PieChart>
                                    <Pie
                                        data={osData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={90}
                                        outerRadius={110}
                                        activeIndex={activeIndex}
                                        activeShape={renderActiveShape}
                                        dataKey="value"
                                        onMouseEnter={onPieEnter}
                                        onMouseLeave={onPieLeave}
                                    >
                                        {osData.map((entry, index) => (
                                            <Cell
                                                key={`cell-${index}`}
                                                fill={COLORS[index % COLORS.length]}
                                                stroke="none"
                                            />
                                        ))}
                                    </Pie>
                                </PieChart>
                            </ResponsiveContainer>

                            {/* Centered text */}
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <p className="text-xl font-bold">{centerText}</p>
                            </div>
                        </div>

                        {/* List of devices and colors */}
                        <div className="flex flex-col justify-center items-start space-y-2">
                            <ul>
                                {osData.map((entry, index) => (
                                    <li key={index} className="flex items-center space-x-2">
                            <span
                                className="inline-block w-4 h-4 rounded"
                                style={{backgroundColor: COLORS[index % COLORS.length]}}
                            ></span>
                                        <span className="font-semibold">{entry.name}</span>
                                        <span>{entry.value}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div> : <div className="bg-gray-200 rounded-lg p-4 h-96 flex items-center justify-center">
                    <p className="text-lg font-semibold">
                        No data available.
                    </p>
                </div>}
        </div>
    );
};

export default OsPieChart;