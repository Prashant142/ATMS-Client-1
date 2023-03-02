import '@/styles/globals.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  console.log("Env mode = ", process.env.NEXT_PUBLIC_ENV_MODE);
  return <Component {...pageProps} />
}
