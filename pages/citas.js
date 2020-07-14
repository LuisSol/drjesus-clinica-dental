import MainLayout from '../src/components/MainLayout';
import Router from 'next/router'
import { setCookie, parseCookies } from 'nookies'

const Citas = () => {    
    return (
        <MainLayout title="Citas">
            <h1>Citas</h1>
        </MainLayout>
    )
}

Citas.getInitialProps = async (ctx) => {    
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

export default Citas;