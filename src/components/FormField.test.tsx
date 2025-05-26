import { describe, expect, test, beforeEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { FormField } from './FormField';

describe('FormField Component', () => {
    beforeEach(() => {
        cleanup();
    });

    test('Deve renderizar o campo de texto com o rótulo correto', async () => {
        render(<FormField id="testField" label="Test Field" type="text" />);

        expect(screen.getByText('Test Field')).toBeInTheDocument();
        expect(screen.getByText('Test Field')).toHaveAttribute('for', 'testField');
    });

    test('Deve renderizar o campo de texto com conteúdo correto', async () => {
        render(<FormField id="testField" label="Test Field" type="text" />);

        const formFieldElement = screen.getByRole('textbox');
        await userEvent.type(formFieldElement, 'Test Value');

        expect(formFieldElement).toHaveValue('Test Value');
    });
});
