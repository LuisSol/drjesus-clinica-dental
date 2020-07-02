import styled from 'styled-components'
import Link from 'next/link'

const NavContainer = styled.div`
    height: 7vh;
    postion: fix;
    top: 0;
`
const NavBar = styled.div`
    width: 1024px; 
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0 auto;
    padding: 10px;
`
const NavLinks = styled.nav`

`


export default function Navigation() {
    return (
        <NavContainer>
            <NavBar>
                <div>LOGO</div>
                <NavLinks>
                    <Link href="/"><a>Inicio</a></Link>
                    <Link href="/servicios"><a>Servicios</a></Link>
                    <Link href="/registro"><a>Crear cuenta</a></Link>
                    <Link href="/ingresar"><a>Ingresar</a></Link>
                </NavLinks>
            </NavBar>
        </NavContainer>
    )
}
