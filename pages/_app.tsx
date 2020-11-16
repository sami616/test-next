import { AppProps } from 'next/app'
import Router from 'next/router'
import nprogress from 'nprogress'
import { useRouter } from 'next/router'
import { Loader } from '@components'
import 'nprogress/nprogress.css'
import '@styles/global.css'

Router.events.on('routeChangeStart', () => nprogress.start())
Router.events.on('routeChangeComplete', () => nprogress.done())
Router.events.on('routeChangeError', () => nprogress.done())
nprogress.configure({ showSpinner: false })

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  if (router.isFallback) return <Loader />
  return <Component {...pageProps} />
}
