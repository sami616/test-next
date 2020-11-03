import Head from 'next/head'
import Error from 'next/error'

export interface NotFoundProps {}

export function NotFound() {
  return (
    <>
      <Head>
        <meta name='robots' content='noindex' />
      </Head>
      <Error statusCode={404} />
    </>
  )
}
