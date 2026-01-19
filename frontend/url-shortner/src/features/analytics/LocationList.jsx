import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { fetchAnalyticsData } from '../../store/slices/analyticsSlice';
import { InfinitySpin } from "react-loader-spinner";

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

    const { countries, cities } = useMemo(() => {
        if (!chartData?.locationCounts) return { countries: [], cities: [] };
        
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

        return {
            countries: countryArray,
            cities: cityList.sort((a, b) => b.count - a.count),
        };
    }, [chartData]);

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
            <div className="rounded-lg p-4 h-96 flex flex-col items-center justify-center">
                <InfinitySpin
                    visible={true}
                    width="80"
                    color="#0d9488"
                    ariaLabel="Loading location data"
                />
                <p className="mt-4 text-gray-600">Loading location data...</p>
            </div>
        );
    }

    if (!countries.length && !cities.length) {
        return (
            <div className="bg-gray-50 rounded-lg p-8 h-96 flex flex-col items-center justify-center">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                </div>
                <p className="text-lg font-medium text-gray-600">No location data available</p>
                <p className="text-sm text-gray-500 mt-1">Location data will appear here once you have clicks</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-4">
                <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                <h3 className="font-bold text-gray-800">Clicks by Location</h3>
            </div>
            
            {/* Toggle Buttons */}
            <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                    onClick={() => { setView("country"); setCurrentPage(1); }}
                    className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
                        view === "country" 
                            ? "bg-white text-blue-600 shadow-sm" 
                            : "text-gray-600 hover:text-gray-800"
                    }`}
                >
                    Countries ({countries.length})
                </button>
                <button
                    onClick={() => { setView("city"); setCurrentPage(1); }}
                    className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
                        view === "city" 
                            ? "bg-white text-blue-600 shadow-sm" 
                            : "text-gray-600 hover:text-gray-800"
                    }`}
                >
                    Cities ({cities.length})
                </button>
            </div>

            {/* Data Table */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                {view === "country" ? "Country" : "City"}
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Clicks</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {currentItems.map((item, index) => {
                            const displayName = view === "country" ? item.country : item.city;
                            const rank = (currentPage - 1) * itemsPerPage + index + 1;
                            
                            return (
                                <tr key={displayName} className="hover:bg-gray-50">
                                    <td className="px-4 py-3 text-sm text-gray-900">{rank}</td>
                                    <td className="px-4 py-3 text-sm font-medium text-gray-900">{displayName}</td>
                                    <td className="px-4 py-3 text-sm text-gray-900">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
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
                <div className="flex justify-center space-x-1">
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index + 1}
                            onClick={() => handlePageChange(index + 1)}
                            className={`w-8 h-8 rounded-md text-sm font-medium transition-colors ${
                                currentPage === index + 1
                                    ? "bg-blue-600 text-white"
                                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
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
