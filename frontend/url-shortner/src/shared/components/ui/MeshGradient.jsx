const MeshGradient = () => {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Base light background */}
            <div className="absolute inset-0 bg-white"></div>

            {/* Gradient Blobs - Softer Pastels */}
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-100/50 rounded-full blur-[120px] animate-pulse-slow"></div>
            <div className="absolute top-[20%] right-[-10%] w-[40%] h-[40%] bg-indigo-100/50 rounded-full blur-[100px] animate-float"></div>
            <div className="absolute bottom-[-10%] left-[20%] w-[60%] h-[60%] bg-purple-100/40 rounded-full blur-[140px] animate-pulse-slower"></div>

            {/* Noise Overlay for texture - lighter opacity */}
            <div className="absolute inset-0 opacity-[0.4] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay"></div>

            <style>{`
                @keyframes float {
                    0%, 100% { transform: translate(0, 0); }
                    50% { transform: translate(-20px, 20px); }
                }
                @keyframes pulse-slow {
                    0%, 100% { opacity: 0.3; transform: scale(1); }
                    50% { opacity: 0.4; transform: scale(1.1); }
                }
                @keyframes pulse-slower {
                    0%, 100% { opacity: 0.2; transform: scale(1); }
                    50% { opacity: 0.3; transform: scale(1.05); }
                }
                .animate-float { animation: float 10s ease-in-out infinite; }
                .animate-pulse-slow { animation: pulse-slow 8s ease-in-out infinite; }
                .animate-pulse-slower { animation: pulse-slower 12s ease-in-out infinite; }
            `}</style>
        </div>
    );
};

export default MeshGradient;
