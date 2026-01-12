import { Link } from "react-router";
import { MdCloudOff } from "react-icons/md";
import { useContext } from "react";
import { AuthContext } from "../provider/AuthContext";

const ServerError = () => {
    const { theme } = useContext(AuthContext);

    return (
        <div
            className={`
                min-h-screen flex items-center justify-center px-4`}
        >
            <div
                className={`
                    max-w-md w-full rounded-2xl p-8 text-center shadow-xl
                    ${theme === "dark"
                        ? "bg-gray-900 text-gray-200"
                        : "bg-white text-gray-800"
                    }
                `}
            >
                {/* Icon */}
                <div className="flex justify-center mb-4">
                    <MdCloudOff
                        className={`
                            text-6xl
                            ${theme === "dark" ? "text-red-400" : "text-red-500"}
                        `}
                    />
                </div>

                {/* Title */}
                <h1 className="text-3xl font-bold mb-2">
                    500 – Server Error
                </h1>

                {/* Message */}
                <p className="text-sm opacity-80 mb-6">
                    Oops! Something went wrong on our server.
                    Please try again later or return to safety.
                </p>

                {/* Actions */}
                <div className="flex flex-col gap-3">
                    <button
                        onClick={() => window.location.reload()}
                        className="btn btn-outline"
                    >
                        Retry
                    </button>

                    <Link
                        to="/"
                        className={`
                            btn text-white
                            ${theme === "dark"
                                ? "bg-indigo-500 hover:bg-indigo-600"
                                : "bg-[#0303b8] hover:bg-[#000064]"
                            }
                        `}
                    >
                        Go to Home
                    </Link>
                </div>

                {/* Footer */}
                <p className="text-xs opacity-60 mt-6">
                    If the problem persists, please contact support.
                </p>
            </div>
        </div>
    );
};

export default ServerError;
