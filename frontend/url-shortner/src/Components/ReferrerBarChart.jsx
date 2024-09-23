import axiosInstance from "../utils/axiosInstance.js";
import React, {useEffect, useState} from "react";
import {Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";

// Dummy data
const dummyData = [
    { name: "Direct Access", value: 14 },
    { name: "http://localhost:5173/", value: 3 },
    { name: "Google", value: 5 },
    { name: "Facebook", value: 7 },
    { name: "Twitter", value: 2 },
    { name: "LinkedIn", value: 8 },
];

const ReferrerBarChart = ({ shortUrl }) => {
    const [referrerData, setReferrerData] = useState([]);
    const [hoveredBarIndex, setHoveredBarIndex] = useState(null);

    // Fetch the data from API
    const getReferrerData = async () => {
        try {
            const response = await axiosInstance.get(`/api/urls/clicks/referrers/${shortUrl}`);
            const referrerCounts = response.data.referrerCounts;
            // Format the data for the BarChart
            const formattedData = Object.keys(referrerCounts).map((referrer) => ({
                name: referrer,
                value: referrerCounts[referrer],
            }));

            setReferrerData(formattedData);
            //setReferrerData(dummyData);
        } catch (error) {
            console.error('Error fetching referrer data:', error);
        }
    };

    useEffect(() => {
        getReferrerData();
    }, [shortUrl]);

    // Custom Tooltip Component
    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white border border-gray-300 p-2 rounded shadow-md text-center">
                    <p className="font-medium">{label}</p>
                    <p>{`Clicks: ${payload[0].value}`}</p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="bg-gray-200 p-4 border rounded w-1/2">
            <h2 className="text-xl font-bold mb-4">Referrer Bar Chart</h2>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart
                    data={referrerData}
                    margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
                    barGap={5} // Reduce gap between bars
                    barSize={60} // Increase bar width
                >
                    <CartesianGrid strokeDasharray="0" horizontal={true} vertical={false} />
                    <XAxis
                        dataKey="name"
                        tick={{ fontSize: 12 }} // Reduce font size of X-axis labels
                    />
                    <YAxis
                        axisLine={false}
                        tickLine={false}
                    />
                    <Tooltip
                        content={<CustomTooltip />}
                        cursor={false} // Disable background highlight on hover
                    />
                    <Bar
                        dataKey="value"
                        onMouseEnter={(data, index) => setHoveredBarIndex(index)}
                        onMouseLeave={() => setHoveredBarIndex(null)}
                    >
                        {referrerData.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={index === hoveredBarIndex ? "#00C49F" : "#0088FE"} // Highlight the hovered bar
                            />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}

export default ReferrerBarChart;
