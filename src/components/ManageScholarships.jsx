import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router";
import { toast } from "react-toastify";
import useAxios from "../hooks/useAxios";

const ManageScholarships = () => {
    const axiosIn = useAxios();
    const queryClient = useQueryClient();

    // 🔹 Fetch all scholarships
    const { data: scholarships = [], isLoading } = useQuery({
        queryKey: ["scholarships"],
        queryFn: async () => {
            const res = await axiosIn.get("/scholarships");
            return res.data;
        },
    });

    // 🔹 Delete mutation
    const { mutate: deleteScholarship } = useMutation({
        mutationFn: async (id) => {
            return axiosIn.delete(`/scholarship/${id}`);
        },
        onSuccess: () => {
            toast.success("Scholarship deleted");
            queryClient.invalidateQueries(["scholarships"]);
        },
    });

    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete this scholarship?")) {
            deleteScholarship(id);
        }
    };

    if (isLoading) return <p className="text-center mt-10">Loading...</p>;

    return (
        <div className="p-4 bg-base-200 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Manage Scholarships</h2>

            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Scholarship</th>
                            <th>University</th>
                            <th>Country</th>
                            <th>Degree</th>
                            <th>Deadline</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {scholarships.map((sc, index) => (
                            <tr key={sc._id}>
                                <td>{index + 1}</td>
                                <td>{sc.scholarshipName}</td>
                                <td>{sc.universityName}</td>
                                <td>{sc.universityCountry}</td>
                                <td>{sc.degree}</td>
                                <td>{sc.applicationDeadline}</td>
                                <td className="flex gap-2">
                                    {/* Update */}
                                    <Link
                                        to={`/dashboard/update-scholarship/${sc._id}`}
                                        className="btn btn-xs btn-info"
                                    >
                                        Update
                                    </Link>

                                    {/* Delete */}
                                    <button
                                        onClick={() => handleDelete(sc._id)}
                                        className="btn btn-xs btn-error"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {scholarships.length === 0 && (
                    <p className="text-center py-6">No scholarships found</p>
                )}
            </div>
        </div>
    );
};

export default ManageScholarships;
