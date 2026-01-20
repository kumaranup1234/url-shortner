import { InfinitySpin } from "react-loader-spinner";
import React from "react";

const LoadingSpinner = () => {
    return (
        <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
            <div className="flex flex-col items-center">
                <InfinitySpin
                    visible={true}
                    width="200"
                    color="#4fa94d"
                    ariaLabel="infinity-spin-loading"
                />
                <p className="mt-2">Loading...</p>
            </div>
        </div>
    );
};

export default LoadingSpinner;
