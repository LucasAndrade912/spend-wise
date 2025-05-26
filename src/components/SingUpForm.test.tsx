import { describe, expect, test, beforeEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { SignUpForm } from './SignUpForm';

describe('SignUpForm Component', () => {
    beforeEach(() => {
        cleanup();
    });

    test('Deve renderizar o formulário de cadastro com os campos corretos', () => {
        render(<SignUpForm />);

        expect(screen.getByTestId('fullName')).toBeInTheDocument();
        expect(screen.getByTestId('email')).toBeInTheDocument();
        expect(screen.getByTestId('password')).toBeInTheDocument();
        expect(screen.getByTestId('confirmPassword')).toBeInTheDocument();

        const submitButton = screen.getByRole('button', { name: 'Cadastrar' });
        expect(submitButton).toBeInTheDocument();
    });

    test('Deve permitir preencher os campos do formulário', async () => {
        render(<SignUpForm />);

        const nameInput = await screen.findByLabelText('Digite seu nome completo');
        const emailInput = await screen.findByLabelText('Digite seu email');
        const passwordInput = await screen.findByLabelText('Mínimo 8 caracteres');
        const confirmPasswordInput = await screen.findByLabelText('Insira a mesma senha');

        await userEvent.type(nameInput, 'João Silva');
        await userEvent.type(emailInput, 'joao@email.com');
        await userEvent.type(passwordInput, 'senha123');
        await userEvent.type(confirmPasswordInput, 'senha123');

        expect(nameInput).toHaveValue('João Silva');
        expect(emailInput).toHaveValue('joao@email.com');
        expect(passwordInput).toHaveValue('senha123');
        expect(confirmPasswordInput).toHaveValue('senha123');

        const submitButton = screen.getByRole('button', { name: 'Cadastrar' });
        await userEvent.click(submitButton);
    });

    test('Deve exibir mensagem de erro ao tentar cadastrar com senhas diferentes', async () => {
        render(<SignUpForm />);

        const passwordInput = await screen.findByLabelText('Mínimo 8 caracteres');
        const confirmPasswordInput = await screen.findByLabelText('Insira a mesma senha');

        await userEvent.type(passwordInput, 'senha123');
        await userEvent.type(confirmPasswordInput, 'senhawrong');

        const submitButton = screen.getByRole('button', { name: 'Cadastrar' });
        await userEvent.click(submitButton);

        expect(screen.getByText('As senhas não correspondem')).toBeInTheDocument();
    });

    test('Deve exibir mensagem de erro ao tentar cadastrar com e-mail inválido', async () => {
        render(<SignUpForm />);

        const emailInput = await screen.findByLabelText('Digite seu email');

        await userEvent.type(emailInput, 'invalid-email@wrong');

        const submitButton = screen.getByRole('button', { name: 'Cadastrar' });
        await userEvent.click(submitButton);

        expect(screen.getByText('Informe um email válido')).toBeInTheDocument();
    });
});
