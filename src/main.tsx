import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router';
import { CssBaseline } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import { SignUp } from './pages/SignUp';
import { SignIn } from './pages/SignIn';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <CssBaseline />
        <ThemeProvider theme={darkTheme}>
            <BrowserRouter>
                <Routes>
                    <Route path="sign-up" element={<SignUp />} />
                    <Route path="sign-in" element={<SignIn />} />
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    </StrictMode>
);
