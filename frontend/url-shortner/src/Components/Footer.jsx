import Like from "../assets/icon-like.png"
import URL from "../assets/icon-url.png"
import Stats from "../assets/icon-statistics.png"
const Footer = () => {
    return (
        <div>
            <div className="mt-8">
                <p className="text-2xl text-gray-700 font-bold ml-64">Simple and fast URL shortener!</p>
                <p className="text-left ml-64 mt-2">
                    ShortURL allows to shorten long links from Instagram, Facebook, YouTube, Twitter, Linked In,
                    <br/>WhatsApp, TikTok, blogs and sites. Just paste the long URL and click the Shorten URL button. On the
                    <br/>next page, copy the shortened URL and share it on sites, chat and emails. After shortening the URL,
                    <br/>check how many clicks it received.
                </p>
            </div>
            <div className="mt-8">
                <p className="text-2xl text-gray-700 font-bold ml-64">Shorten, share and track</p>
                <p className="text-left ml-64 mt-2">
                    Your shortened URLs can be used in publications, documents, advertisements, blogs, forums, instant<br/>
                    messages, and other locations. Track statistics for your business and projects by monitoring the<br/>
                    number of hits from your URL with our click counter.
                </p>
            </div>
            <div className="flex justify-center mt-10 space-x-6">
                <div>
                    <img src={Like} alt="Shorten" className="ml-24"/>
                    <h3 className="font-bold text-gray-600 ml-28">Easy</h3>
                    <p className="mt-4 text-center mr-4">ShortURL is easy and fast, enter the long <br/>
                        link to get your shortened link</p>
                </div>
                <div>
                    <img src={URL} alt="Url" className="ml-20" />
                    <h3 className="font-bold text-gray-600 ml-20">Shortened</h3>
                    <p className="mt-4 text-center mr-4">
                        Use any link, no matter what size,<br/>
                        ShortURL always shortens
                    </p>
                </div>
                <div>
                    <img src={Stats} alt="statistics" className="ml-20"/>
                    <h3 className="font-bold text-gray-600 ml-20">Statistics</h3>
                    <p className="mt-4 text-center">
                        Check the number of clicks that your<br/>
                        shortened URL received
                    </p>
                </div>
            </div>
            <div className="mt-20 bg-gray-800 pb-6">
                <div className="w-full h-1 bg-blue-600 my-4"></div>
                <div>
                    <p className="text-center text-white">© 2024 ShortUrl - Tool to shorten a long link</p>
                </div>
            </div>
        </div>
    )

}

export default Footer;