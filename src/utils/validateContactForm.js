export default (values) => {
    const errors = {}
    const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/

    if( !values.name || values.name.trim().lenght === 0 ) {
        errors.name = 'Ingresa tu nombre';
    }
    if( !values.email || values.email.trim().lenght === 0 ) {
        errors.email = 'Ingresa tu correo';
    }
    else if( !emailRegex.test(values.email) ) {
        errors.email = 'El correo ingresado no es válido';
    }
    if( !values.question || values.question.trim().lenght === 0 ) {
        errors.question = 'Ingresa tu pregunta'
    }
    else if( values.question.trim().lenght > 300 ) {
        errors.question = 'El máximo de caracteres es 300'
    }

    const isEmpty = () => {
        return Object.values(errors).length === 0;
    }

    return {
        ...errors,
        isEmpty
    }
}