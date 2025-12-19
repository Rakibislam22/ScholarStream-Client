import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import useAxios from "../hooks/useAxios";
import { FaCheckCircle } from "react-icons/fa";

const PaymentSuccess = () => {
    const { applicationId } = useParams();
    const axiosIn = useAxios();

    const [application, setApplication] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!applicationId) return;

        const fetchData = async () => {
            try {
                // Update payment status
                await axiosIn.patch(`/applications/payment/${applicationId}`);

                //Get application details
                const res = await axiosIn.get(
                    `/applications/${applicationId}`
                );
                setApplication(res.data);
            } catch (err) {
                console.error("Failed to load payment success data", err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [applicationId, axiosIn]);

    if (loading) {
        return (
            <p className="text-center mt-20">Loading payment details...</p>
        );
    }

    if (!application) {
        return (
            <p className="text-center mt-20 text-red-500">
                Application not found
            </p>
        );
    }

    const totalAmount =
        Number(application.applicationFees || 0) +
        Number(application.serviceCharge || 0);

    return (
        <div className="min-h-screen flex items-center justify-center bg-base-200">
            <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
                <div className="text-center">
                    <FaCheckCircle className="text-green-500 text-6xl mx-auto mb-4" />

                    <h2 className="text-2xl font-semibold mb-2">
                        Payment Successful
                    </h2>

                    <p className="text-gray-600 mb-6">
                        Your scholarship application has been submitted
                        successfully.
                    </p>
                </div>

                {/* Scholarship Details */}
                <div className="space-y-2 text-sm">
                    <p>
                        <b>Scholarship:</b>{" "}
                        {application.scholarshipName}
                    </p>
                    <p>
                        <b>University:</b>{" "}
                        {application.universityName}
                    </p>
                    <p>
                        <b>Category:</b>{" "}
                        {application.scholarshipCategory}
                    </p>
                    <p>
                        <b>Degree:</b> {application.degree}
                    </p>

                    <hr />

                    <p>
                        <b>Application Fee:</b> $
                        {application.applicationFees}
                    </p>
                    <p>
                        <b>Service Charge:</b> $
                        {application.serviceCharge}
                    </p>

                    <p className="text-lg font-semibold">
                        Total Paid: ${totalAmount}
                    </p>
                </div>

                <p className="text-xs text-gray-500 mt-4">
                    Application ID: {applicationId}
                </p>

                {/* Actions */}
                <div className="mt-6 flex justify-center">
                    <Link
                        to="/dashboard/my-applications"
                        className="btn btn-primary w-full"
                    >
                        Go to My Applications
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default PaymentSuccess;
