import styled from 'styled-components';

import MainLayout from '../src/components/MainLayout';
import Hero from '../src/components/index/Hero'
import MidBanner from '../src/components/index/MidBanner'
import ServicesBanner from '../src/components/index/ServicesBanner'
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