import BrowserBarChart from "../Components/BrowserBarChart.jsx";
import ClicksLineChart from "../Components/ClicksLineChart.jsx";
import DevicePieChart from "../Components/DevicePieChart.jsx";
import ReferrerBarChart from "../Components/ReferrerBarChart.jsx";
import TopPerformanceParent from "../Components/TopPerformanceParent.jsx";
import LocationList from "../Components/LocationList.jsx";
import {Link} from "react-router-dom";
import OsPieChart from "../Components/OsPieChart.jsx";
import axiosInstance from "../utils/axiosInstance.js";
import React, {Suspense, useEffect, useState} from "react";
import toast from "react-hot-toast";
import InfoCard from "../Cards/InfoCard.jsx";
import WorldMap from "../Components/WorldMap.jsx";
import TopPerformingLink from "../Cards/TopPerformingLink.jsx";
import {InfinitySpin} from "react-loader-spinner";

const Dashboard = () => {
    const [data, setData] = useState({});
    const [topUrlData, setTopUrlData] = useState();

    const getData = async () => {
        try {
            const response = await axiosInstance.get("api/users/getAll");
            console.log(response.data);
            setData({
                totalUrls : response.data.totalUrls,
                totalClicksSum: response.data.totalClicksSum,
            })
            setTopUrlData(response.data.topUrl)
            console.log("top url data", topUrlData);
            console.log("data", data);
        } catch (error) {
            toast.error(error.message);
        }
    }
    useEffect(() => {
        getData();
    },[])


    return (
        <div className="bg-gray-100 pt-2">
            <div className="bg-blue-100 border border-blue-400 text-blue-800 rounded-lg p-4 mb-4 mx-6">
                <p className="text-sm sm:text-base">
                    <strong>Note:</strong> Overall analytics of the short URL. For analytics of individual clicks of a
                    URL, please visit
                    <Link to="/links"
                          className="font-bold underline text-blue-700 hover:text-blue-800"> Links</Link> and click the
                    stats button.
                </p>
            </div>

            <div className="flex flex-wrap md:flex-nowrap space-y-6 md:space-y-0 md:space-x-6 p-2 ml-4 mr-4">
                <div className="w-full md:w-1/2 lg:w-1/2 bg-white shadow-lg p-4 rounded-lg">
                    <InfoCard heading={"Total short urls created"} info={data.totalUrls}/>
                </div>
                <div className="w-full md:w-1/2 lg:w-1/2  bg-white shadow-lg p-4 rounded-lg">
                    <InfoCard heading={"Total overall clicks from all Urls"} info={data.totalClicksSum}/>
                </div>
            </div>

            <div className="flex flex-wrap md:flex-nowrap space-y-6 md:space-y-0 md:space-x-6 p-2 ml-4 mr-4">
                <div className="w-full bg-white shadow-lg p-4 rounded-lg">
                    {topUrlData ? (
                        <TopPerformingLink
                            createdAt={topUrlData.createdAt}
                            originalUrl={topUrlData.originalUrl}
                            logo={topUrlData.logo}
                            title={topUrlData.title}
                            shortUrl={topUrlData.shortUrl}
                            totalClicks={topUrlData.totalClicks}
                        />
                    ) : (
                        <div className="rounded-lg p-4 h-auto flex md:flex-col items-center justify-center bg-white">
                            <div>
                                <InfinitySpin
                                    visible={true}
                                    width="100"
                                    color="#4fa94d"
                                    ariaLabel="infinity-spin-loading"
                                />
                                <p className="mt-4 text-gray-600">Preparing your data...</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className="grid gap-6 p-4 sm:p-6">
                <div className="flex flex-wrap md:flex-nowrap space-y-6 md:space-y-0 md:space-x-6">
                    <div className="w-full md:w-1/2 bg-white shadow-lg p-4 rounded-lg">
                        <BrowserBarChart apiUrl={`/api/urls/clicks/getUserClicksByBrowser`}/>
                    </div>
                    <div className="w-full md:w-1/2 bg-white shadow-lg p-4 rounded-lg">
                        <ClicksLineChart apiUrl={`/api/urls/clicks/getUsersClicks`}/>
                    </div>
                </div>

                <div className="flex flex-wrap md:flex-nowrap space-y-6 md:space-y-0 md:space-x-6">
                    <div className="w-full md:w-1/2 bg-white shadow-lg p-4 rounded-lg">
                        <DevicePieChart apiUrl={`/api/urls/clicks/getUserDeviceClicks`}/>
                    </div>
                    <div className="w-full md:w-1/2 bg-white shadow-lg p-4 rounded-lg">
                        <ReferrerBarChart apiUrl={`/api/urls/clicks/getUserClicksByReferrer`}/>
                    </div>
                </div>

                <div className="flex flex-wrap md:flex-nowrap space-y-6 md:space-y-0 md:space-x-6">
                    <div className="w-full md:w-1/2 bg-white shadow-lg p-4 rounded-lg">
                        <TopPerformanceParent/>
                    </div>
                    <div className="w-full md:w-1/2 bg-white shadow-lg p-4 rounded-lg">
                        <LocationList apiUrl={`/api/urls/clicks/getUserClicksByLocations`}/>
                    </div>
                </div>

                <div className="flex flex-wrap md:flex-nowrap space-y-6 md:space-y-0 md:space-x-6">
                    <div className="w-full md:w-1/2 bg-white shadow-lg p-4 rounded-lg">
                        <OsPieChart apiUrl={`/api/urls/clicks/getUserClicksByOs`}/>
                    </div>
                    <div className="w-full md:w-1/2 bg-white shadow-lg p-4 rounded-lg">
                        <WorldMap apiUrl={`/api/urls/clicks/country`}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;
