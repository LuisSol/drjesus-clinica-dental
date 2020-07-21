import styled from 'styled-components';
import Link from 'next/link' 

const BigFooterContainer = styled.footer`
    height: 30rem;
    background: #3F5EFB;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, rgba(63, 94, 251, .9), rgba(252, 70, 107, .9));  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, rgba(63, 94, 251, .9), rgba(252, 70, 107, .9)); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */    
    position: relative;    
    color: white;
    small {
        position: absolute;
        left: 10px;
        bottom: 10px;
        font-size: .7rem;
    }
    img {
        position: absolute;
        top: 0;        
        width: 100%;
        height: 100%;
        object-fit: cover;
        z-index: -1;
    }
    .title-container {
        padding: 20px;
        h1 {
            font-size: 5rem;
            margin-top: 1rem;
            margin-bottom: 1rem;
        }
        h2 {
            margin-top: 0;
            margin-bottom: 2rem;
        }
    }    
    @media (max-width: 800px) {
        .title-container {
            h1 {
                font-size: 4.5rem;
            }
        }
    }
    @media (max-width: 650px) {        
        .title-container {
            h1 {
                font-size: 4rem;
            }
        }
    }
    @media (max-width: 550px) {
        height: 25rem;        
        .title-container {
            h1 {
                font-size: 2.8rem;
            }
            h2 {
                font-size: 1rem;
            }
        }
    }
`

const appointmentsFooter = () => (
    <BigFooterContainer>
        <img src="/images/HERO5.jpg" alt="sonrisas" />
        <div className="title-container">
            <h1>CONOCE NUESTROS <br />SERVICIOS</h1>
            <h2>Necesitas más información ? conoce los detalles aquí:</h2>
            <Link href="/servicios">
                <a className="link-btn secundary-btn">Más información</a>
            </Link>
        </div>
        <small>Todos los derechos reserverdos; Clínica dental Dr. Jesús Bañuelos. Diseñado por LESN. Aviso de privacidad.</small>
    </BigFooterContainer>
)


export default appointmentsFooter;
