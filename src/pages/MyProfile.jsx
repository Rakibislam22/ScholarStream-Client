import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../provider/AuthContext";
import useAxios from "../hooks/useAxios";

const MyProfile = () => {
    const { user } = useContext(AuthContext);
    const axiosIn = useAxios();

    // 🔹 Get user info from DB (for role)
    const { data: dbUser = {} } = useQuery({
        queryKey: ["user", user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosIn.get(`/users`);
            return res.data.find(u => u.email === user.email);
        }
    });

    return (
        <div className="max-w-4xl mx-auto bg-base-200 p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold mb-6">My Profile</h2>

            <div className="flex flex-col md:flex-row gap-6 items-center">
                {/* Profile Image */}
                <div className="avatar">
                    <div className="w-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                        <img
                            src={user?.photoURL || "https://cdn-icons-png.flaticon.com/512/266/266033.png"}
                            alt="Profile"
                        />
                    </div>
                </div>

                {/* Profile Info */}
                <div className="w-full space-y-3">
                    <div>
                        <p className="text-gray-500">Full Name</p>
                        <p className="font-semibold">{user?.displayName || "N/A"}</p>
                    </div>

                    <div>
                        <p className="text-gray-500">Email</p>
                        <p className="font-semibold">{user?.email}</p>
                    </div>

                    <div>
                        <p className="text-gray-500">Role</p>
                        <span className="badge badge-outline capitalize">
                            {dbUser?.role || "student"}
                        </span>
                    </div>

                    <div>
                        <p className="text-gray-500">Account Provider</p>
                        <p className="font-semibold">
                            {user?.providerData?.[0]?.providerId === "google.com"
                                ? "Google"
                                : "Email/Password"}
                        </p>
                    </div>
                </div>
            </div>

            {/* Optional Actions */}
            <div className="mt-6 flex gap-3">
                <button className="btn btn-primary btn-sm" disabled>
                    Edit Profile (Coming Soon)
                </button>

                <button className="btn btn-outline btn-sm" disabled>
                    Change Password
                </button>
            </div>
        </div>
    );
};

export default MyProfile;
