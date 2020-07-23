import styled from 'styled-components'
import moment from 'moment'
import { dateFieldToEpoch } from '../utils/dateFunctions'
import Nprogress from 'nprogress'
import { rtdb } from '../utils/firebase'
import flasher from '../utils/flasher'

const root = rtdb.ref()

const Container = styled.div`
    width: 270px;
    font-weight: 300;
    h3 {
        margin-top: 0;
    }
`
const ButtonsContainer = styled.div`
    text-align: right;
    button {
        margin-left: .5rem;
        width: 5rem;
        height: 2rem;
        border-radius: 7px;
        display: inline-block;
    }
    .cancel {
        border: 1px solid #999;
        color: #777;
    }
`

const msDayStart = 32400000; /* 9:00am in ms */
const msTimeBlock = 1800000; /* 30mn in ms */

const AppointmentConfirmation = ({ 
    setShowConfirmation, 
    name, 
    uid,
    phone, 
    service, 
    date,    
    serviceDuration,
    selectedHour
}) => {

    const scheduleAppointment = () => {
        Nprogress.start();
        // to compose a Multipath update for firebase rt database
        const updateObj = {}
        let hourIndex = parseInt(selectedHour.index);        
        let timeSpan = parseInt(serviceDuration) + hourIndex; 
        // Multipath updates are done with an obj with paths as keys and the desired value for the database               
        updateObj[`days/${date}/${selectedHour.index}/appointment`] = { 
            uid, name, phone, service, timeBlocks: serviceDuration 
        }
        // Create a new branch for the appointment with an epoch timestamp for the selected date / hour
        let epochTimeStamp = dateFieldToEpoch(date) + msDayStart + (msTimeBlock * hourIndex);
        updateObj[`appointments/${uid}/${epochTimeStamp}`] = {
            service, name, timeStamp: epochTimeStamp
        }
        // update the related hours for multi-timeblocks services
        for(let i = hourIndex + 1; i < timeSpan; i++ ) {
            updateObj[`days/${date}/${i}/appointment`] = true;
        }
        // perform the update in the firebase database
        root.update(updateObj)
        .then(() => {
            flasher('Tu cita ha sido agendada con exito, te contactaremos para confirmar', 
                    'success', '/perfil');
        })
        .catch(err => {
            flasher('Algo salió mal, probablemente la hora y fecha ya fueron ocupadas', 'error');
            console.error(err);   
        })
        .finally(() => {
            Nprogress.done();
            setShowConfirmation(false);
        });                
    }

    return (
        <Container>
            <h3>Confirma tu cita</h3>
            <p>
                <strong>nombre: </strong>{name}
            </p>
            <p>
                <strong>teléfono: </strong>{phone}
            </p>
            <p>
                <strong>servicio: </strong>{service}
            </p>
            <p>
                {`${moment(dateFieldToEpoch(date)).format('dddd LL')} / ${selectedHour.hour}`}       
            </p>
            <ButtonsContainer>
                <button 
                    className="link-btn secunday-btn cancel"
                    onClick={() => setShowConfirmation(false)}
                >
                    Cancelar
                </button>
                <button 
                    className="link-btn primary-btn"
                    onClick={scheduleAppointment}
                >
                    Confirmar
                </button>
            </ButtonsContainer>
        </Container>
    )
}

export default AppointmentConfirmation;