import { describe, expect, test, beforeEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { SignInForm } from './SignInForm';
import { BrowserRouter } from 'react-router';

describe('SignInForm Component', () => {
    beforeEach(() => {
        cleanup();
    });

    test('Deve renderizar o formulário de login com os campos corretos', () => {
        render(<SignInForm />, { wrapper: BrowserRouter });

        expect(screen.getByTestId('email')).toBeInTheDocument();
        expect(screen.getByTestId('password')).toBeInTheDocument();

        const submitButton = screen.getByRole('button', { name: 'Entrar' });
        expect(submitButton).toBeInTheDocument();
    });

    test('Deve permitir preencher os campos do formulário', async () => {
        render(<SignInForm />, { wrapper: BrowserRouter });

        const emailInput = await screen.findByLabelText('Digite seu email');
        const passwordInput = await screen.findByLabelText('Mínimo 8 caracteres');

        await userEvent.type(emailInput, 'joao@email.com');
        await userEvent.type(passwordInput, 'senha123');

        expect(emailInput).toHaveValue('joao@email.com');
        expect(passwordInput).toHaveValue('senha123');

        const submitButton = screen.getByRole('button', { name: 'Entrar' });
        await userEvent.click(submitButton);
        expect(submitButton).toBeInTheDocument();
    });
});
