import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { storage, auth } from '../utils/firebase';
import NProgress from 'nprogress';
import flasher from '../utils/flasher';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    img.avatar {
        width: 200px;
        height: 200px;
        border-radius: 50%;
        margin-bottom: 1rem;
    }
    input {
        visibility: hidden;        
    }
    label {
        cursor: pointer;
        font-size: .9rem;
        width: 6rem;
        height: 2.5rem;
    }
`

const AvatarForm = ({ url }) => {
    const user = useSelector(state => state.user);
    const [avatarUrl, setAvatarUrl] = React.useState(url)

    const changeImage = (e) => {
        const file = e.target.files[0]; 
        if( file && file.size > 2000000 ) {
            flasher('El tamaño máximo de imágen es de 2MB', 'warn');
        }
        else {            
            /* user could be loged out in another tab / window */            
            if(!user) {
                return flasher('Debes ingresar a tu cuenta para acceder a este recurso', 
                        'warn', '/ingresar');                
            }
            // upload file to firebase storage
            const storageRef = storage.ref(`users_avatars/${user.uid}/${user.uid}.`+ 
                                            file.name.split('.').pop());
            const uploadTask = storageRef.put(file);
            NProgress.start();
            uploadTask.on('state_changed',
                (/* progress */) => { },
                (error) => {
                    NProgress.done();
                    flasher('Algo salió mal, intentalo de nuevo más tarde', 
                            'error');                    
                    console.error(error);
                },
                (/* complete */) => {                    
                    uploadTask.snapshot.ref.getDownloadURL()
                    .then( finalURL => {
                        // update user profile picture
                        auth.currentUser.updateProfile({
                            photoURL: finalURL
                        })
                        .then(() => {
                            NProgress.done();
                            setAvatarUrl(finalURL)
                        })
                        .catch(error => {
                            NProgress.done();
                            flasher('Algo salió mal, intentalo de nuevo más tarde', 
                            'error');
                            console.error(error);
                        });                        
                    });
                }
            );
        }       
    }

    return (
        <Container>
            <LazyLoadImage
                src={avatarUrl || '/images/logo.svg'}
                effect="opacity"
                className="avatar"                        
            />

            <label htmlFor="file" className="link-btn primary-btn">Cambiar</label>
            <input id="file" type="file" accept="image/x-png,image/gif,image/jpeg" onChange={changeImage} />
        </Container>
    )
}

export default AvatarForm;
