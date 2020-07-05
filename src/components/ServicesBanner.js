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
`
const TitleContainer = styled.div`
    position: absolute;
    top: 30px;
    left: 0;
    width: 45%;
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
`

const ServicesBanner = () => (
    <FullWidthDiv>
        <ServicesContainer>            
            <TitleContainer>
                <h1>Conoce nuestros servicios</h1>
                <p>Estamos a la vanguardia de los más modernos procedimientos odontológicos y contamos con un amplio catálogo de servicios, desde extracciones, brackets, ondodoncias, y muchos más...</p>
                <div>
                    <Link href="/servicios">
                        <a className="primary-btn">Más información</a>
                    </Link>
                </div>
            </TitleContainer>
            <DrjesusSvg />
        </ServicesContainer>
    </FullWidthDiv>
)


export default ServicesBanner
