import FirebaseUIAuth from 'react-firebaseui-localized';
import { auth, firebase } from '../src/utils/firebase'
import styled from 'styled-components';
import { LazyLoadImage } from 'react-lazy-load-image-component' 

import MainLayout from '../src/components/MainLayout';

const FullWidthDiv = styled.div`
    padding: 20px;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-conten:center;
    align-items: center;    
    .title {
        font-size: 5rem;
        margin-top: 2rem;
        margin-bottom: 0;
    }
    .greet {
        font-weight: 300;
        margin-bottom: 2rem;
        text-align: center;
    }   
    @media (max-width: 550px) {
        .title {
            font-size: 4rem;
        } 
    } 
    @media (max-width: 420px) {
        .title {
            font-size: 3rem;
        } 
        .greet {
            font-size: .9rem;
        }
    }
`
const LoginContainer = styled.main`
    padding: 20px;
    background-color: #f4f4f4;    
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
`
const logoStyle = {
    width: '35rem', 
    height: '35rem',
    position: 'fixed', 
    bottom: -100,
    right: -150,
    opacity: .1,
    zIndex: -1
}
const uiConfig = {
    signInFlow: 'popup',
    signInSuccessUrl: '/perfil',
    signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID,        
        firebase.auth.TwitterAuthProvider.PROVIDER_ID,        
    ]
}

const Login = () => {
    return (
        <MainLayout title="Ingresar">
            <FullWidthDiv>
                <h1 className="title">BIENVENIDO</h1>
                <p className="greet">Nos encanta tenerte de vuelta, o si es la primera vez que nos visitas, solo ingresa con el metodo de tu preferencia.</p>
                <LoginContainer>
                    <FirebaseUIAuth
                        lang="es_419"
                        config={uiConfig}
                        auth={auth}
                        firebase={firebase}
                    />                          
                </LoginContainer>
                <LazyLoadImage
                    src="/images/logo.svg"
                    effect="opacity"
                    style={logoStyle}
                /> 
            </FullWidthDiv>
        </MainLayout>
    )
}

export default Login;