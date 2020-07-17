import { useState } from 'react';
import styled from 'styled-components';
import useFormValidation from '../utils/useFormValidation';
import validateContactForm from '../utils/validateContactForm';
import axios from 'axios';
import flasher from '../utils/flasher';

const ContactFormStyled = styled.form`    
    margin-top: .5rem;
    label {
        display: block;
        margin-top: 1rem;
        margin-bottom: .2rem;
    }
    small {
        position: absolute;
        color: red;
        font-weight: 300;
    }
    input {
        display: block;
        width: 99%;
        border: 0;
        border-bottom: 1px solid #666;
        
    }
    textarea {
        width: 99%;
        height: 5rem;
        display: block;
        margin-top: .5rem;
        resize: none;
    }    
    .error {
        border-color: red;
    }
    input[type="submit"] {
        margin-top: 1.5rem; 
        height: 2rem;  
        font-weight: 600; 
        border-radius: 7px;    
    }
    input[type="submit"]:disabled {  
        opacity: .5; 
    }
    input:focus, textarea:focus {
        outline: none;
    }
`
const initialValues = {
    name: '',
    email: '',
    question: ''
}

const ContactForm = () => {
    const [sendingMail, setSendingMail] = useState(false)

    const onValidValues = () => {        
        // submit data
        setSendingMail(true);
        axios.post('/api/contact_form', values)
        .then( res => {
            if(res.status === 200) {
                // success  
                flasher('Gracias por tu contacto, reponderemos a la brevedad posible.', 'success');               
                resetValues();
                setSendingMail(false);
            }
            else {
                // email sent error
                flasher('Algo salió mal, intenta de nuevo más tarde.', 'error');                 
            }
        })
        .catch(err => {
            // axios error
            console.error(err);
            flasher('Algo salió mal, intenta de nuevo más tarde.', 'error');
        });
    }
    
    const { handleSubmit, handleBlur, handleChange, resetValues,
            values, errors } = 
            useFormValidation(initialValues, validateContactForm, onValidValues);
    
    return (        
        <ContactFormStyled onSubmit={handleSubmit}>                      
            <label htmlFor="name">nombre:</label>
            <input 
                onChange={handleChange}
                onBlur={handleBlur}
                type="text" 
                id="name"
                value={values.name}
                className={ errors.name ? 'error' : ''}
            />
            { errors.name && <small>{errors.name}</small> }
            <label htmlFor="email">email:</label>
            <input 
                onChange={handleChange}
                onBlur={handleBlur}
                type="email" 
                id="email"
                value={values.email}
                className={ errors.email ? 'error' : ''}
            />
            { errors.email && <small>{errors.email}</small> }
            <label htmlFor="question">pregunta:</label>
            <textarea 
                onChange={handleChange}
                onBlur={handleBlur}                 
                id="question"
                value={values.question}
                className={ errors.question ? 'error' : ''}
            />
            { errors.question && <small>{errors.question}</small> }

            <input type="submit" className="link-btn primary-btn" disabled={sendingMail} />
        </ContactFormStyled>
    )
}

export default ContactForm;