import flasher from '../src/utils/flasher';
import { auth } from '../src/utils/firebase'

const Logout = () => {
    if(process.browser) {
        auth.signOut()
        .then(() => flasher('Tu sesión ha expirado, por favor vuelve a ingresar a tu cuenta',
                            'warn', '/'))
        .catch(err => console.error(err));
    }
    return (
        null
    )
}

export default Logout;
