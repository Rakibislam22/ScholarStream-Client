import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";
import { toast } from "react-toastify";

const ManageAppliedApplications = () => {
    const axiosIn = useAxios();
    const queryClient = useQueryClient();

    const [detailsApp, setDetailsApp] = useState(null);
    const [feedbackApp, setFeedbackApp] = useState(null);
    const [feedback, setFeedback] = useState("");

    // 🔹 Fetch all applications
    const { data: applications = [], isLoading } = useQuery({
        queryKey: ["admin-applications"],
        queryFn: async () => {
            const res = await axiosIn.get("/moderator/applications");
            return res.data;
        },
    });

    // 🔹 Status update
    const { mutate: updateStatus } = useMutation({
        mutationFn: ({ id, status }) =>
            axiosIn.patch(`/applications/status/${id}`, { status }),
        onSuccess: () => {
            toast.success("Status updated");
            queryClient.invalidateQueries(["admin-applications"]);
        },
    });

    // 🔹 Feedback
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

    // 🔹 Reject
    const { mutate: rejectApp } = useMutation({
        mutationFn: (id) =>
            axiosIn.patch(`/applications/reject/${id}`),
        onSuccess: () => {
            toast.success("Application rejected");
            queryClient.invalidateQueries(["admin-applications"]);
        },
    });

    if (isLoading) return <p className="text-center mt-10">Loading...</p>;

    return (
        <div className="bg-base-200 p-4 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">
                Manage Applied Applications
            </h2>

            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Applicant</th>
                            <th>Email</th>
                            <th>University</th>
                            <th>Feedback</th>
                            <th>Status</th>
                            <th>Payment</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {applications.map((app, index) => (
                            <tr key={app._id}>
                                <td>{index + 1}</td>
                                <td>{app.userName}</td>
                                <td>{app.userEmail}</td>
                                <td>{app.universityName}</td>
                                <td>{app.feedback || "—"}</td>
                                <td>
                                    <span className="badge badge-outline">
                                        {app.applicationStatus}
                                    </span>
                                </td>
                                <td>
                                    <span className="badge">
                                        {app.paymentStatus}
                                    </span>
                                </td>

                                <td className="flex flex-wrap gap-1">
                                    {/* Details */}
                                    <button
                                        onClick={() => setDetailsApp(app)}
                                        className="btn btn-xs btn-info"
                                    >
                                        Details
                                    </button>

                                    {/* Feedback */}
                                    <button
                                        onClick={() => setFeedbackApp(app)}
                                        className="btn btn-xs btn-primary"
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
                                        className="btn btn-xs btn-error"
                                    >
                                        Cancel
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* 🔍 Details Modal */}
            {detailsApp && (
                <dialog open className="modal">
                    <div className="modal-box">
                        <h3 className="font-semibold text-lg mb-2">
                            Application Details
                        </h3>
                        <p><b>Name:</b> {detailsApp.userName}</p>
                        <p><b>Email:</b> {detailsApp.userEmail}</p>
                        <p><b>University:</b> {detailsApp.universityName}</p>
                        <p><b>Category:</b> {detailsApp.scholarshipCategory}</p>
                        <p><b>Degree:</b> {detailsApp.degree}</p>
                        <p><b>Fees:</b> ${detailsApp.applicationFees}</p>

                        <div className="modal-action">
                            <button
                                className="btn"
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
                    <div className="modal-box">
                        <h3 className="font-semibold text-lg mb-3">
                            Write Feedback
                        </h3>

                        <textarea
                            className="textarea textarea-bordered w-full"
                            rows="3"
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
                                className="btn btn-primary"
                            >
                                Submit
                            </button>
                            <button
                                className="btn"
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
