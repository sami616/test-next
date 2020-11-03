import { PageLayout, NotFound } from '@components'
import { fetchAPI, setURI } from '@utils'
import { useRouter } from 'next/router'
import { NextPage, GetStaticPaths, GetStaticProps } from 'next'

interface PageProps extends PagePropData {}

const Page: NextPage<PageProps> = ({ page }) => {
  const router = useRouter()

  if (router.isFallback) return <p>Loading...</p>

  if (!page) return <NotFound />

  return (
    <PageLayout page={page}>
      <h1>{page?.title}</h1>
      <p>{page?.uri}</p>
    </PageLayout>
  )
}

export default Page

export interface PagePropData {
  page?: {
    title: string
    uri: string
  }
}

export const getStaticProps: GetStaticProps<PagePropData> = async context => {
  const uri = setURI(context.params?.uri)

  try {
    const { page } = await fetchAPI<PagePropData>(
      `
    query GetPage($uri: ID!) {
      page(idType: URI, id: $uri) {
        title
        uri
      }
    }    
    `,
      { variables: { uri } }
    )
    return {
      props: { page },
      revalidate: 20,
    }
  } catch (e) {
    return {
      props: { page: undefined },
    }
  }
}

export interface PagePathData {
  pages: {
    edges: { node: { uri: string } }[]
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { pages } = await fetchAPI<PagePathData>(`{
        pages(first: 100) {
            edges {
              node {
                uri
              }
            }
        }
    }`)
  return {
    paths: pages.edges.map(d => ({
      params: { uri: d.node.uri.split('/').filter(slug => !!slug) },
    })),
    fallback: true,
  }
}
