import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Provider } from "react-redux";
import { store } from "../redux/store";
import GoogleAuth from '../components/Auth/GoogleAuth';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <GoogleAuth />
      <Component {...pageProps} />
    </Provider>
  )
}
