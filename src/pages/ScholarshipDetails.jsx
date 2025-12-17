import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import useAxios from "../hooks/useAxios";

export default function ScholarshipDetails() {
    const { id } = useParams();
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
                const reviewsRes = await axiosIn.get(`/reviews/${id}`)
                setReviews(reviewsRes.data);

            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        loadScholarshipDetails();
    }, [id]);

    if (loading) return <p>Loading scholarship details...</p>;
    if (error) return <p className="text-red-600">{error}</p>;

    if (!scholarship) return <p>No scholarship found!</p>;

    return (
        <div className="min-h-[80vh] py-15">
            {/* Scholarship details */}
            <div className="flex max-sm:flex-col justify-start items-center gap-5 pb-15">
                <div>
                    <img
                        src={scholarship.universityImage}
                        alt={scholarship.scholarshipName}
                        className="w-full h-64 object-contain mb-4"
                    />
                </div>
                <div>
                    <h1 className="text-2xl font-bold">{scholarship.scholarshipName}</h1>
                    <h2 className="text-lg text-gray-500">{scholarship.universityName}</h2>
                    <p className="text-gray-700 mt-4">{scholarship.description}</p>
                    <div className="mt-4 flex flex-wrap gap-4">
                        <p><b>University World Rank:</b> {scholarship.universityWorldRank}</p>
                        <p><b>Deadline:</b> {scholarship.applicationDeadline}</p>
                        <p><b>Location:</b> {scholarship.universityCountry}</p>
                        <p><b>Application Fees:</b> {scholarship.applicationFees}</p>
                        <p><b>Stipend/Coverage:</b> {scholarship.scholarshipCategory}</p>
                    </div>
                    <button
                        onClick={() => navigate(`/checkout/${id}`)}
                        className="mt-5 bg-[#0303b8] hover:bg-[#000064] text-white py-3 px-6 rounded-4xl"
                    >
                        Apply for Scholarship
                    </button>
                </div>


            </div>

            {/* Reviews */}
            <div className="md:pl-7">
                <h2 className="text-xl font-semibold mb-4">Reviews</h2>
                {reviews.length > 0 ? (
                    reviews.map((review) => (
                        <div
                            key={review._id}
                            className="border-t border-gray-200 py-4 text-sm"
                        >
                            <div className="flex items-center mb-2">
                                <img
                                    src={review.userImage}
                                    alt={review.userName}
                                    className="h-10 w-10 rounded-full object-cover mr-3"
                                />
                                <div>
                                    <p className="font-semibold">{review.userName}</p>
                                    <p className="text-gray-500 text-xs">
                                        {review.reviewDate}
                                    </p>
                                </div>
                            </div>
                            <div className="ml-12">
                                <p><b>Rating:</b> {review.ratingPoint}/5</p>
                                <p>{review.reviewComment}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No reviews available.</p>
                )}
            </div>
        </div>
    );
}