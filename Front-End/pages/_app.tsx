import { AppProps } from 'next/app';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import 'antd/dist/antd.css'; // Ant Design Styles
import '../styles/globals.css'; // Global styles

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <ToastContainer position="top-right" autoClose={2000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
