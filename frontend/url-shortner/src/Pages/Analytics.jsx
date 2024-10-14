import {useParams} from "react-router-dom";
import TopPerformance from "../Cards/TopPerformance.jsx";
import BrowserBarChart from "../Components/BrowserBarChart.jsx";
import ClicksLineChart from "../Components/ClicksLineChart.jsx";
import DevicePieChart from "../Components/DevicePieChart.jsx";
import ReferrerBarChart from "../Components/ReferrerBarChart.jsx";
import LocationList from "../Components/LocationList.jsx";
import TopPerformanceParent from "../Components/TopPerformanceParent.jsx";

const Analytics = () => {
    const { shortenedUrl } = useParams();
    console.log(shortenedUrl);

    return (
        <div className="grid gap-6 p-6">
            {/* Row 1: Browser Bar Chart and Clicks Line Chart */}
            <div className="flex space-x-6">
                <div className="w-1/2 bg-white shadow-lg p-4 rounded-lg">
                    <BrowserBarChart shortUrl={shortenedUrl}/>
                </div>
                <div className="w-1/2 bg-white shadow-lg p-4 rounded-lg">
                    <ClicksLineChart shortUrl={shortenedUrl}/>
                </div>
            </div>

            {/* Row 2: Device Pie Chart and Referrer Bar Chart */}
            <div className="flex space-x-6">
                <div className="w-1/2 bg-white shadow-lg p-4 rounded-lg">
                    <DevicePieChart shortUrl={shortenedUrl}/>
                </div>
                <div className="w-1/2 bg-white shadow-lg p-4 rounded-lg">
                    <ReferrerBarChart shortUrl={shortenedUrl}/>
                </div>
            </div>

            {/* Row 3: Location List */}
            <div className="flex space-x-6">
                <div className="w-1/2 bg-white shadow-lg p-6 rounded-lg h-96">
                    <TopPerformanceParent/>
                </div>
                <div className="w-1/2 bg-white shadow-lg p-4 rounded-lg">
                    <LocationList shortUrl={shortenedUrl}/>
                </div>
            </div>
        </div>
    );
}

export default Analytics;
