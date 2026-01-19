import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { fetchUrls } from '../../store/slices/urlSlice';
import SummaryCard from "../../Cards/SummaryCard.jsx";
import AboutCard from "../../Cards/AboutCard.jsx";
import CreateNewLink from "./CreateNewLink.jsx";
import SkeletonLoader from "../../Components/SkeletonLoader.jsx";
import OptimizedImage from "../../shared/components/ui/OptimizedImage.jsx";
import noImage from "../../assets/no-image2.svg"
import {formatDate} from "../../shared/utils/formatDate.js";
import LinkCard from "./LinkCard.jsx";

const Links = () => {
    const dispatch = useDispatch();
    const { urls, loading, error } = useSelector(state => state.urls);

    useEffect(() => {
        dispatch(fetchUrls());
    }, [dispatch]);

    const handleRefresh = () => {
        dispatch(fetchUrls());
    };

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px]">
                <div className="text-red-600 mb-4">
                    <svg className="w-12 h-12 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                </div>
                <p className="text-gray-600 text-lg mb-4">Failed to load links</p>
                <button 
                    onClick={handleRefresh}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                    Try Again
                </button>
            </div>
        );
    }

    return (
        <div className="lg:px-8 mt-2 bg-gray-50 min-h-screen">
            <div className="flex justify-center max-w-full px-4">
                <div className="w-full max-w-7xl">
                    <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                        <CreateNewLink onSuccess={handleRefresh} />
                    </div>
                    
                    <div className="flex gap-8">
                        {/* Links section */}
                        <div className="flex-1">
                            <div className="space-y-4">
                                {loading ? (
                                    <>
                                        <SkeletonLoader />
                                        <SkeletonLoader />
                                        <SkeletonLoader />
                                    </>
                                ) : urls.length === 0 ? (
                                    <div className="bg-white rounded-xl shadow-sm p-12 text-center">
                                        <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                                            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                                            </svg>
                                        </div>
                                        <h3 className="text-xl font-semibold text-gray-900 mb-2">No links yet</h3>
                                        <p className="text-gray-500 text-lg">Create your first shortened URL to get started!</p>
                                    </div>
                                ) : (
                                    urls.map((link) => (
                                        <div key={link._id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                                            <LinkCard
                                                originalUrl={link.originalUrl}
                                                shortenedUrl={link.shortUrl}
                                                qrCode={link?.qrCode}
                                                totalClicks={link.totalClicks}
                                                date={formatDate(link.createdAt)}
                                                title={link.title}
                                                logo={link.logo ? link.logo : noImage}
                                                onEditSuccess={handleRefresh}
                                                onDeleteSuccess={handleRefresh}
                                            />
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="w-80 hidden xl:block">
                            <div className="sticky top-6 space-y-6">
                                <SummaryCard />
                                <AboutCard />
                            </div>
                        </div>
                    </div>
                    
                    {urls.length > 0 && (
                        <div className="text-center py-8">
                            <div className="inline-flex items-center px-4 py-2 bg-gray-100 rounded-full">
                                <span className="text-gray-600 font-medium">You've reached the end of your links</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Links;
