import React, {useEffect, useState} from "react";
import axiosInstance from "../utils/axiosInstance.js";
import {Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";

const BrowserBarChart = ({ shortUrl }) => {

    const [browserData, setBrowserData] = useState([]);
    const [hoveredBarIndex, setHoveredBarIndex] = useState(null);

    // Fetch the data from API
    const getBrowserData = async () => {
        try {
            const response = await axiosInstance.get(`/api/urls/clicks/browsers/${shortUrl}`);
            console.log(response.data)
            const browserTypeCounts = response.data.browserTypeCounts;
            // Format the data for the BarChart
            const formattedData = Object.keys(browserTypeCounts).map((browser) => ({
                name: browser,
                value: browserTypeCounts[browser],
            }));

            setBrowserData(formattedData);
            //setReferrerData(dummyData);
        } catch (error) {
            console.error('Error fetching referrer data:', error);
        }
    };

    useEffect(() => {
        getBrowserData();
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
        <div className="bg-gray-200 p-4 border rounded-lg mx-auto">
            <h2 className="ml-12 text-xl font-bold mb-4">Clicks + Scans by Browser</h2>
            <ResponsiveContainer width="40%" height={300}>
                <BarChart
                    data={browserData}
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
                        {browserData.map((entry, index) => (
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
export default BrowserBarChart;