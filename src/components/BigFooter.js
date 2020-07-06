import styled from 'styled-components';

const BigFooterContainer = styled.footer`
    height: 30rem;
    background: #3F5EFB;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, rgba(63, 94, 251, .9), rgba(252, 70, 107, .9));  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, rgba(63, 94, 251, .9), rgba(252, 70, 107, .9)); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */    
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
        margin-top: 1rem;
        margin-bottom: 0;
    }
    h2 {
        margin-top: 0;
    }
    img {
        position: absolute;
        top: 0;        
        width: 100%;
        height: 100%;
        object-fit: cover;
        z-index: -1;
    }
    @media (max-width: 750px) {
        h1 {
            font-size: 6.5rem;
        }
    }
    @media (max-width: 650px) {
        h1 {
            font-size: 5.5rem;
        }
    }
    @media (max-width: 550px) {
        height: 25rem;
        h1 {
            font-size: 4rem;
        }
    }
    @media (max-width: 400px) {
        h1 {
            font-size: 3.5rem;
        }
        h2 {
            font-size: 1rem;
        }
    }
    @media (max-width: 350px) {
        h1 {
            font-size: 3.2rem;
        }
    }
`

const BigFooter = () => (
    <BigFooterContainer>
        <img src="/images/HERO5.jpg" alt="sonrisas" />
        <h1>SONRÍE MÁS</h1>
        <h2>nosotros te ayudamos.</h2>
        <small>Todos los derechos reserverdos; Clínica dental Dr. Jesús Bañuelos. Diseñado por LESN. Aviso de privacidad.</small>
    </BigFooterContainer>
)


export default BigFooter;
