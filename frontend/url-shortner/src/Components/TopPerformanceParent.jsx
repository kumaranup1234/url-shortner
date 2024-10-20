import { useRecoilValue } from "recoil";
import { topDateState, topLocationState } from "../recoil/atoms.js";
import TopPerformance from "../Cards/TopPerformance.jsx";

const TopPerformanceParent = () => {
    const topDate = useRecoilValue(topDateState);
    const topLocation = useRecoilValue(topLocationState);


    return (
        <div className="grid space-y-4 h-96">
            <TopPerformance
                heading="Top Performing Date"
                name={topDate.date}
                clicks={topDate.clicks}
                location={false}
            />
            <TopPerformance
                heading="Top Performing Location"
                name={topLocation.name}
                clicks={topLocation.clicks}
                location={true}
            />
        </div>
    );
};

export default TopPerformanceParent;
