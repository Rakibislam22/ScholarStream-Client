import { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router";
import { FaTimesCircle } from "react-icons/fa";
import useAxios from "../hooks/useAxios";
import Loading from "../components/Loading";
import { AuthContext } from "../provider/AuthContext";

const PaymentCancel = () => {
    const { applicationId } = useParams();
    const axiosIn = useAxios();
    const { theme } = useContext(AuthContext);

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

    if (loading) return <Loading />;

    return (
        <div
            className={`min-h-screen flex items-center justify-center`}
        >
            <div
                className={`p-8 rounded-xl shadow-md text-center max-w-md w-full
                ${theme === "dark"
                        ? "bg-gray-800 text-gray-200"
                        : "bg-white text-gray-800"
                    }
            `}
            >
                <FaTimesCircle
                    className={`text-6xl mx-auto mb-4
                    ${theme === "dark" ? "text-red-400" : "text-red-500"}
                `}
                />

                <h2
                    className={`text-2xl font-semibold mb-2
                    ${theme === "dark" ? "text-red-400" : "text-red-600"}
                `}
                >
                    Payment Failed
                </h2>

                {/* Scholarship Info */}
                {application && (
                    <p
                        className={`mb-2 text-sm
                        ${theme === "dark"
                                ? "text-gray-300"
                                : "text-gray-700"
                            }
                    `}
                    >
                        <b>Scholarship:</b> {application.scholarshipName}
                    </p>
                )}

                {/* Error Message */}
                <p
                    className={`mb-6 text-sm
                    ${theme === "dark"
                            ? "text-gray-400"
                            : "text-gray-600"
                        }
                `}
                >
                    {errorMsg}
                </p>

                {/* Actions */}
                <div className="flex justify-center">
                    <Link
                        to="/dashboard/my-applications"
                        className="btn btn-primary w-full rounded-full"
                    >
                        Return to Dashboard
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default PaymentCancel;
