import React from 'react';
import { Link, NavLink } from 'react-router';
import { AuthContext } from '../provider/AuthContext';
import Avatar from './Avatar';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
    const { user, loading, theme } = React.useContext(AuthContext);

    const handleLoadingOnNav = () => {
        if (loading) {
            return <span className="loading loading-spinner loading-md"></span>
        }

        return user ? <Avatar /> : (
            <div className="flex items-center gap-1">
                <Link
                    to={"/auth/login"}
                    className={`
                    rounded-4xl shadow-none bg-transparent md:px-4
                    btn btn-outline border-[#0303b8]
                    hover:bg-[#0303b8] hover:!text-white
                    ${theme === "dark"
                            ? "border-indigo-400 text-gray-200 hover:bg-indigo-500"
                            : ""}
                    `}
                >
                    Login
                </Link>

                <Link
                    to={"/auth/signup"}
                    className={`
                    rounded-4xl py-2 shadow-none md:px-4 btn transform-none
                    bg-[#0303b8] hover:bg-[#000064]
                    text-white hover:!text-white
                    ${theme === "dark"
                            ? "bg-indigo-500 hover:bg-indigo-600"
                            : ""}
                    `}
                >
                    Register
                </Link>
            </div>
        );
    };

    const links = <>
        <NavLink
            to={"/"}
            className={`
            font-semibold transition-colors
            ${theme === "dark" ? "text-gray-200 hover:text-white" : ""}
            `}
        >
            Home
        </NavLink>

        <NavLink
            to={"/scholarships"}
            className={`
            lg:ml-6 font-semibold transition-colors
            ${theme === "dark" ? "text-gray-200 hover:text-white" : ""}
            `}
        >
            All Scholarships
        </NavLink>

        <NavLink
            to={"/about"}
            className={`
            lg:ml-6 font-semibold transition-colors
            ${theme === "dark" ? "text-gray-200 hover:text-white" : ""}
            `}
        >
            About
        </NavLink>
    </>;

    return (
        <nav
            className={`
            shadow-sm rounded-4xl lg:px-3
            bg-base-100/80 backdrop-blur
            ${theme === "dark" ? "bg-gray-900/80" : ""}
            `}
        >
            <div className='navbar'>
                <div className="navbar-start">
                    <div className="dropdown">
                        <div
                            tabIndex={0}
                            role="button"
                            onClick={(e) => e.stopPropagation()}
                            onFocus={(e) => e.stopPropagation()}
                            className={`
                            btn btn-ghost lg:hidden
                            ${theme === "dark" ? "text-gray-200" : ""}
                            `}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>

                        <ul
                            tabIndex="-1"
                            className={`
                            menu menu-sm dropdown-content
                            rounded-box z-[9999]
                            mt-3 w-52 p-2 shadow
                            ${theme === "dark"
                                    ? "bg-gray-800 shadow-black/40 text-gray-200"
                                    : "bg-base-100"}
                            `}
                        >
                            {links}
                        </ul>
                    </div>

                    <Link
                        to={"/"}
                        className={`
                        font-bold text-xl sm:text-2xl
                        ${theme === "dark" ? "text-gray-100" : ""}
                        `}
                    >
                        Scholar
                        <span className={`
                            text-[#0303b8]
                            ${theme === "dark" ? "text-indigo-400" : ""}
                        `}>
                            Stream
                        </span>
                    </Link>
                </div>

                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 py-2">
                        {links}
                    </ul>
                </div>

                <div className="navbar-end">
                    <div className='pr-5'>
                        <ThemeToggle />
                    </div>
                    {handleLoadingOnNav()}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
