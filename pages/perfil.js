import styled from 'styled-components';
import { parseCookies } from 'nookies';
import { verifyToken, getUserData, getUserFirestore } from '../src/utils/firebaseAdmin';
import flasher from '../src/utils/flasher';

import MainLayout from '../src/components/MainLayout';
import AvatarForm from '../src/components/AvatarForm';
import UserInfoForm from '../src/components/UserInfoForm'

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
                    <UserInfoForm {...userData} />
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
            // validate token
            const { uid } = await verifyToken(auth); 
            // if token is valid retrieve data from sources
            const [userAuthData, userFirestoreData] = 
            await Promise.all([
                getUserData(uid),
                getUserFirestore(uid)
            ])

            const authData = userAuthData.toJSON();
            const firestoreData = userFirestoreData.data();
            // set data as props            
            props.userData = {
                name: authData.displayName || '',
                avatar: authData.photoURL || '',
                email: authData.email || '',
                phone: !firestoreData ? ''
                                      : (firestoreData.phone || '')
            } 
        }
        catch (error) {
            // invalid token
            console.log('token invalido');
        }
    }
    return { props }
}

export default Profile;
