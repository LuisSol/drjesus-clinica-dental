import styled from 'styled-components'
import Router from 'next/router'
import { parseCookies } from 'nookies'
import { toast } from 'react-toastify'

import MainLayout from '../src/components/MainLayout';

const FullWidthDiv = styled.div`
    width: 100%;
`

const Citas = ({ redirect }) => {  
    
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
        <MainLayout title="Citas">
            <FullWidthDiv>
                <h1>Citas</h1>
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

export default Citas;