import PropTypes from 'prop-types'
import Head from 'next/head'
import Navigation from './Navigation'

const MainLayout = (props) => {
    return (
        <>
            <Head>               
                <title>Dr. Jesús Bañuelos | {props.title}</title>
            </Head>
            <Navigation />
            {props.children}
        </>
    )
}

MainLayout.propTypes = {
    children: PropTypes.node.isRequired,
}

export default MainLayout;
