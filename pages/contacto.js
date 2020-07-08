import styled from 'styled-components';

import ContactHeader from '../src/components/ContactHeader';
import MidBanner from '../src/components/ContactMidBanner';
import MainLayout from '../src/components/MainLayout';
import BigFooter from '../src/components/BigFooter'

const MainContainer = styled.div`
    width: 100%;    
`

const Contacto = () => {
    return (
        <MainLayout title="Contacto">
            <MainContainer>
                <ContactHeader />  
                <MidBanner />   
                <BigFooter />               
            </MainContainer>
        </MainLayout>
    )
}

export default Contacto;