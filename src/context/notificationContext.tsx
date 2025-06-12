import { createContext, useState, type ReactNode } from 'react';
import { Alert, Snackbar } from '@mui/material';

interface NotificationState {
    open: boolean;
    type: 'success' | 'error';
    message: string;
}

interface NotificationContextData {
    showNotification: (type: NotificationState['type'], message: string) => void;
    hideNotification: () => void;
}

const FOUR_SECONDS = 4000;

export const NotificationContext = createContext<NotificationContextData | null>(null);

export function NotificationProvider({ children }: { children: ReactNode }) {
    const [notification, setNotification] = useState<NotificationState>({
        open: false,
        type: 'success',
        message: '',
    });

    const showNotification = (type: NotificationState['type'], message: string) => {
        setNotification({
            open: true,
            type,
            message,
        });
    };

    const hideNotification = () => {
        setNotification((prev) => ({ ...prev, open: false }));
    };

    return (
        <NotificationContext.Provider value={{ showNotification, hideNotification }}>
            {children}

            <Snackbar
                open={notification.open}
                autoHideDuration={FOUR_SECONDS}
                onClose={hideNotification}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
                <Alert
                    variant="filled"
                    severity={notification.type}
                    sx={{ width: '100%', color: 'white' }}
                    onClose={hideNotification}>
                    {notification.message}
                </Alert>
            </Snackbar>
        </NotificationContext.Provider>
    );
}
