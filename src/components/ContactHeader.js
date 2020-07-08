import styled from 'styled-components'

import ContactForm from './ContactForm'
import HeaderSvg from './ContactHeaderSvg'

const FullWidthDiv = styled.div`
    width: 100%;
`
const HeaderContainer = styled.header`
    padding: 20px;
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
`

export default function ContactHeader() {
    return (
        <FullWidthDiv>
            <HeaderContainer>
                <h1>Contacto</h1>
                <p>Tienes dudas o preguntas?, contáctanos por cualquiera de los siguientes medios: </p>
                <Content>
                    <ContactForm />
                    <HeaderSvg />
                </Content>
            </HeaderContainer>
        </FullWidthDiv>
    )
}
