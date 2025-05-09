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
            const toastId = toast.loading('Creating new link');
            const response = await axiosInstance.post("/api/urls/manage/shorten", { url: originalUrl });
            if (response.data.success === true) {
                setOriginalUrl("");
                onSuccess();
                toast.dismiss(toastId);
                toast.success("Short URL Created successfully!");
            }
        } catch (error) {
            console.error("Error creating new link", error);
            toast.error("Failed while creating a new link.");
        }
    }


    return (
        <div className="md:ml-6">
            <div className="flex justify-center w-full mt-10">
                <form
                    className="border-2 border-gray-200 flex items-stretch rounded w-full mx-auto">
                    <input
                        type="text"
                        name="url"
                        placeholder="https://example.com/my-long-url"
                        value={originalUrl}
                        onChange={(e) => setOriginalUrl(e.target.value)}
                        className="px-4 border-none focus:ring-2 focus:ring-blue-500 flex-grow h-14 pl-4 text-lg outline-none rounded-l"
                    />
                    <button
                        onClick={handleSubmit}
                        className="text-white bg-blue-600 font-bold w-auto h-14 px-3 rounded-r hover:bg-blue-800 transition duration-200"
                    >
                        Shorten URL
                    </button>
                </form>
            </div>
        </div>
    )
}

export default CreateNewLink;
