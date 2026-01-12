import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useState } from "react";
import useAxios from "../../hooks/useAxios";
import Swal from "sweetalert2";
import Loading from "../Loading";

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

    const getRoleBadgeClass = (role) => {
        switch (role) {
            case "Admin":
                return "badge-error";
            case "Moderator":
                return "badge-info";
            case "Student":
                return "badge-success";
            default:
                return "badge-outline";
        }
    };

    const filteredUsers =
        roleFilter === "All"
            ? users
            : users.filter((u) => u.role === roleFilter);

    if (isLoading) return <Loading />;

    return (
        <div className="p-5 bg-base-200 rounded-xl shadow">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 mb-5">
                <h2 className="text-2xl font-semibold">
                    Manage Users
                </h2>

                {/* Filter */}
                <select
                    className="select select-sm select-bordered max-w-xs"
                    value={roleFilter}
                    onChange={(e) => setRoleFilter(e.target.value)}
                >
                    <option>All</option>
                    <option>Student</option>
                    <option>Moderator</option>
                    <option>Admin</option>
                </select>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="table table-zebra table-lg">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th className="text-center">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {filteredUsers.map((user, index) => (
                            <tr key={user._id}>
                                <td>{index + 1}</td>
                                <td className="font-medium">
                                    {user.name || "N/A"}
                                </td>
                                <td>{user.email}</td>

                                <td>
                                    <span className={`badge badge-md ${getRoleBadgeClass(user.role)}`}>
                                        {user.role}
                                    </span>
                                </td>

                                <td>
                                    <div className="flex flex-wrap items-center justify-center gap-2">
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
                                            className="btn btn-xs btn-error btn-outline"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {filteredUsers.length === 0 && (
                    <div className="text-center py-8 text-base-content/60">
                        No users found
                    </div>
                )}
            </div>
        </div>
    );
};

export default ManageUsers;
