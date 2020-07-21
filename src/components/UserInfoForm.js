import styled from 'styled-components';
import useFormValidation from '../utils/useFormValidation';
import validateUserInfo from '../utils/validateUserInfo';
import flasher from '../utils/flasher';
import { useSelector } from 'react-redux';
import { auth, db } from '../utils/firebase';
import Nprogress from 'nprogress'

const usersRef = db.collection('users');
const InfoForm = styled.form`       
    label {
        font-weight: 500;
        display: block;
    } 
    input {
        margin-left: 5px;
        border: 0;
        font-size: .9rem;        
    }
    .btn-container {
        display: flex;
        justify-content: center; 
        margin-top: 1.5rem;       
    }
    input:disabled {
        background-color: white;
        color: black;        
    }
    input:not([disabled]) {
        border-bottom: 1px solid #666;
    }
    input:focus {
        outline: none;
    }
    input.error {
        border-color: red;
    }
    button {
        margin-left: 1rem;
        width: 4rem;
        height: 1.7rem;
        border-radius: 7px;
    }
    button:disabled {
        opacity: .5;
        cursor: auto;
    }
    .edit-btn {
        border: 1px solid #666;
        color: #222;
    }
    small.error {
        color: red;
        position: absolute;
    }
`

const UserInfoForm = (userInfo) => {
    const [isEditing, setIsEditing] = React.useState(false);
    const user = useSelector(state => state.user);

    const onValidValues = () => {
        // user can be loged out from another tab window
        if(!user) {
            return flasher('Debes ingresar a tu cuenta para acceder a este recurso', 
                           'warn', '/ingresar');
        }
        // update values on firebase 
        Nprogress.start();       
        Promise.all([
            auth.currentUser.updateProfile({            
                displayName: values.name
            }),
            usersRef.doc(user.uid).set({ 
                phone: values.phone
            })
        ])        
        .then(() => {
            Nprogress.done();
            setIsEditing(!isEditing)
        })
        .catch((err) => {
            Nprogress.done();
            flasher('Algo salió mal intentalo de nuevo más tarde', 'error');
            console.error(err);
        });
    }    

    const { handleBlur, handleSubmit, handleChange,
            values, errors } = useFormValidation(userInfo, validateUserInfo, onValidValues);    
    
    return (
        <InfoForm onSubmit={handleSubmit} >
            <p>
                <label htmlFor="name"> 
                    nombre:
                    <input 
                        type="text"
                        value={values.name || ''} 
                        disabled={!isEditing} 
                        onChange={handleChange}
                        onBlur={handleBlur}
                        id="name"
                        name="name"
                        maxLength="150"
                        className={errors.name ? 'error' : ''}
                    />
                </label>
                {errors.name && <small className="error">{errors.name}</small>}
            </p>                       
            <p>
                <label htmlFor="phone"> 
                    teléfono:
                    <input 
                        type="number"
                        value={values.phone || ''} 
                        disabled={!isEditing}
                        // max property doesnt work so we manually limit the number of digits 
                        onChange={(e) => {
                            if(e.target.value.length > 10) return;
                            handleChange(e)
                        }}
                        onBlur={handleBlur}
                        id="phone"
                        name="phone"
                        className={errors.phone ? 'error' : ''}
                    />
                </label>
                {errors.phone && <small className="error">{errors.phone}</small>}                
            </p>            

            <div className="btn-container">
                <button 
                    className="link-btn secundary-btn edit-btn"
                    onClick={() => setIsEditing(!isEditing)}
                    disabled={isEditing}
                >Editar</button>
                <button 
                    className="link-btn primary-btn"
                    disabled={!isEditing}
                >Guardar</button>
            </div>
        </InfoForm>
    )
}

export default UserInfoForm;