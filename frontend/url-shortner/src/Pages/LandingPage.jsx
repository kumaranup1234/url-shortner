import Footer from "../Components/Footer.jsx";
import {useState} from "react";
import {useNavigate} from 'react-router-dom'
import axiosInstance from "../utils/axiosInstance.js";

const LandingPage = () => {

    const [link, setLink] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!link) {
            setError("Please enter a valid link!");
            return;
        }
        setError(" ")
        try {

            const response = await axiosInstance.post("/url", {
                url: link
            })
            const id = response.data.id;
            console.log(id)

            if (response.data){
                navigate("/shortened", {
                    state: {
                        link,
                        shortId: id
                    }
                });
            }
        } catch (error){
            setError("An unexpected error occurred. Please try again");
        }
    }

    const handleCreate = () => {
        navigate("/login")
    }
    return (
        <div>
            <div className="text-center mt-10 mb-8">
                <p className="text-5xl text-blue-700 font-bold">Short URL</p>
            </div>
            <div className="max-w-3xl mx-auto border-2 p-8 bg-white shadow-lg rounded-lg">
                <div className="text-center">
                    <p className="text-3xl text-gray-700 font-bold">Paste the URL to be shortened</p>
                </div>
                <div>
                    <div className="flex justify-center mt-10">
                        <form className="border-2 flex items-center">
                            <input
                                type="text"
                                name="url"
                                placeholder="Enter the link here"
                                value={link}
                                onChange={(e) => {setLink(e.target.value)}}
                                className="border-none focus:ring-2 focus:ring-blue-500 w-80 md:w-[500px] lg:w-[500px] h-14 px-4 text-lg outline-none"
                            />
                            <button
                                onClick={handleSubmit}
                                className="ml-4 text-white bg-blue-600 font-bold w-28 h-14 hover:bg-blue-800 transition duration-200">
                                Shorten URL
                            </button>
                        </form>
                    </div>
                    {error && <p className="text-red-500 text-xl text-center mt-2">{error}</p>}
                    <div className="text-center mt-4">
                        <p>
                            ShortURL is a free tool to shorten URLs and generate short links
                        </p>
                        <p>
                            URL shortener allows to create a shortened link making it easy to share
                        </p>
                    </div>
                </div>
            </div>
            <div className="max-w-3xl mx-auto border-2 p-6 bg-white shadow-lg rounded-lg mt-10">
                <div className="text-center">
                    <p className="text-3xl text-gray-700 font-bold">Want More? Try Premium Features!</p>
                </div>
                <div>
                    <div className="text-center mt-4">
                        <p>
                            Custom short links, powerful dashboard, detailed analytics, API, UTM builder, QR codes,
                        </p>
                        <p>
                            browser extension, app integrations and support
                        </p>
                        <button className="ml-4 text-white bg-blue-600 font-bold w-44 h-14 hover:bg-blue-800 transition duration-200 rounded mt-8"
                                onClick={handleCreate}
                        >
                            Create Account
                        </button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default LandingPage;
