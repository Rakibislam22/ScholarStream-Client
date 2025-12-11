import React from 'react';
import Signup from '../pages/Signup';
import { Outlet } from 'react-router';

const AuthLayouts = () => {
    return (
        <div>
            <Outlet></Outlet>
        </div>
    );
};

export default AuthLayouts;