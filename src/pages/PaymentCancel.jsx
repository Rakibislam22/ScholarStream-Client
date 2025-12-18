import { Link } from "react-router";
import { FaTimesCircle } from "react-icons/fa";

const PaymentCancel = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-base-200">
            <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-md">
                <FaTimesCircle className="text-red-500 text-6xl mx-auto mb-4" />

                <h2 className="text-2xl font-semibold mb-2">
                    Payment Cancelled
                </h2>

                <p className="text-gray-600 mb-6">
                    Your payment was not completed.
                    The application has not been finalized.
                </p>

                <div className="flex justify-center gap-3">
                    <Link to="/" className="btn btn-primary">
                        Go Home
                    </Link>

                    <Link to="/scholarships" className="btn btn-outline">
                        Browse Scholarships
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default PaymentCancel;
