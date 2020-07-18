export default (values) => {
    const errors = {}    
    const phoneRegex = /[0-9]{10}/
    const alphaNumRegex = /^[a-zA-Z0-9_ ]*$/

    if( !values.name || values.name.trim().lenght === 0 ) {
        errors.name = 'Ingresa tu nombre';
    }
    else if( values.name.trim().lenght > 150 ) {
        errors.name = 'El máximo de caracteres es 150'
    }
    else if( !alphaNumRegex.test(values.name) ) {
        errors.name = 'El valor debe ser alfanúmerico'
    }    
    if( values.phone && values.phone.trim().length > 0 && !phoneRegex.test(values.phone) ) {
        errors.phone = 'Ingresa tu número de teléfono a 10 dígitos'
    }    

    const isEmpty = () => {
        return Object.values(errors).length === 0;
    }

    return {
        ...errors,
        isEmpty
    }
}