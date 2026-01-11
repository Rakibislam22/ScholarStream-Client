import React, { use, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import useAxios from "../hooks/useAxios";
import { AuthContext } from "../provider/AuthContext";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import Loading from "../components/Loading";

export default function ScholarshipDetails() {
    const { id } = useParams();
    const { user, theme } = React.useContext(AuthContext);
    const axiosIn = useAxios();
    const [scholarship, setScholarship] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        async function loadScholarshipDetails() {
            try {
                const scholarshipRes = await axiosIn.get(`/scholarship/${id}`);
                setScholarship(scholarshipRes.data);
                const reviewsRes = await axiosIn.get(`/reviews/${id}`);
                setReviews(reviewsRes.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        loadScholarshipDetails();
    }, [id]);

    if (loading) return <Loading />;
    if (error) return <p className="text-red-600">{error}</p>;
    if (!scholarship) return <p>No scholarship found!</p>;

    const handleApply = async () => {
        if (!user) {
            toast.warning("Please Login First");
            navigate("/auth/login");
            return;
        }

        const result = await Swal.fire({
            title: "Confirm Application",
            html: `
              <p><b>Application Fee:</b> $${scholarship.applicationFees}</p>
              <p><b>Service Charge:</b> $${scholarship.serviceCharge}</p>
            `,
            showCancelButton: true,
            confirmButtonText: "Pay & Apply",
        });

        if (!result.isConfirmed) return;

        const applicationData = {
            scholarshipId: scholarship._id,
            userId: user.uid,
            userName: user.displayName,
            userEmail: user.email,
            universityName: scholarship.universityName,
            scholarshipName: scholarship.scholarshipName,
            scholarshipCategory: scholarship.scholarshipCategory,
            degree: scholarship.degree,
            applicationFees: scholarship.applicationFees,
            serviceCharge: scholarship.serviceCharge,
            universityCountry: scholarship.universityCountry,
        };

        const appRes = await axiosIn.post("/applications", applicationData);

        const paymentRes = await axiosIn.post("/create-payment-intent", {
            amount: scholarship.applicationFees + scholarship.serviceCharge,
            applicationId: appRes.data.insertedId,
        });

        window.location.href = paymentRes.data.url;
    };

    return (
        <div className="min-h-[80vh] py-12">
            {/* HERO / IMAGE */}
            <div className="max-w-6xl mx-auto">
                <div
                    className={`rounded-2xl p-10 flex justify-center items-center mb-10
        ${theme === "dark"
                            ? "bg-gradient-to-br from-gray-800 to-gray-900"
                            : "bg-gradient-to-br from-gray-50 to-white"}`}
                >
                    <img
                        src={scholarship.universityImage}
                        alt={scholarship.scholarshipName}
                        className="h-50 object-contain drop-shadow-md"
                    />
                </div>

                {/* DETAILS CARD */}
                <div
                    className={`rounded-2xl p-8 shadow-sm
        ${theme === "dark"
                            ? "bg-gray-900 text-gray-300"
                            : "bg-white text-gray-700"}`}
                >
                    <h1
                        className={`text-3xl font-bold mb-1
          ${theme === "dark" ? "text-gray-100" : "text-gray-900"}`}
                    >
                        {scholarship.scholarshipName}
                    </h1>

                    <h2
                        className={`text-lg
          ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}
                    >
                        {scholarship.universityName}
                    </h2>

                    <p className="mt-5 leading-relaxed text-justify">
                        {scholarship.description}
                    </p>

                    {/* META INFO (CHIPS) */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-8 text-lg">
                        {[
                            ["University Rank", scholarship.universityWorldRank],
                            ["Deadline", scholarship.applicationDeadline],
                            ["Country", scholarship.universityCountry],
                            ["Application Fee", `$${scholarship.applicationFees}`],
                            ["Coverage", scholarship.scholarshipCategory],
                        ].map(([label, value]) => (
                            <div
                                key={label}
                                className={`rounded-lg px-4 py-3
              ${theme === "dark"
                                        ? "bg-gray-800 text-gray-300"
                                        : "bg-gray-50 text-gray-700"}`}
                            >
                                <p className="text-sm opacity-70">{label}</p>
                                <p className="font-semibold">{value}</p>
                            </div>
                        ))}
                    </div>

                    {/* CTA */}
                    <button
                        onClick={handleApply}
                        className="mt-8 bg-[#0303b8] hover:bg-[#000064]
          text-white py-3 px-10 rounded-full
          shadow-md hover:shadow-lg transition-all"
                    >
                        Apply for Scholarship
                    </button>
                </div>
            </div>

            {/* REVIEWS */}
            <div className="max-w-6xl mx-auto mt-14">
                <h2
                    className={`text-2xl font-semibold mb-6
        ${theme === "dark" ? "text-gray-100" : "text-gray-900"}`}
                >
                    Reviews
                </h2>

                {reviews.length > 0 ? (
                    <div className="space-y-4">
                        {reviews.map((review) => (
                            <div
                                key={review._id}
                                className={`rounded-xl p-5
              ${theme === "dark"
                                        ? "bg-gray-800 text-gray-300"
                                        : "bg-gray-50 text-gray-700"}`}
                            >
                                <div className="flex items-center gap-4 mb-3">
                                    <img
                                        src={review.userImage}
                                        alt={review.userName}
                                        className="h-11 w-11 rounded-full object-cover"
                                    />
                                    <div>
                                        <p
                                            className={`font-semibold
                    ${theme === "dark"
                                                    ? "text-gray-100"
                                                    : "text-gray-900"}`}
                                        >
                                            {review.userName}
                                        </p>
                                        <p className="text-xs opacity-70">
                                            {review.reviewDate}
                                        </p>
                                    </div>
                                </div>

                                <p className="text-sm">
                                    <b>Rating:</b> {review.ratingPoint}/5
                                </p>
                                <p className="mt-1 text-sm leading-relaxed">
                                    {review.reviewComment}
                                </p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className={theme === "dark" ? "text-gray-400" : "text-gray-500"}>
                        No reviews available.
                    </p>
                )}
            </div>
        </div>
    );

}
