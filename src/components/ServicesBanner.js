import styled from 'styled-components'
import Link from 'next/link'

import DrjesusSvg from './DrjesusSvg'

const FullWidthDiv = styled.div`
    width: 100%;
`
const ServicesContainer = styled.main`
    width: 1020px; 
    height: 33rem;   
    margin: 0 auto;
    position: relative;
    @media (max-width: 1020px) {
        width: 100%;
    }    
    @media (max-width: 850px) {
        height: 42rem;
    }
    @media (max-width: 550px) {
        height: 120vw;
    }
    @media (max-width: 400px) {
        height: 130vw;
    }
    
`
const TitleContainer = styled.div`
    position: absolute;
    top: 30px;
    left: 20px;
    width: 45%;
    z-index: 1;
    h1 {
        font-size: 3rem;
        margin-bottom: 0;
    }
    p {
        font-size: 1.2rem;
        text-align: left;
        margin-top: 2rem;
        font-weight: 300;
    }
    a {
        margin-top: 3rem;
    }
    @media (max-width: 850px) {
        width: 90%;
        h1 {
            font-size: 3rem;
            margin-top: 0;
        }
    }
    @media (max-width: 640px) {        
        h1 {
            font-size: 2.5rem;
        }
        p {
            font-size: 1rem;
        }
        a {
            margin-top: 2rem;
        }
    }
    @media (max-width: 550px) {
        h1 {
            font-size: 2rem;
        }
    }
    @media (max-width: 425px) {
        h1 {
            font-size: 1.5rem;
        }
        a {
            margin-top: 1.5rem;
        }
        p {
            font-size: .8rem;
        }
    }
`

const ServicesBanner = () => (
    <FullWidthDiv>
        <ServicesContainer>            
            <TitleContainer>
                <h1>Conoce nuestros servicios</h1>
                <p>Estamos a la vanguardia de los más modernos procedimientos odontológicos y contamos con un amplio catálogo de servicios, desde extracciones, brackets, ondodoncias, y muchos más...</p>
                <div>
                    <Link href="/servicios">
                        <a className="link-btn primary-btn">Más información</a>
                    </Link>
                </div>
            </TitleContainer>
            <DrjesusSvg />
        </ServicesContainer>
    </FullWidthDiv>
)


export default ServicesBanner
