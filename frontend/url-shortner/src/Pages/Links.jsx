import LinkCard from "../Cards/LinkCard.jsx";
import { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance.js";
import { useRecoilValue } from "recoil";
import { authState } from "../recoil/atoms.js";
import SummaryCard from "../Cards/SummaryCard.jsx";

const Links = () => {
    const { isLoggedIn } = useRecoilValue(authState);
    console.log("is logged in value", isLoggedIn);
    const [allLinks, setAllLinks] = useState([]);

    const getAllLinks = async () => {
        try {
            const response = await axiosInstance.get("/api/urls/manage/user-urls");
            setAllLinks(response.data.userUrls);
            console.log(response.data.userUrls);
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        getAllLinks();
    }, []);

    return (
        <div className="mx-16 mt-20">
            {/* Header */}
            <div className="flex">
                <div>
                    <p className="text-2xl font-bold">TrimUrl Links</p>
                </div>
                <div className="ml-auto">
                    <button
                        className="text-white bg-blue-600 font-bold w-28 h-10 hover:bg-blue-800 transition duration-200 rounded">
                        Create Link
                    </button>
                </div>
            </div>
            <div className="border mt-10"></div>
            {/* Flexbox layout with LinkCards and SummaryCard */}
            <div className="flex space-x-10 mt-10">
                {/* Links section */}
                <div className="flex-1">
                    <div className="grid grid-cols-1 gap-6">
                        {allLinks.map((link) => (
                            <LinkCard
                                key={link._id}
                                originalUrl={link.originalUrl}
                                shortenedUrl={link.shortUrl}
                                qrCode={link?.qrCode}
                                date={new Date(link.createdAt).toLocaleDateString()} // Assuming you want to display the created date
                            />
                        ))}
                    </div>
                </div>

                {/* SummaryCard section */}
                <div className="w-1/3">
                    <SummaryCard/>
                </div>
            </div>
            <p className="text-center mb-4 text-bold m-4 p-4">--- You've reached the end of your links ---</p>
        </div>
    );
};

export default Links;
