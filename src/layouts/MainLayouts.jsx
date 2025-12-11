import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../components/Navbar';

const MainLayouts = () => {
    return (
        <div className='bg-gray-50'>
            <div className='max-w-7xl mx-auto px-3'>
                <Navbar></Navbar>
                <Outlet></Outlet>

            </div>

        </div>
    );
};

export default MainLayouts;