import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router';
import { CssBaseline } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { grey } from '@mui/material/colors';
import type {} from '@mui/x-data-grid/themeAugmentation';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { ptBR } from '@mui/x-date-pickers/locales';

import { SignUp } from './pages/SignUp';
import { SignIn } from './pages/SignIn';
import { ListAccounts } from './pages/ListAccounts';
import { ListTransactions } from './pages/ListTransactions';
import { PrivateRoutes } from './layouts/PrivateRoutes';
import { NotificationProvider } from './context/notificationContext';

const darkTheme = createTheme(
    {
        palette: {
            mode: 'dark',
            DataGrid: {
                headerBg: grey[900],
            },
        },
    },
    ptBR
);

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <QueryClientProvider client={queryClient}>
                <CssBaseline />
                <ThemeProvider theme={darkTheme}>
                    <NotificationProvider>
                        <BrowserRouter>
                            <Routes>
                                <Route path="sign-up" element={<SignUp />} />
                                <Route path="sign-in" element={<SignIn />} />
                                <Route path="/" element={<PrivateRoutes />}>
                                    <Route
                                        path="my-accounts"
                                        element={<ListAccounts />}
                                    />
                                    <Route path="transactions">
                                        <Route
                                            path=":accountId"
                                            element={<ListTransactions />}
                                        />
                                    </Route>
                                </Route>
                            </Routes>
                        </BrowserRouter>
                    </NotificationProvider>
                </ThemeProvider>
            </QueryClientProvider>
        </LocalizationProvider>
    </StrictMode>
);
