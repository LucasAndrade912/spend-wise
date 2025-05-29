import { Navigate, Outlet, useLocation } from 'react-router';

import { Layout } from './Layout';

export function PrivateRoutes() {
    const token = localStorage.getItem('token');
    const location = useLocation();
    const currentPath = location.pathname;

    if (!token) {
        return <Navigate to="/sign-in" replace />;
    }

    return (
        <Layout>
            {currentPath === '/' ? <Navigate to="/my-accounts" replace /> : <Outlet />}
        </Layout>
    );
}
