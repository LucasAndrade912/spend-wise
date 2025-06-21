import { ArrowDownward, ArrowUpward, Receipt } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import { lightGreen, red, blue } from '@mui/material/colors';

type Props = {
    title: string;
    ammount: number;
    type: 'income' | 'expense' | 'total';
};

export function DetailsCard({ title, ammount, type }: Props) {
    const colors = {
        income: lightGreen[400],
        expense: red[300],
        total: blue[200],
    };

    const formattedAmmount = ammount.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    });

    const displayAmmount =
        type === 'expense' ? formattedAmmount.replace(/\s/, ' -') : formattedAmmount;

    return (
        <Box
            sx={{
                bgcolor: colors[type],
                color: type === 'total' ? 'black' : 'white',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.5rem',
                padding: { lg: '1.25rem', xl: '1.75rem 1.5rem' },
                borderRadius: '.5rem',
                width: { lg: '280px', xl: '400px' },
            }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '1.125rem' }}>
                {type === 'income' && <ArrowUpward fontSize="small" />}
                {type === 'expense' && <ArrowDownward fontSize="small" />}
                {type === 'total' && <Receipt fontSize="small" />}
                <Typography variant="h6">{title}</Typography>
            </Box>

            <Typography
                sx={(theme) => ({
                    fontSize: {
                        lg: theme.typography.h4.fontSize,
                        xl: theme.typography.h3.fontSize,
                    },
                })}>
                {displayAmmount}
            </Typography>
        </Box>
    );
}
