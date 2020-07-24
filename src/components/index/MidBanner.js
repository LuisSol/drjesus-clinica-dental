import styled from 'styled-components'
import Link from 'next/link'
import { LazyLoadImage } from 'react-lazy-load-image-component'

const FullWidthDiv = styled.div`
    background-color: #0981c5;
    width: 100%;    
`
const MidBannerContainer = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 3rem 20px;
    width: 1020px; 
    height: 25rem;
    margin: 0 auto;
    position: relative;
    color: white;
    h1 {
        margin-top: 0;
        text-align: center;
        font-size: 4rem;
    }
    img {
        height: 40px;
        position: absolute;
    }     
    #tooth {
        bottom: 10%;
        left: 20%;
        transform: rotate(10deg);
    } 
    #toothpaste {
        bottom: 10%;
        right: 20%;
        transform: rotate(10deg);
    } 
    #toothcheck {
        bottom: 30%;
        left: 10%;
        transform: rotate(35deg);
    }
    #twisers {
        bottom: 30%;
        right: 10%;
        transform: rotate(-35deg);
    }
    #shringe {
        bottom: 30%;
        left: 30%;
        transform: rotate(120deg);
    }
    #prostetic {
        bottom: 30%;
        right: 30%;
        transform: rotate(-20deg);
    }
    #pills {
        bottom: 10%;
        left: 35%;
        transform: rotate(-20deg);
    }
    #floss {
        bottom: 10%;
        right: 35%;
        transform: rotate(-25deg);
    }
    #Chair {
        bottom: 10%;
        right: 5%;
        transform: rotate(25deg);
    }
    #brush {
        bottom: 10%;
        left: 5%;
        transform: rotate(-25deg);
    }
    @media (max-width: 1020px) {
        width: 100%;
    } 
    @media (max-width: 940px) {        
        h1 {
            font-size: 3.7rem;
        }
    }
    @media (max-width: 875px) {        
        #tooth {
            left: 17%;
        } 
        #toothpaste {
            right: 15%;
        } 
        #shringe {
            bottom: 20%;
            left: 23%;
        }
        #prostetic {
            bottom: 20%;
            right: 23%;
        }
        #pills {
            bottom: 10%;
            left: 30%;
        }
        #floss {
            bottom: 10%;
            right: 30%;
        }
    }
    @media (max-width: 750px) {
        img {
            width: 35px;
        }
    }
    @media (max-width: 650px) {
        h1 {
            font-size: 3rem;
        }
    }
    @media (max-width: 520px) {
        h1 {
            font-size: 2.5rem;
        }
    }
    @media (max-width: 400px) {
        height: 23rem;
        h1 {
            font-size: 2rem;
        }
    }
`

const MidBanner = () => (
    <FullWidthDiv>
        <MidBannerContainer>
            <h1>Visitanos, nosotros te daremos<br />tu mejor sonrisa</h1>
            <Link href="/contacto#llegar">
                <a className="link-btn secundary-btn">Como llegar</a>
            </Link>
            <LazyLoadImage
                src="/images/tooth.svg"
                effect="opacity"
                id="tooth"
            />
            <LazyLoadImage
                src="/images/toothpaste.svg"
                effect="opacity"
                id="toothpaste"
            />
            <LazyLoadImage
                src="/images/tooth_check.svg"
                effect="opacity"
                id="toothcheck"
            />
            <LazyLoadImage
                src="/images/twisers.svg"
                effect="opacity"
                id="twisers"
            />
            <LazyLoadImage
                src="/images/shringe.svg"
                effect="opacity"
                id="shringe"
            />
            <LazyLoadImage
                src="/images/prostetic.svg"
                effect="opacity"
                id="prostetic"
            />
            <LazyLoadImage
                src="/images/pills.svg"
                effect="opacity"
                id="pills"
            />
            <LazyLoadImage
                src="/images/floss.svg"
                effect="opacity"
                id="floss"
            />
            <LazyLoadImage
                src="/images/brush.svg"
                effect="opacity"
                id="brush"
            />
            <LazyLoadImage
                src="/images/Chair.svg"
                effect="opacity"
                id="Chair"
            />
        </MidBannerContainer>
    </FullWidthDiv>    
)

export default MidBanner; 