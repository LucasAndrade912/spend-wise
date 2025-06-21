import { Box } from '@mui/material';

import { DetailsCard } from './DetailsCard';

type Props = {
    incomes: number;
    expenses: number;
    balance: number;
};

export function AccountDetailsCards({ balance, expenses, incomes }: Props) {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <DetailsCard
                title="Total de entradas"
                ammount={incomes / 100}
                type="income"
            />

            <DetailsCard
                title="Total de saídas"
                ammount={expenses / 100}
                type="expense"
            />

            <DetailsCard title="Saldo total" ammount={balance / 100} type="total" />
        </Box>
    );
}
