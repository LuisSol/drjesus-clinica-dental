import styled from 'styled-components'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { auth } from '../utils/firebase'
import { useSelector } from 'react-redux'

const NavBar = styled.div`
    width: 1020px; 
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
    @media (max-width: 1020px) {
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
    position: relative;
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
    img {
        width: 10px;
        height: 10px;
        margin-left: .5rem;
        transition: transform 200ms ease;
    }
    img.open {
        transform: rotate(180deg);
    }
    @media (max-width: 750px) {
        #dropdown-link {
            display: flex;
            align-items: center;            
        }
        img {
            transform: rotate(90deg);
            order: -1;
            margin-left: 0;
            margin-right: .5rem;
        }
        img.open {
            transform: rotate(270deg);
        }
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
const DropDown = styled.div`    
    position: absolute;
    right: 0;
    width: 8rem;
    background-color: white;
    border-radius: 7px;
    top: 1.7rem;
    border: 1px solid #666; 
    z-index: 10;
    overflow: hidden;
    transition: transform 200ms ease;
    transform: scale(0);
    transform-origin: top right;
    &.open {
        transform: scale(1);
    }
    @media (max-width: 750px) {
        top: auto;
        bottom: 1rem;
        right: 100%;
        transform-origin: bottom right;        
    }
`
const DropDownItem = styled.div`
    font-weight: 300;
    height: 1.7rem;
    display: flex;
    align-items: center;
    padding-left: .7rem;
    &:hover {
        background-color: #eee;
    }
`

const Navigation = () => {
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [isOpen, setIsOpen] = React.useState(false);
    const router = useRouter();
    const user = useSelector( state => state.user );

    const logout = () => {
        setIsOpen(false);
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
                <a  
                    href="#"
                    onClick={() => setIsOpen(!isOpen)}
                    id="dropdown-link"
                >
                    Mi Cuenta
                    <img src="/images/arrow.svg" alt="arrow" 
                         className={isOpen ? 'open' : ''}
                    />
                </a>                 
                <DropDown className={isOpen ? 'open' : ''}>
                {
                    user 
                    ?
                        <>                            
                            <Link href="/perfil">                                    
                                <a><DropDownItem>Perfil</DropDownItem></a>                                    
                            </Link>                               
                            <a href="#" onClick={() => logout()}><DropDownItem>Salir</DropDownItem></a>                              
                        </>                        
                    :                                        
                    <Link href="/ingresar">                                    
                        <a><DropDownItem>Ingresar</DropDownItem></a>                                    
                    </Link>                      
                }    
                </DropDown>
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