import { Box } from '@mui/material';

import { SignInForm } from '../components/SignInForm';
import authIllustration from '../assets/auth-illustration.svg';

export function SignIn() {
    return (
        <Box
            component="main"
            sx={{
                bgcolor: 'grey.900',
                color: 'white',
                height: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '224px',
            }}>
            <Box
                component="img"
                src={authIllustration}
                alt="Figura ilustrativa"
                sx={{
                    width: { lg: '480px', xl: 'auto' },
                }}
            />

            <SignInForm />
        </Box>
    );
}
