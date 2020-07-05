import styled from 'styled-components';

const BigFooterContainer = styled.footer`
    height: 40rem;
    background-color: rgba(0,0,150,.9);
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: white;
    small {
        position: absolute;
        left: 10px;
        bottom: 10px;
        font-size: .7rem;
    }
    h1 {
        font-size: 7.5rem;
        margin-bottom: 0;
    }
    h2 {
        margin-top: 0;
    }
`

const BigFooter = () => {
    return (
        <BigFooterContainer>
            <h1>SONRÍE MÁS</h1>
            <h2>nosotros te ayudamos.</h2>
            <small>Todos los derechos reserverdos; Clínica dental Dr. Jesús Bañuelos. Diseñado por LESN. Aviso de privacidad.</small>
        </BigFooterContainer>
    )
}

export default BigFooter;
