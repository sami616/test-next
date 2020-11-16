import Head from 'next/head'
import Error from 'next/error'

//x//////////////////////////////////////////////////
// Custom404
//x//////////////////////////////////////////////////

export default function Custom404() {
  return (
    <>
      <Head>
        <meta name='robots' content='noindex' />
      </Head>
      <Error statusCode={404} />
    </>
  )
}
