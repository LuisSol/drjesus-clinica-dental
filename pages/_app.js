import { ToastContainer } from 'react-toastify';
import { wrapper } from '../src/redux/store';
import Router from 'next/router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css';
import '../src/main.css';
import 'react-toastify/dist/ReactToastify.css';

NProgress.configure({ showSpinner: false });

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

const App = ({ Component, pageProps }) => {  

  return (
    <>
      <ToastContainer />
      <Component {...pageProps} />
    </>
  )
}

export default wrapper.withRedux(App);