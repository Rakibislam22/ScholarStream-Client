import React from 'react';
import { Outlet } from 'react-router';
import poster from '../assets/AuthPoster2.svg';

const AuthLayouts = () => {
    return (
        <div className='flex justify-between items-center'>
            <div className='flex-1'>
                <Outlet></Outlet>
            </div>

            <div className='max-md:hidden'>
                <img className='w=[40vw] lg:w-[40vw]' src={poster} alt="image" />
            </div>

        </div>
    );
};

export default AuthLayouts;