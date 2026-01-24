import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { fetchAnalyticsData, setTopPerformingLocation } from '../../store/slices/analyticsSlice';
import { InfinitySpin } from "react-loader-spinner";
import { FaMapMarkerAlt, FaCity, FaGlobeAmericas } from "react-icons/fa";

const LocationList = ({ apiUrl }) => {
    const dispatch = useDispatch();
    const { data, loading } = useSelector(state => state.analytics);
    const [view, setView] = useState("country");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);

    const chartData = data[apiUrl];
    const isLoading = loading[apiUrl];

    useEffect(() => {
        if (apiUrl) {
            dispatch(fetchAnalyticsData(apiUrl));
        }
    }, [dispatch, apiUrl]);

    const memoizedData = useMemo(() => {
        if (!chartData?.locationCounts) {
            return { countries: [], cities: [], topLoc: null };
        }

        const countryMap = {};
        const cityList = [];
        let unknownCityClicks = 0;

        Object.entries(chartData.locationCounts).forEach(([location, count]) => {
            const [country, city] = location.split(", ");

            if (location === "Unknown Country, Unknown City") {
                return; // Skip unknown locations
            } else if (city === "Unknown City" || !city) {
                unknownCityClicks += count;
                countryMap[country] = (countryMap[country] || 0) + count;
            } else {
                cityList.push({ city, count });
                countryMap[country] = (countryMap[country] || 0) + count;
            }
        });

        const countryArray = Object.keys(countryMap).map((country) => ({
            country,
            count: countryMap[country],
        })).sort((a, b) => b.count - a.count);

        if (unknownCityClicks > 0) {
            cityList.push({ city: "Unknown City", count: unknownCityClicks });
        }

        // Find top location for Redux state
        const topLoc = countryArray.length > 0 ? countryArray[0] : null;

        return {
            countries: countryArray,
            cities: cityList.sort((a, b) => b.count - a.count),
            topLoc
        };
    }, [chartData]);

    const { countries, cities } = memoizedData;

    // Dispatch top location to Redux side effect
    useEffect(() => {
        const { topLoc } = memoizedData;
        if (topLoc) {
            dispatch(setTopPerformingLocation({ name: topLoc.country, clicks: topLoc.count }));
        } else {
            dispatch(setTopPerformingLocation({ name: "N/A", clicks: 0 }));
        }
    }, [memoizedData, dispatch]);

    const totalPages = view === 'country'
        ? Math.ceil(countries.length / itemsPerPage)
        : Math.ceil(cities.length / itemsPerPage);

    const currentItems = view === 'country'
        ? countries.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
        : cities.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    if (isLoading) {
        return (
            <div className="rounded-2xl p-6 h-96 flex flex-col items-center justify-center bg-gray-50/50 dark:bg-gray-800/50 transition-colors">
                <InfinitySpin
                    visible={true}
                    width="100"
                    color="#4f46e5"
                    ariaLabel="Loading location data"
                />
            </div>
        );
    }

    if (!countries.length && !cities.length) {
        return (
            <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 h-96 flex flex-col items-center justify-center border border-dashed border-gray-200 dark:border-gray-700 transition-colors">
                <div className="text-4xl mb-3 text-gray-300 dark:text-gray-600">
                    <FaMapMarkerAlt />
                </div>
                <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">No Location Data</p>
                <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">Location insights will appear here.</p>
            </div>
        );
    }

    return (
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-800 h-full flex flex-col transition-colors duration-300">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-800 dark:text-white flex items-center gap-2">
                    Location Insights
                </h3>

                {/* Toggle Buttons - Segmented Control */}
                <div className="flex bg-gray-100 dark:bg-gray-800 p-1 rounded-xl">
                    <button
                        onClick={() => { setView("country"); setCurrentPage(1); }}
                        className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 flex items-center gap-2 ${view === "country"
                            ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm"
                            : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                            }`}
                    >
                        <FaGlobeAmericas /> Country
                    </button>
                    <button
                        onClick={() => { setView("city"); setCurrentPage(1); }}
                        className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 flex items-center gap-2 ${view === "city"
                            ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm"
                            : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                            }`}
                    >
                        <FaCity /> City
                    </button>
                </div>
            </div>

            {/* Data Table */}
            <div className="overflow-hidden flex-1">
                <table className="w-full">
                    <thead className="bg-gray-50/50 dark:bg-gray-800/50 border-b border-gray-100 dark:border-gray-800">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider w-16">Rank</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                {view === "country" ? "Country" : "City"}
                            </th>
                            <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Clicks</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
                        {currentItems.map((item, index) => {
                            const displayName = view === "country" ? item.country : item.city;
                            const rank = (currentPage - 1) * itemsPerPage + index + 1;

                            return (
                                <tr key={displayName} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group">
                                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400 font-mono">#{rank}</td>
                                    <td className="px-6 py-4 text-sm font-medium text-gray-800 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{displayName}</td>
                                    <td className="px-6 py-4 text-right">
                                        <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                                            {item.count.toLocaleString()}
                                        </span>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-6">
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index + 1}
                            onClick={() => handlePageChange(index + 1)}
                            className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${currentPage === index + 1
                                ? "bg-gray-900 dark:bg-white text-white dark:text-gray-900 shadow-md scale-105"
                                : "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700"
                                }`}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default LocationList;
