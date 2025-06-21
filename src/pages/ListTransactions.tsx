import { Box, Button, IconButton, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router';
import { TransactionsTable } from '../components/TransactionsTable';
import { Add, ArrowBack } from '@mui/icons-material';
import { useQuery } from '@tanstack/react-query';
import { blue } from '@mui/material/colors';

import { api } from '../lib/api';

type Response = {
    message: string;
    data: {
        id: string;
        userId: string;
        name: string;
        type: string;
        createdAt: string;
        updatedAt: string;
    };
};

export function ListTransactions() {
    const navigate = useNavigate();
    const accountId = useParams().accountId as string;

    const { data: response } = useQuery({
        queryKey: ['account', accountId],
        queryFn: async () => {
            return await api.get<Response>(`/accounts/${accountId}`);
        },
    });

    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '2.5rem',
                    width: { lg: '700px', xl: '1000px' },
                }}>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '.875rem',
                    }}>
                    <IconButton onClick={() => navigate(-1)}>
                        <ArrowBack />
                    </IconButton>
                    <Typography variant="h4">
                        Conta: {response?.data.data.name}
                    </Typography>
                </Box>

                <Button
                    variant="outlined"
                    sx={{ borderColor: blue[700], color: blue[700] }}>
                    <Add />
                    <Typography variant="button">Criar nova transação</Typography>
                </Button>
            </Box>
            <TransactionsTable accountId={accountId} />
        </>
    );
}
