import React, { useEffect, useState, useMemo } from "react";
import axiosInstance from "../utils/axiosInstance.js";
import dot from "../assets/sixDots.svg";
import {topLocationState} from "../recoil/atoms.js";
import {useSetRecoilState} from "recoil";
import {InfinitySpin} from "react-loader-spinner";

const LocationList = ({ apiUrl }) => {
    const [locations, setLocations] = useState([]);
    const [view, setView] = useState("country"); // to toggle between countries and cities
    const setTopLocation = useSetRecoilState(topLocationState);
    const [currentPage, setCurrentPage] = useState(1); // Current page
    const [itemsPerPage] = useState(5); // Number of items per page
    const [loading, setLoading] = useState(true);


    const getLocationData = async () => {
        try {
            const response = await axiosInstance.get(apiUrl);
            setLocations(response.data.locationCounts);
        } catch (error) {
            console.error("Error fetching location data:", error);
        } finally {
            setLoading(false);
        }
    };

    console.log(locations);

    useEffect(() => {
        getLocationData();
    }, []);

    // Memoize processed data
    const { countries, cities, unknownLocations, maxClicks, topLocation } = useMemo(() => {
        const countryMap = {};
        const cityList = [];
        const unknownList = [];
        let unknownCityClicks = 0;
        let maxClicks = 0; // Variable to track the maximum clicks
        let topLocation = ""; // Variable to store the top-performing location

        Object.entries(locations).forEach(([location, count]) => {
            const [country, city] = location.split(", ");

            // Handle unknown locations
            if (location === "Unknown Country, Unknown City") {
                unknownList.push({ location, count });
            } else if (city === "Unknown City" || !city) {
                unknownCityClicks += count;
                // Aggregate count to the country
                countryMap[country] = (countryMap[country] || 0) + count;
            } else {
                // Add city to the cityList
                cityList.push({ city, count });
                // Also, add the count to the respective country
                countryMap[country] = (countryMap[country] || 0) + count;
            }
        });

        // Convert countries object to an array format
        const countryArray = Object.keys(countryMap).map((country) => {
            const totalClicks = countryMap[country];
            // Check if this country has the maximum clicks
            if (totalClicks > maxClicks) {
                maxClicks = totalClicks;
                topLocation = country; // Update the top-performing location
            }
            return {
                country,
                count: totalClicks,
            };
        });

        // Add "Unknown City" at the end of the cities list if there are clicks for it
        if (unknownCityClicks > 0) {
            cityList.push({ city: "Unknown City", count: unknownCityClicks });
        }

        return {
            countries: countryArray,
            cities: cityList,
            unknownLocations: unknownList,
            maxClicks: maxClicks,
            topLocation: topLocation,
        };
    }, [locations]); // Dependency on locations

    setTopLocation({
        name: topLocation,
        clicks: maxClicks
    })

    // Calculate total pages for countries or cities
    const totalPages = view === 'country' ? Math.ceil(countries.length / itemsPerPage) : Math.ceil(cities.length / itemsPerPage);

    // Get the current items to display
    const currentItems = view === 'country'
         ? countries.slice((currentPage - 1) * itemsPerPage , currentPage * itemsPerPage)
         : cities.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };



    return (
        <>
            <div className="flex flex-col ml-4">
                <div className="flex">
                    <img src={dot} className="w-4 h-4 mt-1" alt="sixDots"/>
                    <p className="font-bold mb-3.5">Clicks + scans by location</p>
                </div>
                {/* Buttons for toggling between views */}
                <div className="flex mb-4">
                    <div className="flex w-full h-10 bg-gray-300 rounded-full">
                        <button
                            onClick={() => setView("country")}
                            className={`flex-1 rounded-full transition-colors duration-300 ${
                                view === "country" ? "bg-blue-500 text-white" : "bg-gray-300"
                            }`}
                        >
                            Countries
                        </button>
                        <button
                            onClick={() => setView("city")}
                            className={`flex-1 rounded-full transition-colors duration-300 ${
                                view === "city" ? "bg-blue-500 text-white" : "bg-gray-300"
                            }`}
                        >
                            Cities
                        </button>
                    </div>
                </div>

                {/* Conditional rendering based on selected view */}
                {loading ? <div className="bg-gray-200 rounded-lg p-4 h-96 flex items-center justify-center">
                        <InfinitySpin
                            visible={true}
                            width="200"
                            color="#4fa94d"
                            ariaLabel="infinity-spin-loading"
                        />
                        <p>Preparing your graph data...</p>
                    </div> :
                    view === "country" ? (
                        <div>
                            <table className="table-auto w-full border-collapse border border-gray-300">
                                <thead>
                                <tr className="bg-gray-100">
                                    <th className="border px-4 py-2">#</th>
                                    <th className="border px-4 py-2">Country</th>
                                    <th className="border px-4 py-2">Clicks</th>
                                </tr>
                                </thead>
                                <tbody>
                                {currentItems.map((countryData, index) => (
                                    <tr key={countryData.country} className="text-center">
                                        <td className="border px-4 py-2">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                                        <td className="border px-4 py-2">{countryData.country}</td>
                                        <td className="border px-4 py-2">{countryData.count}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div>
                            <table className="table-auto w-full border-collapse border border-gray-300">
                                <thead>
                                <tr className="bg-gray-100">
                                    <th className="border px-4 py-2">#</th>
                                    <th className="border px-4 py-2">City</th>
                                    <th className="border px-4 py-2">Clicks</th>
                                </tr>
                                </thead>
                                <tbody>
                                {currentItems.map((cityData, index) => (
                                    <tr key={cityData.city} className="text-center">
                                        <td className="border px-4 py-2">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                                        <td className="border px-4 py-2">{cityData.city}</td>
                                        <td className="border px-4 py-2">{cityData.count}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                {/* Pagination Controls */}
                {!loading && <div className="flex justify-center mt-4">
                    {Array.from({length: totalPages}, (_, index) => (
                        <button
                            key={index + 1}
                            onClick={() => handlePageChange(index + 1)}
                            className={`mx-1 p-2 w-10 rounded ${currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-gray-300"}`}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>}
            </div>
        </>
    );
};

export default LocationList;
