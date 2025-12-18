import { useContext, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AuthContext } from "../../provider/AuthContext";
import useAxios from "../../hooks/useAxios";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const MyApplications = () => {
    const { user } = useContext(AuthContext);
    const axiosIn = useAxios();
    const queryClient = useQueryClient();

    const [selectedApp, setSelectedApp] = useState(null);
    const [reviewApp, setReviewApp] = useState(null);
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState("");

    // 🔹 Fetch my applications
    const { data: applications = [], isLoading } = useQuery({
        queryKey: ["my-applications", user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosIn.get(
                `/applications?email=${user.email}`
            );
            return res.data;
        },
    });

    // 🔹 Delete application
    const { mutate: deleteApp } = useMutation({
        mutationFn: (id) => axiosIn.delete(`/applications/${id}`),
        onSuccess: () => {
            queryClient.invalidateQueries(["my-applications"]);
        },
    });

    // Submit review
    const handleReviewSubmit = async () => {
        try {
            await axiosIn.post("/reviews", {
                scholarshipId: reviewApp.scholarshipId,
                userName: user.displayName,
                userImage: user.photoURL,
                ratingPoint: rating,
                reviewComment: comment,
                reviewDate: new Date().toLocaleDateString(),
            });

            toast.success("Review added");
            setReviewApp(null);
            setComment("");
        } catch {
            toast.error("Failed to add review");
        }
    };

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
                deleteApp(id);
                Swal.fire({
                    title: "Deleted!",
                    text: "Application has been deleted.",
                    icon: "success"
                });
            }
        });
    };

    const handlePay = async (app) => {
        try {
            const paymentRes = await axiosIn.post("/create-payment-intent", {
                amount: Number(app.applicationFees) + Number(app.serviceCharge),
                applicationId: app._id,
                scholarshipId: app.scholarshipId,
                userId: user.uid,
                userEmail: user.email,
            });

            window.location.href = paymentRes.data.url;
        } catch (error) {
            console.error(error);
            toast.error("Failed to start payment");
        }
    };

    if (isLoading) return <p className="text-center mt-10">Loading...</p>;

    return (
        <div className="bg-base-200 p-4 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">My Applications</h2>

            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>University</th>
                            <th>Country</th>
                            <th>Degree</th>
                            <th>Fees</th>
                            <th>Status</th>
                            <th>Feedback</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {applications.map((app, index) => (
                            <tr key={app._id}>
                                <td>{index + 1}</td>
                                <td>{app.universityName}</td>
                                <td>{app.universityCountry}</td>
                                <td>{app.degree}</td>
                                <td>${app.applicationFees}</td>

                                <td>
                                    <span className="badge badge-outline">
                                        {app.applicationStatus}
                                    </span>
                                </td>

                                <td>{app.feedback || "—"}</td>

                                <td className="flex flex-wrap gap-1">
                                    {/* Details */}
                                    <button
                                        className="btn btn-xs btn-info"
                                        onClick={() => setSelectedApp(app)}
                                    >
                                        Details
                                    </button>

                                    {/* Edit */}
                                    {app.applicationStatus === "pending" && (
                                        <button className="btn btn-xs">
                                            Edit
                                        </button>
                                    )}

                                    {/* Pay */}
                                    {app.applicationStatus === "pending" &&
                                        app.paymentStatus === "unpaid" && (
                                            <button onClick={() => handlePay(app)} className="btn btn-xs btn-warning">
                                                Pay
                                            </button>
                                        )}

                                    {/* Delete */}
                                    {app.applicationStatus === "pending" && (
                                        <button
                                            onClick={() => handleDelete(app._id)}
                                            className="btn btn-xs btn-error"
                                        >
                                            Delete
                                        </button>
                                    )}

                                    {/* Add Review */}
                                    {app.applicationStatus === "completed" && (
                                        <button
                                            onClick={() => setReviewApp(app)}
                                            className="btn btn-xs btn-success"
                                        >
                                            Add Review
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {applications.length === 0 && (
                    <p className="text-center py-6">
                        You haven’t applied for any scholarships yet.
                    </p>
                )}
            </div>

            {/* 🔍 Details Modal */}
            {selectedApp && (
                <dialog open className="modal">
                    <div className="modal-box">
                        <h3 className="font-semibold text-lg mb-2">
                            Application Details
                        </h3>

                        <p><b>University:</b> {selectedApp.universityName}</p>
                        <p><b>Degree:</b> {selectedApp.degree}</p>
                        <p><b>Status:</b> {selectedApp.applicationStatus}</p>
                        <p><b>Payment:</b> {selectedApp.paymentStatus}</p>
                        <p><b>Feedback:</b> {selectedApp.feedback || "N/A"}</p>

                        <div className="modal-action">
                            <button
                                className="btn"
                                onClick={() => setSelectedApp(null)}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </dialog>
            )}

            {/* ⭐ Review Modal */}
            {reviewApp && (
                <dialog open className="modal">
                    <div className="modal-box">
                        <h3 className="font-semibold text-lg mb-4">
                            Add Review
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
                                onClick={handleReviewSubmit}
                                className="btn btn-primary"
                            >
                                Submit
                            </button>
                            <button
                                className="btn"
                                onClick={() => setReviewApp(null)}
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

export default MyApplications;
