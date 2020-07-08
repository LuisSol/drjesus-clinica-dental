import styled from 'styled-components';

import ContactHeader from '../src/components/ContactHeader'
import MainLayout from '../src/components/MainLayout';

const MainContainer = styled.div`
    width: 100%;    
`

const Contacto = () => {
    return (
        <MainLayout title="Contacto">
            <MainContainer>
                <ContactHeader />                    
            </MainContainer>
        </MainLayout>
    )
}

export default Contacto;