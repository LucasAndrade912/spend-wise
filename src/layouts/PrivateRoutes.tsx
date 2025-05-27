import { Navigate, Outlet } from 'react-router';

export function PrivateRoutes() {
    const token = localStorage.getItem('token');

    if (!token) {
        return <Navigate to="/sign-in" replace />;
    }

    return <Outlet />;
}
