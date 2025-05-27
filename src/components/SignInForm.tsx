import { useState } from 'react';
import { Alert, Box, Button, InputAdornment, Snackbar, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router';
import { lightBlue } from '@mui/material/colors';
import { Drafts, Lock } from '@mui/icons-material';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';

import { FormField } from './FormField';
import { api } from '../lib/api';

type Inputs = {
    email: string;
    password: string;
};

type Response = {
    data: { token: string };
    message: string;
};

export function SignInForm() {
    const [alertOpened, setAlertOpened] = useState(false);
    const navigate = useNavigate();

    const schema = z.object({
        email: z.string().email({ message: 'Informe um email válido' }),
        password: z.string().min(8, { message: 'Mínimo 8 caracteres' }),
    });

    const handleSignIn = async (data: Inputs) => {
        try {
            const response = await api.post<Response>('/auth/sign-in', {
                email: data.email,
                password: data.password,
            });

            localStorage.setItem('token', response.data.data.token);
            setAlertOpened(true);
            setTimeout(() => {
                navigate('/');
            }, 1000);
        } catch {
            setAlertOpened(true);
        }
    };

    const { mutate, error, isError, isSuccess } = useMutation({
        mutationFn: handleSignIn,
    });

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        mutate(data);
    };

    const handleClose = () => {
        setAlertOpened(false);
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>({
        resolver: zodResolver(schema),
    });

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}>
            <Typography variant="h5" component="h2">
                Bem-vindo novamente
            </Typography>

            {isError && (
                <Snackbar
                    open={alertOpened}
                    autoHideDuration={6000}
                    onClose={handleClose}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
                    <Alert
                        variant="filled"
                        severity="error"
                        sx={{ width: '100%', mb: { lg: 3, xl: 7 }, color: 'white' }}
                        onClose={handleClose}>
                        {(error as any).response?.data.message}
                    </Alert>
                </Snackbar>
            )}

            {isSuccess && (
                <Snackbar
                    open={alertOpened}
                    autoHideDuration={6000}
                    onClose={handleClose}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
                    <Alert
                        variant="filled"
                        severity="success"
                        sx={{ width: '100%', mb: { lg: 3, xl: 7 }, color: 'white' }}
                        onClose={handleClose}>
                        Login realizado com sucesso!
                    </Alert>
                </Snackbar>
            )}

            <Box
                component="form"
                sx={{ width: '380px', mt: 6 }}
                onSubmit={handleSubmit(onSubmit)}>
                <FormField
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
                    error={!!errors.email}
                    helperText={errors.email?.message}
                    data-testid="email"
                    {...register('email', { required: true })}
                />

                <FormField
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
                    error={!!errors.password}
                    helperText={errors.password?.message}
                    data-testid="password"
                    {...register('password', { required: true })}
                />

                <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    sx={{
                        width: '100%',
                        bgcolor: lightBlue[700],
                        mt: 7,
                        color: 'white',
                    }}>
                    Entrar
                </Button>

                <Typography variant="body2" sx={{ textAlign: 'center', mt: 5 }}>
                    Ainda não possui cadastro?{' '}
                    <Typography
                        component={Link}
                        to="/sign-up"
                        color={lightBlue[700]}
                        sx={{ textDecoration: 'underline' }}>
                        Cadastra-se agora
                    </Typography>
                </Typography>
            </Box>
        </Box>
    );
}
