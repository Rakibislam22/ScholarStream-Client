import React, { use } from 'react';
import useRole from '../hooks/useRole';
import Loading from '../components/Loading';
import { AuthContext } from '../provider/AuthContext';
import Forbidden from '../pages/Forbidden';


const StudentRoute = ({ children }) => {
    const { loading } = use(AuthContext);
    const { role, roleLoading } = useRole()

    if (loading || roleLoading) {
        return <Loading></Loading>
    }

    if (role !== 'Student') {
        return <Forbidden></Forbidden>
    }

    return children;
};

export default StudentRoute;