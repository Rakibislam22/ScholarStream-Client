import React, { use } from 'react';
import { AuthContext } from '../provider/AuthContext';
import useRole from '../hooks/useRole';
import Loading from '../components/Loading';
import Forbidden from '../pages/Forbidden';

const ModeratorRoute = ({ children }) => {
    const { loading } = use(AuthContext);
    const { role, roleLoading } = useRole()

    if (loading || roleLoading) {
        return <Loading></Loading>
    }

    if (role !== 'Moderator') {
        return <Forbidden></Forbidden>
    }

    return children;
};

export default ModeratorRoute;