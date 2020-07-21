import styled from 'styled-components';
import { parseCookies } from 'nookies';
import flasher from '../src/utils/flasher';
import moment from 'moment';
import { today, dateFieldToEpoch, epochToDateField } from '../src/utils/dateFunctions';
import { verifyToken, getUserData, getUserFirestore, getServicesData } 
from '../src/utils/firebaseAdmin';

moment.locale('es');

import MainLayout from '../src/components/MainLayout';
import Scheduler from '../src/components/Scheduler'
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
    const [currentDate, setCurrentDate] = React.useState(date || today());    

    /* if the result is a redirect 
       due to present lack of getServerSide support for redirects from client side */
    if(redirect) {
        if(process.browser) {
            flasher(flash.msg, flash.type, redirect);            
        }
        return null;          
    }

    const handleChange = (e) => {           
        setCurrentDate(dateFieldToEpoch(e.target.value));
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
                    /> 
                    <div>
                        <label>Fecha: </label>
                        <input 
                            type="date" 
                            value={epochToDateField(currentDate)} 
                            min={epochToDateField(today())}  
                            onChange={handleChange}                     
                        />
                        <span>{moment(currentDate).format('dddd LL')}</span>
                    </div>                 
                    <Scheduler 
                        currentDate={currentDate}
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
                name: authData.displayName || '',
                phone: userData.phone || ''
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