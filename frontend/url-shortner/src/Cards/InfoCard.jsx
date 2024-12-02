import dots from "../assets/sixDots.svg";
import orb from "../assets/orbIcon.svg";

const InfoCard = ({ heading, info }) => {
    return (
        <div className="p-6 rounded-lg border-2">

            <div className="flex items-center mb-4">
                <img src={dots} alt="dotsIcon" className="w-5 h-5 mr-2" />
                <p className="text-base font-bold">{heading}</p>
            </div>

            <div className="flex flex-col items-center">
                <div className="flex items-center mb-2">
                    <img src={orb} alt="orbIcon" className="w-8 h-8 mr-2" />
                    <p className="text-lg font-bold">{info}</p>
                </div>
            </div>
        </div>
    );
};

export default InfoCard;
