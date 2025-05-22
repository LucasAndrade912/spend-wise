import { TextField, type TextFieldProps } from '@mui/material';

export function FormField({ id, label, type, slotProps, ref, ...rest }: TextFieldProps) {
    return (
        <TextField
            id={id}
            label={label}
            type={type}
            variant="filled"
            sx={{ width: '100%' }}
            slotProps={slotProps}
            ref={ref}
            {...rest}
        />
    );
}
