import styled from 'styled-components'
import { LazyLoadImage } from 'react-lazy-load-image-component'

import ContactForm from './ContactForm'
import HeaderSvg from './ContactHeaderSvg'

const FullWidthDiv = styled.div`
    width: 100%;
`
const HeaderContainer = styled.header`
    padding: 20px;
    padding-bottom: 0;
    width: 1024px;
    margin: 0 auto;
    position: relative;
    p {
        font-weight: 300;
    }
    @media (1024px) {
        width: 100%;
    }
`
const Content = styled.div`
    display: flex;
    justify-content: space-between;    
    .contact-list {
        margin-top: 1rem;
        height: 10rem;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
    }
    .contact-card {
        height: 2rem;
        display: flex;
        align-items: center;
        font-weight: 300;
    }
    .facebook {
        background-color: #3b5998;
        color: white;  
        border-radius: 7px;             
    }
    .facebook a {
        display: block;
        width: 100%;
        font-weight: 500;
        text-align: center;
    }
    .contact-card img {
        height: 23px; 
        margin-right: 1rem;       
    }
`

export default function ContactHeader() {
    return (
        <FullWidthDiv>
            <HeaderContainer>
                <h1>Contacto</h1>
                <p>Tienes dudas o preguntas?, contáctanos por cualquiera de los siguientes medios: </p>
                <Content>
                    <div>
                        <ContactForm />
                        <div className="contact-list">
                            <div className="contact-card">
                                <LazyLoadImage
                                    src="/images/phone.svg"
                                    effect="opacity"
                                />
                                2676 0178
                            </div>
                            <div className="contact-card">
                                <LazyLoadImage
                                    src="/images/whatsapp.svg"
                                    effect="opacity"
                                />
                                33 25 38 93 71
                            </div>
                            <div className="contact-card facebook">
                                <a href="https://www.facebook.com/DrBanuel/" target="_blank" rel="noopener noreferrer">
                                    Facebook
                                </a>
                            </div>
                        </div>
                    </div>
                    <HeaderSvg />
                </Content>
            </HeaderContainer>
        </FullWidthDiv>
    )
}
