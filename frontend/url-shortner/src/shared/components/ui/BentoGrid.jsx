const BentoGridItem = ({ title, description, icon, className }) => {
    return (
        <div className={`
            relative overflow-hidden rounded-3xl p-8
            bg-white border border-gray-100
            shadow-lg shadow-gray-200/50 hover:shadow-xl hover:shadow-blue-500/5 hover:-translate-y-1
            transition-all duration-300
            group
            ${className}
        `}>
            {/* Hover Gradient Effect - Subtle */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-indigo-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            <div className="relative z-10 flex flex-col h-full">
                <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center text-3xl mb-6 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                    {icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3 tracking-tight">{title}</h3>
                <p className="text-gray-500 text-base leading-relaxed flex-grow">
                    {description}
                </p>

                {/* Decorative Arrow */}
                <div className="mt-6 flex items-center text-blue-600 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-[-10px] group-hover:translate-x-0">
                    Learn more <span className="ml-2">→</span>
                </div>
            </div>
        </div>
    );
};

const BentoGrid = ({ items }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {items.map((item, idx) => (
                <BentoGridItem
                    key={idx}
                    title={item.title}
                    description={item.desc}
                    icon={item.icon}
                    className={idx === 0 || idx === 3 ? "md:col-span-2" : ""}
                />
            ))}
        </div>
    );
};

export default BentoGrid;
