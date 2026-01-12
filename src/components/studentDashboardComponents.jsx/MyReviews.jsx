import { useContext, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AuthContext } from "../../provider/AuthContext";
import useAxios from "../../hooks/useAxios";
import { toast } from "react-toastify";
import Loading from "../Loading";
import Swal from "sweetalert2";

const MyReviews = () => {
    const { user } = useContext(AuthContext);
    const axiosIn = useAxios();
    const queryClient = useQueryClient();

    const [editReview, setEditReview] = useState(null);
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState("");

    const { data: reviews = [], isLoading } = useQuery({
        queryKey: ["my-reviews", user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosIn.get(`/my-reviews?email=${user.email}`);
            return res.data;
        },
    });

    const { mutate: updateReview } = useMutation({
        mutationFn: ({ id, ratingPoint, reviewComment }) =>
            axiosIn.patch(`/reviews/${id}`, { ratingPoint, reviewComment }),
        onSuccess: () => {
            toast.success("Review updated");
            queryClient.invalidateQueries(["my-reviews"]);
            setEditReview(null);
        },
    });

    const { mutate: deleteReview } = useMutation({
        mutationFn: (id) => axiosIn.delete(`/reviews/${id}`),
        onSuccess: () => {
            queryClient.invalidateQueries(["my-reviews"]);
        },
    });

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                deleteReview(id);
                Swal.fire({
                    title: "Deleted!",
                    text: "Review has been deleted.",
                    icon: "success"
                });
            }
        });
    };

    const handleEditOpen = (review) => {
        setEditReview(review);
        setRating(review.ratingPoint);
        setComment(review.reviewComment);
    };

    if (isLoading) return <Loading />;

    const getRatingBadgeClass = (rating) => {
        if (rating <= 2) return "badge-error";
        if (rating == 3) return "badge-warning";
        if (rating == 4) return "badge-info";
        if (rating == 5) return "badge-success";
        return "badge-outline";
    };

    return (
        <div className="p-6 bg-base-200 rounded-2xl shadow-md">
            {/* Header */}
            <div className="mb-6">
                <h2 className="text-2xl font-semibold">My Reviews</h2>
                <p className="text-sm opacity-60">
                    Manage and update your submitted reviews
                </p>
            </div>

            {/* Table */}
            <div className="overflow-x-auto rounded-xl border border-base-300">
                <table className="table table-zebra table-lg w-full">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Scholarship</th>
                            <th>University</th>
                            <th>Comment</th>
                            <th>Rating</th>
                            <th>Date</th>
                            <th className="text-center">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {reviews.map((review, index) => (
                            <tr
                                key={review._id}
                                className="hover:bg-base-300/40 transition"
                            >
                                <td>{index + 1}</td>

                                <td className="font-medium">
                                    {review.scholarshipName || "N/A"}
                                </td>

                                <td className="text-sm opacity-80">
                                    {review.universityName || "N/A"}
                                </td>

                                <td className="max-w-xs truncate text-sm">
                                    {review.reviewComment}
                                </td>

                                <td>
                                    <span className={`badge badge-sm ${getRatingBadgeClass(
                                        review.ratingPoint
                                    )}`}>
                                        {review.ratingPoint}/5
                                    </span>
                                </td>

                                <td className="text-sm opacity-70">
                                    {review.reviewDate}
                                </td>

                                <td>
                                    <div className="flex justify-center gap-2">
                                        <button
                                            onClick={() => handleEditOpen(review)}
                                            className="btn btn-xs btn-info btn-outline rounded-full"
                                        >
                                            Edit
                                        </button>

                                        <button
                                            onClick={() => handleDelete(review._id)}
                                            className="btn btn-xs btn-error btn-outline rounded-full"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {reviews.length === 0 && (
                    <div className="text-center py-12 text-base-content/60">
                        You haven’t written any reviews yet.
                    </div>
                )}
            </div>

            {/* ✏️ Edit Modal */}
            {editReview && (
                <dialog open className="modal">
                    <div className="modal-box max-w-md">
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
                            placeholder="Update your review..."
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
                                className="btn btn-sm btn-primary"
                            >
                                Update
                            </button>

                            <button
                                className="btn btn-sm btn-ghost"
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
