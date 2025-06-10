import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router';
import { CssBaseline } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { grey } from '@mui/material/colors';
import type {} from '@mui/x-data-grid/themeAugmentation';

import { SignUp } from './pages/SignUp';
import { SignIn } from './pages/SignIn';
import { PrivateRoutes } from './layouts/PrivateRoutes';
import { ListAccounts } from './pages/ListAccounts';
import { CreateAccount } from './pages/CreateAccount';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        DataGrid: {
            headerBg: grey[900],
        },
    },
});

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <CssBaseline />
            <ThemeProvider theme={darkTheme}>
                <BrowserRouter>
                    <Routes>
                        <Route path="sign-up" element={<SignUp />} />
                        <Route path="sign-in" element={<SignIn />} />
                        <Route path="/" element={<PrivateRoutes />}>
                            <Route path="my-accounts" element={<ListAccounts />} />
                            <Route path="create-account" element={<CreateAccount />} />
                        </Route>
                    </Routes>
                </BrowserRouter>
            </ThemeProvider>
        </QueryClientProvider>
    </StrictMode>
);
