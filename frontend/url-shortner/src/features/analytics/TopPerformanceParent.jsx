import { useSelector } from "react-redux";
import TopPerformance from "../../Cards/TopPerformance.jsx";

const TopPerformanceParent = () => {
    const { topPerformingDate, topPerformingLocation } = useSelector(state => state.analytics);

    return (
        <div className="grid grid-rows-2 h-full gap-6">
            <TopPerformance
                heading="Top Performing Date"
                name={topPerformingDate.date}
                clicks={topPerformingDate.clicks}
                location={false}
            />
            <TopPerformance
                heading="Top Performing Location"
                name={topPerformingLocation.name}
                clicks={topPerformingLocation.clicks}
                location={true}
            />
        </div>
    );
};

export default TopPerformanceParent;
