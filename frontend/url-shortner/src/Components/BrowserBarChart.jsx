import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance.js";
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
import {InfinitySpin} from "react-loader-spinner";

const BrowserBarChart = ({ apiUrl }) => {
    const [browserData, setBrowserData] = useState([]);
    const [hoveredBarIndex, setHoveredBarIndex] = useState(null);
    const [loading, setLoading] = useState(true);

    // Fetch the data from API
    const getBrowserData = async () => {
        try {
            const response = await axiosInstance.get(apiUrl);
            console.log(response.data);
            const browserTypeCounts = response.data.browserTypeCounts;
            // Format the data for the BarChart
            const formattedData = Object.keys(browserTypeCounts).map((browser) => ({
                name: browser,
                value: browserTypeCounts[browser],
            }));

            setBrowserData(formattedData);
        } catch (error) {
            console.error('Error fetching referrer data:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getBrowserData();
    }, []);

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
        <>
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
                : browserData.length > 0 ? <div className="bg-gray-200 p-4 border rounded-lg mx-auto w-full shadow-lg">
                    <h2 className="text-xl font-bold mb-4 text-center">Clicks + Scans by Browser</h2>
                    <div className="w-full h-72"> {/* Set height for the chart */}
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                data={browserData}
                                margin={{top: 10, right: 10, left: 10, bottom: 10}}
                                barGap={5} // Reduce gap between bars
                                barSize={60} // Increase bar width
                            >
                                <CartesianGrid strokeDasharray="0" horizontal={true} vertical={false}/>
                                <XAxis
                                    dataKey="name"
                                    tick={{fontSize: 12}} // Reduce font size of X-axis labels
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                />
                                <Tooltip
                                    content={<CustomTooltip/>}
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
                </div> : <div className="bg-gray-200 rounded-lg p-4 h-96 flex items-center justify-center">
                    <p className="text-lg font-semibold">
                        No data available.
                    </p>
                </div>}
        </>

    );
};

export default BrowserBarChart;
