import { Link, useRouteError } from "react-router";
import { MdErrorOutline } from "react-icons/md";

const ErrorPage = () => {
    const error = useRouteError();

    const status = error?.status || 404;
    const message =
        error?.statusText ||
        error?.message ||
        "Something went wrong. Please try again later.";

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 px-4">
            <div className="bg-white max-w-md w-full rounded-2xl shadow-xl p-8 text-center">
                <div className="flex justify-center mb-4">
                    <MdErrorOutline className="text-orange-500 text-6xl" />
                </div>

                <h1 className="text-3xl font-bold text-gray-800 mb-1">
                    {status}
                </h1>

                <h2 className="text-xl font-semibold text-gray-700 mb-2">
                    Oops! Something went wrong
                </h2>

                <p className="text-gray-600 mb-6">
                    {message}
                </p>

                <div className="flex flex-col gap-3">
                    <Link
                        to="/"
                        className="btn bg-[#0303b8] hover:bg-[#000064] text-white"
                    >
                        Go Home
                    </Link>

                    <button
                        onClick={() => window.location.reload()}
                        className="btn btn-outline"
                    >
                        Retry
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ErrorPage;
