import { describe, expect, test, beforeEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';

import { AccountBankTable } from './AccountBankTable';

describe('AccountBankTable Component', () => {
    beforeEach(() => {
        cleanup();
    });

    test('Deve renderizar a tabela com os dados corretos', () => {
        render(<AccountBankTable />);

        expect(screen.getByText('ID')).toBeInTheDocument();
        expect(screen.getByText('Nome')).toBeInTheDocument();
        expect(screen.getByText('Tipo')).toBeInTheDocument();
        expect(screen.getByText('Data de criação')).toBeInTheDocument();
        expect(screen.getByText('Ações')).toBeInTheDocument();

        expect(screen.getByText('Data Grid')).toBeInTheDocument();
        expect(screen.getByText('the Community version')).toBeInTheDocument();
        expect(screen.getByText('01/01/2025')).toBeInTheDocument();

        expect(screen.getByText('Data Grid Pro')).toBeInTheDocument();
        expect(screen.getByText('the Pro version')).toBeInTheDocument();
        expect(screen.getByText('01/01/2025')).toBeInTheDocument();

        expect(screen.getByText('Data Grid Premium')).toBeInTheDocument();
        expect(screen.getByText('the Premium version')).toBeInTheDocument();
        expect(screen.getByText('01/01/2025')).toBeInTheDocument();
    });
});
