import { useNumberFormat } from '@react-input/number-format';
import { TextField, type TextFieldProps } from '@mui/material';

export function CurrencyInput(props: TextFieldProps) {
    const inputRef = useNumberFormat({
        currency: 'BRL',
        format: 'currency',
    });

    return <TextField inputRef={inputRef} {...props} />;
}
