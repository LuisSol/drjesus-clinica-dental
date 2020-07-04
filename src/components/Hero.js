import styled from 'styled-components'
import HeroImg from './HeroImg'

const FullWidthDiv = styled.div`
    width: 100%;    
`
const HeroContainer = styled.header`
    width: 1020px; 
    height: 60vh;
    margin: 0 auto;
    position: relative;
    @media (max-width: 1020px) {
        width: 100%;
    }
`
const TitleContainer = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    h1 {
        font-size: 8rem;
        margin-bottom: 0;
    }
    p {
        text-align: right;
        margin-top: 0;
    }
`

const Hero = () => {
    return (
        <FullWidthDiv>
            <HeroContainer>
                <HeroImg />
                <TitleContainer>
                    <h1>SONRÍE</h1>
                    <p>Una sonrisa vale más que mil imágenes.</p>
                </TitleContainer>
            </HeroContainer>
        </FullWidthDiv>
    )
}

export default Hero;
