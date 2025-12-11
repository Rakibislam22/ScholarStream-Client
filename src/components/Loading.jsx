import React from "react";

const Loading = () => {
    return (
        <div className="flex justify-center items-center h-screen bg-white/70 backdrop-blur-sm">
            <div className="flex flex-col items-center gap-3">

                <div className="w-12 h-12 border-4 border-[#0303b8] border-t-transparent rounded-full animate-spin"></div>

                <p className="text-primary text-lg font-semibold">
                    Loading, please wait...
                </p>
            </div>
        </div>
    );
};

export default Loading;