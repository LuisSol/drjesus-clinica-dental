import { useState } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import ReactModal from 'react-modal';
import useFormvalidation from '../../utils/useFormValidation';
import validateAppointmentForm from '../../utils/validateAppointmentForm';
import { today, dateFieldToEpoch, epochToDateField } from '../../utils/dateFunctions';

ReactModal.setAppElement('body');

moment.locale('es');

import Scheduler from './Scheduler'
import AppointmentConfirmation from './AppointmentConfirmation'

const AppointmenFields = styled.form` 
    flex: 1; 
    label {
        display: block;
        margin-top: 1.2rem;        
    }
    label span {
        margin-right: .3rem;
    }
    input {
        border: 0;
        border-bottom: 1px solid #666;        
    }
    input#phone {
        width: 11ch;
    }
    input#date {
        margin-right: 1rem;
        margin-bottom: 1rem;
    }
    input:focus {
        outline:  none;
    }
    input.error {
        border-color: red;
    }    
    small.error {
        position:absolute;
        color: red;
    }
    .date {
        font-weight: 300;        
    }
    @media (max-width: 400px) {
        input#date {
            display: block;
        }    
    }
`

const AppointmentForm = ({ date, name, phone, service, services, uid }) => {
    const [serviceDuration, setServiceDuration] = useState(services[0].timeBlocks)
    const [textDuration, setTextDuration] = useState(services[0].duration);
    const [showConfirmation, setShowConfirmation] = useState(false)
    const [selectedHour, setSelectedHour] = useState({});

    const onValidValues = () => {
        setShowConfirmation(true);    
    }
    
    const {handleSubmit, handleBlur, handleChange, values, errors} = 
           useFormvalidation({ name, phone, 
                               service: service || services[0].title, 
                               date: date || epochToDateField(today()) },
                               validateAppointmentForm, onValidValues);
    
    return (
        <> 
        <ReactModal 
            isOpen={showConfirmation}
            onRequestClose={() => setShowConfirmation(false)}
            overlayClassName="appointment-confirmation-overlay"
            className="appointment-confirmation-content"
            closeTimeoutMS={200}
        >
            <AppointmentConfirmation
                setShowConfirmation={setShowConfirmation}
                uid={uid}
                name={values.name}
                phone={values.phone}
                service={values.service}
                date={values.date}
                serviceDuration={serviceDuration}
                selectedHour={selectedHour}
            />  
        </ReactModal>           
        <AppointmenFields onSubmit={handleSubmit} >
            <h1>Agenda tu cita:</h1>                         
            <label>
                <span>A nombre de:</span>
                <input 
                    type="text"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    maxLength="150"
                    id="name"
                    name="name"
                    className={errors.name ? 'error' : ''}
                />
            </label>  
            {errors.name && <small className="error" >{errors.name}</small>}    
            <label>
                <span>Telefono:</span>
                <input 
                    type="number"
                    value={values.phone}
                    // max property doesnt work so we manually limit the number of digits 
                    onChange={(e) => {
                        if(e.target.value.length > 10) return;
                        handleChange(e);
                    }}
                    onBlur={handleBlur}
                    id="phone"
                    name="phone"
                    className={errors.name ? 'error' : ''}
                />
            </label>
            {errors.phone && <small className="error">{errors.phone}</small>} 
            <label>
                <span>Servicio:</span> 
                <select
                    value={values.service}
                    // set the dataset values for the selected service
                    onChange={(e) => {
                        setServiceDuration(e.target.selectedOptions[0].dataset.timeblocks);
                        setTextDuration(e.target.selectedOptions[0].dataset.duration);
                        handleChange(e);
                    }}
                    id="service"
                    name="service"
                >    
                {                            
                    services.map( service => 
                        <option 
                            key={service.id}
                            value={service.title}
                            data-timeblocks={service.timeBlocks}
                            data-duration={service.duration}
                        >
                            {service.title}
                        </option>
                    )
                }
                </select>
            </label> 
            <label>                
                <span>Duración estimada: {textDuration}</span>
            </label>
            <div>
                <label>Fecha: </label>
                <input 
                    type="date" 
                    value={values.date} 
                    min={epochToDateField(today())}  
                    onChange={handleChange}     
                    id="date"
                    name="date"                
                />
                <span className="date">{moment(dateFieldToEpoch(values.date)).format('dddd LL')}</span>
            </div>
            <br /> 
            <small>* Una vez completados los datos selecciona la hora que deseas</small>                
            <Scheduler 
                currentDate={values.date}
                currentServiceDuration={serviceDuration}
                errors={errors}
                setSelectedHour={setSelectedHour}
            />                     
        </AppointmenFields>  
        </>      
    )    
}

export default AppointmentForm;