import BrowserBarChart from "../Components/BrowserBarChart.jsx";
import ClicksLineChart from "../Components/ClicksLineChart.jsx";
import DevicePieChart from "../Components/DevicePieChart.jsx";
import ReferrerBarChart from "../Components/ReferrerBarChart.jsx";
import TopPerformanceParent from "../Components/TopPerformanceParent.jsx";
import LocationList from "../Components/LocationList.jsx";
import {Link} from "react-router-dom";
import OsPieChart from "../Components/OsPieChart.jsx";
import axiosInstance from "../utils/axiosInstance.js";
import {useEffect, useState} from "react";
import toast from "react-hot-toast";
import InfoCard from "../Cards/InfoCard.jsx";
import WorldMap from "../Components/WorldMap.jsx";

const Dashboard = () => {
    const [data, setData] = useState({});

    const getData = async () => {
        try {
            const response = await axiosInstance.get("api/users/getAll");
            setData({
                totalUrls : response.data.totalUrls,
                totalClicksSum: response.data.totalClicksSum,
            })
        } catch (error) {
            toast.error(error.message);
        }
    }
    useEffect(() => {
        getData();
    },[])


    return (
        <div>
            <div>
                <h4 className="p-4 ml-4">* Overall analytics of the short url. For analytics of individual clicks of a url, please visit <Link to="/links" className="font-bold underline">Links</Link> and clicks the stats button.</h4>
            </div>

            {/* InfoCards Section */}
            <div className="flex space-x-6 p-2 ml-4 mr-4">
                <div className="w-1/2 bg-white shadow-lg p-4 rounded-lg">
                    <InfoCard heading={"Total short urls created"} info={data.totalUrls} />
                </div>
                <div className="w-1/2 bg-white shadow-lg p-4 rounded-lg">
                    <InfoCard heading={"Total overall clicks from all Urls"} info={data.totalClicksSum} />
                </div>
            </div>

            {/* Charts Section */}
            <div className="grid gap-6 p-6">
                {/* Row 1: Browser Bar Chart and Clicks Line Chart */}
                <div className="flex space-x-6">
                    <div className="w-1/2 bg-white shadow-lg p-4 rounded-lg">
                        <BrowserBarChart apiUrl={`/api/urls/clicks/getUserClicksByBrowser`}/>
                    </div>
                    <div className="w-1/2 bg-white shadow-lg p-4 rounded-lg">
                        <ClicksLineChart apiUrl={`/api/urls/clicks/getUsersClicks`}/>
                    </div>
                </div>

                {/* Row 2: Device Pie Chart and Referrer Bar Chart */}
                <div className="flex space-x-6">
                    <div className="w-1/2 bg-white shadow-lg p-4 rounded-lg">
                        <DevicePieChart apiUrl={`/api/urls/clicks/getUserDeviceClicks`}/>
                    </div>
                    <div className="w-1/2 bg-white shadow-lg p-4 rounded-lg">
                        <ReferrerBarChart apiUrl={`/api/urls/clicks/getUserClicksByReferrer`}/>
                    </div>
                </div>

                {/* Row 3: Location List */}
                <div className="flex space-x-6">
                    <div className="w-1/2 bg-white shadow-lg p-4 rounded-lg">
                        <TopPerformanceParent/>
                    </div>
                    <div className="w-1/2 bg-white shadow-lg p-4 rounded-lg">
                        <LocationList apiUrl={`/api/urls/clicks/getUserClicksByLocations`}/>
                    </div>
                </div>

                {/* Row 4: OS Pie Chart */}
                <div className="flex space-x-6">
                    <div className="w-1/2 bg-white shadow-lg p-4 rounded-lg">
                        <OsPieChart apiUrl={`/api/urls/clicks/getUserClicksByOs`}/>
                    </div>
                    <div className="w-1/2 bg-white shadow-lg p-4 rounded-lg">
                        <WorldMap apiUrl={`/api/urls/clicks/country`}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;
