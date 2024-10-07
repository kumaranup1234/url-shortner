
const AboutCard = () =>  {
    return (
        <div className="w-full bg-gray-100">
            {/* Navbar Section */}
            <div className="flex mb-4 bg-teal-900 text-white p-4">
                <p className="text-white">
                    About T.LY
                </p>
            </div>

            <div className="p-6">
                <p>
                    Creating, sharing and monitoring your
                    short links is easy with <span className="font-bold">T.LY</span>.
                    We help you work faster and more intelligently
                    with features like branded links and ability to
                    update the redirect link to any link.
                </p>
            </div>
        </div>
    );
}

export default AboutCard;