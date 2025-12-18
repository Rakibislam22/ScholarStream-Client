import React from 'react';
import Analytics from '../components/adminDashboardComponenet/Analytics';
import AdminRoute from '../router/AdminRoute';

const DashboardLayout = () => {
    return (
        <div>
            <AdminRoute><Analytics></Analytics></AdminRoute>
        </div>
    );
};

export default DashboardLayout;