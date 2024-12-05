import Layout1 from "../oneLinkPages/Layout1.jsx";

const OneLink = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10 px-4">
            <div className="w-full max-w-lg bg-yellow-100 text-yellow-800 border border-yellow-400 rounded-lg p-4 mb-6 flex items-start">
                <span className="text-xl font-semibold mr-3">⚠️</span>
                <p className="text-sm leading-relaxed">
                    Note: This is for visualization. This feature will be added soon. We are working on it.
                </p>
            </div>
            <div className="w-full max-w-5xl bg-white shadow-md rounded-lg p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">OneLink Preview</h2>
                <div className="border-t border-gray-200 pt-6">
                    <Layout1 />
                </div>
            </div>
        </div>
    );
};

export default OneLink;