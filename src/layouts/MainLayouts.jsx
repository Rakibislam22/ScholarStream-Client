import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ToastContainer } from 'react-toastify';

const MainLayouts = () => {
    return (
        <div className=''>
            <div className='max-w-7xl mx-auto px-3 relative '>
                <div className='sticky top-2 z-50'>
                    <Navbar></Navbar>
                </div>
                <Outlet></Outlet>
                <Footer></Footer>

            </div>

            <ToastContainer
                position="top-center"
                autoClose={2000}
                closeOnClick={false}
                pauseOnHover
                pauseOnFocusLoss={false}
                draggable={false}
                theme="colored"
                style={{ zIndex: 9999 }}
            />

        </div>
    );
};

export default MainLayouts;