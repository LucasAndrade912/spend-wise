import { Box } from '@mui/material';
import { DataGrid, type GridColDef, type GridRowsProp } from '@mui/x-data-grid';

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
        { field: 'id', headerName: 'ID', width: 198 },
        { field: 'name', headerName: 'Nome', width: 198 },
        { field: 'type', headerName: 'Tipo', width: 198 },
        { field: 'created_at', headerName: 'Data de criação', width: 198 },
        { field: 'actions', headerName: 'Ações', width: 198 },
    ];

    return (
        <Box sx={{ width: '1000px' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSizeOptions={[5, 10]}
                sx={{ background: 'none' }}
            />
        </Box>
    );
}
