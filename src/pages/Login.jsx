import React, { use, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { AuthContext } from '../provider/AuthContext';
import { toast } from 'react-toastify';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useForm } from 'react-hook-form';


const Login = () => {
    const { google, userLogin, setUser } = use(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();

    const [eye, setEye] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();


    const handleLogin = (data) => {

        userLogin(data.email, data.password).then(result => {
            setUser(result.user);
            navigate(`${location.state ? location.state : "/"}`)
        }).catch(error => {
            const errorMessage = error.message;
            toast.error(errorMessage);

        });
    }


    const handleGoogle = () => {
        google().then(result => {
            toast.success('Login successful!');
            setUser(result.user);
            navigate(`${location.state ? location.state : "/"}`);
            const newUser = result.user;
            const userToDatabase = { displayName: newUser.displayName, email: newUser.email, photoURL: newUser.photoURL, };

            // fetch('https://movie-master-pro1234-191589w3p-md-rakib-alis-projects.vercel.app/users', {
            //     method: "POST",
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify(userToDatabase)
            // }).then(res => res.json())
            //     .then()
            //     .catch((err) => console.error("POST Error:", err));

        }).catch(error => {
            const errorMessage = error.message;
            toast.error(errorMessage);
        });
    }



    return (<div className="flex justify-center items-center min-h-screen ">
        <title>ScholarStream - Login</title>
        <div className="shadow-lg rounded-2xl p-8 w-full max-w-md"> <h2 className="text-3xl font-semibold text-center text-[#0303b8] mb-6">
            Login </h2>

            <form onSubmit={handleSubmit(handleLogin)} className="space-y-5">
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

                <div className='relative'>
                    <label className="pl-4 block text-gray-700 mb-1">Password</label>
                    <input
                        type={eye ? "text" : "password"} {...register("password", { required: true })}
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
                </div>

                <div className="text-right">
                    <a
                        className="text-sm text-[#0303b8] hover:underline"
                    >
                        Forgot Password?
                    </a>
                </div>

                <button
                    type="submit"
                    className="w-full btn bg-[#0303b8] text-white py-2 rounded-4xl font-semibold hover:bg-[#000064] transition-colors "
                >
                    Login
                </button>

                <button onClick={handleGoogle} type="button" className="w-full flex items-center justify-center gap-2 border border-gray-300 py-2 rounded-4xl hover:bg-[#0303b8] hover:text-white transition-colors" > <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" /> <span className="font-medium">Continue with Google</span> </button>
            </form>

            <p className="text-sm text-center text-gray-600 mt-6">
                Don’t have an account?{" "}
                <Link to="/auth/signup" className="text-[#0303b8] hover:underline">
                    Sign Up
                </Link>
            </p>
        </div>
    </div>


    );
};

export default Login;