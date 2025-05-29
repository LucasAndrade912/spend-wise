// src/test-utils.tsx
import { type ReactElement } from 'react';
import { render, type RenderOptions, cleanup } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { afterEach } from 'vitest';

// Cria um novo QueryClient para cada teste ou suite
const createQueryClient = () =>
    new QueryClient({
        defaultOptions: {
            queries: {
                retry: false,
            },
        },
    });

let queryClient: QueryClient;

const renderWithClient = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) => {
    queryClient = createQueryClient();
    const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );

    return render(ui, { wrapper: Wrapper, ...options });
};

afterEach(() => {
    cleanup();
    queryClient?.clear();
});

export * from '@testing-library/react';
export { renderWithClient as render };
