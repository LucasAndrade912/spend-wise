import { Box, Button, InputAdornment, Typography } from '@mui/material';
import { Link } from 'react-router';
import { lightBlue } from '@mui/material/colors';
import { Drafts, Lock } from '@mui/icons-material';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { FormField } from './FormField';

type Inputs = {
    email: string;
    password: string;
};

export function SignInForm() {
    const schema = z.object({
        email: z.string().email({ message: 'Informe um email válido' }),
        password: z.string().min(8, { message: 'Mínimo 8 caracteres' }),
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
                Bem-vindo novamente
            </Typography>

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
