import {useParams} from "react-router-dom";
import BrowserBarChart from "../Components/BrowserBarChart.jsx";
import ClicksLineChart from "../Components/ClicksLineChart.jsx";
import DevicePieChart from "../Components/DevicePieChart.jsx";
import ReferrerBarChart from "../Components/ReferrerBarChart.jsx";
import LocationList from "../Components/LocationList.jsx";
import TopPerformanceParent from "../Components/TopPerformanceParent.jsx";

const Analytics = () => {
    const { shortenedUrl } = useParams();

    return (
        <div className="grid gap-6 p-6">
            {/* Row 1: Browser Bar Chart and Clicks Line Chart */}
            <div className="flex space-x-6">
                <div className="w-1/2 bg-white shadow-lg p-4 rounded-lg">
                    <BrowserBarChart apiUrl={`/api/urls/clicks/browsers/${shortUrl}`}/>
                </div>
                <div className="w-1/2 bg-white shadow-lg p-4 rounded-lg">
                    <ClicksLineChart apiUrl={`/api/urls/clicks/${shortenedUrl}`}/>
                </div>
            </div>

            {/* Row 2: Device Pie Chart and Referrer Bar Chart */}
            <div className="flex space-x-6">
                <div className="w-1/2 bg-white shadow-lg p-4 rounded-lg">
                    <DevicePieChart apiUrl={`/api/urls/clicks/devices/${shortUrl}`}/>
                </div>
                <div className="w-1/2 bg-white shadow-lg p-4 rounded-lg">
                    <ReferrerBarChart apiUrl={`/api/urls/clicks/referrers/${shortUrl}`}/>
                </div>
            </div>

            {/* Row 3: Location List */}
            <div className="flex space-x-6">
                <div className="w-1/2 bg-white shadow-lg p-6 rounded-lg h-96">
                    <TopPerformanceParent/>
                </div>
                <div className="w-1/2 bg-white shadow-lg p-4 rounded-lg">
                    <LocationList apiUrl={`/api/urls/clicks/locations/${shortUrl}`}/>
                </div>
            </div>
        </div>
    );
}

export default Analytics;
