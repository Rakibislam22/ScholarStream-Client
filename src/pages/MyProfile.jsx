import { useContext, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../provider/AuthContext";
import useAxios from "../hooks/useAxios";
import { toast } from "react-toastify";

const MyProfile = () => {
    const { user, forUpdateProfile } = useContext(AuthContext);
    const axiosIn = useAxios();

    const [editMode, setEditMode] = useState(false);
    const [name, setName] = useState("");
    const [photo, setPhoto] = useState("");
    const [email, setEmail] = useState("");

    useEffect(() => {
        if (user) {
            setName(user.displayName || "");
            setPhoto(user.photoURL || "");
            setEmail(user.email || "");
        }
    }, [user]);

    // 🔹 Get user info from DB (role)
    const { data: dbUser = {} } = useQuery({
        queryKey: ["user", user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosIn.get(`/users`);
            return res.data.find((u) => u.email === user.email);
        },
    });

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await forUpdateProfile(name, photo);
            const upData = {name, photo};
            toast.success("Profile updated successfully!");
            setEditMode(false);
            
            await axiosIn.patch(`/users?email=${user.email}`,upData)
        } catch (err) {
            toast.error("Failed to update profile");
        }
    };

    const handleCancel = () => {
        setName(user.displayName || "");
        setPhoto(user.photoURL || "");
        setEditMode(false);
    };

    return (
        <div className="max-w-4xl mx-auto bg-base-200 p-6 rounded-xl shadow">
            <h2 className="text-2xl font-semibold mb-6">My Profile</h2>

            <div className="flex flex-col md:flex-row gap-6 items-center pb-5">
                {/* Profile Image */}
                <div className="avatar">
                    <div className="w-60 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                        <img
                            src={
                                photo ||
                                "https://cdn-icons-png.flaticon.com/512/266/266033.png"
                            }
                            alt="Profile"
                        />
                    </div>
                </div>

                {/* Profile Info */}
                <div className="w-full space-y-4">
                    {/* Name */}
                    <div>
                        <p className="text-sm opacity-60">Full Name</p>
                        {editMode ? (
                            <input
                                className="input input-bordered w-full"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        ) : (
                            <p className="font-semibold">
                                {user?.displayName || "N/A"}
                            </p>
                        )}
                    </div>

                    {/* Email */}
                    <div>
                        <p className="text-sm opacity-60">Email</p>
                        <p className="font-semibold">{email}</p>
                    </div>

                    {/* Photo URL */}
                    {editMode && (
                        <div>
                            <p className="text-sm opacity-60">
                                Photo URL
                            </p>
                            <input
                                className="input input-bordered w-full"
                                value={photo}
                                onChange={(e) => setPhoto(e.target.value)}
                            />
                        </div>
                    )}

                    {/* Role */}
                    <div>
                        <p className="text-sm opacity-60">Role</p>
                        <span className="badge badge-outline capitalize">
                            {dbUser?.role || "student"}
                        </span>
                    </div>

                    {/* Provider */}
                    <div>
                        <p className="text-sm opacity-60">
                            Account Provider
                        </p>
                        <p className="font-semibold">
                            {user?.providerData?.[0]?.providerId ===
                                "google.com"
                                ? "Google"
                                : "Email / Password"}
                        </p>
                    </div>
                </div>
            </div>

            {/* Actions */}
            <div className="mt-6 flex gap-3">
                {editMode ? (
                    <>
                        <button
                            onClick={handleUpdate}
                            className="btn btn-primary btn-sm rounded-3xl"
                        >
                            Save Changes
                        </button>
                        <button
                            onClick={handleCancel}
                            className="btn btn-ghost btn-sm rounded-3xl"
                        >
                            Cancel
                        </button>
                    </>
                ) : (
                    <button
                        onClick={() => setEditMode(true)}
                        className="btn btn-primary btn-sm rounded-3xl"
                    >
                        Edit Profile
                    </button>
                )}
            </div>
        </div>
    );
};

export default MyProfile;
