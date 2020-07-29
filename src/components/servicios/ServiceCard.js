import { useState } from 'react'
import styled from 'styled-components'

const Container = styled.div`
    width: 350px;
    height: 400px;
    overflow: hidden;
    position: relative;
    display: flex;
    justify-content: center;
    border-radius: 20px;
    h2 {
        position: absolute;
        left: 1rem;
    }
    div.moreinfo {    
        align-self: flex-end;
        z-index: 6;
        margin-bottom: .5rem;
        color: white;
        font-weight: 300;
        cursor: pointer; 
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        img {
            width: 12px;
            transform: rotate(180deg);
            transition: transform 200ms linear;
        }
        img.open {
            transform: rotate(0deg);
        }
    }    
    @media(max-width: 370px) {
        width: 300px;
    }    
`
const ServiceDetail = styled.div` 
    border-radius: 50%;
    background-color: #1193e7;
    height: 500px;
    width: 500%;
    bottom: -3rem;
    position: absolute; 
    transform-origin: bottom;
    transform: scale(.2); 
    transition: transform 500ms ease-in-out;
    display: flex;
    align-items: center;
    justify-content: center;
    &.open {
        transform: scale(1);
    }
`
const DetailText = styled.div`    
    height: 370px;
    width: 300px;
    color: white;
    opacity: 0;
    transition: opacity 500ms ease-in;
    overflow-wrap: break-word;
    &.open {
        opacity: 1;        
    }
    a {
        margin-top: 2rem;
        width: 100%;
    }
    @media(max-width: 370px) {
        width: 270px;
    }
`

const ServiceCard = ({ detail, link, title, children }) => {
    const [infoOpen, setInfoOpen] = useState(false);
    
    return (
        <Container>
            <h2>{title}</h2>
            {children}
            <ServiceDetail 
                className={infoOpen ?  'open' : ''}
            >            
                <DetailText 
                    className={infoOpen ?  'open' : ''}
                >
                    <p>{detail}</p>
                    <a href={link} className="link-btn secundary-btn">
                        Agendar cita
                    </a>
                </DetailText>
            </ServiceDetail>
            <div 
                className="moreinfo"
                onClick={() => setInfoOpen(!infoOpen)}
            >
                <img 
                    src="/images/arrow_white.svg" 
                    alt="white arrow" 
                    className={infoOpen ?  'open' : ''}
                />
                {
                    infoOpen ? <span>ocultar información</span>
                             : <span>más información</span> 
                }
            </div>
        </Container>
    )
}

export default ServiceCard;