import Like from "../assets/icon-like.png";
import URL from "../assets/icon-url.png";
import Stats from "../assets/icon-statistics.png";

const Footer = () => {
    return (
        <div className="bg-gray-50 py-8">
            <div className="p-4 md:px-20">
                <p className="text-lg md:text-2xl text-gray-700 font-bold text-center md:text-left">
                    Simple and fast URL shortener!
                </p>
                <p className="text-sm md:text-base text-gray-600 mt-2 text-center md:text-left">
                    ShortURL allows you to shorten long links from Instagram, Facebook, YouTube, Twitter, LinkedIn,
                    WhatsApp, TikTok, blogs, and sites. Just paste the long URL and click the Shorten URL button. On the
                    next page, copy the shortened URL and share it on sites, chat, and emails. After shortening the URL,
                    check how many clicks it received.
                </p>
            </div>

            <div className="p-4 md:px-20 mt-8">
                <p className="text-lg md:text-2xl text-gray-700 font-bold text-center md:text-left">
                    Shorten, share and track
                </p>
                <p className="text-sm md:text-base text-gray-600 mt-2 text-center md:text-left">
                    Your shortened URLs can be used in publications, documents, advertisements, blogs, forums, instant
                    messages, and other locations. Track statistics for your business and projects by monitoring the
                    number of hits from your URL with our click counter.
                </p>
            </div>

            <div className="flex flex-col md:flex-row justify-center items-center mt-10 space-y-6 md:space-y-0 md:space-x-6 p-6">
                <div className="flex flex-col items-center text-center">
                    <img src={Like} alt="Shorten" className="w-16 h-16 md:w-20 md:h-20" />
                    <h3 className="font-bold text-gray-600 mt-4">Easy</h3>
                    <p className="mt-4 text-sm md:text-base">
                        ShortURL is easy and fast, enter the long
                        <br />
                        link to get your shortened link.
                    </p>
                </div>

                <div className="flex flex-col items-center text-center">
                    <img src={URL} alt="Url" className="w-16 h-16 md:w-20 md:h-20" />
                    <h3 className="font-bold text-gray-600 mt-4">Shortened</h3>
                    <p className="mt-4 text-sm md:text-base">
                        Use any link, no matter what size,
                        <br />
                        ShortURL always shortens.
                    </p>
                </div>

                <div className="flex flex-col items-center text-center">
                    <img src={Stats} alt="Statistics" className="w-16 h-16 md:w-20 md:h-20" />
                    <h3 className="font-bold text-gray-600 mt-4">Statistics</h3>
                    <p className="mt-4 text-sm md:text-base">
                        Check the number of clicks that your
                        <br />
                        shortened URL received.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Footer;
