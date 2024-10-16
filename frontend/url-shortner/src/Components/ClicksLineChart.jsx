import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import axiosInstance from "../utils/axiosInstance.js";
import {topDateState, totalClicksState} from "../recoil/atoms.js";
import {useSetRecoilState} from "recoil";
import {InfinitySpin} from "react-loader-spinner";

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
    const setTopDate = useSetRecoilState(topDateState);
    const setTotalClicks = useSetRecoilState(totalClicksState);
    const [loading, setLoading] = useState(true);

    const getClickData = async () => {
        try {
            const response = await axiosInstance.get(`/api/urls/clicks/${shortUrl}`);
            console.log("response of the clicks line chart",response);
            setClickData(response.data.clicksByDate);
            setTopDate({
                date: response.data.maxClicksDate,
                clicks: response.data.maxClick
            })
            setTotalClicks(response.data.totalClicks);
        } catch (e) {
            console.error('Error fetching click data:', e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getClickData();
    }, [shortUrl]);

    // Check if all data points are zero
    const allZeroClicks = clickData.every(item => item.count === 0);

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
                : !allZeroClicks > 0 ? <div className="bg-gray-200 border border-gray-200 rounded p-4 shadow-lg mx-auto"
                                          style={{width: '100%', height: '365px', overflow: 'hidden'}}>
                    <h2 className="text-xl font-bold text-center mb-2 ml-10">Clicks & Scans Over Time</h2>
                    <ResponsiveContainer width="90%" height="90%">
                        <LineChart data={clickData}>
                            <CartesianGrid strokeDasharray="0" horizontal={true} vertical={false}/>
                            <XAxis
                                dataKey="date"
                                angle={-45}
                                textAnchor="end"
                                tickFormatter={formatXAxis}
                                style={{fontSize: '10px'}} // Reduce font size for X-axis labels
                                padding={{left: 10, right: 10}} // Add padding to avoid text overlap
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
                                content={<CustomTooltip/>}
                                cursor={false}
                            />
                            <Line
                                type="linear" // for straight line
                                dataKey="count"
                                stroke="#8884d8"
                                activeDot={{r: 8}}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div> : <div className="bg-gray-200 rounded-lg p-4 h-96 flex items-center justify-center">
                    <p className="text-lg font-semibold">
                        No clicks in the past 10 days.
                    </p>
                </div>}
        </>
    );
};

export default ClicksLineChart;
