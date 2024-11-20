const Layout1 = () => {
    return (
        <>
            <div className="flex h-screen justify-center items-center">
                <div className="relative bg-gradient-to-br from-green-300 to-yellow-100 p-6 rounded-lg shadow-2xl shadow-green-900 w-96">

                    {/* Profile Picture */}
                    <div className="flex justify-center">
                        <img
                            src="https://clipartcraft.com/images/assassins-creed-logo-gold.png"
                            alt="Profile Picture"
                            className="rounded-full w-28 h-28"
                        />
                    </div>

                    {/* Profile Name and Description */}
                    <div className="text-center mt-4">
                        <h1 className="text-lg font-bold font-serif">Anurag Anand</h1>
                        <p className="text-gray-600">
                            Discover my work and see where you can find me &#128128;
                        </p>
                    </div>

                    {/* Options List */}
                    <div className="mt-8 space-y-6">
                        <a
                            href="#"
                            className="block bg-white rounded-full text-center p-3 shadow-md shadow-black hover:bg-gray-100"
                        >
                            <span className="font-semibold font-sans">Website</span>
                        </a>

                        <a
                            href="#"
                            className="block bg-white rounded-full text-center p-3 shadow-md shadow-black hover:bg-gray-100"
                        >
                            <span className="font-semibold font-sans">Twitter</span>
                        </a>

                        <a
                            href="#"
                            className="block bg-white rounded-full text-center p-3 shadow-md shadow-black hover:bg-gray-100"
                        >
                            <span className="font-semibold font-sans">Portfolio</span>
                        </a>

                        <a
                            href="#"
                            className="block bg-white rounded-full text-center p-3 shadow-md shadow-black hover:bg-gray-100"
                        >
                            <span className="font-semibold font-sans">Pinterest</span>
                        </a>

                        <a
                            href="#"
                            className="block bg-white rounded-full text-center p-3 shadow-md shadow-black hover:bg-gray-100"
                        >
                            <span className="font-semibold font-sans">Instagram</span>
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
};
export default Layout1;
