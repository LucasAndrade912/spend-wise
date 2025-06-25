import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router';
import { blue } from '@mui/material/colors';
import { Add, ArrowBack } from '@mui/icons-material';
import { Box, Button, IconButton, Typography } from '@mui/material';

import { api } from '../lib/api';
import { TransctionModal } from '../components/TransactionModal';
import { TransactionsTable } from '../components/TransactionsTable';
import { AccountDetailsCards } from '../components/AccountDetailsCards';

type RetriverAccountResponse = {
    message: string;
    data: {
        id: string;
        userId: string;
        name: string;
        type: string;
        createdAt: string;
        updatedAt: string;
        incomes: number;
        expenses: number;
        balance: number;
    };
};

type RetriverTransactionResponse = {
    message: string;
    data: {
        id: string;
        accountId: string;
        ammount: number;
        transactionCategoryId: string;
        description?: string;
        date: string;
        createdAt: string;
        updatedAt: string;
        account: {
            id: string;
            userId: string;
            name: string;
            type: string;
            createdAt: string;
            updatedAt: string;
        };
        category: {
            id: string;
            name: 'entrada' | 'saída';
        };
    };
};

export function ListTransactions() {
    const [openTransactionModal, setOpenTransactionModal] = useState(false);
    const [editTransactionId, setEditTransactionId] = useState<string | null>(null);
    const navigate = useNavigate();
    const accountId = useParams().accountId as string;

    const { data: retriverAccountResponse, isSuccess } = useQuery({
        queryKey: ['account', accountId],
        queryFn: async () => {
            return await api.get<RetriverAccountResponse>(`/accounts/${accountId}`);
        },
    });

    const { data: retriverTransactionResponse } = useQuery({
        queryKey: ['editTransaction'],
        queryFn: async () => {
            const response = await api.get<RetriverTransactionResponse>(
                `/transactions/${editTransactionId}`
            );

            handleOpenTransactionModal();

            return response;
        },
        enabled: !!editTransactionId,
    });

    const handleOpenTransactionModal = () => {
        setOpenTransactionModal(true);
    };

    const handleCloseTransactionModal = () => {
        setOpenTransactionModal(false);
        setEditTransactionId(null);
    };

    const handleEditTransaction = (transactionId: string) => {
        setEditTransactionId(transactionId);
    };

    return (
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
            <Box>
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
                            Conta: {retriverAccountResponse?.data.data.name}
                        </Typography>
                    </Box>

                    <Button
                        variant="outlined"
                        sx={{ borderColor: blue[700], color: blue[700] }}
                        onClick={handleOpenTransactionModal}>
                        <Add />
                        <Typography variant="button">Criar nova transação</Typography>
                    </Button>
                </Box>
                <TransactionsTable
                    accountId={accountId}
                    onClickEdit={handleEditTransaction}
                />
            </Box>

            {isSuccess && (
                <AccountDetailsCards
                    balance={retriverAccountResponse?.data.data.balance as number}
                    expenses={retriverAccountResponse?.data.data.expenses as number}
                    incomes={retriverAccountResponse?.data.data.incomes as number}
                />
            )}

            <TransctionModal
                open={openTransactionModal}
                accountId={accountId}
                handleClose={handleCloseTransactionModal}
                isEditMode={!!editTransactionId}
                transaction={
                    retriverTransactionResponse && !!editTransactionId
                        ? {
                              id: retriverTransactionResponse.data.data.id,
                              ammount: `${retriverTransactionResponse.data.data.ammount / 100}`,
                              category:
                                  retriverTransactionResponse.data.data.category.name.toLocaleLowerCase(),
                              description:
                                  retriverTransactionResponse.data.data.description,
                              date: retriverTransactionResponse.data.data.date,
                          }
                        : undefined
                }
            />
        </Box>
    );
}
