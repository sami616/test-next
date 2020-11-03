import Head from 'next/head'
import type { PagePropData } from '@pages/[[...uri]]'

export interface PageLayoutProps extends Pick<Required<PagePropData>, 'page'> {
  children: React.ReactNode
}

export function PageLayout({ children, page }: PageLayoutProps) {
  return (
    <>
      <Head>
        <title>{page.title}</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      {children}
    </>
  )
}
