import { useState } from 'react'
import styled from 'styled-components'
import useFormvalidation from '../utils/useFormValidation'
import validateAppointmentForm from '../utils/validateAppointmentForm'

const AppointmenFields = styled.form`
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
`

const AppointmentForm = ({ name, phone, service, services }) => {
    const [textDuration, setTextDuration] = useState('');

    const onValidValues = () => {
        console.log('valid values!!!')
    }

    const {handleSubmit, handleBlur, handleChange, values, errors} = 
           useFormvalidation({ name, phone, service },validateAppointmentForm,onValidValues);
    
    return (       
        <AppointmenFields onSubmit={handleSubmit}>                        
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
                        console.log(e.target.selectedOptions[0].dataset.timeblocks);
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
        </AppointmenFields>
        
    )
}

export default AppointmentForm;