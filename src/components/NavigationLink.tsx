import type { ReactNode } from 'react';
import { NavLink, useLocation } from 'react-router';
import { Box } from '@mui/material';
import { blue } from '@mui/material/colors';

export function NavigationLink({ to, children }: { to: string; children: ReactNode }) {
    const location = useLocation();
    const isActive = location.pathname === to;

    return (
        <Box
            component={NavLink}
            to={to}
            sx={{
                color: isActive ? blue[200] : 'white',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '.5rem',
            }}>
            {children}
        </Box>
    );
}
