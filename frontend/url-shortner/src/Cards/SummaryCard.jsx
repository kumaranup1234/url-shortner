import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { fetchDashboardData } from '../store/slices/dashboardSlice';

const SummaryCard = () => {
    const dispatch = useDispatch();
    const { totalUrls, totalClicks, loading } = useSelector(state => state.dashboard);

    useEffect(() => {
        dispatch(fetchDashboardData());
    }, [dispatch]);

    const linksPercentage = Math.min((totalUrls / 1000) * 100, 100);
    const clicksPercentage = Math.min((totalClicks / 50000) * 100, 100);

    if (loading) {
        return (
            <div className="w-full bg-white rounded-xl shadow-sm animate-pulse">
                <div className="bg-gray-200 h-12 rounded-t-xl"></div>
                <div className="p-6 space-y-6">
                    <div className="space-y-3">
                        <div className="bg-gray-200 h-4 rounded-full"></div>
                        <div className="flex justify-between">
                            <div className="bg-gray-200 h-4 w-20 rounded"></div>
                            <div className="bg-gray-200 h-4 w-16 rounded"></div>
                        </div>
                    </div>
                    <div className="space-y-3">
                        <div className="bg-gray-200 h-4 rounded-full"></div>
                        <div className="flex justify-between">
                            <div className="bg-gray-200 h-4 w-20 rounded"></div>
                            <div className="bg-gray-200 h-4 w-16 rounded"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="bg-gradient-to-r from-teal-600 to-teal-700 text-white p-4 rounded-t-xl">
                <h3 className="font-semibold text-lg">Usage Overview</h3>
            </div>

            <div className="p-6 space-y-8">
                {/* Short Links Progress */}
                <div className="space-y-3">
                    <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-700">Short Links</span>
                        <span className="text-sm text-gray-500">{totalUrls}/1,000</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                        <div
                            className="bg-gradient-to-r from-blue-500 to-blue-600 h-full rounded-full transition-all duration-700 ease-out"
                            style={{ width: `${linksPercentage}%` }}
                        ></div>
                    </div>
                    <div className="text-xs text-gray-500">
                        {linksPercentage.toFixed(1)}% of limit used
                    </div>
                </div>

                {/* Stats Tracked Progress */}
                <div className="space-y-3">
                    <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-700">Stats Tracked</span>
                        <span className="text-sm text-gray-500">{totalClicks.toLocaleString()}/50,000</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                        <div
                            className="bg-gradient-to-r from-purple-500 to-purple-600 h-full rounded-full transition-all duration-700 ease-out"
                            style={{ width: `${clicksPercentage}%` }}
                        ></div>
                    </div>
                    <div className="text-xs text-gray-500">
                        {clicksPercentage.toFixed(1)}% of limit used
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SummaryCard;