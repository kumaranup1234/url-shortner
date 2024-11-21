import Footer from "../Components/Footer.jsx";
import {useState} from "react";
import {useNavigate} from 'react-router-dom'
import axiosInstance from "../utils/axiosInstance.js";
import {isAuthenticated} from "../recoil/selectors.js";
import {useRecoilValue} from "recoil";
import toast from "react-hot-toast";
import MainFooter from "../Components/MainFooter.jsx";

const LandingPage = () => {

    const [link, setLink] = useState("");
    const isLoggedIn = useRecoilValue(isAuthenticated);

    let route = "/api/urls/manage/shorten";
    if (!isLoggedIn) {
        route = "/api/urls/manage/anon/shorten";
    }

    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!link) {
            toast.error("Please enter a valid link")
            return;
        }
        const toastId = toast.loading("Trimming your URL. Please wait!")
        try {
            const response = await axiosInstance.post(route, {
                url: link
            })
            const id = response.data.shortUrl;

            if (response.data){
                toast.dismiss(toastId);
                toast.success("URL trimmed successfully!");
                navigate("/shortened", {
                    state: {
                        link,
                        shortId: id
                    }
                });
            }
        } catch (error){
            if (error.response && error.response.data && error.response.data.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error("An unexpected error occurred. Please try again");
            }
        }
    }

    const handleCreate = () => {
        navigate("/login")
    }
    return (
        <>
        <div>
            <div className="w-full max-w-lg lg:max-w-3xl mx-auto border-2 p-8 bg-white shadow-lg rounded-lg mt-16">
                <div className="text-center">
                    <p className="text-lg md:text-xl lg:text-2xl text-gray-700 font-bold">Paste the URL to be shortened</p>
                </div>
                <div>
                    <div className="flex justify-center mt-10">
                        <form className="border-2 flex items-center">
                            <input
                                type="text"
                                name="url"
                                placeholder="Enter the link here"
                                value={link}
                                onChange={(e) => {
                                    setLink(e.target.value)
                                }}
                                className="border-none focus:ring-2 focus:ring-blue-500 w-80 md:w-[500px] lg:w-[500px] h-14 px-4 text-lg outline-none"
                            />
                            <button
                                onClick={handleSubmit}
                                className="w-full text-white bg-blue-600 font-bold md:w-28 h-14 hover:bg-blue-800 transition duration-200">
                                Shorten URL
                            </button>
                        </form>
                    </div>
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
                    <p className="text-lg md:text-xl lg:text-3xl text-gray-700 font-bold">Want More? Try Premium Features!</p>
                </div>
                <div>
                    <div className="text-center mt-4">
                        <p>
                            Custom short links, powerful dashboard, detailed analytics, API, UTM builder, QR codes,
                        </p>
                        <p>
                            browser extension, app integrations and support
                        </p>
                        <button
                            className="ml-4 text-white bg-blue-600 font-bold w-44 h-14 hover:bg-blue-800 transition duration-200 rounded mt-8"
                            onClick={handleCreate}
                        >
                            Create Account
                        </button>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
            <MainFooter />
        </>
    );
}

export default LandingPage;
