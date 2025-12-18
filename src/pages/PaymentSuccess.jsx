import { useEffect } from "react";
import { useParams, Link } from "react-router";
import useAxios from "../hooks/useAxios";
import { FaCheckCircle } from "react-icons/fa";

const PaymentSuccess = () => {
    const { applicationId } = useParams(); // ✅ direct destructuring
    const axiosIn = useAxios();

    useEffect(() => {
        const updatePayment = async () => {
            try {
                const res = await axiosIn.patch(
                    `/applications/payment/${applicationId}`
                );
                console.log("Payment updated:", res.data);
            } catch (err) {
                console.error("Payment update failed", err);
            }
        };

        if (applicationId) {
            updatePayment();
        }
    }, [applicationId, axiosIn]); // ✅ dependency fixed

    return (
        <div className="min-h-screen flex items-center justify-center bg-base-200">
            <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-md">
                <FaCheckCircle className="text-green-500 text-6xl mx-auto mb-4" />

                <h2 className="text-2xl font-semibold mb-2">
                    Payment Successful!
                </h2>

                <p className="text-gray-600 mb-6">
                    Your scholarship application has been submitted successfully.
                    Payment is confirmed and under review.
                </p>

                <p className="text-sm text-gray-500 mb-4">
                    Application ID: <b>{applicationId}</b>
                </p>

                <div className="flex justify-center gap-3">
                    <Link to="/dashboard/my-applications" className="btn btn-primary">
                        My Applications
                    </Link>

                    <Link to="/" className="btn btn-outline">
                        Go Home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default PaymentSuccess;
