import styled from 'styled-components'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { auth } from '../utils/firebase'
import { useSelector } from 'react-redux'

const NavBar = styled.div`
    width: 1024px; 
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: white;
    margin: 0 auto;
    padding: 20px;
    z-index: 9;
    img {
        height: 60px;
    }
    @media (max-width: 1024px) {
        width: 100%;
    }
    @media (max-width: 750px) {
        flex-direction: column;
        position: fixed;
        top: 0;
        right: -100vw;
        width: 45%; 
        height: 100vh;       
        justify-content: flex-start;
        transition: all ease 300ms;
    }    
`
const NavLinks = styled.nav`
    display: flex;
    width: 30rem;
    justify-content: space-between;
    a.active {
        font-weight: 500;
    }
    @media (max-width: 750px) {
        flex-direction: column;
        width: 100%;
        height: 60vh;
        align-items: center; 
        justify-content: space-around;       
    }
`
const MobileMenuBtn = styled.button`
    width: 4rem;
    height: 4rem;
    background-color: white;
    position: fixed;
    bottom: 1rem;
    right: 1rem;
    display: none;
    border-radius: 50%;
    border: 1px solid #666;
    z-index: 10;
    @media (max-width: 750px) {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    &:focus {
        outline: none;
    }
    .hamburguer {
        width: 50%;
        height: 50%;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;                    
    }
    .hamburguer div {
        width: 100%;
        height: 3px;
        background-color: #666;
        transition: all ease 200ms;
    }
    #sup.open {        
        transform: rotate(45deg) translate(9px, 7px);
    }
    #med.open {
        opacity: 0;
    }
    #inf.open {        
        transform: rotate(-45deg) translate(8px, -5px);
    }
`

const Navigation = () => {
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const router = useRouter();
    const user = useSelector( state => state.user );

    const logout = () => {
        auth.signOut()
        .then(() => router.push('/'))
        .catch(err => console.error(err));
    }

    return (
        <>
        <NavBar style={ mobileOpen ? { right: 0 } : {} }>
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
                    >Servicios</a>
                </Link>
                <Link href="/contacto">
                    <a
                        className={router.pathname === '/contacto' ? 'active' : ''}
                    >Contacto</a>
                </Link>
                <Link href="/citas">
                    <a
                        className={router.pathname === '/citas' ? 'active' : ''}
                    >Citas</a>
                </Link>
                {
                    user 
                    ?
                    <a  
                        href="#"
                        onClick={ logout }
                    >Salir</a>
                    :                    
                    <Link href="/ingresar">
                        <a
                            className={router.pathname === '/ingresar' ? 'active' : ''}
                        >Ingresar</a>
                    </Link>
                }
            </NavLinks>
        </NavBar>
        <MobileMenuBtn 
            onClick={() => setMobileOpen(!mobileOpen)}
        >
            <div className="hamburguer">
                <div 
                    id="sup"
                    className={ mobileOpen ? 'open' : '' }
                />
                <div 
                    id="med"
                    className={ mobileOpen ? 'open' : '' }
                />
                <div 
                    id="inf"
                    className={ mobileOpen ? 'open' : '' }
                />
            </div>
        </MobileMenuBtn>
        </>
    )
}

export default Navigation;