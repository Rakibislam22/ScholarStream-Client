import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../components/Navbar';

const MainLayouts = () => {
    return (
        <div className='max-w-7xl mx-auto px-3'>
            <Navbar></Navbar>
           
            
        </div>
    );
};

export default MainLayouts;