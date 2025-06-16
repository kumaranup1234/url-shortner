import OneLinkInfoCard from "../Cards/OneLinkInfoCard.jsx";
import OneLinkCard from "../Cards/OneLinkCard.jsx";
import add from "../assets/add.svg";
import React, {useEffect, useState} from "react";
import {useNavigate,} from "react-router-dom";
import axiosInstance from "../utils/axiosInstance.js";
import toast from "react-hot-toast";
import {FRONTEND_BASE_URL} from '.././utils/constants.js'
import {formatDate} from "../utils/formatDate.js";

const OneLink = () => {
    const [oneLinkData, setOneLinkData] = useState({});
    const navigate = useNavigate();

    const getOneLinkData = async () => {
        try {
            const response = await axiosInstance.get('/api/onelink/my-page');
            setOneLinkData(response.data.data);
            console.log(response.data.data);
        } catch (error){
            console.error('Error fetching OneLink:', error);
            if (error.response) {
                console.error('Error response:', error.response.data);
                toast.error(error.response.data.message || 'Server error occurred');
            } else {
                toast.error('An error occurred while fetching your OneLink page');
            }
        }
    }

    const handleDeleteOneLink = async () => {
        try {
            const response = await axiosInstance.delete('/api/onelink/delete');
            if (response.data.success) {
                toast.success('Successfully deleted oneLink');
            }
        } catch (error){
            if (error.response) {
                console.error('Error response:', error.response.data);
                toast.error(error.response.data.message || 'Server error occurred');
            } else {
                toast.error('An error occurred while deleting the OneLink page');
            }
        }

    }


    useEffect(() => {
        getOneLinkData();
    }, [])
    return (
        <div className="mt-2">
            <div className="bg-blue-100 border border-blue-400 text-blue-800 rounded-lg p-4 mb-4 mx-6">
                <p className="text-sm sm:text-base">
                    <strong>Note:</strong> Currently one user can only make one OneLink page and have to select
                    from the set layout.
                    Click the create OneLink button to build you own OneLInk Page
                </p>
            </div>
            <div className="min-h-screen flex py-10 p-10">
                <div className="flex-1 w-full">
                    <div className="max-w-3xl">
                        <button
                            className="w-full flex items-center justify-center space-x-2 p-4 mb-4 rounded bg-teal-900 text-white hover:text-gray-200 transition"
                            onClick={() => {
                                navigate('/createOneLink');
                            }}>
                            <img src={add} alt="Edit" className="h-5 w-5"/>
                            <span>Create OneLink</span>
                        </button>
                    </div>

                    <div>
                        {oneLinkData && (
                            <OneLinkCard
                                oneLinkUrl={`${FRONTEND_BASE_URL}/${oneLinkData.username}`}
                                createdAt={formatDate(oneLinkData.createdAt)}
                                clicks="24"
                                views={oneLinkData.pageViews}
                                data={oneLinkData}
                                onDelete={handleDeleteOneLink}
                            />
                        )}
                    </div>
                </div>


                <div className="w-1/3 hidden xl:block">
                    <OneLinkInfoCard/>
                </div>
            </div>
        </div>

    );
};

export default OneLink;