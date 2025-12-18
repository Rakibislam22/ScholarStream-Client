import { useQuery } from '@tanstack/react-query';
import React, { use } from 'react';
import useAxios from './useAxios';
import { AuthContext } from '../provider/AuthContext';

const useRole = () => {
    const axiosIn = useAxios();
    const { user } = use(AuthContext);

    const { isLoading: roleLoading, data: role = 'user' } = useQuery({
        queryKey: ['user-role', user?.email],
        queryFn: async () => {
            const res = await axiosIn.get(`/users/${user.email}/role`);

            return res.data?.role || 'user';
        }
    })

    return { role, roleLoading };
};

export default useRole;