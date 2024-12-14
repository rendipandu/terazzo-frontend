import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

type toastType = {
    autoClose?: number
}

export const Toast = (props: toastType) => {
    return (
        <ToastContainer
            position="bottom-right"
            autoClose={props.autoClose || false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
        />
    )
}