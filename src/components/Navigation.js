import styled from 'styled-components'
import Link from 'next/link'
import { useRouter } from 'next/router'

const NavContainer = styled.div`
    height: 70px;
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
    @media (max-width: 1024px) {
        width: 100%;
    }
    img {
        height: 60px;
    }
`
const NavLinks = styled.nav`
    a {
        margin-left: 3rem;
    }
    a.active {
        font-weight: 500;
    }
`

export default function Navigation() {
    const router = useRouter();

    return (
        <NavContainer>
            <NavBar>
                <img src="/images/logo_completo.svg" alt="dr. jesús logo" />
                <NavLinks>
                    <Link href="/">
                        <a
                            className={router.pathname === '/' ? 'active' : ''}
                        >Inicio</a>
                    </Link>
                    <Link href="/servicios">
                        <a
                            className={router.pathname === '/servicios' ? 'active' : ''}
                        >Servicios</a></Link>
                    <Link href="/registro">
                        <a
                            className={router.pathname === '/registro' ? 'active' : ''}
                        >Crear cuenta</a></Link>
                    <Link href="/ingresar">
                        <a
                            className={router.pathname === '/ingresar' ? 'active' : ''}
                        >Ingresar</a></Link>
                </NavLinks>
            </NavBar>
        </NavContainer>
    )
}
