import { Navigate, Outlet, useLocation } from 'react-router';
import { Box, CircularProgress } from '@mui/material';

import { Layout } from './Layout';
import { useAuth } from '../hooks/useAuth';

export function PrivateRoutes() {
    const { isLoading, isAuthenticated } = useAuth();
    const location = useLocation();
    const currentPath = location.pathname;

    if (isLoading) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh',
                    bgcolor: 'grey.900',
                }}>
                <CircularProgress />
            </Box>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/sign-in" replace />;
    }

    return (
        <Layout>
            {currentPath === '/' ? <Navigate to="/my-accounts" replace /> : <Outlet />}
        </Layout>
    );
}
