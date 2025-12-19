import { useContext, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AuthContext } from "../../provider/AuthContext";
import useAxios from "../../hooks/useAxios";
import { toast } from "react-toastify";
import Loading from "../Loading";

const MyReviews = () => {
    const { user } = useContext(AuthContext);
    const axiosIn = useAxios();
    const queryClient = useQueryClient();

    const [editReview, setEditReview] = useState(null);
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState("");

    // Fetch my reviews
    const { data: reviews = [], isLoading } = useQuery({
        queryKey: ["my-reviews", user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosIn.get(
                `/my-reviews?email=${user.email}`
            );
            return res.data;
        },
    });

    // Update review
    const { mutate: updateReview } = useMutation({
        mutationFn: ({ id, ratingPoint, reviewComment }) =>
            axiosIn.patch(`/reviews/${id}`, {
                ratingPoint,
                reviewComment,
            }),
        onSuccess: () => {
            toast.success("Review updated");
            queryClient.invalidateQueries(["my-reviews"]);
            setEditReview(null);
        },
    });

    // Delete review
    const { mutate: deleteReview } = useMutation({
        mutationFn: (id) => axiosIn.delete(`/reviews/${id}`),
        onSuccess: () => {
            toast.success("Review deleted");
            queryClient.invalidateQueries(["my-reviews"]);
        },
    });

    const handleEditOpen = (review) => {
        setEditReview(review);
        setRating(review.ratingPoint);
        setComment(review.reviewComment);
    };

    if (isLoading) return <Loading></Loading>;

    return (
        <div className="bg-base-200 p-4 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">My Reviews</h2>

            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Scholarship</th>
                            <th>University</th>
                            <th>Comment</th>
                            <th>Rating</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {reviews.map((review, index) => (
                            <tr key={review._id}>
                                <td>{index + 1}</td>
                                <td>{review.scholarshipName || "N/A"}</td>
                                <td>{review.universityName || "N/A"}</td>
                                <td>{review.reviewComment}</td>
                                <td>{review.ratingPoint}/5</td>
                                <td>{review.reviewDate}</td>
                                <td className="flex gap-2">
                                    <button
                                        onClick={() => handleEditOpen(review)}
                                        className="btn btn-xs btn-info"
                                    >
                                        Edit
                                    </button>

                                    <button
                                        onClick={() => deleteReview(review._id)}
                                        className="btn btn-xs btn-error"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {reviews.length === 0 && (
                    <p className="text-center py-6">
                        You haven’t written any reviews yet.
                    </p>
                )}
            </div>

            {/* ✏️ Edit Modal */}
            {editReview && (
                <dialog open className="modal">
                    <div className="modal-box">
                        <h3 className="font-semibold text-lg mb-4">
                            Edit Review
                        </h3>

                        <label className="label">Rating</label>
                        <select
                            className="select select-bordered w-full"
                            value={rating}
                            onChange={(e) => setRating(e.target.value)}
                        >
                            {[1, 2, 3, 4, 5].map((r) => (
                                <option key={r}>{r}</option>
                            ))}
                        </select>

                        <label className="label mt-2">Comment</label>
                        <textarea
                            className="textarea textarea-bordered w-full"
                            rows="3"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />

                        <div className="modal-action">
                            <button
                                onClick={() =>
                                    updateReview({
                                        id: editReview._id,
                                        ratingPoint: rating,
                                        reviewComment: comment,
                                    })
                                }
                                className="btn btn-primary"
                            >
                                Update
                            </button>

                            <button
                                className="btn"
                                onClick={() => setEditReview(null)}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </dialog>
            )}
        </div>
    );
};

export default MyReviews;
