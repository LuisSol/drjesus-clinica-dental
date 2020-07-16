import styled from 'styled-components';
import Router from 'next/router';
import { parseCookies } from 'nookies';
import { toast } from 'react-toastify'
import { verifyToken } from '../src/utils/firebaseAdmin'

import MainLayout from '../src/components/MainLayout';

const FullWidthDiv = styled.div`
    width: 100%;
`
const ProfileContainer = styled.main`
    width: 1024px;
    margin: 0 auto;
    padding: 20px;
`

const Profile = ({ redirect, flash, userData }) => {  

    /* if the result is a redirect 
       due to present lack of getServerSide support for redirects from client side */
    if(redirect) {
        if(process.browser) {
            toast[flash.type](flash.msg, {
                position: "top-right",
                autoClose: 3500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
            });
            Router.push(redirect);
        }
        return null;          
    }

    return (
        <MainLayout title="Perfil">
            <FullWidthDiv>
                <ProfileContainer>
                    <h1 className="name">{userData.name}:</h1>

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
            const decodedData = await verifyToken(auth);
            props.userData = {
                name: decodedData.name,
                avatar: decodedData.picture,
                email: decodedData.email
            }
        }
        catch (error) {
            console.log('token invalido');
        }
    }
    return { props }
}

export default Profile;
