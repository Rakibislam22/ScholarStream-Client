import { useContext } from "react";
import { Link } from "react-router";
import { MdBlock } from "react-icons/md";
import { AuthContext } from "../provider/AuthContext";

const Forbidden = () => {
    const { theme } = useContext(AuthContext);

    return (
        <div
            className={`min-h-screen flex items-center justify-center px-4
            ${theme === "dark"
                    ? "bg-gradient-to-br from-gray-900 to-gray-800"
                    : "bg-gradient-to-br from-slate-100 to-slate-200"
                }
        `}
        >
            <div
                className={`max-w-md w-full rounded-2xl shadow-xl p-8 text-center
                ${theme === "dark"
                        ? "bg-gray-800 text-gray-200"
                        : "bg-white text-gray-800"
                    }
            `}
            >
                <div className="flex justify-center mb-4">
                    <MdBlock
                        className={`text-6xl
                        ${theme === "dark"
                                ? "text-red-400"
                                : "text-red-500"
                            }
                    `}
                    />
                </div>

                <h1
                    className={`text-2xl font-bold mb-2
                    ${theme === "dark" ? "text-gray-100" : "text-gray-800"}
                `}
                >
                    Access Denied
                </h1>

                <p
                    className={`mb-6 text-sm
                    ${theme === "dark" ? "text-gray-400" : "text-gray-600"}
                `}
                >
                    You don’t have permission to access this page.
                    Please contact the administrator if you believe this is a mistake.
                </p>

                <div className="flex flex-col gap-3">
                    <Link
                        to="/"
                        className="btn bg-[#0303b8] hover:bg-[#000064] text-white rounded-full"
                    >
                        Go to Home
                    </Link>

                    <Link
                        to="/dashboard"
                        className={`btn btn-outline rounded-full
                        ${theme === "dark"
                                ? "border-gray-600 text-gray-200 hover:bg-gray-700"
                                : ""
                            }
                    `}
                    >
                        Back to Dashboard
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Forbidden;
