import styled from 'styled-components';
import { parseCookies } from 'nookies';
import { verifyToken } from '../src/utils/firebaseAdmin';
import flasher from '../src/utils/flasher';
import moment from 'moment'
import { today, dateFieldToEpoch, epochToDateField } from '../src/utils/dateFunctions'

moment.locale('es');

import MainLayout from '../src/components/MainLayout';
import Scheduler from '../src/components/Scheduler'
import AppointmentsFooter from '../src/components/AppointmentsFooter'

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
        setCurrentDate(dateFieldToEpoch(e.target.value));
    }

    console.log(currentDate);

    return (
        <MainLayout title="Citas">
            <FullWidthDiv>
                <SchedulerContainer>
                    <h1>Agenda tu cita:</h1>
                    <div>                        
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
                    </div>
                    <div>
                        <label>Servicio: </label>
                        <select>    
                            <option>--- En que te podemos servir ? ---</option>
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
                        <div>
                        <span>Duración estimada: </span>
                        </div>                      
                    </div>                    
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
                    <div>                   
                        <Scheduler 
                            currentDate={currentDate}
                        /> 
                    </div>                   
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
            await verifyToken(auth);
        }
        catch (error) {
            console.log('token invalido');
        }
    }
    return { props }
}

export default Citas;