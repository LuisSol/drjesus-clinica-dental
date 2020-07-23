import { useEffect, useState } from 'react'
import styled from 'styled-components';
import { parseCookies } from 'nookies';
import { verifyToken, getUserData, getUserFirestore } from '../src/utils/firebaseAdmin';
import flasher from '../src/utils/flasher';
import { rtdb } from '../src/utils/firebase'
import moment from 'moment';
import { today } from '../src/utils/dateFunctions'

moment.locale('es');

import MainLayout from '../src/components/MainLayout';
import AvatarForm from '../src/components/AvatarForm';
import UserInfoForm from '../src/components/UserInfoForm';
import AppointmentInfoCard from '../src/components/AppointmentInfoCard';

const FullWidthDiv = styled.div`
    width: 100%;
`
const ProfileContainer = styled.main`
    width: 1020px;
    margin: 0 auto;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-weight: 300;
    .title, .appointments, .past  {
        align-self: flex-start;
        width: 100%;
    }
    .cancel-btn {
        width: 5.5rem;
        border-radius: 7px;
        height: 2rem;
        border: 1px solid #666;
        background-color: white;
        color: black;
    }
    @media (max-width: 1020px) {
        width: 100%;
    }
`

const userAppointmentsRef = rtdb.ref('appointments')

const Profile = ({ redirect, flash, userData }) => {  
    const [upcomingAppoinments, setUpcommingAppoinments] = useState({});
    const [pastAppoinments, setPastAppoinments] = useState({});

    /* if the result is a redirect 
       due to present lack of getServerSide support for redirects from client side */
    if(redirect) {
        if(process.browser) {
            flasher(flash.msg, flash.type, redirect); 
        }
        return null;          
    }

    useEffect(() => {
        // retrieve upcoming appoinments
        userAppointmentsRef.child(userData.uid).orderByKey().startAt(today().toString())
        .limitToFirst(10).once('value', snap => setUpcommingAppoinments(snap.val()));        
        // retrieve past appoinments
        userAppointmentsRef.child(userData.uid).orderByKey().endAt(today().toString())
        .limitToLast(10).once('value', snap => setPastAppoinments(snap.val()));
        return () => {
            userAppointmentsRef.off();    
        }
    },[]);

    return (
        <MainLayout title="Perfil">
            <FullWidthDiv>
                <ProfileContainer>
                    <h1 className="title">Mi Perfil:</h1>
                    <AvatarForm url={userData.avatar} />
                    <UserInfoForm {...userData} />
                    <div className="appointments">
                        <h2>Próximas citas:</h2>
                        <small>* Las citas deben ser canceladas al menos 1 hora antes.</small>
                        {
                            upcomingAppoinments &&
                            Object.values(upcomingAppoinments).map(appointment =>
                                <AppointmentInfoCard
                                    key={appointment.timeStamp}
                                    {...appointment}
                                >
                                    <button 
                                        className="link-btn secunday-btn cancel-btn"                                        
                                    >Cancelar</button>
                                </AppointmentInfoCard>
                            )
                        }
                    </div>
                    <div className="past">
                        <h2>Historial:</h2>
                        {
                            pastAppoinments &&
                            Object.values(pastAppoinments).map(appointment => 
                                <AppointmentInfoCard
                                    key={appointment.timeStamp}
                                    {...appointment}
                                />
                            )
                        }
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
                uid,
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
