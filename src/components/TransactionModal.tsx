import { useRef } from 'react';
import { Check, CloseOutlined } from '@mui/icons-material';
import {
    Button,
    DialogActions,
    DialogContent,
    DialogTitle,
    Modal,
    Paper,
} from '@mui/material';

import { TransactionForm } from './TransactionForm';

type Props = {
    open: boolean;
    handleClose: () => void;
    accountId: string;
    transaction?: {
        id: string;
        ammount: string;
        category: string;
        description?: string;
        date: string;
    };
    isEditMode?: boolean;
};

export function TransctionModal({
    open,
    handleClose,
    accountId,
    isEditMode = false,
    transaction,
}: Props) {
    const formRef = useRef<HTMLFormElement>(null);

    const handleClickFormSubmit = () => {
        if (formRef.current) {
            formRef.current.requestSubmit();
        }
    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-create-account-title"
            aria-describedby="modal-create-account-description">
            <Paper
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 900,
                    boxShadow: 24,
                    padding: '1rem 1.5rem',
                    color: 'white',
                    p: 0,
                }}
                elevation={4}>
                <DialogTitle
                    id="modal-create-account-title"
                    variant="h4"
                    sx={{ padding: '1rem 1.5rem' }}>
                    {isEditMode ? 'Editar transação' : 'Criar transação'}
                </DialogTitle>

                <DialogContent sx={{ padding: '1rem 1.5rem' }} dividers>
                    <TransactionForm
                        ref={formRef}
                        accountId={accountId}
                        defaultValues={transaction}
                        isEditMode={isEditMode}
                        onCloseModal={handleClose}
                    />
                </DialogContent>

                <DialogActions>
                    <Button variant="contained" onClick={handleClickFormSubmit}>
                        <Check />
                        {isEditMode ? 'Editar' : 'Cadastrar'}
                    </Button>

                    <Button variant="contained" color="error" onClick={handleClose}>
                        <CloseOutlined />
                        Cancelar
                    </Button>
                </DialogActions>
            </Paper>
        </Modal>
    );
}
