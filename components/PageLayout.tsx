import Head from 'next/head'
import type { PageStaticProps } from '@pages/[[...uri]]'
import { PageTemplates } from '@components'

export interface PageLayoutProps
  extends Pick<Required<PageStaticProps>, 'page'> {}

export function PageLayout({ page }: PageLayoutProps) {
  return (
    <>
      <Head>
        <title>{page.title}</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <PageTemplates page={page} />
    </>
  )
}
