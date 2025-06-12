import { type Ref } from 'react';
import {
    Box,
    FormControl,
    FormHelperText,
    InputLabel,
    MenuItem,
    Select,
} from '@mui/material';
import { Controller, useForm, type SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { FormField } from './FormField';
import { api } from '../lib/api';
import { useNotification } from '../hooks/useNotification';

type Inputs = {
    name: string;
    type: 'poupanca' | 'corrente' | 'salario';
};

type Props = {
    ref: Ref<HTMLFormElement>;
    onCloseModal: () => void;
};

export function NewAccountForm({ ref, onCloseModal }: Props) {
    const { showNotification } = useNotification();
    const queryClient = useQueryClient();

    const schema = z.object({
        name: z.string().min(1, { message: 'Nome é obrigatório' }),
        type: z.enum(['poupanca', 'corrente', 'salario'], {
            message: 'Tipo de conta inválido',
        }),
    });

    const handleCreateAccount = async (data: Inputs) => {
        return await api.post('/accounts', {
            name: data.name,
            type: data.type,
        });
    };

    const { mutate } = useMutation({
        mutationFn: handleCreateAccount,
        onSuccess: () => {
            showNotification('success', 'Conta cadastrada com sucesso!');
            queryClient.invalidateQueries({ queryKey: ['accounts'] });
            onCloseModal();
        },
        onError: (error: any) => {
            showNotification(
                'error',
                error?.response?.data?.message || 'Erro ao cadastrar conta'
            );
        },
    });

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        mutate(data);
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
