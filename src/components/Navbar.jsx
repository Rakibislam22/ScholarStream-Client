import React, { use } from 'react';
import { Link, NavLink } from 'react-router';
// import { AuthContext } from '../provider/AuthContext';
// import Avatar from './Avatar';

const Navbar = () => {
    // const { user, loading } = use(AuthContext);

    const handleLoadingOnNav = () => {
        // if (loading) {
        //     return <span className="loading loading-spinner loading-md"></span>
        // }
        // user ? <Avatar></Avatar> :
        return (
            <div className="flex items-center gap-1">
                <Link
                    to={"/auth/login"}
                    className="rounded-4xl shadow-none bg-transparent md:px-4 btn btn-outline border-[#0303b8] hover:bg-[#0303b8] hover:!text-white"
                >
                    Login
                </Link>

                <Link
                    to={"/auth/signup"}
                    className="rounded-4xl py-2 shadow-none md:px-4 btn transform-none  bg-[#0303b8] hover:bg-[#000064] text-white hover:!text-white"
                >
                    Register
                </Link>
            </div>
        );

    }

    const links = <>
        <NavLink to={"/"} className=" font-semibold ">Home</NavLink>
        <NavLink to={"/scholarships"} className="lg:ml-6  font-semibold">All Scholarships</NavLink>
        <NavLink to={"/about"} className="lg:ml-6 font-semibold">About</NavLink>
    </>
    return (
        <nav className="shadow-sm rounded-4xl lg:px-3 bg-base-100/80">
            <div className='navbar '>
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" onClick={(e) => e.stopPropagation()} onFocus={(e) => e.stopPropagation()} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                        </div>
                        <ul
                            tabIndex="-1"
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-\[9999\] mt-3 w-52 p-2 shadow">
                            {links}
                        </ul>
                    </div>
                    <Link to={"/"} className="font-bold text-xl sm:text-2xl ">Scholar<span className='text-[#0303b8]'>Stream</span></Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 py-2">
                        {links}
                    </ul>
                </div>

                <div className="navbar-end">

                    {
                        handleLoadingOnNav()
                    }
                </div>



            </div>
        </nav>
    );
};

export default Navbar;