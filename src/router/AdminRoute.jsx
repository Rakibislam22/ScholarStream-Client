import React, { use } from 'react';
import useRole from '../hooks/useRole';
import Loading from '../components/Loading';
import { AuthContext } from '../provider/AuthContext';
import Forbidden from '../pages/Forbidden';


const AdminRoute = ({ children }) => {
    const { loading } = use(AuthContext);
    const { role, roleLoading } = useRole()

    if (loading || roleLoading) {
        return <Loading></Loading>
    }

    if (role !== 'Admin') {
        return <Forbidden></Forbidden>
    }

    return children;
};

export default AdminRoute;