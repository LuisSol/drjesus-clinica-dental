import styled from 'styled-components';
import { parseCookies } from 'nookies';
import { verifyToken, getUserData } from '../src/utils/firebaseAdmin';
import flasher from '../src/utils/flasher';

import MainLayout from '../src/components/MainLayout';
import AvatarForm from '../src/components/AvatarForm';

const FullWidthDiv = styled.div`
    width: 100%;
`
const ProfileContainer = styled.main`
    width: 1024px;
    margin: 0 auto;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-weight: 300;
    .title, .appoiments, .services  {
        align-self: flex-start;
    }
`

const Profile = ({ redirect, flash, userData }) => {  

    /* if the result is a redirect 
       due to present lack of getServerSide support for redirects from client side */
    if(redirect) {
        if(process.browser) {
            flasher(flash.msg, flash.type, redirect); 
        }
        return null;          
    }

    return (
        <MainLayout title="Perfil">
            <FullWidthDiv>
                <ProfileContainer>
                    <h1 className="title">Mi Perfil:</h1>
                    <AvatarForm url={userData.avatar} />
                    <div>
                        <p>
                            <strong>nombre: </strong>
                            <span>{userData.name}</span>
                        </p>
                        <p><strong>correo: </strong><span>{userData.email}</span></p>
                        <p><strong>teléfono: </strong><span>{userData.phone}</span></p>
                    </div>
                    <div className="appoiments">
                        <h2>Próximas citas:</h2>
                    </div>
                    <div className="services">
                        <h2>Historial:</h2>
                    </div>                    
                </ProfileContainer>
            </FullWidthDiv>
        </MainLayout>
    )
}

export const getServerSideProps = async (ctx) => {
    const props = {}
    const { auth } =  parseCookies(ctx);
    if(!auth) {
        props.redirect = '/ingresar'
        props.flash = {
            msg: 'Ingresa a tu cuenta para acceder a este recurso',
            type: 'warn'
        }
    } 
    else {
        try {
            const { uid } = await verifyToken(auth);
            const user = (await getUserData(uid)).toJSON();
            console.log(user);
            props.userData = {
                name: user.displayName || null,
                avatar: user.photoURL || null,
                email: user.email || null,
                phone: user.phoneNumber || null
            }
        }
        catch (error) {
            console.log('token invalido');
        }
    }
    return { props }
}

export default Profile;
