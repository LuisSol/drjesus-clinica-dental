import MainLayout from '../src/components/MainLayout';
import Router from 'next/router'
import { setCookie, parseCookies } from 'nookies'

const Profile = () => {
    return (
        <MainLayout title="Perfíl">
            <h1>Perfil</h1>
        </MainLayout>
    )
}

Profile.getInitialProps = async (ctx) => {
    const { auth } =  parseCookies(ctx);
    if(!auth) {
        // Not loged in
        setCookie(ctx, 'flash', 
                  JSON.stringify({ type: 'warn', msg: 'Debes ingresar a tu cuenta para acceder a este recurso' }), 
                  { maxAge: 60, path: '/' }); 
        if(process.browser){
            // client side
            Router.push('/ingresar'); 
        } 
        else {
            // server side
            const { res } = ctx;            
            res.writeHead(302, {
                Location: '/ingresar'
            });
            res.end();
        }                   
    }
    else {
        // loged in         
    }
    return { props: {} }
}

export default Profile;
