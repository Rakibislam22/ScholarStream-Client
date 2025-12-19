import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";
import { toast } from "react-toastify";
import Loading from "../Loading";

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
            toast.success("Review deleted");
            queryClient.invalidateQueries(["all-reviews"]);
        },
    });

    if (isLoading) {
        return <Loading></Loading>
    }

    return (
        <div className="bg-base-200 p-4 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">
                All Reviews (Moderation)
            </h2>

            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Student</th>
                            <th>Scholarship</th>
                            <th>University</th>
                            <th>Rating</th>
                            <th>Comment</th>
                            <th>Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {reviews.map((review, index) => (
                            <tr key={review._id}>
                                <td>{index + 1}</td>
                                <td>{review.userName}</td>
                                <td>{review.scholarshipName || "N/A"}</td>
                                <td>{review.universityName || "N/A"}</td>
                                <td>
                                    <span className="badge badge-outline">
                                        {review.ratingPoint}/5
                                    </span>
                                </td>
                                <td className="max-w-xs truncate">
                                    {review.reviewComment}
                                </td>
                                <td>{review.reviewDate}</td>
                                <td>
                                    <button
                                        onClick={() => {
                                            if (
                                                confirm(
                                                    "Are you sure you want to delete this review?"
                                                )
                                            ) {
                                                deleteReview(review._id);
                                            }
                                        }}
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
                        No reviews found.
                    </p>
                )}
            </div>
        </div>
    );
};

export default AllReviews;
