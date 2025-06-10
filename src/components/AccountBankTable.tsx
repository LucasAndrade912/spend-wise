import { Delete, Edit } from '@mui/icons-material';
import { Box } from '@mui/material';
import {
    DataGrid,
    GridActionsCellItem,
    type GridColDef,
    type GridRowsProp,
} from '@mui/x-data-grid';

export function AccountBankTable() {
    const rows: GridRowsProp = [
        {
            id: 1,
            name: 'Data Grid',
            type: 'the Community version',
            created_at: '01/01/2025',
        },
        {
            id: 2,
            name: 'Data Grid Pro',
            type: 'the Pro version',
            created_at: '01/01/2025',
        },
        {
            id: 3,
            name: 'Data Grid Premium',
            type: 'the Premium version',
            created_at: '01/01/2025',
        },
    ];

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
