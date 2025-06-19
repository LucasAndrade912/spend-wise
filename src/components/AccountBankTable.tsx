import { useState } from 'react';
import { Box } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import type { GridPaginationModel } from '@mui/x-data-grid';
import {
    DataGrid,
    GridActionsCellItem,
    type GridColDef,
    type GridRowsProp,
} from '@mui/x-data-grid';
import { useQuery, keepPreviousData } from '@tanstack/react-query';

import { api } from '../lib/api';

type Response = {
    message: string;
    data: {
        id: number;
        name: string;
        type: string;
        createdAt: string;
        updatedAt: string;
    }[];
    total: number;
    totalPages: number;
};

export function AccountBankTable() {
    const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
        page: 0,
        pageSize: 5,
    });

    const { data: response, isFetching } = useQuery({
        queryKey: ['accounts', paginationModel.page, paginationModel.pageSize],
        queryFn: async ({ queryKey }) => {
            const [, page, pageSize] = queryKey;
            return await api.get<Response>('/accounts', {
                params: {
                    page: (page as number) + 1,
                    limit: pageSize,
                },
            });
        },
        placeholderData: keepPreviousData,
    });

    const columns: GridColDef[] = [
        { field: 'name', headerName: 'Nome', flex: 1 },
        { field: 'type', headerName: 'Tipo', flex: 1 },
        { field: 'created_at', headerName: 'Data de criação', flex: 1 },
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
                    response?.data.data.map((account) => ({
                        id: account.id,
                        name: account.name,
                        type: account.type[0] + account.type.slice(1).toLowerCase(),
                        created_at: new Date(account.createdAt).toLocaleDateString(
                            'pt-BR'
                        ),
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
