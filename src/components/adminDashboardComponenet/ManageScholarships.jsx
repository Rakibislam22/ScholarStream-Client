import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router";
import useAxios from "../../hooks/useAxios";
import Swal from "sweetalert2";

const ManageScholarships = () => {
    const axiosIn = useAxios();
    const queryClient = useQueryClient();

    // Fetch all scholarships
    const { data: scholarships = [], isLoading } = useQuery({
        queryKey: ["scholarships"],
        queryFn: async () => {
            const res = await axiosIn.get("/analytics/scholarships");
            return res.data;
        },
    });

    // 🔹 Delete mutation
    const { mutate: deleteScholarship } = useMutation({
        mutationFn: async (id) => {
            return axiosIn.delete(`/scholarship/${id}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["scholarships"]);
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
                deleteScholarship(id);
                Swal.fire({
                    title: "Deleted!",
                    text: "Scholarship has been deleted.",
                    icon: "success"
                });
            }
        });
    };

    if (isLoading) return <p className="text-center mt-10">Loading...</p>;

    return (
        <div className="p-6 bg-base-200 rounded-2xl shadow-md">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-2xl font-semibold">
                        Manage Scholarships
                    </h2>
                    <p className="text-sm opacity-60">
                        View, update and remove scholarships
                    </p>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto rounded-xl border border-base-300">
                <table className="table table-zebra table-lg w-full">
                    <thead>
                        <tr className="text-base">
                            <th>#</th>
                            <th>Scholarship</th>
                            <th>University</th>
                            <th>Country</th>
                            <th>Degree</th>
                            <th>Deadline</th>
                            <th className="text-center">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {scholarships.map((sc, index) => (
                            <tr
                                key={sc._id}
                                className="hover:bg-base-300/40 transition"
                            >
                                <td>{index + 1}</td>

                                {/* Scholarship */}
                                <td>
                                    <div className="font-semibold">
                                        {sc.scholarshipName}
                                    </div>
                                </td>

                                {/* University */}
                                <td className="text-sm opacity-80">
                                    {sc.universityName}
                                </td>

                                {/* Country */}
                                <td>
                                    <span className="badge badge-outline badge-sm">
                                        {sc.universityCountry}
                                    </span>
                                </td>

                                {/* Degree */}
                                <td className="text-sm">
                                    {sc.degree}
                                </td>

                                {/* Deadline */}
                                <td className="text-sm opacity-70">
                                    {sc.applicationDeadline}
                                </td>

                                {/* Actions */}
                                <td>
                                    <div className="flex items-center justify-center gap-2">
                                        <Link
                                            to={`/dashboard/update-scholarship/${sc._id}`}
                                            className="btn btn-xs btn-info btn-outline rounded-full"
                                        >
                                            Update
                                        </Link>

                                        <button
                                            onClick={() => handleDelete(sc._id)}
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

                {scholarships.length === 0 && (
                    <div className="text-center py-12 text-base-content/60">
                        No scholarships found
                    </div>
                )}
            </div>
        </div>
    );
};

export default ManageScholarships;
