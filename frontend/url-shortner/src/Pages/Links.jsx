import LinkCard from "../Cards/LinkCard.jsx";
import { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance.js";
import SummaryCard from "../Cards/SummaryCard.jsx";
import AboutCard from "../Cards/AboutCard.jsx";
import CreateNewLink from "../Components/CreateNewLink.jsx";
import SkeletonLoader from "../Components/SkeletonLoader.jsx";
import noImage from "../assets/no-image2.svg"
import {formatDate} from "../utils/formatDate.js";

const Links = () => {
    const [refresh, setRefresh] = useState(false);
    const [allLinks, setAllLinks] = useState([]);
    const [loading, setLoading] = useState(true);

    const getAllLinks = async () => {
        try {
            const response = await axiosInstance.get("/api/urls/manage/user-urls");
            setAllLinks(response.data.userUrls);
            console.log(response.data.userUrls);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getAllLinks();
    }, [refresh]);

    // Trigger refresh by toggling the state
    const triggerRefresh = () => {
        setRefresh(prev => !prev);
    };

    return (
        <div className="lg:px-8 mt-2">
            <div className="flex justify-center max-w-full px-4">
                <div>
                    <div>
                        <CreateNewLink onSuccess={triggerRefresh} />
                    </div>
                    <div className="flex mt-10">
                        {/* Links section */}
                        <div className="flex-1">
                            <div className="grid grid-cols-1 gap-2 md:gap-6">
                                { loading ? (
                                    <>
                                        <SkeletonLoader />
                                        <SkeletonLoader />
                                        <SkeletonLoader />
                                    </>
                                ): allLinks.length === 0 ? (
                                    <div className="flex flex-col items-center justify-center mb-24">
                                        <p className="text-gray-500 text-lg">No Short URLs created yet. Create your first
                                            one!</p>
                                    </div>
                                ) : (
                                    allLinks.map((link) => (
                                        <LinkCard
                                            key={link._id}
                                            originalUrl={link.originalUrl}
                                            shortenedUrl={link.shortUrl}
                                            qrCode={link?.qrCode}
                                            totalClicks={link.totalClicks}
                                            date={formatDate(link.createdAt)}
                                            title={link.title}
                                            logo={link.logo ? link.logo : noImage}
                                            onEditSuccess={getAllLinks}
                                            onDeleteSuccess={triggerRefresh}
                                        />
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* SummaryCard section */}
                <div className="w-1/3 ml-40 mt-10 hidden xl:block">
                    <SummaryCard refresh={refresh}/>
                    <div className="mt-12">
                        <AboutCard/>
                    </div>
                </div>
            </div>
            {allLinks.length > 0 && <p className="text-center text-bold mt-10 md:mt-10 mb-4">--- You've reached the end of your links ---</p>}
        </div>
    );
};

export default Links;
