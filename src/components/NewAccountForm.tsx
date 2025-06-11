import { useState, type Ref } from 'react';
import {
    Alert,
    Box,
    FormControl,
    FormHelperText,
    InputLabel,
    MenuItem,
    Select,
    Snackbar,
} from '@mui/material';
import { Controller, useForm, type SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';

import { FormField } from './FormField';

type Inputs = {
    name: string;
    type: 'poupanca' | 'corrente' | 'salario';
};

type Props = {
    ref: Ref<HTMLFormElement>;
};

export function NewAccountForm({ ref }: Props) {
    const [alertOpened, setAlertOpened] = useState(false);

    const schema = z.object({
        name: z.string().min(1, { message: 'Nome é obrigatório' }),
        type: z.enum(['poupanca', 'corrente', 'salario'], {
            message: 'Tipo de conta inválido',
        }),
    });

    const handleCreateAccount = async (data: Inputs) => {
        console.log('Dados do formulário:', data);
    };

    const { mutate, error, isError, isSuccess } = useMutation({
        mutationFn: handleCreateAccount,
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
        control,
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
                ref={ref}
                sx={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '32px',
                }}
                onSubmit={handleSubmit(onSubmit)}>
                <FormField
                    id="name"
                    label="Nome da conta"
                    type="text"
                    variant="filled"
                    sx={{ width: '100%' }}
                    error={!!errors.name}
                    helperText={errors.name?.message}
                    data-testid="name"
                    {...register('name', { required: true })}
                />

                <Controller
                    control={control}
                    name="type"
                    render={({ field }) => (
                        <FormControl variant="filled" error={!!errors.type}>
                            <InputLabel id="account-type-label">Tipo de conta</InputLabel>

                            <Select
                                labelId="account-type-label"
                                id="type"
                                data-testid="type"
                                {...field}>
                                <MenuItem value="poupanca">Poupança</MenuItem>
                                <MenuItem value="corrente">Corrente</MenuItem>
                                <MenuItem value="salario">Salário</MenuItem>
                            </Select>

                            {!!errors.type && (
                                <FormHelperText>{errors.type?.message}</FormHelperText>
                            )}
                        </FormControl>
                    )}
                />
            </Box>
        </Box>
    );
}
