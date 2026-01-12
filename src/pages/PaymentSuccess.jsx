import { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router";
import useAxios from "../hooks/useAxios";
import { FaCheckCircle } from "react-icons/fa";
import Loading from "../components/Loading";
import { AuthContext } from "../provider/AuthContext";

const PaymentSuccess = () => {
    const { applicationId } = useParams();
    const axiosIn = useAxios();
    const { theme } = useContext(AuthContext);

    const [application, setApplication] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!applicationId) return;

        const fetchData = async () => {
            try {
                await axiosIn.patch(`/applications/payment/${applicationId}`);
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

    if (loading) return <Loading />;

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
        <div
            className={`min-h-screen flex items-center justify-center
        `}
        >
            <div
                className={`p-8 rounded-xl shadow-md max-w-md w-full
                ${theme === "dark"
                        ? "bg-gray-800 text-gray-200"
                        : "bg-white text-gray-800"
                    }
            `}
            >
                {/* Header */}
                <div className="text-center">
                    <FaCheckCircle
                        className={`text-6xl mx-auto mb-4
                        ${theme === "dark" ? "text-green-400" : "text-green-500"}
                    `}
                    />

                    <h2 className="text-2xl font-semibold mb-2">
                        Payment Successful
                    </h2>

                    <p
                        className={`mb-6 text-sm
                        ${theme === "dark"
                                ? "text-gray-400"
                                : "text-gray-600"
                            }
                    `}
                    >
                        Your scholarship application has been submitted
                        successfully.
                    </p>
                </div>

                {/* Details */}
                <div
                    className={`space-y-2 text-sm
                    ${theme === "dark" ? "text-gray-300" : "text-gray-700"}
                `}
                >
                    <p><b>Scholarship:</b> {application.scholarshipName}</p>
                    <p><b>University:</b> {application.universityName}</p>
                    <p><b>Category:</b> {application.scholarshipCategory}</p>
                    <p><b>Degree:</b> {application.degree}</p>

                    <hr
                        className={
                            theme === "dark"
                                ? "border-gray-600"
                                : "border-gray-200"
                        }
                    />

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

                <p
                    className={`text-xs mt-4
                    ${theme === "dark"
                            ? "text-gray-500"
                            : "text-gray-500"
                        }
                `}
                >
                    Application ID: {applicationId}
                </p>

                {/* Action */}
                <div className="mt-6">
                    <Link
                        to="/dashboard/my-applications"
                        className="btn btn-primary w-full rounded-full"
                    >
                        Go to My Applications
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default PaymentSuccess;
