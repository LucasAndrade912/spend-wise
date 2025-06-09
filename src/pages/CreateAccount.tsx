import { Typography } from '@mui/material';

import { NewAccountForm } from '../components/NewAccountForm';

export function CreateAccount() {
    return (
        <>
            <Typography
                variant="h2"
                color="primary"
                sx={{
                    fontWeight: 'medium',
                    marginBottom: '64px',
                }}>
                Criar nova conta
            </Typography>
            <NewAccountForm />
        </>
    );
}
