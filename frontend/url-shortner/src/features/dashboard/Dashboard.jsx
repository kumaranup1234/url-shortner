import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { fetchDashboardData } from '../../store/slices/dashboardSlice';
import { addNotification } from '../../store/slices/uiSlice';
import { Link } from "react-router-dom";
import { InfinitySpin } from "react-loader-spinner";

import BrowserBarChart from "../analytics/BrowserBarChart.jsx";
import ClicksLineChart from "../analytics/ClicksLineChart.jsx";
import DevicePieChart from "../analytics/DevicePieChart.jsx";
import ReferrerBarChart from "../analytics/ReferrerBarChart.jsx";
import TopPerformanceParent from "../analytics/TopPerformanceParent.jsx";
import LocationList from "../analytics/LocationList.jsx";
import OsPieChart from "../analytics/OsPieChart.jsx";
import InfoCard from "../../Cards/InfoCard.jsx";
import WorldMap from "../analytics/WorldMap.jsx";
import TopPerformingLink from "../../Cards/TopPerformingLink.jsx";

const Dashboard = () => {
    const dispatch = useDispatch();
    const { totalUrls, totalClicks, topUrl, loading, error } = useSelector(state => state.dashboard);

    useEffect(() => {
        dispatch(fetchDashboardData());
    }, [dispatch]);

    useEffect(() => {
        if (error) {
            dispatch(addNotification({
                type: 'error',
                message: error
            }));
        }
    }, [error, dispatch]);

    const chartComponents = [
        { component: BrowserBarChart, apiUrl: '/api/urls/clicks/getUserClicksByBrowser' },
        { component: ClicksLineChart, apiUrl: '/api/urls/clicks/getUsersClicks' },
        { component: DevicePieChart, apiUrl: '/api/urls/clicks/getUserDeviceClicks' },
        { component: ReferrerBarChart, apiUrl: '/api/urls/clicks/getUserClicksByReferrer' },
        { component: TopPerformanceParent, apiUrl: null },
        { component: LocationList, apiUrl: '/api/urls/clicks/getUserClicksByLocations' },
        { component: OsPieChart, apiUrl: '/api/urls/clicks/getUserClicksByOs' },
        { component: WorldMap, apiUrl: '/api/urls/clicks/country' },
    ];

    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Info Banner */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 m-6">
                <div className="flex items-start space-x-3">
                    <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    <div>
                        <p className="text-sm text-blue-800">
                            <span className="font-semibold">Analytics Overview:</span> This dashboard shows overall analytics for all your short URLs. 
                            For individual link analytics, visit{" "}
                            <Link to="/links" className="font-semibold underline hover:text-blue-900 transition-colors">
                                Your Links
                            </Link>
                            {" "}and click the stats button.
                        </p>
                    </div>
                </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mx-6 mb-6">
                <div className="bg-white rounded-xl shadow-sm p-6">
                    <InfoCard 
                        heading="Total Short URLs Created" 
                        info={loading ? '...' : totalUrls?.toLocaleString() || 0}
                    />
                </div>
                <div className="bg-white rounded-xl shadow-sm p-6">
                    <InfoCard 
                        heading="Total Clicks Across All URLs" 
                        info={loading ? '...' : totalClicks?.toLocaleString() || 0}
                    />
                </div>
            </div>

            {/* Top Performing Link */}
            <div className="mx-6 mb-6">
                <div className="bg-white rounded-xl shadow-sm p-6">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-12">
                            <InfinitySpin
                                visible={true}
                                width="80"
                                color="#0d9488"
                                ariaLabel="Loading dashboard data"
                            />
                            <p className="mt-4 text-gray-600">Loading your analytics...</p>
                        </div>
                    ) : topUrl ? (
                        <TopPerformingLink
                            createdAt={topUrl.createdAt}
                            originalUrl={topUrl.originalUrl}
                            logo={topUrl.logo}
                            title={topUrl.title}
                            shortUrl={topUrl.shortUrl}
                            totalClicks={topUrl.totalClicks}
                        />
                    ) : (
                        <div className="text-center py-12">
                            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">No Data Available</h3>
                            <p className="text-gray-500">Create some short URLs to see analytics here.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Analytics Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mx-6 pb-6">
                {chartComponents.map((chart, index) => {
                    const Component = chart.component;
                    return (
                        <div key={index} className="bg-white rounded-xl shadow-sm p-6">
                            <Component apiUrl={chart.apiUrl} />
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Dashboard;
