import { toast } from 'react-toastify';

type ToastOptions = {
    type: 'success' | 'error';  // You can extend this with more types
    message: string;
    autoClose?: number;  // Optional parameter for autoClose
    options?: object;  // Optional additional options
};

export const showToast = ({ type, message, autoClose, options }: ToastOptions) => {
    toast[type](message, {
        position: "bottom-right",
        autoClose,  // This will now directly use autoClose from the object
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        style: {
            backgroundColor: 'var(--background)',
            border: '1px solid var(--backdrop)',
        },
        ...(options ?? {}),
    });
};