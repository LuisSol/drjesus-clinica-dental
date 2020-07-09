import styled from 'styled-components'
import { LazyLoadImage } from 'react-lazy-load-image-component'

const FullWidthDiv = styled.div`
    width: 100%;
    background-color: #0981c5;
`
const HowToArrive = styled.main`
    color: white;
    width: 1020px;
    height: 32rem;
    padding: 20px;
    margin: 0 auto;
    div.content {
        display: flex;
    }
    #map {
        height: 350px;
        width: 500px;
        border-radius: 10px;
    }
    @media (max-width: 1020px) {
        width: 100%;
    }
    @media (max-width: 860px) {
        height: 45rem;
        div.content {
            flex-direction: column;
            align-items: center;
        }        
    }  
    @media (max-width: 560px) {
        #map {
            width: 95%;
        }
    } 
    @media (max-width: 400px) {        
        height: 47rem;
    }
    @media (max-width: 340px) {        
        height: 48rem;
    } 
`
const PublicTransport = styled.div`  
    padding: 20px;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    img {
        height: 30px;
        margin-right: 1rem;
    }
    hr {
        width: 100%;
    }
    div {
        display: flex;
        align-items: center;
    }
    span {
        font-weight: 300;
    }
    #uber-btn {
        background-color: black;
        display: flex;
        width: 100%;
        height: 2.5rem;
        align-items: center;
        justify-content: center;
        border-radius: 7px;
    }
    #uber-btn img {        
        width: 40px;
        margin-left: .5rem;
    }
    #uber-btn span {
        padding-top: 2px;
    }
`

export default function ContactMidBanner() {
    return (
        <FullWidthDiv>
            <HowToArrive>
                <h1 id="llegar">Como llegar ?</h1>
                <div className="content">
                    <iframe id="map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29867.133924066788!2d-103.29546925299293!3d20.653635618847698!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x99ef74699e05c6d7!2zTsO6Y2xlbyBNw6lkaWNvIEJhw7F1ZWxvcw!5e0!3m2!1ses!2smx!4v1594173979554!5m2!1ses!2smx" frameBorder="0" style={{ border: 0 }} allowFullScreen="" aria-hidden="false" tabIndex="0"></iframe>                
                    <PublicTransport>
                        <div>
                            <LazyLoadImage
                                src="/images/taxi.svg"
                                effect="opacity"
                            />
                            <span>Av. Francisco Javier Mina #1876, Col. San Andrés, Guadalajara, Jalisco.</span>
                        </div>
                        <hr />
                        <div>
                            <LazyLoadImage
                                src="/images/tren.svg"
                                effect="opacity"
                            />
                            <span>Justo en la salida de estación San Andrés, línea 2 Tren ligero.</span>
                        </div>
                        <hr />
                        <div>
                            <LazyLoadImage
                                src="/images/bus.svg"
                                effect="opacity"
                            />
                            <span>Rutas de transporte público: 78C, 80 (SITRAN).</span>
                        </div>
                        <hr />
                        <a 
                            href="https://m.uber.com/ul/?action=setPickup&client_id=2JXSfkAq9_d64w4bSWBrjTdykiuSKhpu&pickup=my_location&dropoff[formatted_address]=N%C3%BAcleo%20M%C3%A9dico%20Ba%C3%B1uelos%2C%20Avenida%20Francisco%20Javier%20Mina%2C%20San%20Andr%C3%A9s%2C%20Guadalajara%2C%20Jalisco%2C%20M%C3%A9xico&dropoff[latitude]=20.665195&dropoff[longitude]=-103.306497" 
                            
                            id="uber-btn"
                        >
                            Llévame aquí con
                            <LazyLoadImage
                                src="/images/Uber.svg"
                                effect="opacity"
                            />                            
                        </a>
                    </PublicTransport>
                </div>
            </HowToArrive>
        </FullWidthDiv>
    )
}
