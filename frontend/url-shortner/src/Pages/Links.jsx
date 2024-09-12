import LinkCard from "../Cards/LinkCard.jsx";
import {useEffect, useState} from "react";
import axiosInstance from "../utils/axiosInstance.js";

const Links = () => {
    const [allLinks, setAllLinks] = useState([]);


    const getAllLinks = async () => {
        try {
            const response = await axiosInstance.get("/api/urls/manage/user-urls");
            setAllLinks(response.data.userUrls);
            console.log(response.data.userUrls)
        } catch (e) {
            console.error(e);
        }
    }

    useEffect(() => {
        getAllLinks();
    },  [])
    return (
        <div className="bg-gray-100">
            <div className="flex ml-16 mt-20">
                <div>
                    <p className="text-2xl font-bold">TrimUrl Links</p>
                </div>
                <div className="ml-auto mr-16">
                    <button
                        className="text-white bg-blue-600 font-bold w-28 h-10 hover:bg-blue-800 transition duration-200 rounded">
                        Create Link
                    </button>
                </div>
            </div>
            <div className="border mt-10 ml-16 mr-16">
            </div>
            <div className="links-container">
                {allLinks.map((link) => (
                    <LinkCard
                        key={link._id}
                        originalUrl={link.originalUrl}
                        shortenedUrl={link.shortUrl}
                        date={new Date(link.createdAt).toLocaleDateString()} // Assuming you want to display the created date
                    />
                ))}
                <p className="text-center mb-4 text-bold m-4 p-4">--- You've reached the end of your links ---</p>
            </div>
        </div>
    )
}

export default Links;