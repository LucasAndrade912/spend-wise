import { useState } from 'react';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { Box, Chip } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import {
    type GridColDef,
    type GridPaginationModel,
    type GridRowsProp,
    DataGrid,
    GridActionsCellItem,
} from '@mui/x-data-grid';

import { api } from '../lib/api';

type Props = {
    accountId: string;
};

type Response = {
    message: string;
    data: {
        id: string;
        accountId: string;
        amount: number;
        transactionCategoryId: string;
        description: string;
        date: string;
        createdAt: string;
        updatedAt: string;
        category: { name: string };
    }[];
    total: number;
    totalPages: number;
};

export function TransactionsTable({ accountId }: Props) {
    const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
        page: 0,
        pageSize: 5,
    });

    const { data: response, isFetching } = useQuery({
        queryKey: [
            'transactions',
            accountId,
            paginationModel.page,
            paginationModel.pageSize,
        ],
        queryFn: async ({ queryKey }) => {
            const [, , page, pageSize] = queryKey;

            return await api.get<Response>('/transactions', {
                params: {
                    accountId,
                    page: (page as number) + 1,
                    limit: pageSize,
                },
            });
        },
        placeholderData: keepPreviousData,
    });

    const columns: GridColDef[] = [
        { field: 'value', headerName: 'Valor', flex: 1 },
        {
            field: 'category',
            headerName: 'Categoria',
            flex: 1,
            renderCell: (params) => (
                <Chip
                    label={params.value}
                    size="small"
                    color={params.value === 'Entrada' ? 'success' : 'error'}
                />
            ),
        },
        { field: 'date', headerName: 'Data', flex: 1 },
        { field: 'description', headerName: 'Descrição', flex: 1 },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Ações',
            flex: 1,
            align: 'left',
            headerAlign: 'left',
            getActions: () => [
                <GridActionsCellItem
                    icon={<Delete color="error" />}
                    label="Deletar conta"
                />,
                <GridActionsCellItem
                    icon={<Edit color="primary" />}
                    label="Editar conta"
                />,
            ],
        },
    ];

    return (
        <Box>
            <DataGrid
                loading={isFetching}
                rows={
                    response?.data.data.map((transaction) => ({
                        id: transaction.id,
                        value: (transaction.amount / 100).toLocaleString('pt-BR', {
                            style: 'currency',
                            currency: 'BRL',
                        }),
                        category: transaction.category.name,
                        date: new Date(transaction.date).toLocaleDateString('pt-BR'),
                    })) as GridRowsProp
                }
                columns={columns}
                disableColumnResize
                paginationMode="server"
                paginationModel={paginationModel}
                onPaginationModelChange={setPaginationModel}
                rowCount={response?.data.total || 0}
                pageSizeOptions={[5, 10, 15]}
                sx={{
                    width: { lg: '700px', xl: '1000px' },
                    bgcolor: 'transparent',
                    border: 'none',
                }}
            />
        </Box>
    );
}
