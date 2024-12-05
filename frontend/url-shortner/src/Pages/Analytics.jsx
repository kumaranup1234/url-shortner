import { Link, useParams } from "react-router-dom";
import BrowserBarChart from "../Components/BrowserBarChart.jsx";
import ClicksLineChart from "../Components/ClicksLineChart.jsx";
import DevicePieChart from "../Components/DevicePieChart.jsx";
import ReferrerBarChart from "../Components/ReferrerBarChart.jsx";
import LocationList from "../Components/LocationList.jsx";
import TopPerformanceParent from "../Components/TopPerformanceParent.jsx";
import OsPieChart from "../Components/OsPieChart.jsx";
import WorldMap from "../Components/WorldMap.jsx";
import LinkCardAnalytics from "../Cards/LinkCardAnalytics.jsx";
import React from "react";


const Analytics = () => {
    const { shortenedUrl } = useParams();

    return (
        <div className="bg-gray-100 pt-2">
            <div className="bg-blue-100 border border-blue-400 text-blue-800 rounded-lg p-4 mb-2 mx-6">
                <p className="text-sm sm:text-base">
                    <strong>Note:</strong> Individual analytics of the short URL. For analytics of overall clicks of all URLs, please
                    visit
                    <Link to="/dashboard"
                          className="font-bold underline text-blue-700 hover:text-blue-800"> Dashboard</Link> and click the
                    stats button.
                </p>
            </div>

            <div className="grid gap-6 p-2 sm:p-6">
                <div className="w-full bg-white shadow-lg p-4 rounded-lg">
                    <LinkCardAnalytics shortUrlId={shortenedUrl}/>
                </div>


                {/* Row 1: Browser Bar Chart and Clicks Line Chart */}
                <div className="flex flex-wrap md:flex-nowrap space-y-6 md:space-y-0 md:space-x-6">
                    <div className="w-full md:w-1/2 bg-white shadow-lg p-4 rounded-lg">
                        <BrowserBarChart apiUrl={`/api/urls/clicks/browsers/${shortenedUrl}`}/>
                    </div>
                    <div className="w-full md:w-1/2 bg-white shadow-lg p-4 rounded-lg">
                        <ClicksLineChart apiUrl={`/api/urls/clicks/${shortenedUrl}`}/>
                    </div>
                </div>

                {/* Row 2: Device Pie Chart and Referrer Bar Chart */}
                <div className="flex flex-wrap md:flex-nowrap space-y-6 md:space-y-0 md:space-x-6">
                    <div className="w-full md:w-1/2 bg-white shadow-lg p-4 rounded-lg">
                        <DevicePieChart apiUrl={`/api/urls/clicks/devices/${shortenedUrl}`}/>
                    </div>
                    <div className="w-full md:w-1/2 bg-white shadow-lg p-4 rounded-lg">
                        <ReferrerBarChart apiUrl={`/api/urls/clicks/referrers/${shortenedUrl}`}/>
                    </div>
                </div>

                {/* Row 3: Top Performance and Location List */}
                <div className="flex flex-wrap md:flex-nowrap space-y-6 md:space-y-0 md:space-x-6">
                    <div className="w-full md:w-1/2 bg-white shadow-lg p-6 rounded-lg">
                        <TopPerformanceParent/>
                    </div>
                    <div className="w-full md:w-1/2 bg-white shadow-lg p-4 rounded-lg">
                        <LocationList apiUrl={`/api/urls/clicks/locations/${shortenedUrl}`}/>
                    </div>
                </div>

                {/* Row 4: OS Pie Chart and World Map */}
                <div className="flex flex-wrap md:flex-nowrap space-y-6 md:space-y-0 md:space-x-6">
                    <div className="w-full md:w-1/2 bg-white shadow-lg p-6 rounded-lg">
                        <OsPieChart apiUrl={`/api/urls/clicks/os/${shortenedUrl}`}/>
                    </div>
                    <div className="w-full md:w-1/2 bg-white shadow-lg p-6 rounded-lg">
                        <WorldMap apiUrl={`/api/urls/clicks/country/${shortenedUrl}`}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Analytics;
