import styled from 'styled-components';

import MainLayout from '../src/components/MainLayout';
import Hero from '../src/components/Hero'

const MainContainer = styled.div`
  width: 100%;
`

const Home = () => {
  return (
    <MainLayout title="Inicio">
      <MainContainer>
        <Hero />
      </MainContainer>
    </MainLayout>  
  )
}

export default Home;