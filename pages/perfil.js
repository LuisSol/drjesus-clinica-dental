import styled from 'styled-components';
import Router from 'next/router';
import { parseCookies } from 'nookies';
import { toast } from 'react-toastify'

import MainLayout from '../src/components/MainLayout';

const FullWidthDiv = styled.div`
    width: 100%;
`
const ProfileContainer = styled.main`
    width: 1024px;
    margin: 0 auto;
`

const Profile = ({ redirect }) => {  

    /* if the result is a redirect 
       due to present lack of getServerSide support for redirects from client side */
    if(redirect) {
        if(process.browser) {
            toast.warn('Ingresa a tu cuenta para acceder a este recurso', {
                position: "top-right",
                autoClose: 3500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
            });
            Router.push('/ingresar');
        }
        return null;          
    }

    return (
        <MainLayout title="Perfil">
            <FullWidthDiv>
                <ProfileContainer>
                    <h1>Mi Perfil:</h1>
                </ProfileContainer>
            </FullWidthDiv>
        </MainLayout>
    )
}

export const getServerSideProps = async (ctx) => {
    const props = {}
    const { auth } =  parseCookies(ctx);
    console.log(auth);
    if(!auth) props.redirect = '/ingresar'
    return { props }
}

export default Profile;
