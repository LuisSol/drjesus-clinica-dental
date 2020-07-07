import styled from 'styled-components';

import MainLayout from '../src/components/MainLayout';
import Hero from '../src/components/Hero'
import MidBanner from '../src/components/MidBanner'
import ServicesBanner from '../src/components/ServicesBanner'
import BigFooter from '../src/components/BigFooter'

const MainContainer = styled.div`
  width: 100%;
`

const Home = () => {
  return (
    <MainLayout title="Inicio">
      <MainContainer>
        <Hero />
        <MidBanner />
        <ServicesBanner />
        <BigFooter />
      </MainContainer>      
    </MainLayout>  
  )
}

export default Home;