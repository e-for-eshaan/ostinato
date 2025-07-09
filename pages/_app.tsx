import { useEffect } from 'react';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import '../utils/firebaseSync'; // Import to make sync functions available globally

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
