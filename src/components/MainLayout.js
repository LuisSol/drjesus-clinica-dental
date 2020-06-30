import PropTypes from 'prop-types'
import Head from 'next/head'

const MainLayout = (props) => {
    return (
        <>
            <Head>                
                <link rel="icon" href="/favicon.ico" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta
                    name="description"
                    content="Dr. Jesús Bañuelos, clínica dental. Una sonrisa dice más que mil palabras."
                />
                <link rel="apple-touch-icon" href="/logo192.png" /> 
                <link rel="manifest" href="/manifest.json" /> 
                <link rel="stylesheet" href="/main.css" /> 
                <title>Dr. Jesús Bañuelos | clínica dental</title>
            </Head>
            {props.children}
        </>
    )
}

MainLayout.propTypes = {
    children: PropTypes.node.isRequired,
}

export default MainLayout;
