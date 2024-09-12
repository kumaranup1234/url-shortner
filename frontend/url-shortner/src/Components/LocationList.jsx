import { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance.js";
import dot from "../assets/sixDots.svg"

const LocationList = ({ shortUrl }) => {
    const [countries, setCountries] = useState([]);
    const [cities, setCities] = useState([]);
    const [unknownLocations, setUnknownLocations] = useState([]);
    const [view, setView] = useState("country"); // to toggle between countries and cities

    // Fetch the data from API
    const getLocationData = async () => {
        try {
            const response = await axiosInstance.get(`/api/urls/clicks/locations/${shortUrl}`);
            const locations = response.data.locationCounts;
            const countryMap = {};
            const cityList = [];
            const unknownList = [];

            // Process the location data
            Object.entries(locations).forEach(([location, count]) => {
                const [country, city] = location.split(", ");

                // If the city is unknown, add the count to the country directly
                if (city === "Unknown City" || !city) {
                    // Add the count to the respective country
                    countryMap[country] = (countryMap[country] || 0) + count;
                } else {
                    // Add city to the cityList
                    cityList.push({ city, count });

                    // Also, add the count to the respective country
                    countryMap[country] = (countryMap[country] || 0) + count;
                }

                // Handle unknown locations separately
                if (location === "Unknown Country, Unknown City") {
                    unknownList.push({ location, count });
                }
            });

            // Convert countries object to an array format
            const countryArray = Object.keys(countryMap).map((country) => ({
                country,
                count: countryMap[country],
            }));

            setCountries(countryArray);
            setCities(cityList);
            setUnknownLocations(unknownList);
        } catch (error) {
            console.error("Error fetching location data:", error);
        }
    };

    useEffect(() => {
        getLocationData();
    }, [shortUrl]);

    return (
        <div className="flex flex-col ml-4">
            <div className="flex">
                <img src={dot} className="w-4 h-4 mt-1" alt="sixDots"/>
                <p className="font-bold mb-3.5">Clicks + scans by location</p>
            </div>
            {/* Buttons for toggling between views */}
            <div className="flex mb-4">
                <div className="flex w-96 h-10 bg-gray-300 rounded-full">
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
            {view === "country" ? (
                <div>
                    <table className="table-auto w-96 border-collapse border border-gray-300">
                        <thead>
                        <tr className="bg-gray-100">
                            <th className="border px-4 py-2">#</th>
                            <th className="border px-4 py-2">Country</th>
                            <th className="border px-4 py-2">Clicks</th>
                        </tr>
                        </thead>
                        <tbody>
                        {countries.map((countryData, index) => (
                            <tr key={countryData.country} className="text-center">
                                <td className="border px-4 py-2">{index + 1}</td>
                                <td className="border px-4 py-2">{countryData.country}</td>
                                <td className="border px-4 py-2">{countryData.count}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div>
                    <table className="table-auto w-96 border-collapse border border-gray-300">
                        <thead>
                        <tr className="bg-gray-100">
                            <th className="border px-4 py-2">#</th>
                            <th className="border px-4 py-2">City</th>
                            <th className="border px-4 py-2">Clicks</th>
                        </tr>
                        </thead>
                        <tbody>
                        {cities.map((cityData, index) => (
                            <tr key={cityData.city} className="text-center">
                                <td className="border px-4 py-2">{index + 1}</td>
                                <td className="border px-4 py-2">{cityData.city}</td>
                                <td className="border px-4 py-2">{cityData.count}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Unknown locations, if any */}
            {unknownLocations.length > 0 && (
                <div>
                    <h3 className="font-bold mt-4">Unknown Locations:</h3>
                    <table className="table-auto w-full border-collapse border border-gray-300">
                        <thead>
                        <tr className="bg-gray-100">
                            <th className="border px-4 py-2">#</th>
                            <th className="border px-4 py-2">Location</th>
                            <th className="border px-4 py-2">Clicks</th>
                        </tr>
                        </thead>
                        <tbody>
                        {unknownLocations.map((unknown, index) => (
                            <tr key={unknown.location} className="text-center">
                                <td className="border px-4 py-2">{index + 1}</td>
                                <td className="border px-4 py-2">{unknown.location}</td>
                                <td className="border px-4 py-2">{unknown.count}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default LocationList;
