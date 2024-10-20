import orb from "../assets/orbIcon.svg";
import dots from "../assets/sixDots.svg";

const TopPerformance = ({ heading, name, clicks, location }) => {
    const endingDate = new Date();
    const startingDate = new Date(endingDate);
    startingDate.setDate(endingDate.getDate() - 10);

    return (
        <>
            <div className="bg-gray-200 p-4 rounded border w-full h-auto shadow-lg">
                <div className="flex items-center mb-4">
                    <img src={dots} alt="dotsIcon" className="w-5 h-5 mr-2"/>
                    <p className="text-base font-bold">{heading}</p>
                </div>
                {clicks > 0 ? <div className="flex flex-col items-center">
                    <div className="flex items-center mb-2">
                        <img src={orb} alt="orbIcon" className="w-8 h-8 mr-2"/>
                        <h3 className="text-lg font-bold">{name}</h3>
                    </div>
                    <p className="text-base font-semibold mb-1">{clicks} clicks + scans</p>
                    {location ? <p className="text-sm text-gray-600">
                            All time History of locations
                        </p> :
                        <p className="text-sm text-gray-600">
                            {startingDate.toLocaleDateString()} - {endingDate.toLocaleDateString()}
                        </p>}
                </div> : <div className="bg-gray-200 rounded-lg p-6 mb-2 flex items-center justify-center mt-4">
                    {!location ? <p className="text-lg font-semibold">
                        No clicks in the past 10 days.
                    </p> : <p className="text-lg font-semibold">
                        No data available.
                    </p>}
                </div>}
            </div>
        </>
    );
};

export default TopPerformance;
