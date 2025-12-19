import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import useAxios from "../../hooks/useAxios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import Loading from "../Loading";

const UpdateScholarship = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const axiosIn = useAxios();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const [isPending, setIsPending] = useState(false);
    const [loading, setLoading] = useState(true);

    // 🔹 Load existing scholarship data
    useEffect(() => {
        axiosIn.get(`/scholarship/${id}`)
            .then(res => {
                reset(res.data);
                setLoading(false);
            })
            .catch(() => {
                toast.error("Failed to load scholarship data");
                setLoading(false);
            });
    }, [id, axiosIn, reset]);

    const onSubmit = async (data) => {
        delete data._id;
        try {
            setIsPending(true);
            const res = await axiosIn.patch(`/scholarship/${id}`, data);

            if (res.data?.modifiedCount > 0) {
                toast.success("Scholarship updated successfully");
                navigate("/dashboard/manage-scholarship");
            } else {
                toast.info("No changes were made");
            }
        } catch (err) {
            toast.error("Failed to update scholarship");
            console.error(err);
        } finally {
            setIsPending(false);
        }
    };

    if (loading) {
        return <Loading></Loading>
    }

    return (
        <div className="max-w-5xl mx-auto bg-base-200 p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold mb-6">Update Scholarship</h2>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
                {/* Scholarship Name */}
                <div>
                    <label className="label">Scholarship Name</label>
                    <input
                        {...register("scholarshipName", { required: true })}
                        className="input input-bordered w-full"
                    />
                    {errors.scholarshipName && (
                        <p className="text-error text-sm">Required</p>
                    )}
                </div>

                {/* University Name */}
                <div>
                    <label className="label">University Name</label>
                    <input
                        {...register("universityName", { required: true })}
                        className="input input-bordered w-full"
                    />
                </div>

                {/* University Image */}
                <div>
                    <label className="label">University Image URL</label>
                    <input
                        {...register("universityImage", { required: true })}
                        className="input input-bordered w-full"
                    />
                </div>

                {/* Country */}
                <div>
                    <label className="label">Country</label>
                    <input
                        {...register("universityCountry", { required: true })}
                        className="input input-bordered w-full"
                    />
                </div>

                {/* City */}
                <div>
                    <label className="label">City</label>
                    <input
                        {...register("universityCity", { required: true })}
                        className="input input-bordered w-full"
                    />
                </div>

                {/* World Rank */}
                <div>
                    <label className="label">World Rank</label>
                    <input
                        type="number"
                        {...register("universityWorldRank", { required: true })}
                        className="input input-bordered w-full"
                    />
                </div>

                {/* Subject Category */}
                <div>
                    <label className="label">Subject Category</label>
                    <input
                        {...register("subjectCategory", { required: true })}
                        className="input input-bordered w-full"
                    />
                </div>

                {/* Scholarship Category */}
                <div>
                    <label className="label">Scholarship Category</label>
                    <select
                        {...register("scholarshipCategory", { required: true })}
                        className="select select-bordered w-full"
                    >
                        <option value="">Select</option>
                        <option>Full fund</option>
                        <option>Partial</option>
                        <option>Self-fund</option>
                    </select>
                </div>

                {/* Degree */}
                <div>
                    <label className="label">Degree</label>
                    <select
                        {...register("degree", { required: true })}
                        className="select select-bordered w-full"
                    >
                        <option value="">Select</option>
                        <option>Diploma</option>
                        <option>Bachelor</option>
                        <option>Masters</option>
                    </select>
                </div>

                {/* Tuition Fees */}
                <div>
                    <label className="label">Tuition Fees (optional)</label>
                    <input
                        type="number"
                        {...register("tuitionFees")}
                        className="input input-bordered w-full"
                    />
                </div>

                {/* Application Fees */}
                <div>
                    <label className="label">Application Fees</label>
                    <input
                        type="number"
                        {...register("applicationFees", { required: true })}
                        className="input input-bordered w-full"
                    />
                </div>

                {/* Service Charge */}
                <div>
                    <label className="label">Service Charge</label>
                    <input
                        type="number"
                        {...register("serviceCharge", { required: true })}
                        className="input input-bordered w-full"
                    />
                </div>

                {/* Deadline */}
                <div>
                    <label className="label">Application Deadline</label>
                    <input
                        type="date"
                        {...register("applicationDeadline", { required: true })}
                        className="input input-bordered w-full"
                    />
                </div>

                {/* Post Date */}
                <div>
                    <label className="label">Post Date</label>
                    <input
                        type="date"
                        {...register("scholarshipPostDate", { required: true })}
                        className="input input-bordered w-full"
                    />
                </div>

                {/* User Email */}
                <div>
                    <label className="label">User Email</label>
                    <input
                        type="email"
                        {...register("postedUserEmail", { required: true })}
                        className="input input-bordered w-full"
                        readOnly
                    />
                </div>

                {/* Submit */}
                <div className="md:col-span-2">
                    <button disabled={isPending} className="btn btn-primary w-full">
                        {isPending ? "Updating..." : "Update Scholarship"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UpdateScholarship;
