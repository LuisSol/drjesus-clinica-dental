import { ToastContainer } from 'react-toastify';
import '../src/main.css';
import 'react-toastify/dist/ReactToastify.css';
import { wrapper } from '../src/redux/store';

const App = ({ Component, pageProps }) => {  

  return (
    <>
      <ToastContainer />
      <Component {...pageProps} />
    </>
  )
}

export default wrapper.withRedux(App);