import styled from 'styled-components';
import { parseCookies } from 'nookies';
import flasher from '../src/utils/flasher';
import { verifyToken, getUserData, getUserFirestore, getServicesData } 
from '../src/utils/firebaseAdmin';

import MainLayout from '../src/components/MainLayout';
import AppointmentsFooter from '../src/components/AppointmentsFooter'
import AppointmentForm from '../src/components/AppointmentForm'

const FullWidthDiv = styled.div`
    width: 100%;
`
const SchedulerContainer = styled.main`
    width: 1020px;
    margin: 0 auto;
    padding: 20px;
    @media (max-width: 1020px) {
        width: 100%;
    }
`

const Citas = ({ redirect, flash, date, userData, services, selectedService }) => {         

    /* if the result is a redirect 
       due to present lack of getServerSide support for redirects from client side */
    if(redirect) {
        if(process.browser) {
            flasher(flash.msg, flash.type, redirect);            
        }
        return null;          
    }

    return (
        <MainLayout title="Citas">
            <FullWidthDiv>
                <SchedulerContainer>
                    <h1>Agenda tu cita:</h1>
                    <AppointmentForm 
                        {...userData} 
                        services={services} 
                        service={selectedService || ''}
                        date={date}
                    />                                                          
                </SchedulerContainer>                
            </FullWidthDiv>
            <AppointmentsFooter />
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
            const { uid} = await verifyToken(auth);
            // valid Token
            // retrieve data from the database
            const [userAuthData, userFireStoreData, servicesData] = await Promise.all([
                getUserData(uid),
                getUserFirestore(uid),
                getServicesData()
            ]);
            const authData = userAuthData.toJSON();
            const userData = userFireStoreData.data();
            // set user data as props
            props.userData = {
                uid,
                name: authData.displayName || '',
                phone: userData?.phone || ''
            }
            // populate the services from the data in the firestore database
            props.services = [];
            servicesData.docs.forEach(doc => {                
                props.services.push({ ...doc.data(), id: doc.id });
            });           
        }
        catch (error) {
            console.log('token invalido');
        }
    }
    return { props }
}

export default Citas;