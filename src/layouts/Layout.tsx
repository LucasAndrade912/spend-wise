import { type ReactNode } from 'react';
import { Box, Typography } from '@mui/material';
import { NavLink, useLocation } from 'react-router';
import { lightBlue } from '@mui/material/colors';

export function Layout({ children }: { children: ReactNode }) {
    const location = useLocation();
    const currentPath = location.pathname;

    return (
        <Box
            component="main"
            sx={{
                bgcolor: 'grey.900',
                color: 'white',
                height: '100vh',
                display: 'flex',
            }}>
            <Box
                component="nav"
                sx={{ heigth: '100vh', padding: '80px', borderRight: '1px solid white' }}>
                <Typography variant="h5" color="primary" sx={{ fontWeight: 'medium' }}>
                    SpendWise
                </Typography>

                <Box
                    component="ul"
                    sx={{
                        listStyle: 'none',
                        padding: 0,
                        marginTop: '80px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '24px',
                    }}>
                    <Box component="li">
                        <Box
                            component={NavLink}
                            to="/my-accounts"
                            sx={{
                                color:
                                    currentPath === '/my-accounts'
                                        ? lightBlue[700]
                                        : 'white',
                                textDecoration: 'none',
                            }}>
                            Minhas contas
                        </Box>
                    </Box>

                    <Box component="li">
                        <Box
                            component={NavLink}
                            to="/create-account"
                            sx={{
                                color:
                                    currentPath === '/create-account'
                                        ? lightBlue[700]
                                        : 'white',
                                textDecoration: 'none',
                            }}>
                            Cadastrar conta
                        </Box>
                    </Box>

                    <Box component="li">
                        <Box
                            component={NavLink}
                            to="/extracts"
                            sx={{
                                color:
                                    currentPath === '/extracts'
                                        ? lightBlue[700]
                                        : 'white',
                                textDecoration: 'none',
                            }}>
                            Consultar extrato
                        </Box>
                    </Box>

                    <Box component="li" sx={{ color: 'white', textDecoration: 'none' }}>
                        Sair
                    </Box>
                </Box>
            </Box>

            <Box
                component="section"
                sx={{
                    display: 'flex',
                    justifyItems: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                    width: '100%',
                    height: '100vh',
                }}>
                {children}
            </Box>
        </Box>
    );
}
