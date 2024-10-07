import {useState} from "react";
import axiosInstance from "../utils/axiosInstance.js";
import toast from "react-hot-toast";

const CreateNewLink = ({ onSuccess }) => {
    const [originalUrl, setOriginalUrl] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!originalUrl) {
            toast.error("Enter URL");
            return;
        }
        try {
            const response = await axiosInstance.post("/api/urls/manage/shorten", { url: originalUrl });
            if (response.data.success === true) {
                setOriginalUrl("");
                onSuccess();
                toast.success("Short URL Created successfully!");
            }
        } catch (error) {
            console.error("Error creating new link", error);
        }
    }


    return (
        <div className="ml-6">
            <div className="flex justify-center mt-10">
                <form className="border-2 border-gray-200 flex items-center rounded">
                    <input
                        type="text"
                        name="url"
                        placeholder="Enter the link here"
                        value={originalUrl}
                        onChange={(e) => {
                            setOriginalUrl(e.target.value)
                        }}
                        className="border-none focus:ring-2 focus:ring-blue-500 w-80 md:w-[500px] lg:w-[500px] h-14 px-4 text-lg outline-none"
                    />
                    <button
                        onClick={handleSubmit}
                        className="rounded text-white bg-blue-600 font-bold w-28 h-14 hover:bg-blue-800 transition duration-200">
                        Shorten URL
                    </button>
                </form>
            </div>
        </div>
    )
}

export default CreateNewLink;
