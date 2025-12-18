import React from 'react';
import Analytics from '../components/adminDashboardComponenet/Analytics';
import AdminRoute from '../router/AdminRoute';
import useRole from '../hooks/useRole';
import MyProfile from '../pages/MyProfile';
import PrivateRoute from '../provider/PrivateRoute';

const DashboardLayout = () => {
    const { role } = useRole();

    if (role == 'Admin') {
        return (
            <div>
                <AdminRoute><Analytics></Analytics></AdminRoute>
            </div>
        );
    }
    else{
        return <PrivateRoute><MyProfile></MyProfile></PrivateRoute>
    }

};

export default DashboardLayout;