import { useContext } from "react";
import { Link, useRouteError } from "react-router";
import { MdErrorOutline } from "react-icons/md";
import { AuthContext } from "../provider/AuthContext";

const ErrorPage = () => {
    const error = useRouteError();
    const { theme } = useContext(AuthContext);

    const status = error?.status || 404;
    const message =
        error?.statusText ||
        error?.message ||
        "Something went wrong. Please try again later.";

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
                    <MdErrorOutline
                        className={`text-6xl
                        ${theme === "dark"
                                ? "text-orange-400"
                                : "text-orange-500"
                            }
                    `}
                    />
                </div>

                <h1
                    className={`text-3xl font-bold mb-1
                    ${theme === "dark" ? "text-gray-100" : "text-gray-800"}
                `}
                >
                    {status}
                </h1>

                <h2
                    className={`text-xl font-semibold mb-2
                    ${theme === "dark" ? "text-gray-300" : "text-gray-700"}
                `}
                >
                    Oops! Something went wrong
                </h2>

                <p
                    className={`mb-6 text-sm
                    ${theme === "dark" ? "text-gray-400" : "text-gray-600"}
                `}
                >
                    {message}
                </p>

                <div className="flex flex-col gap-3">
                    <Link
                        to="/"
                        className="btn bg-[#0303b8] hover:bg-[#000064] text-white rounded-full"
                    >
                        Go Home
                    </Link>

                    <button
                        onClick={() => window.location.reload()}
                        className={`btn btn-outline rounded-full
                        ${theme === "dark"
                                ? "border-gray-600 text-gray-200 hover:bg-gray-700"
                                : ""
                            }
                    `}
                    >
                        Retry
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ErrorPage;
