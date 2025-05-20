import { Box, Button, InputAdornment, TextField, Typography } from '@mui/material';
import { lightBlue } from '@mui/material/colors';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Drafts from '@mui/icons-material/Drafts';
import Lock from '@mui/icons-material/Lock';

import authIllustration from '../assets/auth-illustration.svg';

export function SignUp() {
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

            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}>
                <Typography variant="h5" component="h2">
                    Bem-vindo ao{' '}
                    <Typography
                        component="span"
                        variant="h5"
                        sx={{ color: lightBlue[700] }}>
                        SpenWise
                    </Typography>
                </Typography>

                <Box component="form" sx={{ width: '380px', mt: 6 }}>
                    <TextField
                        id="fullName"
                        label="Digite seu nome completo"
                        type="text"
                        variant="filled"
                        sx={{ width: '100%' }}
                        slotProps={{
                            input: {
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <AccountCircle />
                                    </InputAdornment>
                                ),
                            },
                        }}
                    />

                    <TextField
                        id="email"
                        label="Digite seu email"
                        type="email"
                        variant="filled"
                        sx={{ width: '100%', mt: 4 }}
                        slotProps={{
                            input: {
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <Drafts />
                                    </InputAdornment>
                                ),
                            },
                        }}
                    />

                    <TextField
                        id="password"
                        label="Mínimo 8 caracteres"
                        type="password"
                        variant="filled"
                        sx={{ width: '100%', mt: 4 }}
                        slotProps={{
                            input: {
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <Lock />
                                    </InputAdornment>
                                ),
                            },
                        }}
                    />

                    <TextField
                        id="confirmPassword"
                        label="Mínimo 8 caracteres"
                        type="password"
                        variant="filled"
                        sx={{ width: '100%', mt: 4 }}
                        slotProps={{
                            input: {
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <Lock />
                                    </InputAdornment>
                                ),
                            },
                        }}
                    />

                    <Button
                        variant="contained"
                        size="large"
                        sx={{
                            width: '100%',
                            bgcolor: lightBlue[700],
                            mt: 7,
                            color: 'white',
                        }}>
                        Cadastrar
                    </Button>

                    <Typography variant="body2" sx={{ textAlign: 'center', mt: 5 }}>
                        Já está cadastrado?{' '}
                        <Typography
                            component="a"
                            href="/sign-in"
                            color={lightBlue[700]}
                            sx={{ textDecoration: 'underline' }}>
                            Faça login
                        </Typography>
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
}
