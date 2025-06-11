import { useQuery } from '@tanstack/react-query';

import { api } from '../lib/api';

interface UserProfile {
    id: string;
    name: string;
    email: string;
}

export function useAuth() {
    const token = localStorage.getItem('token');

    const {
        data: user,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ['profile'],
        queryFn: async (): Promise<UserProfile> => {
            const response = await api.get('/auth/profile');
            return response.data.data;
        },
        enabled: !!token,
        retry: false,
        staleTime: 5 * 60 * 1000,
    });

    const logout = () => {
        localStorage.removeItem('token');
        location.href = '/sign-in';
    };

    return {
        user,
        isLoading,
        isAuthenticated: !!token && !isError,
        logout,
    };
}
