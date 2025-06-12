import { Delete, Edit } from '@mui/icons-material';
import { Box } from '@mui/material';
import {
    DataGrid,
    GridActionsCellItem,
    type GridColDef,
    type GridRowsProp,
} from '@mui/x-data-grid';
import { useQuery } from '@tanstack/react-query';

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
};

export function AccountBankTable() {
    const handleListAccounts = async () => {
        return await api.get<Response>('/accounts');
    };

    const { data: response } = useQuery({
        queryKey: ['accounts'],
        queryFn: handleListAccounts,
    });

    const rows: GridRowsProp =
        response?.data.data.map((account) => ({
            id: account.id,
            name: account.name,
            type: account.type[0] + account.type.slice(1).toLowerCase(),
            created_at: new Date(account.createdAt).toLocaleDateString('pt-BR'),
        })) || [];

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', flex: 1 },
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
                rows={rows}
                columns={columns}
                disableColumnResize
                sx={{
                    width: { lg: '700px', xl: '1000px' },
                    bgcolor: 'transparent',
                    border: 'none',
                }}
            />
        </Box>
    );
}
