import { ToastProvider } from 'react-toast-notifications';
import '../styles/globals.scss';

function MyApp({ Component, pageProps }) {
  return (
    <ToastProvider autoDismiss>
      <Component {...pageProps} />
    </ToastProvider>
  );
}

export default MyApp;
