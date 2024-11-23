import { Link, useParams } from "react-router-dom";
import BrowserBarChart from "../Components/BrowserBarChart.jsx";
import ClicksLineChart from "../Components/ClicksLineChart.jsx";
import DevicePieChart from "../Components/DevicePieChart.jsx";
import ReferrerBarChart from "../Components/ReferrerBarChart.jsx";
import LocationList from "../Components/LocationList.jsx";
import TopPerformanceParent from "../Components/TopPerformanceParent.jsx";
import OsPieChart from "../Components/OsPieChart.jsx";
import WorldMap from "../Components/WorldMap.jsx";

const Analytics = () => {
    const { shortenedUrl } = useParams();

    return (
        <div className="bg-gray-100">
            <div>
                <h4 className="p-4 ml-4 text-sm sm:text-base">
                    * Individual analytics of the short URL. For analytics of overall clicks of all URLs, please visit{" "}
                    <Link to="/dashboard" className="font-bold underline">
                        Dashboard
                    </Link>
                </h4>
            </div>

            <div className="grid gap-6 p-4 sm:p-6">
                {/* Row 1: Browser Bar Chart and Clicks Line Chart */}
                <div className="flex flex-wrap md:flex-nowrap space-y-6 md:space-y-0 md:space-x-6">
                    <div className="w-full md:w-1/2 bg-white shadow-lg p-4 rounded-lg">
                        <BrowserBarChart apiUrl={`/api/urls/clicks/browsers/${shortenedUrl}`} />
                    </div>
                    <div className="w-full md:w-1/2 bg-white shadow-lg p-4 rounded-lg">
                        <ClicksLineChart apiUrl={`/api/urls/clicks/${shortenedUrl}`} />
                    </div>
                </div>

                {/* Row 2: Device Pie Chart and Referrer Bar Chart */}
                <div className="flex flex-wrap md:flex-nowrap space-y-6 md:space-y-0 md:space-x-6">
                    <div className="w-full md:w-1/2 bg-white shadow-lg p-4 rounded-lg">
                        <DevicePieChart apiUrl={`/api/urls/clicks/devices/${shortenedUrl}`} />
                    </div>
                    <div className="w-full md:w-1/2 bg-white shadow-lg p-4 rounded-lg">
                        <ReferrerBarChart apiUrl={`/api/urls/clicks/referrers/${shortenedUrl}`} />
                    </div>
                </div>

                {/* Row 3: Top Performance and Location List */}
                <div className="flex flex-wrap md:flex-nowrap space-y-6 md:space-y-0 md:space-x-6">
                    <div className="w-full md:w-1/2 bg-white shadow-lg p-6 rounded-lg">
                        <TopPerformanceParent />
                    </div>
                    <div className="w-full md:w-1/2 bg-white shadow-lg p-4 rounded-lg">
                        <LocationList apiUrl={`/api/urls/clicks/locations/${shortenedUrl}`} />
                    </div>
                </div>

                {/* Row 4: OS Pie Chart and World Map */}
                <div className="flex flex-wrap md:flex-nowrap space-y-6 md:space-y-0 md:space-x-6">
                    <div className="w-full md:w-1/2 bg-white shadow-lg p-6 rounded-lg">
                        <OsPieChart apiUrl={`/api/urls/clicks/os/${shortenedUrl}`} />
                    </div>
                    <div className="w-full md:w-1/2 bg-white shadow-lg p-6 rounded-lg">
                        <WorldMap apiUrl={`/api/urls/clicks/country/${shortenedUrl}`} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Analytics;
