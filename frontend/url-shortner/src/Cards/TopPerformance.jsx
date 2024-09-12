import orb from "../assets/orbIcon.svg";
import dots from "../assets/sixDots.svg";
import { useState } from "react";

const TopPerformance = ({ startingDate, endingDate, bestDay, place, clicks }) => {
    const [data, setData] = useState({
        heading: "Top performing date",
        name: bestDay,
    });

    if (bestDay === 0) {
        setData({
            heading: "Top performing locations",
            name: place,
        });
    }

    return (
        <div className="p-4 rounded border w-5/12 h-auto">
            <div className="flex items-center mb-4">
                <img src={dots} alt="dotsIcon" className="w-5 h-5 mr-2" />
                <p className="text-base font-bold">{data.heading}</p>
            </div>
            <div className="flex flex-col items-center">
                <div className="flex items-center mb-2">
                    <img src={orb} alt="orbIcon" className="w-8 h-8 mr-2" />
                    <h3 className="text-lg font-semibold">{data.name}</h3>
                </div>
                <p className="text-base mb-1">{clicks} clicks</p>
                <p className="text-sm text-gray-600">{startingDate} - {endingDate}</p>
            </div>
        </div>
    );
};

export default TopPerformance;
