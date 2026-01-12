import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";
import { toast } from "react-toastify";
import Loading from "../Loading";

const ManageAppliedApplications = () => {
    const axiosIn = useAxios();
    const queryClient = useQueryClient();

    const [detailsApp, setDetailsApp] = useState(null);
    const [feedbackApp, setFeedbackApp] = useState(null);
    const [feedback, setFeedback] = useState("");

    // Fetch all applications
    const { data: applications = [], isLoading } = useQuery({
        queryKey: ["admin-applications"],
        queryFn: async () => {
            const res = await axiosIn.get("/moderator/applications");
            return res.data;
        },
    });

    // Status update
    const { mutate: updateStatus } = useMutation({
        mutationFn: ({ id, status }) =>
            axiosIn.patch(`/applications/status/${id}`, { status }),
        onSuccess: () => {
            toast.success("Status updated");
            queryClient.invalidateQueries(["admin-applications"]);
        },
    });

    // Feedback
    const { mutate: submitFeedback } = useMutation({
        mutationFn: ({ id, feedback }) =>
            axiosIn.patch(`/applications/feedback/${id}`, { feedback }),
        onSuccess: () => {
            toast.success("Feedback submitted");
            queryClient.invalidateQueries(["admin-applications"]);
            setFeedbackApp(null);
            setFeedback("");
        },
    });

    // Reject
    const { mutate: rejectApp } = useMutation({
        mutationFn: (id) =>
            axiosIn.patch(`/applications/reject/${id}`),
        onSuccess: () => {
            toast.success("Application rejected");
            queryClient.invalidateQueries(["admin-applications"]);
        },
    });

    const getStatusBadgeClass = (status) => {
        switch (status) {
            case "pending":
                return "badge-warning";
            case "processing":
                return "badge-info";
            case "completed":
                return "badge-success";
            case "rejected":
            case "cancelled":
                return "badge-error";
            default:
                return "badge-outline";
        }
    };

    if (isLoading) return <Loading />;

    return (
        <div className="p-6 bg-base-200 rounded-2xl shadow-md">
            {/* Header */}
            <div className="mb-6">
                <h2 className="text-2xl font-semibold">
                    Manage Applied Applications
                </h2>
                <p className="text-sm opacity-60">
                    Review, update status and provide feedback
                </p>
            </div>

            {/* Table */}
            <div className="overflow-x-auto rounded-xl border border-base-300">
                <table className="table table-zebra table-lg w-full">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Applicant</th>
                            <th>Email</th>
                            <th>University</th>
                            <th>Feedback</th>
                            <th>Status</th>
                            <th>Payment</th>
                            <th className="text-center">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {applications.map((app, index) => (
                            <tr
                                key={app._id}
                                className="hover:bg-base-300/40 transition"
                            >
                                <td>{index + 1}</td>

                                <td className="font-medium">
                                    {app.userName}
                                </td>

                                <td className="text-sm opacity-80">
                                    {app.userEmail}
                                </td>

                                <td className="text-sm opacity-80">
                                    {app.universityName}
                                </td>

                                <td className="text-sm opacity-70">
                                    {app.feedback || "—"}
                                </td>

                                <td>
                                    <span className={`badge badge-md ${getStatusBadgeClass(
                                        app.applicationStatus
                                    )}`}>
                                        {app.applicationStatus}
                                    </span>
                                </td>

                                <td>
                                    <span className={`${app.paymentStatus === 'paid' ? "text-green-600" : "text-red-400"} badge badge-md`}>
                                        {app.paymentStatus}
                                    </span>
                                </td>

                                <td>
                                    <div className="flex flex-wrap justify-center gap-2">
                                        {/* Details */}
                                        <button
                                            onClick={() => setDetailsApp(app)}
                                            className="btn btn-xs btn-info btn-outline rounded-full"
                                        >
                                            Details
                                        </button>

                                        {/* Feedback */}
                                        <button
                                            onClick={() => setFeedbackApp(app)}
                                            className="btn btn-xs btn-primary btn-outline rounded-full"
                                        >
                                            Feedback
                                        </button>

                                        {/* Status Update */}
                                        <select
                                            className="select select-xs select-bordered"
                                            value={app.applicationStatus}
                                            onChange={(e) =>
                                                updateStatus({
                                                    id: app._id,
                                                    status: e.target.value,
                                                })
                                            }
                                        >
                                            <option value="processing">
                                                Processing
                                            </option>
                                            <option value="completed">
                                                Completed
                                            </option>
                                        </select>

                                        {/* Reject */}
                                        <button
                                            onClick={() => rejectApp(app._id)}
                                            className="btn btn-xs btn-error btn-outline rounded-full"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* 🔍 Details Modal */}
            {detailsApp && (
                <dialog open className="modal">
                    <div className="modal-box max-w-md">
                        <h3 className="font-semibold text-lg mb-4">
                            Application Details
                        </h3>

                        <div className="space-y-1 text-sm">
                            <p><b>Name:</b> {detailsApp.userName}</p>
                            <p><b>Email:</b> {detailsApp.userEmail}</p>
                            <p><b>University:</b> {detailsApp.universityName}</p>
                            <p><b>Category:</b> {detailsApp.scholarshipCategory}</p>
                            <p><b>Degree:</b> {detailsApp.degree}</p>
                            <p><b>Fees:</b> ${detailsApp.applicationFees}</p>
                        </div>

                        <div className="modal-action">
                            <button
                                className="btn btn-sm"
                                onClick={() => setDetailsApp(null)}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </dialog>
            )}

            {/* 💬 Feedback Modal */}
            {feedbackApp && (
                <dialog open className="modal">
                    <div className="modal-box max-w-md">
                        <h3 className="font-semibold text-lg mb-3">
                            Write Feedback
                        </h3>

                        <textarea
                            className="textarea textarea-bordered w-full"
                            rows="3"
                            placeholder="Write your feedback..."
                            value={feedback}
                            onChange={(e) => setFeedback(e.target.value)}
                        />

                        <div className="modal-action">
                            <button
                                onClick={() =>
                                    submitFeedback({
                                        id: feedbackApp._id,
                                        feedback,
                                    })
                                }
                                className="btn btn-sm btn-primary"
                            >
                                Submit
                            </button>
                            <button
                                className="btn btn-sm btn-ghost"
                                onClick={() => setFeedbackApp(null)}
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

export default ManageAppliedApplications;
