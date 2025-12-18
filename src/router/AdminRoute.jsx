import React, { use } from 'react';
import useRole from '../hooks/useRole';
import Loading from '../components/Loading';
import { AuthContext } from '../provider/AuthContext';


const AdminRoute = ({ children }) => {
    const { loading } = use(AuthContext);
    const { role, roleLoading } = useRole()

    if (loading || roleLoading) {
        return <Loading></Loading>
    }

    if (role !== 'Admin') {
        return <div>You are not allow</div>
    }

    return children;
};

export default AdminRoute;