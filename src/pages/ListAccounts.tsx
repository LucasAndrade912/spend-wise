import { Typography } from '@mui/material';

import { AccountBankTable } from '../components/AccountBankTable';

export function ListAccounts() {
    return (
        <>
            <Typography
                variant="h2"
                color="primary"
                sx={{
                    fontWeight: 'medium',
                    marginBottom: '64px',
                }}>
                Minhas contas
            </Typography>
            <AccountBankTable />
        </>
    );
}
