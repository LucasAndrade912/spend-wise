import dayjs from 'dayjs';
import { type Ref } from 'react';
import {
    Box,
    FormControl,
    FormHelperText,
    InputLabel,
    MenuItem,
    Select,
} from '@mui/material';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm, type SubmitHandler } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { api } from '../lib/api';
import { FormField } from './FormField';
import { useNotification } from '../hooks/useNotification';
import { CurrencyInput } from './CurrencyInput';

type Inputs = {
    ammount: string;
    category: 'entrada' | 'saída';
    transactionDate: string;
    description?: string;
};

type Props = {
    accountId: string;
    ref: Ref<HTMLFormElement>;
    defaultValues?: {
        id: string;
        ammount: string;
        category: string;
        description?: string;
        date: string;
    };
    isEditMode?: boolean;
    onCloseModal: () => void;
};

export function TransactionForm({
    accountId,
    ref,
    defaultValues,
    isEditMode = false,
    onCloseModal,
}: Props) {
    const { showNotification } = useNotification();
    const queryClient = useQueryClient();

    const schema = z.object({
        ammount: z.string().refine(
            (value) => {
                const numericValue = parseFloat(value.replace(/[^0-9.-]+/g, ''));
                return !isNaN(numericValue) && numericValue > 0;
            },
            {
                message: 'Valor deve ser um número maior que zero',
            }
        ),
        category: z.enum(['entrada', 'saída'], {
            message: 'Categoria inválida',
        }),
        transactionDate: z
            .string({ required_error: 'Data é obrigatória' })
            .datetime({ message: 'Data inválida' })
            .nonempty({ message: 'Data é obrigatória' }),
        description: z.string().optional(),
    });

    const { mutate } = useMutation({
        mutationFn: async (data: Inputs) => {
            const body = {
                accountId,
                type: data.category[0].toUpperCase() + data.category.slice(1),
                date: data.transactionDate,
                description: data.description,
            };

            if (isEditMode) {
                return await api.put(`/transactions/${defaultValues?.id}`, {
                    ...body,
                    ammount: Number(data.ammount) * 100,
                });
            }

            return await api.post('/transactions', {
                ...body,
                ammount:
                    Number(
                        data.ammount.split('R$ ')[1].replace('.', '').replace(',', '.')
                    ) * 100,
            });
        },
        onSuccess: ({ data }) => {
            showNotification('success', data.message);
            queryClient.invalidateQueries({ queryKey: ['account'] });
            queryClient.invalidateQueries({ queryKey: ['accounts'] });
            queryClient.invalidateQueries({ queryKey: ['transactions'] });
            onCloseModal();
        },
        onError: (error: any) => {
            console.error(error);
            showNotification('error', error?.response?.data?.message);
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
        defaultValues: {
            ammount: defaultValues?.ammount,
            category: defaultValues?.category as 'entrada' | 'saída',
            transactionDate: defaultValues?.date,
            description: defaultValues?.description,
        },
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
                <CurrencyInput
                    id="ammount"
                    label="Valor da transação"
                    type="text"
                    variant="filled"
                    sx={{ width: '100%' }}
                    error={!!errors.ammount}
                    helperText={errors.ammount?.message}
                    data-testid="ammount"
                    {...register('ammount', {
                        required: true,
                    })}
                />

                <Controller
                    control={control}
                    name="category"
                    render={({ field }) => (
                        <FormControl variant="filled" error={!!errors.category}>
                            <InputLabel id="transaction-category-label">
                                Selecione uma categoria
                            </InputLabel>

                            <Select
                                labelId="transaction-category-label"
                                id="category"
                                data-testid="category"
                                {...field}>
                                <MenuItem value="entrada">Entrada</MenuItem>
                                <MenuItem value="saída">Saída</MenuItem>
                            </Select>

                            {!!errors.category && (
                                <FormHelperText>
                                    {errors.category?.message}
                                </FormHelperText>
                            )}
                        </FormControl>
                    )}
                />

                <Controller
                    control={control}
                    name="transactionDate"
                    rules={{ required: { value: true, message: 'ABC' } }}
                    render={({ field }) => {
                        return (
                            <DatePicker
                                label="Selecione a data da transação"
                                sx={{ width: '100%' }}
                                data-testid="date"
                                format="DD/MM/YYYY"
                                inputRef={field.ref}
                                value={field.value ? dayjs(field.value) : null}
                                slotProps={{
                                    textField: {
                                        error: !!errors.transactionDate,
                                        helperText: errors.transactionDate?.message || '',
                                        variant: 'filled',
                                        required: false,
                                    },
                                }}
                                onChange={(newValue) => {
                                    field.onChange(
                                        newValue ? newValue.toISOString() : ''
                                    );
                                }}
                            />
                        );
                    }}
                />

                <FormField
                    id="description"
                    label="Descrição"
                    multiline
                    type="text"
                    variant="filled"
                    sx={{ width: '100%' }}
                    error={!!errors.description}
                    helperText={errors.description?.message}
                    data-testid="description"
                    {...register('description', { required: true })}
                />
            </Box>
        </Box>
    );
}
