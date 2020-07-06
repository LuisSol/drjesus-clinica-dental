import styled from 'styled-components'
import Link from 'next/link'

import HeroImg from './HeroImg'

const FullWidthDiv = styled.div`
    width: 100%;    
`
const HeroContainer = styled.header`
    width: 1020px; 
    margin: 0 auto;
    height: 30rem;
    position: relative;
    @media (max-width: 1020px) {
        width: 100%;
    }
    @media (max-width: 850px) {
        height: 40rem;
    }
    @media (max-width: 550px) {
        height: 115vw;
    }
`
const TitleContainer = styled.div`    
    position: absolute;
    top: 0;
    right: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;    
    height: 100%;
    h1 {
        font-size: 7.5rem;
        margin: 0;
    }
    p {        
        margin-top: 0;
        text-align: center;
    }
    a {
        margin-top: 2rem;
    }
    @media (max-width: 850px) {
        height: 38%;
        right: 50%;
        transform: translateX(50%);
        a {
            margin-top: 0;
        }
    }
    @media (max-width: 520px) {
        h1 {
            font-size: 6rem;
        }
    }
    @media (max-width: 450px) {
        h1 {
            font-size: 5rem;
        }
        p {
            font-size: .8rem;
        }
    }
    @media (max-width: 420px) {
        h1 {
            font-size: 4rem;
        }
        p {
            font-size: .7rem;
        }
    }
`

const Hero = () => {
    return (
        <FullWidthDiv>
            <HeroContainer>
                <HeroImg />
                <TitleContainer>
                    <div>
                        <h1>SONRÍE</h1>
                        <p>Una sonrisa vale más que mil imágenes.</p> 
                    </div>                  
                    <Link href="/citas">                    
                            <a className="primary-btn">Haz tu cita</a>
                    </Link>                                        
                </TitleContainer>
            </HeroContainer>
        </FullWidthDiv>
    )
}

export default Hero;
