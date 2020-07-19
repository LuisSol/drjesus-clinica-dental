import styled from 'styled-components';
import { parseCookies } from 'nookies';
import { verifyToken } from '../src/utils/firebaseAdmin';
import flasher from '../src/utils/flasher';
import moment from 'moment'

moment.locale('es');

import MainLayout from '../src/components/MainLayout';
import Scheduler from '../src/components/Scheduler'
import AppoimentsFooter from '../src/components/AppoimentsFooter'

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

const today = () => {
    return Date.now();
}
const formatDate = (date) => {
    return moment(date).format('YYYY-MM-DD');
}
const services = [
    {id: 1, title: 'service 1'},
    {id: 2, title: 'service 2'},
    {id: 3, title: 'service 3'},
]

const Citas = ({ redirect, flash, date }) => {  
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
        /* getTime() returns one day offset thats why sum 86400000*/      
        setCurrentDate(new Date(e.target.value).getTime() + 86400000);
    }

    console.log(currentDate);

    return (
        <MainLayout title="Citas">
            <FullWidthDiv>
                <SchedulerContainer>
                    <h1>Agenda tu cita:</h1>
                    <div>
                        <label>Fecha: </label>
                        <input 
                            type="date" 
                            value={formatDate(currentDate)} 
                            min={formatDate(today())}  
                            onChange={handleChange}                     
                        />
                        <span>{moment(currentDate).format('dddd LL')}</span>
                    </div>
                    <div>
                        <label>Servicio: </label>
                        <select>    
                            <option>--- En que te podemos ayudar ? ---</option>
                        {                            
                            services.map( service => 
                                <option 
                                    key={service.id}
                                    value={service.title}
                                >
                                    {service.title}
                                </option>
                            )
                        }
                        </select>                        
                    </div>
                    <div>
                        <span>Duración estimada: </span>
                        <div>
                            <label>
                                A nombre de:
                                <input />
                            </label>
                        </div>
                        <div>
                            <label>
                                Telefono:
                                <input />
                            </label>
                        </div>
                        <button>Agendar</button>
                    </div> 
                    <div>                   
                        <Scheduler /> 
                    </div>                   
                </SchedulerContainer>
                
            </FullWidthDiv>
            <AppoimentsFooter />
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
            await verifyToken(auth);
            console.log('token valido ,', auth);
        }
        catch (error) {
            console.log('token invalido');
        }
    }
    return { props }
}

export default Citas;