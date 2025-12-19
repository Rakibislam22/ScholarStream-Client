import { Link } from "react-router";
import { MdBlock } from "react-icons/md";

const Forbidden = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 px-4">
            <div className="bg-white max-w-md w-full rounded-2xl shadow-xl p-8 text-center">
                <div className="flex justify-center mb-4">
                    <MdBlock className="text-red-500 text-6xl" />
                </div>

                <h1 className="text-2xl font-bold text-gray-800 mb-2">
                    Access Denied
                </h1>

                <p className="text-gray-600 mb-6">
                    You don’t have permission to access this page.
                    Please contact the administrator if you believe this is a mistake.
                </p>

                <div className="flex flex-col gap-3">
                    <Link
                        to="/"
                        className="btn bg-[#0303b8] hover:bg-[#000064] text-white"
                    >
                        Go to Home
                    </Link>

                    <Link
                        to="/dashboard"
                        className="btn btn-outline"
                    >
                        Back to Dashboard
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Forbidden;
