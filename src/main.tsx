import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router';
import { CssBaseline } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

import { SignUp } from './pages/SignUp';
import { SignIn } from './pages/SignIn';
import { PrivateRoutes } from './layouts/PrivateRoutes';
import { Example } from './pages/Example';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
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
                            <Route path="/" element={<Example />} />
                        </Route>
                    </Routes>
                </BrowserRouter>
            </ThemeProvider>
        </QueryClientProvider>
    </StrictMode>
);
