import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const MainLayouts = () => {
    return (
        <div className='bg-gray-50'>
            <div className='max-w-7xl mx-auto px-3'>
                <Navbar></Navbar>
                <Outlet></Outlet>
                <Footer></Footer>

            </div>

        </div>
    );
};

export default MainLayouts;