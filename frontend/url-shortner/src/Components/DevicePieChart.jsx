import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Sector } from 'recharts';
import axiosInstance from "../utils/axiosInstance.js";

const DevicePieChart = ({ shortUrl }) => {
    const [deviceData, setDeviceData] = useState([]);
    const [totalClicks, setTotalClicks] = useState(0);
    const [activeIndex, setActiveIndex] = useState(null);
    const [centerText, setCenterText] = useState('Total: 0');

     // Dummy data for testing
     const dummyData = [
         {name: 'Desktop', value: 23},
         {name: 'Mobile', value: 12},
         {name: 'Tablet', value: 8},
     ];

    // Fetch the data from API
    const getDeviceData = async () => {
        try {
            const response = await axiosInstance.get(`/api/urls/clicks/devices/${shortUrl}`);
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
        }
    };

    useEffect(() => {
        getDeviceData();
    }, [shortUrl]);

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

    return (
        <div className="bg-gray-200 p-4 border rounded-lg inline-flex items-center space-x-6">
            {/* Pie Chart */}
            <div className="relative w-60 h-60 flex items-center justify-center">
                <ResponsiveContainer width="100%" height={400}>
                    <PieChart>
                        <Pie
                            data={deviceData}
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
                    <p className="text-xl font-bold">{centerText}</p>
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
    );
};

export default DevicePieChart;
