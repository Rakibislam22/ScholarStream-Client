import React, { use, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router';
import { AuthContext } from '../provider/AuthContext';
import { toast } from 'react-toastify';
import { FaEye, FaEyeSlash } from 'react-icons/fa';


const Signup = () => {

    const { createUser, setUser, google, forUpdateProfile } = use(AuthContext);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const [eye, setEye] = useState(false);


    const handleSignup = (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const photo = e.target.photoUrl.value;
        const email = e.target.email.value;
        const password = e.target.password.value

        const hasUppercase = /[A-Z]/.test(password);
        const hasLowercase = /[a-z]/.test(password);

        if (!hasUppercase || !hasLowercase || password.length < 6) {
            setError('Password must contain at least one uppercase letter, at least one lowercase letter and at least 6 characters long.');
            return;
        }
        setError('');

        createUser(email, password)
            .then((result) => {
                const newUser = result.user;
                setUser(newUser);

                const userToDatabase = { displayName: newUser.displayName, email: newUser.email, photoUrl: newUser.photoUrl };

                fetch('https://movie-master-pro1234-191589w3p-md-rakib-alis-projects.vercel.app/users', {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(userToDatabase)
                }).then(res => res.json())
                    .then(result => {
                        console.log(result);
                    })
                    .catch((err) => console.error("POST Error:", err));

                forUpdateProfile(name, photo)
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

            const userToDatabase = { displayName: newUser.displayName, email: newUser.email, photoURL: newUser.photoURL, };

            navigate("/")

            fetch('https://movie-master-pro1234-191589w3p-md-rakib-alis-projects.vercel.app/users', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userToDatabase)
            }).then(res => res.json())
                .then(result => {
                    console.log(result);
                })
                .catch((err) => console.error("POST Error:", err));
        }).catch(error => {
            const errorMessage = error.message;
            toast.error(errorMessage);
        });
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-l from-black/30 via-transparent to-black/30 ">
            <title>MovieMaster Pro - Signup</title>
            <div className="shadow-lg rounded-2xl p-8 w-full max-w-md"> <h2 className="text-3xl font-semibold text-center text-[#f97316] mb-6">
                Sign Up </h2>

                <form onSubmit={handleSignup} className="space-y-5 relative">

                    <div>
                        <label className="block text-gray-700 mb-1">Name</label>
                        <input
                            type="text" name='name'
                            placeholder="Enter your name"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 mb-1">Email</label>
                        <input
                            type="email" name='email'
                            placeholder="Enter your email"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 mb-1">Photo URL</label>
                        <input
                            type="text" name='photoUrl'
                            placeholder="Enter your photo URL"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 mb-1">Password</label>
                        <input
                            type={eye ? "text" : "password"} name='password'
                            placeholder="Enter your password"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                            required
                        />
                        <span onClick={() => setEye(!eye)} className='absolute right-3 top-78 cursor-pointer z-10'>
                            {
                                eye ? <FaEye /> : <FaEyeSlash />
                            }
                        </span>

                        {error && (
                            <p className="text-red-500 text-sm mt-1">{error}</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="w-full btn bg-[#f97316] text-white py-2 rounded-lg font-semibold hover:bg-[#bb4f02] transition-colors"
                    >
                        Register
                    </button>
                    <button type="button" onClick={handleGoogle} className="w-full flex items-center justify-center gap-2 border border-gray-300 py-2 rounded-lg hover:bg-[#f97316] hover:text-white transition-colors" > <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" /> <span className="font-medium">Continue with Google</span> </button>
                </form>

                <p className="text-sm text-center text-gray-600 mt-6">
                    Already have an account?{" "}
                    <Link to="/auth/login" className="text-[#f97316] hover:underline">
                        Login
                    </Link>
                </p>

            </div>
        </div>

    );
};

export default Signup;