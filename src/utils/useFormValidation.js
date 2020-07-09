import {useState, useEffect} from 'react'

let form;

const useFormValidation = ( initialValues, validationFunction) => {
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState({});
    const [isSubmiting, setIsSubmiting] = useState(false);

    useEffect(() => {
        if(isSubmiting) {            
            if(errors.isEmpty()) {
                //submit
                console.log('enviando')
            }
            setIsSubmiting(false);
        }
    }, [errors])

    const handleChange = (e) => {
        setValues({
            ...values,
            [e.target.id]: e.target.value
        })
    }
    const handleSubmit = (e) => {
        if(!form) form = e.target;
        setIsSubmiting(true);
        e.preventDefault();
        setErrors(validationFunction(values));        
    }
    const handleBlur = () => {
        setErrors(validationFunction(values));
    }

    return { handleSubmit, handleBlur, handleChange,
             values, errors }
}

export default useFormValidation;