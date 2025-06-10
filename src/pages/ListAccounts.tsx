import { Box, Button, Typography } from '@mui/material';
import { CreditCard, Receipt } from '@mui/icons-material';
import { amber } from '@mui/material/colors';

import { AccountBankTable } from '../components/AccountBankTable';

export function ListAccounts() {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}>
            <Box>
                <Typography
                    color="primary"
                    sx={(theme) => ({
                        fontWeight: 'medium',
                        marginBottom: {
                            lg: '2rem',
                            xl: '2.5rem',
                        },
                        fontSize: {
                            lg: theme.typography.h4.fontSize,
                            xl: theme.typography.h3.fontSize,
                        },
                    })}>
                    Minhas contas
                </Typography>

                <AccountBankTable />
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
                <Button
                    variant="contained"
                    sx={{
                        display: 'flex',
                        gap: '1rem',
                        alignItems: 'center',
                        height: {
                            lg: '80px',
                            xl: '100px',
                        },
                        textTransform: 'none',
                        width: {
                            lg: 'auto',
                            xl: '400px',
                        },
                    }}>
                    <CreditCard fontSize="large" />
                    <Typography
                        sx={(theme) => ({
                            fontSize: {
                                lg: theme.typography.h6.fontSize,
                                xl: theme.typography.h5.fontSize,
                            },
                        })}>
                        Cadastro conta
                    </Typography>
                </Button>

                <Button
                    variant="contained"
                    sx={{
                        display: 'flex',
                        gap: '1rem',
                        alignItems: 'center',
                        height: {
                            lg: '80px',
                            xl: '100px',
                        },
                        bgcolor: amber[50],
                        textTransform: 'none',
                        width: {
                            lg: 'auto',
                            xl: '400px',
                        },
                    }}>
                    <Receipt fontSize="large" />
                    <Typography
                        sx={(theme) => ({
                            fontSize: {
                                lg: theme.typography.h6.fontSize,
                                xl: theme.typography.h5.fontSize,
                            },
                        })}>
                        Consultar extrato
                    </Typography>
                </Button>
            </Box>
        </Box>
    );
}
