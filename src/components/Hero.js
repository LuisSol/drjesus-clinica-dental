import styled from 'styled-components'

const FullWidthDiv = styled.div`
    width: 100%;    
`
const HeroContainer = styled.header`
    width: 1020px; 
    margin: 0 auto;
`

const Hero = () => {
    return (
        <FullWidthDiv>
            <HeroContainer>
                <h1>Hello next</h1>
            </HeroContainer>
        </FullWidthDiv>
    )
}

export default Hero;
