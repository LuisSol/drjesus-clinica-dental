import styled from 'styled-components'
import Link from 'next/link'

const FullWidthDiv = styled.div`
    background-color: #0981c5;
    width: 100%;    
`
const MidBannerContainer = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 4rem 20px;
    width: 1020px; 
    height: 27rem;
    margin: 0 auto;
    position: relative;
    color: white;
    h1 {
        margin-top: 0;
        text-align: center;
        font-size: 4rem;
    }
    a {        
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 500;
        width: 9rem;
        height: 2.7rem;
        border: 1px solid white;
        border-radius: 10px;
    }
    @media (max-width: 1020px) {
        width: 100%;
    }    
`

const MidBanner = () => (
    <FullWidthDiv>
        <MidBannerContainer>
            <h1>Visitanos, nosotros te daremos<br />tu mejor sonrisa</h1>
            <Link href="/contacto">
                <a>Como llegar</a>
            </Link>
        </MidBannerContainer>
    </FullWidthDiv>    
)

export default MidBanner; 