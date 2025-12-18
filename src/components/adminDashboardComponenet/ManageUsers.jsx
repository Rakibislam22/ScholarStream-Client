import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useState } from "react";
import useAxios from "../../hooks/useAxios";
import Swal from "sweetalert2";

const ManageUsers = () => {
    const axiosIn = useAxios();
    const queryClient = useQueryClient();
    const [roleFilter, setRoleFilter] = useState("All");

    // 🔹 Fetch users
    const { data: users = [], isLoading } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const res = await axiosIn.get("/users");
            return res.data;
        }
    });

    // 🔹 Update role
    const { mutate: updateRole } = useMutation({
        mutationFn: ({ id, role }) =>
            axiosIn.patch(`/users/role/${id}`, { role }),
        onSuccess: () => {
            toast.success("User role updated");
            queryClient.invalidateQueries(["users"]);
        }
    });

    // 🔹 Delete user
    const { mutate: deleteUser } = useMutation({
        mutationFn: (id) => axiosIn.delete(`/users/${id}`),
        onSuccess: () => {
            queryClient.invalidateQueries(["users"]);
        }
    });

    const handleRoleChange = (id, role) => {
        updateRole({ id, role });
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
                deleteUser(id);
                Swal.fire({
                    title: "Deleted!",
                    text: "User has been deleted.",
                    icon: "success"
                });
            }
        });
    };

    const filteredUsers =
        roleFilter === "All"
            ? users
            : users.filter((u) => u.role === roleFilter);

    if (isLoading) return <p className="text-center mt-10">Loading...</p>;

    return (
        <div className="p-4 bg-base-200 rounded-lg">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold">Manage Users</h2>

                {/* Filter */}
                <select
                    className="select select-bordered"
                    value={roleFilter}
                    onChange={(e) => setRoleFilter(e.target.value)}
                >
                    <option>All</option>
                    <option>Student</option>
                    <option>Moderator</option>
                    <option>Admin</option>
                </select>
            </div>

            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {filteredUsers.map((user, index) => (
                            <tr key={user._id}>
                                <td>{index + 1}</td>
                                <td>{user.name || "N/A"}</td>
                                <td>{user.email}</td>
                                <td>
                                    <span className="badge badge-outline">
                                        {user.role}
                                    </span>
                                </td>
                                <td className="flex gap-2">
                                    {/* Role change */}
                                    <select
                                        className="select select-xs select-bordered"
                                        value={user.role}
                                        onChange={(e) =>
                                            handleRoleChange(
                                                user._id,
                                                e.target.value
                                            )
                                        }
                                    >
                                        <option>Student</option>
                                        <option>Moderator</option>
                                        <option>Admin</option>
                                    </select>

                                    {/* Delete */}
                                    <button
                                        onClick={() => handleDelete(user._id)}
                                        className="btn btn-xs btn-error"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {filteredUsers.length === 0 && (
                    <p className="text-center py-6">No users found</p>
                )}
            </div>
        </div>
    );
};

export default ManageUsers;
