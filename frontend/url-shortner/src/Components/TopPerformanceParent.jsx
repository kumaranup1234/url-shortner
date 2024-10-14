import { useRecoilValue } from "recoil";
import { topDateState, topLocationState } from "../recoil/atoms.js";
import TopPerformance from "../Cards/TopPerformance.jsx";

const TopPerformanceParent = () => {
    const topDate = useRecoilValue(topDateState);
    const topLocation = useRecoilValue(topLocationState);
    console.log("top date state",topDate);
    console.log("top location state",topLocation);


    return (
        <div className="flex flex-col space-y-4">
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
