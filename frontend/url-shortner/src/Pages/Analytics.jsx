import {useParams} from "react-router-dom";
import TopPerformance from "../Cards/TopPerformance.jsx";
import BrowserBarChart from "../Components/BrowserBarChart.jsx";
import ClicksLineChart from "../Components/ClicksLineChart.jsx";
import DevicePieChart from "../Components/DevicePieChart.jsx";
import ReferrerBarChart from "../Components/ReferrerBarChart.jsx";
import LocationList from "../Components/LocationList.jsx";

const Analytics = () => {
    const { shortenedUrl } = useParams();
    console.log(shortenedUrl);
    return (
        <div className="gird">
            <div className="flex">
                <BrowserBarChart shortUrl={shortenedUrl}/>
                <ClicksLineChart shortUrl={shortenedUrl}/>
            </div>
            <div className="flex space-x-3">
                <DevicePieChart shortUrl={shortenedUrl}/>
                <ReferrerBarChart shortUrl={shortenedUrl}/>
            </div>
            <LocationList shortUrl={shortenedUrl}/>
        </div>
    );

}

export default Analytics;