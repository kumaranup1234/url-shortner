import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import axiosInstance from "../utils/axiosInstance.js";

// Custom Tooltip Component
const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white border border-gray-300 p-3 rounded shadow-md">
                <p className="font-medium">{`Date: ${label}`}</p>
                <p>{`Total Clicks: ${payload[0].value}`}</p>
            </div>
        );
    }
    return null;
};

// Function to format date as "MM/DD"
const formatXAxis = (tickItem) => {
    const date = new Date(tickItem);
    const options = { month: '2-digit', day: '2-digit' };
    return date.toLocaleDateString(undefined, options).replace(/\//g, '/'); // Ensure MM/DD format
};

const ClicksLineChart = ({ shortUrl }) => {
    const [clickData, setClickData] = useState([]);

    const getClickData = async () => {
        try {
            const response = await axiosInstance.get(`/api/urls/clicks/${shortUrl}`);
            setClickData(response.data.clicksByDate);
        } catch (e) {
            console.error('Error fetching click data:', e);
        }
    };

    useEffect(() => {
        getClickData();
    }, [shortUrl]);

    return (
        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-lg mx-auto" style={{ width: '45%', height: '35w0px', overflow: 'hidden' }}>
            <p className="font-semibold text-xl mb-2 text-left ml-10">Clicks & Scans Over Time</p>
            <ResponsiveContainer width="90%" height="90%">
                <LineChart data={clickData} >
                    <CartesianGrid strokeDasharray="0" horizontal={true} vertical={false} />
                    <XAxis
                        dataKey="date"
                        angle={-45}
                        textAnchor="end"
                        tickFormatter={formatXAxis}
                        style={{ fontSize: '10px' }} // Reduce font size for X-axis labels
                        padding={{ left: 10, right: 10 }} // Add padding to avoid text overlap
                        axisLine={false} // Optionally hide the axis line
                        tickLine={false} // Optionally hide tick lines
                    />
                    <YAxis
                        allowDecimals={false}
                        tickFormatter={(value) => Math.round(value)}
                        minTickGap={5}
                        axisLine={false} // Hides the Y-axis line
                        tickLine={false} // Hides the ticks on Y-axis
                    />
                    <Tooltip
                        content={<CustomTooltip />}
                        cursor={false}
                    />
                    <Line
                        type="linear" // for straight line
                        dataKey="count"
                        stroke="#8884d8"
                        activeDot={{ r: 8 }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default ClicksLineChart;
