import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import LinkCardAnalytics from "../Cards/LinkCardAnalytics.jsx";
import ClicksLineChart from "../features/analytics/ClicksLineChart.jsx";
import DevicePieChart from "../features/analytics/DevicePieChart.jsx";
import OsPieChart from "../features/analytics/OsPieChart.jsx";
import ReferrerBarChart from "../features/analytics/ReferrerBarChart.jsx";
import BrowserBarChart from "../features/analytics/BrowserBarChart.jsx";
import WorldMap from "../features/analytics/WorldMap.jsx";
import LocationList from "../features/analytics/LocationList.jsx";
import LoadingSpinner from "../shared/components/ui/LoadingSpinner.jsx";
import MainFooter from "../shared/components/MainFooter.jsx";
import TopPerformanceParent from "../features/analytics/TopPerformanceParent.jsx";


const Analytics = () => {
    const { shortenedUrl } = useParams();

    return (
        <div className="bg-gray-100 dark:bg-gray-950 pt-2 w-full transition-colors duration-300 min-h-screen">
            <div className="bg-blue-100 dark:bg-blue-900/30 border border-blue-400 dark:border-blue-800 text-blue-800 dark:text-blue-200 rounded-lg p-4 mb-2 mx-6 transition-colors">
                <p className="text-sm sm:text-base">
                    <strong>Note:</strong> Individual analytics of the short URL. For analytics of overall clicks of all URLs, please
                    visit
                    <Link to="/dashboard"
                        className="font-bold underline text-blue-700 dark:text-blue-300 hover:text-blue-800 dark:hover:text-blue-200 ml-1">Dashboard</Link> and click the
                    stats button.
                </p>
            </div>

            <div className="grid gap-6 p-2 sm:p-6">
                <div className="w-full bg-white dark:bg-gray-900 shadow-lg p-4 rounded-lg transition-colors border border-gray-100 dark:border-gray-800">
                    <LinkCardAnalytics shortUrlId={shortenedUrl} />
                </div>


                <div className="flex flex-wrap md:flex-nowrap space-y-6 md:space-y-0 md:space-x-6">
                    <div className="w-full md:w-1/2 bg-white dark:bg-gray-900 shadow-lg p-4 rounded-lg transition-colors border border-gray-100 dark:border-gray-800">
                        <BrowserBarChart apiUrl={`/api/urls/clicks/browsers/${shortenedUrl}`} />
                    </div>
                    <div className="w-full md:w-1/2 bg-white dark:bg-gray-900 shadow-lg p-4 rounded-lg transition-colors border border-gray-100 dark:border-gray-800">
                        <ClicksLineChart apiUrl={`/api/urls/clicks/${shortenedUrl}`} />
                    </div>
                </div>

                <div className="flex flex-wrap md:flex-nowrap space-y-6 md:space-y-0 md:space-x-6">
                    <div className="w-full md:w-1/2 bg-white dark:bg-gray-900 shadow-lg p-4 rounded-lg transition-colors border border-gray-100 dark:border-gray-800">
                        <DevicePieChart apiUrl={`/api/urls/clicks/devices/${shortenedUrl}`} />
                    </div>
                    <div className="w-full md:w-1/2 bg-white dark:bg-gray-900 shadow-lg p-4 rounded-lg transition-colors border border-gray-100 dark:border-gray-800">
                        <ReferrerBarChart apiUrl={`/api/urls/clicks/referrers/${shortenedUrl}`} />
                    </div>
                </div>


                <div className="flex flex-wrap md:flex-nowrap space-y-6 md:space-y-0 md:space-x-6">
                    <div className="w-full md:w-1/2 bg-white dark:bg-gray-900 shadow-lg p-6 rounded-lg transition-colors border border-gray-100 dark:border-gray-800">
                        <MainFooter />
                    </div>
                    <div className="w-full md:w-1/2 bg-white dark:bg-gray-900 shadow-lg p-4 rounded-lg transition-colors border border-gray-100 dark:border-gray-800">
                        <LocationList apiUrl={`/api/urls/clicks/locations/${shortenedUrl}`} />
                    </div>
                </div>


                <div className="flex flex-wrap md:flex-nowrap space-y-6 md:space-y-0 md:space-x-6">
                    <div className="w-full md:w-1/2 bg-white dark:bg-gray-900 shadow-lg p-6 rounded-lg transition-colors border border-gray-100 dark:border-gray-800">
                        <OsPieChart apiUrl={`/api/urls/clicks/os/${shortenedUrl}`} />
                    </div>
                    <div className="w-full md:w-1/2 bg-white dark:bg-gray-900 shadow-lg p-6 rounded-lg transition-colors border border-gray-100 dark:border-gray-800">
                        <WorldMap apiUrl={`/api/urls/clicks/country/${shortenedUrl}`} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Analytics;
