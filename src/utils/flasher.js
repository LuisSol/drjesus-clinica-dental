import { toast } from 'react-toastify';
import Router from 'next/router'

export default (msg, type, redirectUrl = null) => {
    if(msg && type) {
        toast[type](msg, {
            position: "top-right",
            autoClose: 3500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
        });
    }    
    if (redirectUrl) Router.push(redirectUrl);
}