import { Navigate, Outlet } from 'react-router';

import { Layout } from './Layout';

export function PrivateRoutes() {
    const token = localStorage.getItem('token');

    if (!token) {
        return <Navigate to="/sign-in" replace />;
    }

    return (
        <Layout>
            <Outlet />
        </Layout>
    );
}
