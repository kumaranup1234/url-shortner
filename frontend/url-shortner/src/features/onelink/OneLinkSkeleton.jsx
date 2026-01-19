const OneLinkSkeleton = () => {
    return (
        <div className="flex flex-col items-center bg-white p-2 rounded-md max-w-[100px]">
            <header className="w-full flex flex-col items-center space-y-1">
                <div className="w-10 h-10 rounded-full bg-gray-300"></div>
                <h1 className="h-2 w-12 bg-gray-300 rounded"></h1>
            </header>

            <main className="mt-2 w-full">
                <section className="space-y-1">
                    <div className="h-3 bg-gray-300 rounded-3xl"></div>
                    <div className="h-3 bg-gray-300 rounded-3xl"></div>
                    <div className="h-3 bg-gray-300 rounded-3xl"></div>
                    <div className="h-3 bg-gray-300 rounded-3xl"></div>
                    <div className="h-3 bg-gray-300 rounded-3xl"></div>
                </section>
            </main>
        </div>
    );
};

export default OneLinkSkeleton;
