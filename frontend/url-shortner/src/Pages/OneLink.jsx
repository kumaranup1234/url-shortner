import OneLinkInfoCard from "../Cards/OneLinkInfoCard.jsx";
import OneLinkCard from "../Cards/OneLinkCard.jsx";
import add from "../assets/add.svg";
import React, { useEffect, useState } from "react";
import { useNavigate, } from "react-router-dom";
import axiosInstance from "../shared/utils/axiosInstance.js";
import { toast } from 'sonner';
import { BASE_URL as FRONTEND_BASE_URL } from '../shared/utils/constants.js'
import { formatDate } from "../shared/utils/helper.js";

const OneLink = () => {
    const [oneLinkData, setOneLinkData] = useState(null); // Initialize to null, not {}
    const navigate = useNavigate();

    const getOneLinkData = async () => {
        try {
            const response = await axiosInstance.get('/api/onelink/my-page');
            setOneLinkData(response.data.data);
            console.log(response.data.data);
        } catch (error) {
            console.error('Error fetching OneLink:', error);
            setOneLinkData(null); // Ensure it's null on error
            if (error.response) {
                // Don't show error toast for 404 (Not Found) as it just means user hasn't created one yet
                if (error.response.status !== 404) {
                    console.error('Error response:', error.response.data);
                    toast.error(error.response.data.message || 'Server error occurred');
                }
            } else {
                toast.error('An error occurred while fetching your OneLink page');
            }
        }
    }

    const handleDeleteOneLink = () => {
        toast("Are you sure you want to delete your OneLink?", {
            description: "This action cannot be undone.",
            action: {
                label: "Delete",
                onClick: async () => {
                    try {
                        const response = await axiosInstance.delete('/api/onelink/delete');
                        if (response.data.success) {
                            setOneLinkData(null); // Clear state immediately to remove ghost item
                            toast.success('Successfully deleted OneLink');
                        }
                    } catch (error) {
                        if (error.response) {
                            console.error('Error response:', error.response.data);
                            toast.error(error.response.data.message || 'Server error occurred');
                        } else {
                            toast.error('An error occurred while deleting the OneLink page');
                        }
                    }
                },
            },
            cancel: {
                label: "Cancel",
            },
            duration: 5000, // Give user enough time to decide
        });
    }


    useEffect(() => {
        getOneLinkData();
    }, [])

    return (
        <div className="bg-gray-50 min-h-screen py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col xl:flex-row gap-8 items-start">
                    {/* Main Content */}
                    <div className="flex-1 w-full min-w-0 space-y-6">
                        {/* Notice Banner */}
                        <div className="bg-blue-50 border border-blue-100 text-blue-800 rounded-xl p-4 flex items-start gap-3">
                            <span className="text-xl">ℹ️</span>
                            <p className="text-sm pt-0.5 leading-relaxed">
                                <span className="font-semibold">Note:</span> Currently, each user can create one unique OneLink page.
                                Click the create button below to get started with your personalized page.
                            </p>
                        </div>

                        {/* Create Button */}
                        {!oneLinkData && (
                            <div className="bg-white rounded-xl shadow-sm p-8 text-center border border-gray-100">
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">Start your Bio Page</h3>
                                <p className="text-gray-500 mb-6">Create a single hub for all your important links.</p>
                                <button
                                    className="inline-flex items-center justify-center space-x-2 px-6 py-3 rounded-xl bg-gray-900 text-white font-medium hover:bg-black transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                                    onClick={() => navigate('/createOneLink')}
                                >
                                    <img src={add} alt="" className="h-5 w-5 invert" />
                                    <span>Create OneLink</span>
                                </button>
                            </div>
                        )}

                        {/* Only show "Create OneLink" button if data exists IF user wants to create another? 
                            The original code showed the button even if data exists? 
                            Logic: "Currently one user can only make one OneLink page".
                            So if data exists, hide button? 
                            Original code: Showed button ALWAYS.
                            Wait, "currently one user can only make one OneLink page". 
                            I'll keep the button logic as is but maybe disable it if data exists? 
                            Actually, the user can DELETE then CREATE. 
                            Let's keep the button but style it nicely.
                        */}

                        {oneLinkData && (
                            <>
                                <div className="mb-2">  {/* Just a spacer now, removed the box */}
                                    {/* <h2 className="text-xl font-bold text-gray-900 mb-4">Your OneLink Page</h2> */}
                                    {/* Removed "Your OneLink Page" header box entirely as the Card itself has the title now */}
                                </div>
                                <OneLinkCard
                                    oneLinkUrl={`${window.location.origin}/onelink/${oneLinkData.username}`}
                                    createdAt={formatDate(oneLinkData.createdAt)}
                                    clicks="24"
                                    views={oneLinkData.pageViews}
                                    data={oneLinkData}
                                    onDelete={handleDeleteOneLink}
                                />
                            </>
                        )}

                        {!oneLinkData && (
                            <div className="flex justify-center pt-8">
                                {/* Placeholder or empty state if needed */}
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="w-80 flex-shrink-0 hidden xl:block sticky top-8">
                        <OneLinkInfoCard />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OneLink;