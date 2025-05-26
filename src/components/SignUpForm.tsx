import { Box, Button, InputAdornment, Typography } from '@mui/material';
import { lightBlue } from '@mui/material/colors';
import { AccountCircle, Drafts, Lock } from '@mui/icons-material';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { FormField } from './FormField';

type Inputs = {
    fullName: string;
    email: string;
    password: string;
    confirmPassword: string;
};

export function SignUpForm() {
    const schema = z
        .object({
            fullName: z.string().min(1, { message: 'Campo obrigatório' }),
            email: z.string().email({ message: 'Informe um email válido' }),
            password: z.string().min(8, { message: 'Mínimo 8 caracteres' }),
            confirmPassword: z.string().min(8, { message: 'Mínimo 8 caracteres' }),
        })
        .refine((data) => data.password === data.confirmPassword, {
            message: 'As senhas não correspondem',
            path: ['confirmPassword'],
        });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>({
        resolver: zodResolver(schema),
    });

    const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}>
            <Typography variant="h5" component="h2">
                Bem-vindo ao{' '}
                <Typography component="span" variant="h5" sx={{ color: lightBlue[700] }}>
                    SpenWise
                </Typography>
            </Typography>

            <Box
                component="form"
                sx={{ width: '380px', mt: 6 }}
                onSubmit={handleSubmit(onSubmit)}>
                <FormField
                    id="fullName"
                    label="Digite seu nome completo"
                    type="text"
                    slotProps={{
                        input: {
                            endAdornment: (
                                <InputAdornment position="end">
                                    <AccountCircle />
                                </InputAdornment>
                            ),
                        },
                    }}
                    error={!!errors.fullName}
                    helperText={errors.fullName?.message}
                    data-testid="fullName"
                    {...register('fullName')}
                />

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

                <FormField
                    id="confirmPassword"
                    label="Insira a mesma senha"
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
                    error={!!errors.confirmPassword}
                    helperText={errors.confirmPassword?.message}
                    data-testid="confirmPassword"
                    {...register('confirmPassword', { required: true })}
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
    );
}
