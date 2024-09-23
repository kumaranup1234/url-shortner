import {useEffect, useState} from "react";
import axiosInstance from "../utils/axiosInstance.js";


const SummaryCard = () =>  {
    const [links, setLinks] = useState(0);
    const [statsTracked, setStatsTracked] = useState(0);


    const getAllData = async () => {
        try {
            const response = await axiosInstance.get('/api/users/getAll');
            setLinks(response.data.totalUrls);
            setStatsTracked(response.data.totalClicksSum)
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        getAllData();
    }, []);

    const linksPercentage = Math.min((links / 1000) * 100, 100);
    const clicksPercentage = Math.min((statsTracked / 50000) * 100, 100);
    return (
        <div className="w-full bg-gray-100">
            {/* Navbar Section */}
            <div className="flex mb-4 bg-teal-900 text-white p-4">
                <p className="text-white">
                   Total Usage
                </p>
            </div>

            <div className="p-6">
                <div className="bg-gray-200 rounded-full h-4 mb-4 w-11/12 mx-auto overflow-hidden">
                    <div
                        className="bg-blue-600 h-full rounded-full transition-all duration-500"
                        style={{width: `${linksPercentage}%`}}
                    ></div>
                </div>
                <div className="flex justify-between">
                    <p className="text-teal-900 font-bold ml-6">Short Links</p>
                    <p className="text-red-500 mr-6">{links}/1,000</p>
                </div>
                <div className="bg-gray-200 rounded-full h-4 mb-4 w-11/12 mx-auto overflow-hidden mt-8">
                    <div
                        className="bg-blue-600 h-full rounded-full transition-all duration-500"
                        style={{width: `${clicksPercentage}%`}}
                    ></div>
                </div>
                <div className="flex justify-between">
                    <p className="text-teal-900 font-bold ml-6">Stats Tracked</p>
                    <p className="text-red-500 mr-6">{statsTracked}/50,000</p>
                </div>
            </div>
        </div>
    );
}

export default SummaryCard;