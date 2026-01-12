import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";
import { toast } from "react-toastify";
import Loading from "../Loading";
import Swal from "sweetalert2";

const AllReviews = () => {
    const axiosIn = useAxios();
    const queryClient = useQueryClient();

    // 🔹 Fetch all reviews
    const { data: reviews = [], isLoading } = useQuery({
        queryKey: ["all-reviews"],
        queryFn: async () => {
            const res = await axiosIn.get("/moderator/reviews");
            return res.data;
        },
    });

    // 🔹 Delete review
    const { mutate: deleteReview } = useMutation({
        mutationFn: (id) => axiosIn.delete(`/reviews/${id}`),
        onSuccess: () => {
            queryClient.invalidateQueries(["all-reviews"]);
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

    if (isLoading) {
        return <Loading />;
    }

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
                <h2 className="text-2xl font-semibold">
                    All Reviews
                </h2>
                <p className="text-sm opacity-60">
                    Moderate and manage student reviews
                </p>
            </div>

            {/* Table */}
            <div className="overflow-x-auto rounded-xl border border-base-300">
                <table className="table table-zebra table-lg w-full">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Student</th>
                            <th>Scholarship</th>
                            <th>University</th>
                            <th>Rating</th>
                            <th>Comment</th>
                            <th>Date</th>
                            <th className="text-center">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {reviews.map((review, index) => (
                            <tr
                                key={review._id}
                                className="hover:bg-base-300/40 transition"
                            >
                                <td>{index + 1}</td>

                                {/* Student */}
                                <td className="font-medium">
                                    {review.userName}
                                </td>

                                {/* Scholarship */}
                                <td className="text-sm opacity-80">
                                    {review.scholarshipName || "N/A"}
                                </td>

                                {/* University */}
                                <td className="text-sm opacity-80">
                                    {review.universityName || "N/A"}
                                </td>

                                {/* Rating */}
                                <td>
                                    <span className={`badge badge-sm ${getRatingBadgeClass(
                                        review.ratingPoint
                                    )}`}>
                                        {review.ratingPoint}/5
                                    </span>
                                </td>

                                {/* Comment */}
                                <td className="max-w-xs truncate text-sm opacity-80">
                                    {review.reviewComment}
                                </td>

                                {/* Date */}
                                <td className="text-sm opacity-70">
                                    {review.reviewDate}
                                </td>

                                {/* Action */}
                                <td>
                                    <div className="flex justify-center">
                                        <button
                                            onClick={() => handleDelete(review._id) }
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
                        No reviews found.
                    </div>
                )}
            </div>
        </div>
    );
};

export default AllReviews;
