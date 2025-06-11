import type { ReactNode } from 'react';
import { NavLink } from 'react-router';
import { Box } from '@mui/material';

export function NavigationLink({ to, children }: { to: string; children: ReactNode }) {
    return (
        <Box
            component={NavLink}
            to={to}
            sx={{
                color: 'white',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '.5rem',
            }}>
            {children}
        </Box>
    );
}
