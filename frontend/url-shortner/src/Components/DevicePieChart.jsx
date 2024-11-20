import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Sector } from 'recharts';
import axiosInstance from "../utils/axiosInstance.js";
import {InfinitySpin} from "react-loader-spinner";

const DevicePieChart = ({ apiUrl }) => {
    const [deviceData, setDeviceData] = useState([]);
    const [totalClicks, setTotalClicks] = useState(0);
    const [activeIndex, setActiveIndex] = useState(null);
    const [centerText, setCenterText] = useState('Total: 0');
    const [loading, setLoading] = useState(true);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

     // Dummy data for testing
     const dummyData = [
         {name: 'Desktop', value: 23},
         {name: 'Mobile', value: 12},
         {name: 'Tablet', value: 8},
     ];

    // Fetch the data from API
    const getDeviceData = async () => {
        try {
            const response = await axiosInstance.get(apiUrl);
            console.log("pie chart data",response.data);
            const deviceCounts = response.data.deviceTypeCounts;

            const formattedData = Object.keys(deviceCounts).map((device) => ({
                name: device,
                value: deviceCounts[device],
            }));
            setDeviceData(formattedData);
            // For testing
            //setDeviceData(dummyData);

            const total = Object.values(deviceCounts).reduce((acc, count) => acc + count, 0);
            setTotalClicks(total);
            setCenterText(`Total: ${total}`);

            console.log("Device Data fetched: ", formattedData);
            console.log("Total Clicks: ", total);
        } catch (error) {
            console.error('Error fetching device data:', error);
        } finally {
            setLoading(false);
        }
    };

    // Update window width on resize
    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    useEffect(() => {
        getDeviceData();
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
        if (deviceData[index]) {
            const {name, value} = deviceData[index];
            setActiveIndex(index)
            setCenterText(`${name}: ${value}`);
        }
    };

    const onPieLeave = () => {
        setActiveIndex(null);
        setCenterText(`Total: ${totalClicks}`);
    };

    const getRadius = () => {
        if (windowWidth >= 1024) { // For large screens
            return { innerRadius: 90, outerRadius: 110 };
        }
        return { innerRadius: 70, outerRadius: 90 };
    };

    const { innerRadius, outerRadius } = getRadius();

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
                : deviceData.length > 0 ? <div className="bg-gray-200 rounded-lg p-4">
                    <h2 className="text-xl text-center font-bold mb-4">Clicks + scans by devices</h2>
                    <div className="flex items-center space-x-6">
                        {/* Pie Chart */}
                        <div className="relative w-full md:w-1/2 flex items-center justify-center">
                            <ResponsiveContainer width="100%" height={345}>
                                <PieChart>
                                    <Pie
                                        data={deviceData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={innerRadius}
                                        outerRadius={outerRadius}
                                        activeIndex={activeIndex}
                                        activeShape={renderActiveShape}
                                        dataKey="value"
                                        onMouseEnter={onPieEnter}
                                        onMouseLeave={onPieLeave}
                                    >
                                        {deviceData.map((entry, index) => (
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
                                <p className="md:text-xl font-bold">{centerText}</p>
                            </div>
                        </div>

                        {/* List of devices and colors */}
                        <div className="flex flex-col justify-center items-start space-y-2">
                            <ul>
                                {deviceData.map((entry, index) => (
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

export default DevicePieChart;
