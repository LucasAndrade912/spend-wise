import { useState, type MouseEvent, type ReactNode } from 'react';
import { Box, Typography, Menu, Button, MenuItem } from '@mui/material';
import { Home, CreditCard, Receipt, AccountCircle } from '@mui/icons-material';

import { NavigationLink } from '../components/NavigationLink';
import { CreateAccountModal } from '../components/CreateAccountModal';

export function Layout({ children }: { children: ReactNode }) {
    const [openCreateAccountModal, setOpenCreateAccountModal] = useState(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const openMenu = Boolean(anchorEl);

    const handleClickMenu = (event: MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const handleOpenCreateAccountModal = () => {
        setOpenCreateAccountModal(true);
    };

    const handleCloseCreateAccountModal = () => {
        setOpenCreateAccountModal(false);
    };

    return (
        <Box
            component="main"
            sx={{
                bgcolor: 'grey.900',
                color: 'white',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
            }}>
            <Box
                component="header"
                sx={{ borderBottom: '1px solid', borderColor: 'grey.800' }}>
                <Box
                    component="nav"
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '2.5rem 9.25rem',
                    }}>
                    <Typography
                        variant="h5"
                        color="primary"
                        sx={{ fontWeight: 'medium' }}>
                        💰 SpendWise
                    </Typography>

                    <Box
                        component="ul"
                        sx={{
                            listStyle: 'none',
                            padding: 0,
                            display: 'flex',
                            gap: '2.5rem',
                        }}>
                        <Box component="li">
                            <NavigationLink to="/my-accounts">
                                <Home fontSize="medium" />
                                <Typography variant="body1">Minhas contas</Typography>
                            </NavigationLink>
                        </Box>

                        <Box component="li">
                            <Button
                                onClick={handleOpenCreateAccountModal}
                                sx={{
                                    color: 'white',
                                    textDecoration: 'none',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '.5rem',
                                    textTransform: 'none',
                                    ':hover': { bgcolor: 'transparent' },
                                    padding: 0,
                                }}>
                                <CreditCard fontSize="medium" />
                                <Typography variant="body1">Cadastrar conta</Typography>
                            </Button>
                        </Box>

                        <Box component="li">
                            <NavigationLink to="/extracts">
                                <Receipt fontSize="medium" />
                                <Typography variant="body1">Consultar extrato</Typography>
                            </NavigationLink>
                        </Box>
                    </Box>

                    <Button
                        id="menu-btn"
                        aria-controls={openMenu ? 'header-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={openMenu ? 'true' : undefined}
                        onClick={handleClickMenu}
                        sx={{
                            display: 'flex',
                            gap: '.5rem',
                            ':hover': { bgcolor: 'transparent' },
                            color: 'white',
                            textTransform: 'none',
                        }}>
                        <AccountCircle fontSize="large" />
                        <Typography variant="body1">Lucas Andrade</Typography>
                    </Button>

                    <Menu
                        id="account-menu"
                        anchorEl={anchorEl}
                        open={openMenu}
                        onClose={handleCloseMenu}>
                        <MenuItem onClick={handleCloseMenu}>Sair</MenuItem>
                    </Menu>
                </Box>
            </Box>

            <Box
                component="section"
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    height: '100vh',
                    padding: '0 9.25rem',
                    marginTop: {
                        lg: '4rem',
                        xl: '7.5rem',
                    },
                }}>
                {children}
            </Box>

            <CreateAccountModal
                open={openCreateAccountModal}
                handleClose={handleCloseCreateAccountModal}
            />
        </Box>
    );
}
