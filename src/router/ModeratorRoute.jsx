import React, { use } from 'react';
import { AuthContext } from '../provider/AuthContext';
import useRole from '../hooks/useRole';
import Loading from '../components/Loading';

const ModeratorRoute = ({ children }) => {
    const { loading } = use(AuthContext);
    const { role, roleLoading } = useRole()

    if (loading || roleLoading) {
        return <Loading></Loading>
    }

    if (role !== 'Moderator') {
        return <div>You are not allow</div>
    }

    return children;
};

export default ModeratorRoute;