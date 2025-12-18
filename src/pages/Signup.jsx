import React, { use, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router';
import { AuthContext } from '../provider/AuthContext';
import { toast } from 'react-toastify';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import useAxios from '../hooks/useAxios';


const Signup = () => {

    const { createUser, setUser, google, forUpdateProfile } = use(AuthContext);
    const axiosIn = useAxios();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const navigate = useNavigate();

    const [eye, setEye] = useState(false);

    const handleSignup = (data) => {


        createUser(data.email, data.password)
            .then((result) => {
                const newUser = result.user;
                setUser(newUser);

                const userToDatabase = { name: data.name, email: data.email, photoURL: data?.photoUrl, role: "student" };

                axiosIn.post('/users', userToDatabase).then();

                forUpdateProfile(data.name, data?.photoUrl)
                    .then(() => {
                        navigate('/');
                    })
                    .catch((err) => toast.error(err.message));
            })
            .catch((error) => {
                toast.error(error.message);
            });
    }

    const handleGoogle = () => {
        google().then(result => {
            const newUser = result.user;

            setUser(newUser);

            const userToDatabase = { name: newUser.displayName, email: newUser.email, photoURL: newUser.photoUrl, role: "student" };

            navigate("/")
            axiosIn.post('/users', userToDatabase).then();

        }).catch(error => {
            const errorMessage = error.message;
            toast.error(errorMessage);
        });
    }

    return (
        <div className="flex justify-center items-center min-h-screen">
            <title>ScholarStream - Signup</title>
            <div className=" rounded-2xl p-8 w-full max-w-md"> <h2 className="text-3xl font-semibold text-center text-[#0303b8] mb-6">
                Sign Up </h2>

                <form onSubmit={handleSubmit(handleSignup)} className="space-y-5">

                    <div>
                        <label className="pl-4 block text-gray-700 mb-1">Name</label>
                        <input
                            type="text" {...register("name", { required: true })}
                            placeholder="Enter your name"
                            className="w-full px-4 py-2 border border-gray-300 rounded-4xl focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                        {
                            errors.name?.type === "required" && <p className="pl-4 text-red-500 text-sm mt-1">Name is required</p>
                        }
                    </div>

                    <div>
                        <label className="pl-4 block text-gray-700 mb-1">Email</label>
                        <input
                            type="email" {...register("email", { required: true })}
                            placeholder="Enter your email"
                            className="w-full px-4 py-2 border border-gray-300 rounded-4xl focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                        {
                            errors.email?.type === "required" && <p className="pl-4 text-red-500 text-sm mt-1">Email is required</p>
                        }
                    </div>

                    <div>
                        <label className="pl-4 block text-gray-700 mb-1">Photo URL</label>
                        <input
                            type="text" {...register("photoUrl")}
                            placeholder="Enter your photo URL"
                            className="w-full px-4 py-2 border border-gray-300 rounded-4xl focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                    </div>

                    <div className='relative'>
                        <label className="pl-4 block text-gray-700 mb-1">Password</label>
                        <input
                            type={eye ? "text" : "password"} {...register("password", { required: true, pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{6,}$/ })}
                            placeholder="Enter your password"
                            className="w-full px-4 py-2 border border-gray-300 rounded-4xl focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                        <span onClick={() => setEye(!eye)} className='absolute right-3 top-10 cursor-pointer z-10'>
                            {
                                eye ? <FaEye /> : <FaEyeSlash />
                            }
                        </span>

                        {
                            errors.password?.type === "required" && <p className="pl-4 text-red-500 text-sm mt-1">Password is required</p>
                        }
                        {
                            errors.password?.type === "pattern" && <p className="pl-4 text-red-500 text-sm mt-1">Password must be at least 6 characters and include uppercase, lowercase, number, and special character.</p>
                        }
                    </div>

                    <button
                        type="submit"
                        className="w-full btn bg-[#0303b8] text-white py-2 rounded-4xl font-semibold hover:bg-[#000064] transition-colors"
                    >
                        Register
                    </button>
                    <button type="button" onClick={handleGoogle} className="w-full flex items-center justify-center gap-2 border border-gray-300 py-2 rounded-4xl hover:bg-[#0303b8] hover:text-white transition-colors" > <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" /> <span className="font-medium">Continue with Google</span> </button>
                </form>

                <p className="text-sm text-center text-gray-600 mt-6">
                    Already have an account?{" "}
                    <Link to="/auth/login" className="text-[#0303b8] hover:underline">
                        Login
                    </Link>
                </p>

            </div>
        </div>

    );
};

export default Signup;