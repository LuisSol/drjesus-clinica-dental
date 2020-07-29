import { useEffect, useState } from 'react'
import styled from 'styled-components';
import { parseCookies, setCookie } from 'nookies';
import { verifyToken, getUserData, getUserFirestore } from '../src/utils/firebaseAdmin';
import moment from 'moment';
import requestPromise from 'request-promise';
import { today } from '../src/utils/dateFunctions';
import flasher from '../src/utils/flasher';
import { rtdb } from '../src/utils/firebase';

moment.locale('es');

import MainLayout from '../src/components/MainLayout';
import AvatarForm from '../src/components/perfil/AvatarForm';
import UserInfoForm from '../src/components/perfil/UserInfoForm';
import UpcomingAppoinments from '../src/components/perfil/UpcomingAppointments';
import HistoryAppointments from '../src/components/perfil/HistoryAppointments';
import ContactBigFooter from '../src/components/ContactBigFooter';

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
    margin-bottom: 2rem;
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
        .limitToFirst(10).on('value', snap => setUpcommingAppoinments(snap.val()));        
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
                    <UpcomingAppoinments upcomingAppoinments={upcomingAppoinments} />
                    <HistoryAppointments pastAppoinments={pastAppoinments} />                   
                </ProfileContainer>
            </FullWidthDiv>
            <ContactBigFooter />
        </MainLayout>
    )
}

export const getServerSideProps = async (ctx) => {
    let props = {}
    const retrieveProfileData = async (uid) => {
        const data = {};
        const [userAuthData, userFirestoreData] = 
        await Promise.all([
            getUserData(uid),
            getUserFirestore(uid)
        ]);
        const authData = userAuthData.toJSON();
        const firestoreData = userFirestoreData.data();
        // set data as props            
        data.userData = {
            uid,
            name: authData.displayName || '',
            avatar: authData.photoURL || '',
            email: authData.email || '',
            phone: !firestoreData ? ''
                                    : (firestoreData.phone || '')
        } 
        return data;
    }

    const { auth } =  parseCookies(ctx);
    if(!auth) {
        props.redirect = '/ingresar';
        props.flash = {
            msg: 'Ingresa a tu cuenta para acceder a este recurso',
            type: 'warn'
        }
    } 
    else {
        const token = JSON.parse(auth);
        try {
            // validate token
            const { uid } = await verifyToken(token.xa); 
            // if token is valid retrieve data from sources
            const data = await retrieveProfileData(uid);
            props = {...props, ...data};
        }
        catch (error) {
            /* Token has expired */
            console.error('ERROR ---- ', error);
            // try to refresh the Id Token
            try {
                const response = await requestPromise.post(`https://securetoken.googleapis.com/v1/token?key=${process.env.NEXT_PUBLIC_FIREBASE_API_KEY}`, {
                                                            form: {
                                                                grant_type: 'refresh_token',
                                                                refresh_token: token.refreshToken
                                                            }
                                                        });
                const payload = JSON.parse(response);
                if(payload.id_token && payload.refresh_token) {
                    const xa = payload.id_token;
                    const refreshToken = payload.refresh_token;
                    const uid = payload.user_id;
                    // update cookie
                    setCookie(ctx, 'auth', JSON.stringify({ xa, uid, refreshToken }), { maxAge: 60 * 60 * 24, path: '/' });
                    const data = await retrieveProfileData(uid);
                    props = {...props, ...data};
                }
                else {
                    // refresh token is invalid for some reason like password change, black listed account etc..
                    props.redirect = '/logout'
                }
            }
            catch (error) {
                console.error('ERROR ----- ', error);

            }            
        }
    }
    return { props }
}

export default Profile;
