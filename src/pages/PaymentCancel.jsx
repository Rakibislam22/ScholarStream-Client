import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import { FaTimesCircle } from "react-icons/fa";
import useAxios from "../hooks/useAxios";

const PaymentCancel = () => {
    const { applicationId } = useParams();
    const axiosIn = useAxios();

    const [application, setApplication] = useState(null);
    const [errorMsg, setErrorMsg] = useState(
        "Your payment could not be completed. Please try again."
    );
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!applicationId) return;

        const loadApplication = async () => {
            try {
                const res = await axiosIn.get(
                    `/applications/${applicationId}`
                );
                setApplication(res.data);
            } catch (err) {
                console.error(err);
                setErrorMsg("Failed to load application details.");
            } finally {
                setLoading(false);
            }
        };

        loadApplication();
    }, [applicationId, axiosIn]);

    if (loading) {
        return <p className="text-center mt-20">Loading...</p>;
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-base-200">
            <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-md w-full">
                <FaTimesCircle className="text-red-500 text-6xl mx-auto mb-4" />

                <h2 className="text-2xl font-semibold mb-2 text-red-600">
                    Payment Failed
                </h2>

                {/* Scholarship Info */}
                {application && (
                    <p className="text-gray-700 mb-2">
                        <b>Scholarship:</b>{" "}
                        {application.scholarshipName}
                    </p>
                )}

                {/* Error Message */}
                <p className="text-gray-600 mb-6">
                    {errorMsg}
                </p>

                {/* Actions */}
                <div className="flex justify-center">
                    <Link
                        to="/dashboard/my-applications"
                        className="btn btn-primary w-full"
                    >
                        Return to Dashboard
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default PaymentCancel;
