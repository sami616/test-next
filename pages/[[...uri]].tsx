import { PageLayout, NotFound } from '@components'
import { fetchAPI, setURI } from '@utils'
import { useRouter } from 'next/router'
import { NextPage, GetStaticPaths, GetStaticProps } from 'next'

export interface PageProps extends PageStaticProps {}

export type Templates = 'Home' | 'Default' | 'Blog'

export interface PageStaticProps {
  page?: {
    title: string
    uri: string
    template: {
      templateName: Templates
    }
  }
}

export interface PageStaticPaths {
  pages: {
    edges: { node: { uri: string } }[]
  }
}

const Page: NextPage<PageProps> = ({ page }) => {
  const router = useRouter()
  if (router.isFallback) return <p>Loading...</p>
  if (!page) return <NotFound />
  return <PageLayout page={page} />
}

export default Page

export const getStaticProps: GetStaticProps<PageStaticProps> = async context => {
  const uri = setURI(context.params?.uri)

  try {
    const { page } = await fetchAPI<PageStaticProps>(
      `
    query GetPage($uri: ID!) {
      page(idType: URI, id: $uri) {
        title
        uri
        template {
          templateName
        }
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
      props: {},
      revalidate: 20,
    }
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { pages } = await fetchAPI<PageStaticPaths>(`
    query GetPages {
        pages(first: 100) {
            edges {
              node {
                uri
              }
            }
        }
      }
    `)
  return {
    paths: pages.edges.map(d => ({
      params: { uri: d.node.uri.split('/').filter(slug => !!slug) },
    })),
    fallback: true,
  }
}
